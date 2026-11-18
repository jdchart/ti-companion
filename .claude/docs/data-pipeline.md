# Data pipeline

`src/data/facts/*.json` is generated, never hand-edited.

1. Download the needed JSON files from https://github.com/AsyncTI4/TI4_map_generator_bot/tree/master/src/main/resources/data
   into a fresh scratch dir (raw URLs: `https://raw.githubusercontent.com/AsyncTI4/TI4_map_generator_bot/master/src/main/resources/data/<path>`), flattening `/` to `_`:
   planets/{base,pok,codex3}.json, factions/{base,pok,keleres}.json, abilities/{base,pok,other}.json,
   technologies/*.json + decks (deck `techs_pok_c4` = Codex IV tech list), units/{baseUnits,pok,keleres}.json,
   agendas, action_cards, relics, explores, leaders, promissory_notes, strategy_cards, public_objectives, secret_objectives,
   decks (`agendas_pok`, etc.).
2. `python3 -I scripts/extract-facts.py <download_dir> src/data/facts` (or `npm run facts -- <dir> src/data/facts`).
3. `npm run check:content` — new entries without summaries are reported as missing.

Scope filters live in the script: sources base/pok/codex1-4 → expansions base/pok/codex. Keleres' 3 variants are merged into one faction.
Thunder's Edge (Oct 2025 expansion) is **not** included yet — adding it means extending the source filters and writing summaries/guides for its 6 factions.
