/** Faction guides — Prophecy of Kings factions and the Council Keleres (Codex). */
import type { FactionGuide } from './types'

export const pokGuides: Record<string, FactionGuide> = {
  argent: {
    color: '#e07d2c',
    blurb: {
      en: 'Avian strike force: powerful destroyers, unit-ability bonuses and extra votes.',
      fr: 'Force de frappe aviaire : destroyers puissants, bonus de capacités d’unité et voix supplémentaires.',
    },
    aliases: ['argent', 'argent flight', 'birds', 'oiseaux'],
    playstyle: {
      en: 'Flexible combat and politics. Strike Wing Alpha destroyers shred fighters and damage ships ([[ability:raid_formation|Raid Formation]]); [[ability:zeal|Zeal]] gives many extra votes and you always vote first. Your agent lets ground forces deploy to nearby planets.',
      fr: 'Combat et politique flexibles. Les destroyers Strike Wing Alpha déchiquettent les chasseurs et endommagent les vaisseaux ([[ability:raid_formation|Raid Formation]]) ; [[ability:zeal|Zeal]] donne beaucoup de voix et vous votez en premier.',
    },
    strengths: {
      en: '- Excellent destroyers early\n- Big vote count\n- Three home planets',
      fr: '- Excellents destroyers dès le début\n- Beaucoup de voix\n- Trois planètes d’origine',
    },
    weaknesses: {
      en: '- Destroyer-heavy fleets lack staying power\n- Voting first reveals your intent',
      fr: '- Flottes de destroyers peu résistantes\n- Voter en premier révèle vos intentions',
    },
    keyTechs: ['swa2', 'ah', 'gd', 'ps', 'st'],
    goodSC: [6, 3, 8],
    plans: [
      {
        name: { en: 'Strike wing', fr: 'Escadre d’assaut' },
        summary: {
          en: 'Use cheap destroyer swarms to dominate early skirmishes, then leverage votes for points.',
          fr: 'Utiliser des nuées de destroyers bon marché pour dominer les escarmouches, puis les voix pour marquer.',
        },
        opening: {
          en: '- Build destroyers to screen and raid\n- Research Strike Wing Alpha II\n- Expand with your agent placing troops widely',
          fr: '- Produire des destroyers pour filtrer et attaquer\n- Rechercher Strike Wing Alpha II\n- S’étendre en utilisant l’agent pour placer les troupes',
        },
        mid: {
          en: '- Commander: +1 die on all unit abilities\n- Aerie Hololattice blocks movement through your structures\n- Swing agendas with Zeal',
          fr: '- Commandant : +1 dé sur toutes les capacités d’unité\n- Aerie Hololattice bloque le passage par vos structures\n- Faire basculer les votes avec Zeal',
        },
        late: {
          en: '- Hero: teleport ships to every system with your tokens\n- Win the decisive agendas',
          fr: '- Héros : téléporter vos vaisseaux dans tous les systèmes avec vos jetons\n- Remporter les votes décisifs',
        },
      },
    ],
  },

  cabal: {
    color: '#7a1f33',
    blurb: {
      en: 'Eldritch horror that captures what it destroys and opens gravity-rift portals.',
      fr: 'Horreur indicible qui capture ce qu’elle détruit et ouvre des portails à faille gravitationnelle.',
    },
    aliases: ['cabal', "vuil'raith", 'vuilraith', 'horrors'],
    playstyle: {
      en: 'Combat-economy. [[ability:devour|Devour]] captures units you destroy; [[ability:amalgamation|Amalgamation]] rebuilds them for free; your space docks are gravity rifts (Dimensional Tears). Fight to fuel yourself and deny others their plastic.',
      fr: 'Économie de combat. [[ability:devour|Devour]] capture les unités détruites ; [[ability:amalgamation|Amalgamation]] les reconstruit gratuitement ; vos docks sont des failles gravitationnelles (Dimensional Tears).',
    },
    strengths: {
      en: '- Free units from captures\n- Captured units deny the enemy\n- Strong flagship and hero',
      fr: '- Unités gratuites via les captures\n- Les captures privent l’ennemi\n- Vaisseau amiral et héros puissants',
    },
    weaknesses: {
      en: '- Complex\n- Needs combat to work\n- Slow early economy',
      fr: '- Complexe\n- A besoin de combat\n- Économie de départ lente',
    },
    keyTechs: ['dt2', 'vtx', 'gd', 'st', 'asc'],
    goodSC: [6, 4, 8],
    plans: [
      {
        name: { en: 'Devourer', fr: 'Dévoreur' },
        summary: {
          en: 'Fight often, capture enemy units, rebuild them for free, and create rifts near enemies.',
          fr: 'Combattre souvent, capturer les unités ennemies, les reconstruire gratuitement et créer des failles près des ennemis.',
        },
        opening: {
          en: '- Place a second Dimensional Tear dock toward the action\n- Use your agent on players refreshing commodities\n- Seek small favorable fights',
          fr: '- Placer un second dock Dimensional Tear vers l’action\n- Utiliser l’agent sur les joueurs qui rechargent\n- Chercher de petits combats favorables',
        },
        mid: {
          en: '- Vortex captures units remotely\n- Commander (units in 3 rifts) for cheaper fighters/infantry\n- Return captured ships for free builds',
          fr: '- Vortex capture des unités à distance\n- Commandant (unités dans 3 failles) pour chasseurs/infanterie\n- Rendre des vaisseaux capturés pour produire gratuitement',
        },
        late: {
          en: '- Hero swallows ships around your tears\n- Flagship captures everything destroyed in its system',
          fr: '- Le héros avale les vaisseaux autour de vos déchirures\n- Le vaisseau amiral capture tout ce qui meurt dans son système',
        },
      },
    ],
  },

  empyrean: {
    color: '#7c52c6',
    blurb: {
      en: 'Ancient void-dwellers who move through nebulae and broker passage for others.',
      fr: 'Anciens habitants du vide qui traversent les nébuleuses et monnayent le passage des autres.',
    },
    aliases: ['empyrean'],
    playstyle: {
      en: 'Diplomatic utility. [[ability:voidborn|Voidborn]] ignores nebulae, [[ability:aetherpassage|Aetherpassage]] lets you sell movement through your ships, and you hold two faction notes ([[ability:dark_whispers|Dark Whispers]]). Make friends, trade services and explore frontiers.',
      fr: 'Utilité diplomatique. [[ability:voidborn|Voidborn]] ignore les nébuleuses, [[ability:aetherpassage|Aetherpassage]] permet de vendre le passage, et vous avez deux billets de faction ([[ability:dark_whispers|Dark Whispers]]). Se faire des amis et vendre des services.',
    },
    strengths: {
      en: '- Lots of deal-making tools\n- Voidwatch collects promissory notes\n- Strong hero with frontier exploration',
      fr: '- Beaucoup d’outils de négociation\n- Voidwatch collecte des billets à ordre\n- Héros puissant pour l’exploration',
    },
    weaknesses: {
      en: '- Very poor home system\n- Few combat bonuses\n- Commander condition is hard',
      fr: '- Système d’origine très pauvre\n- Peu de bonus de combat\n- Commandant difficile à débloquer',
    },
    keyTechs: ['vw', 'as', 'det', 'gd', 'st'],
    goodSC: [5, 2, 7],
    plans: [
      {
        name: { en: 'Void broker', fr: 'Courtier du vide' },
        summary: {
          en: 'Spread ships across empty space, sell passage and favours, and score deep-space objectives.',
          fr: 'Disperser vos vaisseaux dans l’espace vide, vendre passages et faveurs, marquer les objectifs d’espace profond.',
        },
        opening: {
          en: '- Dark Energy Tap to explore frontier tokens\n- Spread ships to empty systems\n- Offer Aetherpassage and Blood Pact for deals',
          fr: '- Dark Energy Tap pour explorer les jetons frontière\n- Disperser vos vaisseaux dans les systèmes vides\n- Proposer Aetherpassage et Blood Pact',
        },
        mid: {
          en: '- Explore Deep Space / Patrol Vast Territories\n- Voidwatch: attackers pay promissory notes\n- Flagship repairs allies’ units for influence',
          fr: '- Explore Deep Space / Patrol Vast Territories\n- Voidwatch : les attaquants paient en billets à ordre\n- Le vaisseau amiral répare les unités alliées',
        },
        late: {
          en: '- Hero floods the map with frontier explorations\n- Use stored favours to block the leader',
          fr: '- Le héros multiplie les explorations\n- Utiliser les faveurs accumulées contre le leader',
        },
      },
    ],
  },

  mahact: {
    color: '#c9a33c',
    blurb: {
      en: 'Gene-sorcerers who steal command tokens and use other players’ commanders.',
      fr: 'Sorciers génétiques qui volent des jetons de commandement et utilisent les commandants des autres.',
    },
    aliases: ['mahact', 'gene sorcerers', 'sorciers'],
    playstyle: {
      en: 'Aggressive control. Winning combats puts the loser’s token in your fleet pool ([[ability:edict|Edict]]), raising your fleet limit and letting you use their commander ([[ability:imperia|Imperia]]). You can’t get Alliance notes, so you collect commanders by force.',
      fr: 'Contrôle agressif. Gagner un combat place un jeton du perdant dans votre réserve de flotte ([[ability:edict|Edict]]), augmentant votre limite et vous donnant accès à son commandant ([[ability:imperia|Imperia]]).',
    },
    strengths: {
      en: '- Grows from every victory\n- Access to many commanders\n- Strong flagship vs. new opponents',
      fr: '- Se renforce à chaque victoire\n- Accès à de nombreux commandants\n- Vaisseau amiral fort contre de nouveaux adversaires',
    },
    weaknesses: {
      en: '- Must win combats to work\n- Hubris: no Alliances\n- Complex timing',
      fr: '- Doit gagner des combats\n- Hubris : pas d’Alliance\n- Timing complexe',
    },
    keyTechs: ['cl2', 'gr', 'gd', 'st', 'dn2'],
    goodSC: [6, 1, 3],
    plans: [
      {
        name: { en: 'Token collector', fr: 'Collectionneur de jetons' },
        summary: {
          en: 'Win small fights against several players to collect tokens and commanders, then snowball.',
          fr: 'Gagner de petits combats contre plusieurs joueurs pour collecter jetons et commandants, puis faire boule de neige.',
        },
        opening: {
          en: '- Pick easy combats with different neighbours\n- Each win adds a fleet slot and a potential commander\n- Genetic Recombination pressures votes',
          fr: '- Choisir des combats faciles contre différents voisins\n- Chaque victoire ajoute une place de flotte et un commandant\n- Genetic Recombination met la pression sur les votes',
        },
        mid: {
          en: '- Commander: activate systems with your own tokens\n- Use the best enemy commanders you have tokens for\n- Scepter of Dominion to lock enemies out',
          fr: '- Commandant : activer des systèmes contenant vos propres jetons\n- Utiliser les meilleurs commandants ennemis\n- Scepter of Dominion pour verrouiller les ennemis',
        },
        late: {
          en: '- Hero forces a no-retreat battle in an enemy system\n- Starlancer mechs end attackers’ turns',
          fr: '- Le héros force une bataille sans retraite chez l’ennemi\n- Les mécas Starlancer terminent le tour des attaquants',
        },
      },
    ],
  },

  naaz: {
    color: '#a6a04c',
    blurb: {
      en: 'Explorer alliance with mechs that turn into ships and relic-fragment crafting.',
      fr: 'Alliance d’explorateurs aux mécas qui deviennent des vaisseaux et qui fabriquent des reliques.',
    },
    aliases: ['naaz', 'naaz-rokha', 'naazrokha'],
    playstyle: {
      en: 'Exploration engine. Your mechs explore better ([[ability:distant_suns|Distant Suns]]), [[ability:fabrication|Fabrication]] crafts relics from fragments, and Pre-Fab Arcologies readies planets after exploring. Spread mechs, explore everything, collect relics.',
      fr: 'Moteur d’exploration. Vos mécas explorent mieux ([[ability:distant_suns|Distant Suns]]), [[ability:fabrication|Fabrication]] crée des reliques à partir de fragments, et Pre-Fab Arcologies redresse les planètes explorées.',
    },
    strengths: {
      en: '- Best at exploration and relics\n- Flexible mechs\n- Great hero',
      fr: '- Meilleur en exploration et reliques\n- Mécas flexibles\n- Excellent héros',
    },
    weaknesses: {
      en: '- Depends on exploration luck\n- Mechs are pricey early\n- Weak space fleet',
      fr: '- Dépend de la chance d’exploration\n- Mécas coûteux au début\n- Flotte spatiale faible',
    },
    keyTechs: ['pfa', 'sc', 'sdn', 'sar', 'gd'],
    goodSC: [7, 4, 5],
    plans: [
      {
        name: { en: 'Relic hunters', fr: 'Chasseurs de reliques' },
        summary: {
          en: 'Explore aggressively with mechs, craft relics, and score attachment/relic objectives.',
          fr: 'Explorer agressivement avec les mécas, fabriquer des reliques et marquer les objectifs d’attachements/reliques.',
        },
        opening: {
          en: '- Land mechs on new planets to draw 2 exploration cards\n- Scanlink Drone Network for extra explores\n- Fabricate relics from fragments',
          fr: '- Débarquer des mécas pour piocher 2 cartes d’exploration\n- Scanlink Drone Network pour explorer davantage\n- Fabriquer des reliques avec les fragments',
        },
        mid: {
          en: '- Pre-Fab Arcologies: explored planets ready again\n- Score Discover Lost Outposts / Reclaim Ancient Monuments\n- Commander (mechs in 3 systems) explores conquered planets',
          fr: '- Pre-Fab Arcologies : les planètes explorées se redressent\n- Marquer Discover Lost Outposts / Reclaim Ancient Monuments\n- Commandant (mécas dans 3 systèmes) : explorer les planètes conquises',
        },
        late: {
          en: '- Hero: a relic plus two strategy secondaries\n- Mechs become ships in space for surprise fights',
          fr: '- Héros : une relique plus deux secondaires\n- Les mécas deviennent des vaisseaux pour des combats surprises',
        },
      },
    ],
  },

  nomad: {
    color: '#3b72ad',
    blurb: {
      en: 'Mercenary company with three agents and an upgradable super-flagship.',
      fr: 'Compagnie de mercenaires avec trois agents et un super vaisseau amiral améliorable.',
    },
    aliases: ['nomad', 'the nomad'],
    playstyle: {
      en: 'Agent-heavy flexibility. [[ability:the_company|The Company]] gives three agents to use (or sell); Memoria II is one of the strongest ships in the game; [[ability:future_sight|Future Sight]] pays you for winning votes.',
      fr: 'Flexibilité par les agents. [[ability:the_company|The Company]] donne trois agents à utiliser (ou vendre) ; Memoria II est l’un des meilleurs vaisseaux du jeu ; [[ability:future_sight|Future Sight]] vous paie quand vous gagnez un vote.',
    },
    strengths: {
      en: '- Three agents = constant value and bargaining chips\n- Monster flagship\n- Free flagship with commander',
      fr: '- Trois agents = valeur constante et monnaie d’échange\n- Vaisseau amiral monstrueux\n- Vaisseau amiral gratuit avec le commandant',
    },
    weaknesses: {
      en: '- Flagship eggs-in-one-basket\n- Average economy\n- Agents demand attention',
      fr: '- Tout repose sur le vaisseau amiral\n- Économie moyenne\n- Les agents demandent de l’attention',
    },
    keyTechs: ['m2', 'tcs', 'gd', 'st', 'hm'],
    goodSC: [7, 1, 8],
    plans: [
      {
        name: { en: 'Flagship doctrine', fr: 'Doctrine du vaisseau amiral' },
        summary: {
          en: 'Get Memoria II and use it as an unstoppable spearhead, with agents smoothing every turn.',
          fr: 'Obtenir Memoria II et en faire une pointe imparable, les agents fluidifiant chaque tour.',
        },
        opening: {
          en: '- Build the flagship early; research Memoria II (GBY)\n- Use Thundarian, Mercer and Artuno every round\n- Score a secret to unlock your commander',
          fr: '- Produire tôt le vaisseau amiral ; rechercher Memoria II (GBY)\n- Utiliser Thundarian, Mercer et Artuno à chaque tour\n- Marquer un secret pour débloquer le commandant',
        },
        mid: {
          en: '- Push with the flagship + mechs\n- Temporal Command Suite: ready agents and trade\n- Sell The Cavalry to friendly players',
          fr: '- Avancer avec vaisseau amiral + mécas\n- Temporal Command Suite : redresser des agents et négocier\n- Vendre The Cavalry aux joueurs amis',
        },
        late: {
          en: '- Hero: flagship escapes command-token locks for a final strike\n- Unveil Flagship / Supremacy',
          fr: '- Héros : le vaisseau amiral ignore les jetons pour un coup final\n- Unveil Flagship / Supremacy',
        },
      },
    ],
  },

  titans: {
    color: '#c45389',
    blurb: {
      en: 'Ancient titans awakening sleeper PDS across the galaxy, with a legendary home planet.',
      fr: 'Titans antiques qui réveillent des SDP dormants à travers la galaxie, avec une planète d’origine légendaire.',
    },
    aliases: ['titans', 'titans of ul', 'ul'],
    playstyle: {
      en: 'Structure-based defence and expansion. [[ability:terragenesis|Terragenesis]] places sleeper tokens when you explore; [[ability:awaken|Awaken]] turns them into PDS. Hel-Titans are PDS that fight as ground forces. Build a web of structures and fortresses.',
      fr: 'Défense et expansion par les structures. [[ability:terragenesis|Terragenesis]] place des dormeurs à l’exploration ; [[ability:awaken|Awaken]] les transforme en SDP. Les Hel-Titan sont des SDP qui combattent au sol.',
    },
    strengths: {
      en: '- Very strong defence\n- Easy structure objectives\n- Saturn Engine cruisers are great',
      fr: '- Défense très solide\n- Objectifs de structures faciles\n- Croiseurs Saturn Engine excellents',
    },
    weaknesses: {
      en: '- Slow to project power\n- Sleepers are telegraphed\n- Complex engine',
      fr: '- Lent à projeter sa puissance\n- Dormeurs prévisibles\n- Moteur complexe',
    },
    keyTechs: ['se2', 'ht2', 'pds2', 'gd', 'st'],
    goodSC: [4, 7, 8],
    plans: [
      {
        name: { en: 'Awakening', fr: 'L’éveil' },
        summary: {
          en: 'Seed sleepers while exploring, awaken PDS networks, and score structure objectives.',
          fr: 'Semer des dormeurs en explorant, éveiller des réseaux de SDP et marquer les objectifs de structures.',
        },
        opening: {
          en: '- Explore planets to place sleepers\n- Saturn Engine II for cruisers with capacity\n- Construction for extra structures',
          fr: '- Explorer pour placer des dormeurs\n- Saturn Engine II pour des croiseurs à capacité\n- Construction pour plus de structures',
        },
        mid: {
          en: '- Awaken sleepers when activating systems\n- Build Defenses / Improve Infrastructure / Protect the Border\n- Commander: a trade good on each production',
          fr: '- Éveiller les dormeurs en activant les systèmes\n- Build Defenses / Improve Infrastructure / Protect the Border\n- Commandant : un bien commercial à chaque production',
        },
        late: {
          en: '- Hero: Elysium becomes a 7/7 fortress with space cannon\n- Terraform note is a great permanent deal',
          fr: '- Héros : Elysium devient une forteresse 7/7 avec SPACE CANNON\n- Le billet Terraform est un excellent accord permanent',
        },
      },
    ],
  },

  keleres: {
    color: '#8aa6bb',
    blurb: {
      en: 'Council peacekeepers (Codex) who borrow the home system of Mentak, Xxcha or Argent and ignore laws.',
      fr: 'Gardiens de la paix du Conseil (Codex) qui empruntent le système d’origine de Mentak, Xxcha ou Argent et ignorent les lois.',
    },
    aliases: ['keleres', 'council keleres', 'conseil'],
    playstyle: {
      en: 'Economic and political. [[ability:council_patronage|Council Patronage]] refills commodities and gives a trade good each round, [[ability:laws_order|Law’s Order]] blanks laws for a turn, and I.I.H.Q. Modernization makes you a neighbour of everyone near Mecatol. Your hero depends on the borrowed home system.',
      fr: 'Économique et politique. [[ability:council_patronage|Council Patronage]] recharge vos marchandises et donne un bien commercial par tour, [[ability:laws_order|Law’s Order]] neutralise les lois pendant un tour, et I.I.H.Q. Modernization vous rend voisin de tous ceux qui sont près de Mecatol.',
    },
    strengths: {
      en: '- Steady income every round\n- Flexible faction choice at setup\n- Strong political tools',
      fr: '- Revenus réguliers à chaque tour\n- Choix flexible à la mise en place\n- Outils politiques puissants',
    },
    weaknesses: {
      en: '- No starting technologies\n- Home system depends on what’s left\n- Average military',
      fr: '- Aucune technologie de départ\n- Système d’origine selon ce qui reste\n- Armée moyenne',
    },
    keyTechs: ['iihq', 'asn', 'gd', 'st', 'hm'],
    goodSC: [7, 5, 8],
    plans: [
      {
        name: { en: 'Peacekeepers', fr: 'Gardiens de la paix' },
        summary: {
          en: 'Turn steady trade goods into technology and points while using laws and riders to stay ahead.',
          fr: 'Transformer les biens commerciaux réguliers en technologies et points, en jouant des lois et des riders.',
        },
        opening: {
          en: '- Use Council Patronage income to catch up on missing techs\n- Head toward Mecatol for I.I.H.Q. and Custodia Vigilia\n- Sell commodities each round',
          fr: '- Utiliser les revenus de Council Patronage pour rattraper les technologies\n- Viser Mecatol pour I.I.H.Q. et Custodia Vigilia\n- Vendre vos marchandises à chaque tour',
        },
        mid: {
          en: '- Law’s Order to dodge harmful laws\n- Keleres Rider to farm predictions\n- Commander: extra actions after component actions',
          fr: '- Law’s Order pour éviter les lois gênantes\n- Keleres Rider pour exploiter les prédictions\n- Commandant : actions supplémentaires après une action de composant',
        },
        late: {
          en: '- Use the hero matching your home (Mentak: cards, Xxcha: votes, Argent: ships)\n- Score spend objectives with stockpiled trade goods',
          fr: '- Utiliser le héros correspondant à votre origine (Mentak : cartes, Xxcha : voix, Argent : vaisseaux)\n- Marquer les objectifs de dépense avec vos biens stockés',
        },
      },
    ],
  },
}
