#!/usr/bin/env python3
"""
Extract FACTUAL game data (names, numbers, types, prerequisites) for the
TI Companion app from a local copy of the AsyncTI4 bot's data files.

Only non-expressive facts are kept (card names, planet values, unit stats,
technology colours/prerequisites, faction commodities, ...).  Card rules
text, flavour text and image URLs are deliberately DROPPED: every
description shown in the app is written from scratch in src/content/.

Source repo (software released under the Unlicense; game content (c) FFG):
  https://github.com/AsyncTI4/TI4_map_generator_bot  (src/main/resources/)

Usage:
  python3 -I scripts/extract-facts.py <download_dir> <output_dir>

<download_dir> must contain the files listed in FILES below, named with the
repo path's slashes replaced by underscores (e.g. data_factions_base.json),
plus a planets/ folder holding the per-planet JSON files.
See .claude/docs/data-pipeline.md for the fetch commands.
"""
import glob
import json
import os
import sys

SOURCES = {"base", "pok", "codex1", "codex2", "codex3", "codex4"}
EXP = {"base": "base", "pok": "pok", "codex1": "codex", "codex2": "codex",
       "codex3": "codex", "codex4": "codex"}


def load(d, name):
    with open(os.path.join(d, name), encoding="utf-8") as f:
        return json.load(f)


def keep(x):
    return x.get("source") in SOURCES


def main(src, out):
    os.makedirs(out, exist_ok=True)

    def dump(name, data):
        with open(os.path.join(out, name), "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=1)
        print(f"{name}: {len(data)}")

    # ---------------- planets
    planets = []
    for f in sorted(glob.glob(os.path.join(src, "planets", "*.json"))):
        try:
            p = json.load(open(f, encoding="utf-8"))
        except Exception:
            continue
        if p.get("source") not in ("base", "pok", "codex3"):
            continue
        if p.get("tileId") is None:
            continue
        planets.append({
            "id": p["id"],
            "name": p["name"],
            "tile": p.get("tileId"),
            "res": p.get("resources", 0),
            "inf": p.get("influence", 0),
            "trait": (p.get("planetType") or "NONE").lower(),
            "skip": [s.lower() for s in (p.get("techSpecialties") or [])],
            "legendary": bool(p.get("legendaryAbilityName")),
            "home": p.get("factionHomeworld"),
            "exp": EXP[p["source"]],
        })
    planets.sort(key=lambda p: (p["home"] is None, p["name"]))
    dump("planets.json", planets)

    # ---------------- factions
    factions = []
    for fn in ("data_factions_base.json", "data_factions_pok.json",
               "data_factions_keleres.json"):
        for x in load(src, fn):
            if not keep(x):
                continue
            factions.append({
                "id": x["alias"],
                "name": x["factionName"],
                "exp": EXP[x["source"]],
                "commodities": x.get("commodities"),
                "homePlanets": x.get("homePlanets", []),
                "factionTech": x.get("factionTech", []),
                "startingTech": x.get("startingTech", []),
                "startingTechOptions": x.get("startingTechOptions", []),
                "startingTechAmount": x.get("startingTechAmount"),
                "startingFleet": x.get("startingFleet"),
                "abilities": x.get("abilities", []),
                "leaders": x.get("leaders", []),
                "promissory": x.get("promissoryNotes", []),
                "units": x.get("units", []),
                "complexity": x.get("complexity"),
            })
    # The Council Keleres comes in 3 variants (Mentak / Xxcha / Argent home
    # systems). Merge them into one faction with per-variant home data.
    kel = [f for f in factions if f["id"].startswith("keleres")]
    if kel:
        merged = dict(kel[0], id="keleres", name="The Council Keleres",
                      homePlanets=[], leaders=[], promissory=[])
        merged["variants"] = [{"of": f["id"][-1], "homePlanets": f["homePlanets"],
                               "hero": f["leaders"][-1], "promissory": f["promissory"]}
                              for f in kel]
        merged["leaders"] = kel[0]["leaders"][:2] + [f["leaders"][-1] for f in kel]
        merged["promissory"] = [p for f in kel for p in f["promissory"]]
        merged["homePlanets"] = [p for f in kel for p in f["homePlanets"]]
        factions = [f for f in factions if not f["id"].startswith("keleres")] + [merged]
    dump("factions.json", factions)

    # ---------------- faction abilities (names only)
    abil = []
    for fn in ("data_abilities_base.json", "data_abilities_pok.json",
               "data_abilities_other.json"):
        for x in load(src, fn):
            if x["id"] in {a for f in factions for a in f["abilities"]}:
                abil.append({"id": x["id"], "name": x["name"],
                             "faction": x.get("faction")})
    dump("abilities.json", abil)

    # ---------------- technologies
    decks = {d["alias"]: d for d in load(src, "data_decks_pok.json")}
    tech_deck = set(decks["techs_pok_c4"]["cardIDs"])
    techs = []
    for x in load(src, "data_technologies_pok.json"):
        if x["alias"] not in tech_deck:
            continue
        techs.append({
            "id": x["alias"],
            "name": x["name"],
            "types": [t.lower() for t in x.get("types", [])],
            "req": x.get("requirements", ""),
            "faction": x.get("faction"),
            "upgradeOf": x.get("baseUpgrade"),
            "exp": EXP[x["source"]],
        })
    dump("technologies.json", techs)

    # ---------------- units
    used_units = {u for f in factions for u in f["units"]}
    used_units |= {t for f in factions for t in f["factionTech"]}
    unit_files = ("data_units_baseUnits.json", "data_units_pok.json",
                  "data_units_keleres.json")
    # Faction unit upgrades (e.g. "Super Dreadnought II") are not listed on the
    # faction sheet: follow upgradesToUnitId links so they are kept too.
    raw_units = {x["id"]: x for fn in unit_files for x in load(src, fn)}
    frontier = list(used_units)
    while frontier:
        nxt = raw_units.get(frontier.pop(), {}).get("upgradesToUnitId")
        if nxt and nxt not in used_units:
            used_units.add(nxt)
            frontier.append(nxt)
    units = []
    for fn in unit_files:
        for x in load(src, fn):
            if not keep(x):
                continue
            if x.get("faction") and x["id"] not in used_units:
                continue
            u = {"id": x["id"], "name": x["name"], "type": x["baseType"],
                 "faction": x.get("faction"), "exp": EXP[x["source"]]}
            for k_src, k_dst in (
                ("cost", "cost"), ("combatHitsOn", "combat"),
                ("combatDieCount", "combatDice"), ("moveValue", "move"),
                ("capacityValue", "capacity"), ("sustainDamage", "sustain"),
                ("afbHitsOn", "afb"), ("afbDieCount", "afbDice"),
                ("bombardHitsOn", "bombard"), ("bombardDieCount", "bombardDice"),
                ("spaceCannonHitsOn", "spaceCannon"),
                ("spaceCannonDieCount", "spaceCannonDice"),
                ("deepSpaceCannon", "deepSpaceCannon"),
                ("planetaryShield", "planetaryShield"),
                ("productionValue", "production"),
                ("upgradesToUnitId", "upgradesTo"),
                ("requiredTechId", "requiredTech")):
                if x.get(k_src) not in (None, False):
                    u[k_dst] = x[k_src]
            units.append(u)
    dump("units.json", units)

    # ---------------- strategy cards
    sc = [{"id": x["id"], "initiative": x["initiative"], "name": x["name"],
           "color": x.get("colourHexCode")}
          for x in load(src, "data_strategy_cards_pok.json")]
    dump("strategy_cards.json", sc)

    # ---------------- objectives
    s1 = set(decks["public_stage_1_objectives_pok"]["cardIDs"])
    s2 = set(decks["public_stage_2_objectives_pok"]["cardIDs"])
    objs = []
    for x in load(src, "data_public_objectives_public_objectives.json"):
        if not keep(x):
            continue
        objs.append({"id": x["alias"], "name": x["name"], "points": x["points"],
                     "stage": 1 if x["alias"] in s1 else 2 if x["alias"] in s2 else None,
                     "exp": EXP[x["source"]]})
    dump("public_objectives.json", objs)

    secrets = [{"id": x["alias"], "name": x["name"],
                "phase": x["phase"].lower(), "exp": EXP[x["source"]]}
               for x in load(src, "data_secret_objectives_secret_objectives.json")
               if keep(x)]
    dump("secret_objectives.json", secrets)

    # ---------------- agendas
    ag_deck = set(decks["agendas_pok"]["cardIDs"])
    ag = []
    for fn in ("data_agendas_base.json", "data_agendas_pok.json"):
        for x in load(src, fn):
            if x["alias"] in ag_deck:
                ag.append({"id": x["alias"], "name": x["name"],
                           "type": x["type"].lower(), "target": x.get("target"),
                           "exp": EXP[x["source"]]})
    dump("agendas.json", ag)

    # ---------------- action cards (deduplicated by name, with copy count)
    ac_deck = set(decks["action_cards_pok"]["cardIDs"])
    byname = {}
    for x in load(src, "data_action_cards_action_cards.json"):
        if x["alias"] not in ac_deck:
            continue
        e = byname.setdefault(x["name"], {
            "id": x["alias"].rstrip("0123456789") or x["alias"],
            "name": x["name"], "phase": x["phase"].lower(), "copies": 0,
            "exp": EXP.get(x["source"], x["source"])})
        e["copies"] += 1
    dump("action_cards.json", sorted(byname.values(), key=lambda e: e["name"]))

    # ---------------- relics, exploration
    relic_deck = set(decks["relics_pok"]["cardIDs"])
    relics = [{"id": x["alias"], "name": x["name"], "exp": EXP[x["source"]]}
              for x in load(src, "data_relics_pok.json")
              if x["alias"] in relic_deck or keep(x)]
    dump("relics.json", relics)

    explore_deck = decks["explores_pok"]["cardIDs"]
    ex_all = {x["id"]: x for x in load(src, "data_explores_explores.json")}
    exp_by = {}
    for cid in explore_deck:
        x = ex_all.get(cid)
        if not x:
            continue
        key = (x["name"], x["type"])
        e = exp_by.setdefault(key, {"id": x["id"].rstrip("0123456789"),
                                    "name": x["name"], "deck": x["type"].lower(),
                                    "resolution": x["resolution"].lower(),
                                    "copies": 0})
        e["copies"] += 1
    dump("exploration.json", sorted(exp_by.values(), key=lambda e: (e["deck"], e["name"])))

    # ---------------- leaders & promissory notes (names only)
    used_leaders = {l for f in factions for l in f["leaders"]}
    leaders = [{"id": x["id"], "name": x["name"], "type": x["type"],
                "faction": x["faction"], "exp": EXP[x["source"]]}
               for x in load(src, "data_leaders_pok.json")
               if x["id"] in used_leaders]
    dump("leaders.json", leaders)
    pn = [{"id": x["alias"], "name": x["name"], "faction": x.get("faction"),
           "exp": EXP[x["source"]]}
          for x in load(src, "data_promissory_notes_promissory_notes.json")
          if keep(x)]
    dump("promissory_notes.json", pn)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
