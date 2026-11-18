/**
 * Faction guides — base game factions. Original strategy writing based on
 * common community wisdom; adapt to your table and map!
 */
import type { FactionGuide } from './types'

export const baseGuides: Record<string, FactionGuide> = {
  arborec: {
    color: '#5f9a3c',
    blurb: {
      en: 'Slow-growing plant hive that floods the board with infantry and can build from its ground forces.',
      fr: 'Ruche végétale à croissance lente qui inonde le plateau d’infanterie et peut produire depuis ses forces terrestres.',
    },
    aliases: ['arborec', 'plants', 'plantes'],
    playstyle: {
      en: 'Defensive, wide expansion. [[ability:mitosis|Mitosis]] gives a free infantry every round and your infantry/mechs have PRODUCTION, so every planet you hold becomes a mini-factory. Low commodity trade, few combat bonuses — you win by holding lots of planets and scoring steadily.',
      fr: 'Expansion large et défensive. [[ability:mitosis|Mitosis]] offre une infanterie gratuite par tour et vos infanteries/mécas ont PRODUCTION : chaque planète tenue devient une petite usine. Peu de bonus de combat — vous gagnez en tenant beaucoup de planètes et en marquant régulièrement.',
    },
    strengths: {
      en: '- Free infantry every round\n- Production everywhere (no need for many space docks)\n- Hard to dislodge from planets',
      fr: '- Infanterie gratuite à chaque tour\n- Production partout (peu besoin de docks)\n- Difficile à déloger',
    },
    weaknesses: {
      en: '- Docks cannot build infantry\n- Slow and weak ships early\n- Few tricks; predictable',
      fr: '- Les docks ne produisent pas d’infanterie\n- Vaisseaux lents et faibles au début\n- Peu de surprises ; prévisible',
    },
    keyTechs: ['lw2', 'bio', 'gd', 'st', 'hm'],
    goodSC: [4, 1, 7],
    plans: [
      {
        name: { en: 'Green carpet', fr: 'Tapis vert' },
        summary: {
          en: 'Expand everywhere with infantry, use planets as factories, score expansion objectives.',
          fr: 'S’étendre partout avec l’infanterie, utiliser les planètes comme usines, marquer les objectifs d’expansion.',
        },
        opening: {
          en: '- Take nearby planets fast with carriers full of infantry\n- Research Letani Warrior II early (production 2 on infantry)\n- Place Mitosis infantry on frontier planets',
          fr: '- Prendre vite les planètes proches avec des porte-vaisseaux pleins d’infanterie\n- Rechercher Letani Warrior II tôt (production 2 sur l’infanterie)\n- Placer l’infanterie de Mitosis sur les planètes frontalières',
        },
        mid: {
          en: '- Build ships directly at forward planets\n- Aim for Expand Borders, Corner the Market, Subdue the Galaxy\n- Unlock your commander (12 ground forces)',
          fr: '- Produire des vaisseaux directement sur les planètes avancées\n- Viser Expand Borders, Corner the Market, Subdue the Galaxy\n- Débloquer votre commandant (12 forces terrestres)',
        },
        late: {
          en: '- Hero: build everywhere at once for a final push\n- Hold Mecatol or neighbour planets for stage II points',
          fr: '- Héros : produire partout d’un coup pour l’assaut final\n- Tenir Mecatol ou des planètes voisines pour les objectifs de niveau II',
        },
      },
    ],
    beware: {
      en: 'Fleets with heavy bombardment (L1Z1X, X-89) can erase infantry stacks quickly.',
      fr: 'Les flottes à fort bombardement (L1Z1X, X-89) peuvent effacer vos piles d’infanterie.',
    },
  },

  ghost: {
    color: '#5b7fd6',
    blurb: {
      en: 'Wormhole masters who hop across the galaxy through alpha, beta and delta wormholes.',
      fr: 'Maîtres des trous de ver qui sautent d’un bout à l’autre de la galaxie via les trous de ver alpha, bêta et delta.',
    },
    aliases: ['creuss', 'ghosts', 'ghosts of creuss', 'fantômes'],
    playstyle: {
      en: 'Mobile, opportunistic. Your home system is off-board, linked by a delta wormhole to the Creuss Gate. All wormholes are adjacent for you ([[ability:quantum_entanglement|Quantum Entanglement]]), so you can strike or score anywhere wormholes reach.',
      fr: 'Mobile et opportuniste. Votre système d’origine est hors plateau, relié par un trou de ver delta à la Porte de Creuss. Tous les trous de ver sont adjacents pour vous ([[ability:quantum_entanglement|Quantum Entanglement]]) : vous frappez ou marquez partout où ils mènent.',
    },
    strengths: {
      en: '- Very safe home system\n- Unmatched mobility via wormholes\n- Good at “have units in X systems” objectives',
      fr: '- Système d’origine très sûr\n- Mobilité sans égale via les trous de ver\n- Efficace pour les objectifs « unités dans X systèmes »',
    },
    weaknesses: {
      en: '- Poor starting planets and economy\n- Depends on map wormhole placement\n- Hard to learn',
      fr: '- Planètes de départ et économie faibles\n- Dépend de la position des trous de ver\n- Difficile à maîtriser',
    },
    keyTechs: ['wg', 'gd', 'ds', 'st', 'fl'],
    goodSC: [7, 5, 8],
    plans: [
      {
        name: { en: 'Gatekeeper raider', fr: 'Pillard des portails' },
        summary: {
          en: 'Expand from the Creuss Gate, place your own wormhole tokens, and appear where nobody expects.',
          fr: 'S’étendre depuis la Porte de Creuss, placer vos propres jetons de trou de ver et surgir là où personne ne vous attend.',
        },
        opening: {
          en: '- Move out through the delta wormhole to the Gate quickly\n- Use Creuss wormhole tokens to connect to rich planets\n- Research Wormhole Generator early',
          fr: '- Sortir vite par le trou de ver delta vers la Porte\n- Utiliser vos jetons de trou de ver pour rejoindre des planètes riches\n- Rechercher Wormhole Generator tôt',
        },
        mid: {
          en: '- Score Become the Gatekeeper / outer-rim and deep-space objectives\n- Strike weakly defended planets far away via wormholes',
          fr: '- Marquer Become the Gatekeeper et les objectifs de bordure/espace profond\n- Frapper des planètes mal défendues au loin via les trous de ver',
        },
        late: {
          en: '- Hero: swap systems to bring Mecatol or an enemy home next to your fleet\n- Keep a reserve fleet at home for a surprise last-turn grab',
          fr: '- Héros : échanger des systèmes pour amener Mecatol ou une capitale ennemie à portée\n- Garder une flotte en réserve pour un coup final surprise',
        },
      },
    ],
  },

  hacan: {
    color: '#d4a62a',
    blurb: {
      en: 'Merchant lions with the best trade economy, able to deal with anyone in the galaxy.',
      fr: 'Lions marchands à l’économie commerciale imbattable, capables de traiter avec toute la galaxie.',
    },
    aliases: ['hacan', 'emirates', 'lions'],
    playstyle: {
      en: 'Economic and diplomatic. With commodities 6, [[ability:guild_ships|Guild Ships]] and free [[strategy:trade|Trade]] follows, you turn trade goods into tech, ships and influence. You profit most when the table is peaceful and trading.',
      fr: 'Économique et diplomatique. Avec 6 marchandises, [[ability:guild_ships|Guild Ships]] et le suivi gratuit de [[strategy:trade|Trade]], vous transformez les biens commerciaux en technologies, vaisseaux et influence. Vous profitez d’une table pacifique et commerçante.',
    },
    strengths: {
      en: '- Massive trade goods income\n- Can trade with every player\n- Strong spend objectives (Negotiate Trade Routes, Centralize Galactic Trade)',
      fr: '- Revenus massifs de biens commerciaux\n- Commerce avec tous les joueurs\n- Excellents objectifs de dépense (Negotiate Trade Routes, Centralize Galactic Trade)',
    },
    weaknesses: {
      en: '- Average military\n- A target for Mentak’s Pillage\n- Relies on others accepting deals',
      fr: '- Armée moyenne\n- Cible du Pillage Mentak\n- Dépend de la bonne volonté des autres',
    },
    keyTechs: ['qdn', 'pm', 'st', 'gd', 'mc'],
    goodSC: [5, 8, 3],
    plans: [
      {
        name: { en: 'Trade baron', fr: 'Baron du commerce' },
        summary: {
          en: 'Take Trade often, sell free follows and commodity swaps, and convert wealth into points.',
          fr: 'Prendre souvent Trade, vendre les suivis gratuits et les échanges de marchandises, puis convertir la richesse en points.',
        },
        opening: {
          en: '- Pick Trade round 1 and sell the free secondary for favours\n- Set up commodity swaps with several players\n- Expand to nearby industrial planets',
          fr: '- Prendre Trade au tour 1 et vendre le suivi gratuit contre des faveurs\n- Organiser des échanges de marchandises avec plusieurs joueurs\n- S’étendre vers les planètes industrielles proches',
        },
        mid: {
          en: '- Use Quantum Datahub Node to swap into Imperial when you can score\n- Pay objectives with trade goods (Trade Routes, Amass Wealth)\n- Unlock your commander: trade goods become votes',
          fr: '- Utiliser Quantum Datahub Node pour récupérer Imperial quand vous pouvez marquer\n- Payer les objectifs en biens commerciaux (Trade Routes, Amass Wealth)\n- Débloquer votre commandant : les biens commerciaux deviennent des voix',
        },
        late: {
          en: '- Buy agenda outcomes with trade goods\n- Hero: a free production for a decisive fleet',
          fr: '- Acheter les ordres du jour avec vos biens commerciaux\n- Héros : une production gratuite pour une flotte décisive',
        },
      },
    ],
  },

  jolnar: {
    color: '#4c63c4',
    blurb: {
      en: 'Brilliant but frail scientists: the fastest tech engine, with −1 on every combat roll.',
      fr: 'Scientifiques brillants mais fragiles : le moteur technologique le plus rapide, avec −1 à tous leurs jets de combat.',
    },
    aliases: ['jol-nar', 'jol nar', 'universities', 'jellyfish', 'méduses'],
    playstyle: {
      en: 'Tech-heavy. You start with 4 techs, ignore a prerequisite with [[ability:analytical|Analytical]] and can take the primary of Technology when following it ([[ability:brilliant|Brilliant]]). Use tech to win fights you’d otherwise lose — and avoid even fights.',
      fr: 'Axé technologies. Vous commencez avec 4 technologies, ignorez un prérequis ([[ability:analytical|Analytical]]) et résolvez la principale de Technology en la suivant ([[ability:brilliant|Brilliant]]). Utilisez la technologie pour gagner des combats perdus d’avance — et évitez les combats équilibrés.',
    },
    strengths: {
      en: '- Best tech speed in the game\n- E-Res Siphons punish anyone approaching\n- Flagship is a monster on 9–10',
      fr: '- Meilleure vitesse technologique du jeu\n- E-Res Siphons punit quiconque s’approche\n- Le vaisseau amiral est redoutable sur 9–10',
    },
    weaknesses: {
      en: '- Fragile: −1 to all combat rolls\n- Often targeted by aggressive neighbours\n- Low influence start',
      fr: '- Fragile : −1 à tous les jets de combat\n- Souvent ciblé par des voisins agressifs\n- Peu d’influence au départ',
    },
    keyTechs: ['ers', 'scc', 'fl', 'pa', 'asc'],
    goodSC: [7, 2, 8],
    plans: [
      {
        name: { en: 'Tech rush to science objectives', fr: 'Course aux technologies' },
        summary: {
          en: 'Research every round, score tech objectives early, defend with PDS and Siphons.',
          fr: 'Rechercher à chaque tour, marquer tôt les objectifs technologiques, se défendre avec SDP et Siphons.',
        },
        opening: {
          en: '- Take Technology or follow it every round (Brilliant)\n- Research E-Res Siphons soon to deter neighbours\n- Claim tech-specialty planets',
          fr: '- Prendre Technology ou la suivre à chaque tour (Brilliant)\n- Rechercher E-Res Siphons tôt pour dissuader les voisins\n- Prendre les planètes à spécialité',
        },
        mid: {
          en: '- Score Diversify Research, Develop Weaponry, Master the Laws of Physics\n- Get Fleet Logistics or War Sun to compensate for Fragile\n- Offer Research Agreement for peace',
          fr: '- Marquer Diversify Research, Develop Weaponry, Master the Laws of Physics\n- Obtenir Fleet Logistics ou War Sun pour compenser Fragile\n- Offrir Research Agreement en échange de la paix',
        },
        late: {
          en: '- Master the Sciences / Revolutionize Warfare\n- Hero: rebuild your tech tree for the perfect endgame tools',
          fr: '- Master the Sciences / Revolutionize Warfare\n- Héros : refaire votre arbre technologique pour les outils parfaits de fin de partie',
        },
      },
    ],
  },

  l1z1x: {
    color: '#3f6fa8',
    blurb: {
      en: 'Cybernetic conquerors with super-dreadnoughts and brutal invasions.',
      fr: 'Conquérants cybernétiques avec super-cuirassés et invasions brutales.',
    },
    aliases: ['l1', 'l1z1x', 'mindnet', 'robots'],
    playstyle: {
      en: 'Aggressive and straightforward. Strong dreadnoughts, [[ability:harrow|Harrow]] bombards every ground combat round and [[ability:assimilate|Assimilate]] steals structures. Push early, take planets by force, and snowball.',
      fr: 'Agressif et direct. Cuirassés puissants, [[ability:harrow|Harrow]] bombarde à chaque round de combat terrestre et [[ability:assimilate|Assimilate]] vole les structures. Pousser tôt, prendre les planètes de force et faire boule de neige.',
    },
    strengths: {
      en: '- Best dreadnoughts in the game\n- Devastating invasions\n- Simple to play well',
      fr: '- Meilleurs cuirassés du jeu\n- Invasions dévastatrices\n- Simple à bien jouer',
    },
    weaknesses: {
      en: '- Slow (dreadnoughts move 1 until upgraded)\n- Poor politics; everyone fears you\n- Weak to Direct Hit early',
      fr: '- Lent (cuirassés à 1 de mouvement avant amélioration)\n- Faible en politique ; tout le monde vous craint\n- Vulnérable à Direct Hit au début',
    },
    keyTechs: ['sdn2', 'gd', 'is', 'asc', 'da'],
    goodSC: [6, 1, 8],
    plans: [
      {
        name: { en: 'Dreadnought wall', fr: 'Mur de cuirassés' },
        summary: {
          en: 'Upgrade dreadnoughts, roll over a neighbour or Mecatol, and score combat and control objectives.',
          fr: 'Améliorer les cuirassés, écraser un voisin ou Mecatol, et marquer les objectifs de combat et de contrôle.',
        },
        opening: {
          en: '- Research Super-Dreadnought II (BBY) — Gravity Drive and Inheritance Systems help\n- Build 2–3 dreadnoughts plus infantry\n- Expand toward Mecatol',
          fr: '- Rechercher Super-Dreadnought II (BBY) — Gravity Drive et Inheritance Systems aident\n- Produire 2–3 cuirassés et de l’infanterie\n- S’étendre vers Mecatol',
        },
        mid: {
          en: '- Take Mecatol with Harrow support\n- Score Raise a Fleet, Intimidate Council, secrets like Occupy the Seat\n- Unlock commander (4 dreadnoughts) to ignore shields',
          fr: '- Prendre Mecatol avec le soutien de Harrow\n- Marquer Raise a Fleet, Intimidate Council, des secrets comme Occupy the Seat\n- Débloquer le commandant (4 cuirassés) pour ignorer les boucliers',
        },
        late: {
          en: '- Hero teleports your doom-stack onto the decisive system\n- Supremacy / Command an Armada',
          fr: '- Le héros téléporte votre armada sur le système décisif\n- Supremacy / Command an Armada',
        },
      },
    ],
  },

  letnev: {
    color: '#9a2a2a',
    blurb: {
      en: 'Militaristic barony with huge fleets and the ability to reroll dice in space battles.',
      fr: 'Baronnie militariste aux flottes énormes, capable de relancer ses dés en combat spatial.',
    },
    aliases: ['letnev', 'barony', 'baronnie'],
    playstyle: {
      en: 'Fleet-based control. [[ability:armada|Armada]] lets you stack 2 more ships per system, and [[ability:munitions|Munitions Reserves]] rerolls dice for trade goods. Play defensively early, then win key battles.',
      fr: 'Contrôle par la flotte. [[ability:armada|Armada]] permet 2 vaisseaux de plus par système et [[ability:munitions|Munitions Reserves]] relance les dés contre des biens commerciaux. Jouer défensif au début, puis gagner les batailles clés.',
    },
    strengths: {
      en: '- Bigger fleets than anyone\n- Reliable combat with rerolls\n- Strong flagship that repairs itself',
      fr: '- Flottes plus grandes que quiconque\n- Combat fiable grâce aux relances\n- Vaisseau amiral qui se répare',
    },
    weaknesses: {
      en: '- Low commodities and poor economy\n- Weak home system resources/influence balance\n- Few non-military tools',
      fr: '- Peu de marchandises, économie faible\n- Système d’origine modeste\n- Peu d’outils non militaires',
    },
    keyTechs: ['nes', 'l4', 'gd', 'da', 'dn2'],
    goodSC: [6, 1, 8],
    plans: [
      {
        name: { en: 'Iron fist', fr: 'Poing de fer' },
        summary: {
          en: 'Build one big fleet that wins every battle, then take Mecatol and score fleet objectives.',
          fr: 'Construire une grande flotte qui gagne chaque bataille, puis prendre Mecatol et marquer les objectifs de flotte.',
        },
        opening: {
          en: '- Expand calmly; save trade goods for Munitions\n- Get Gravity Drive and Dreadnought II\n- Keep enough fleet tokens for Armada',
          fr: '- S’étendre calmement ; garder des biens commerciaux pour Munitions\n- Obtenir Gravity Drive et Dreadnought II\n- Garder assez de jetons de flotte pour Armada',
        },
        mid: {
          en: '- Raise a Fleet / Command an Armada come naturally\n- Non-Euclidean Shielding makes your fleet nearly unkillable\n- Commander: trade goods each time you sustain damage',
          fr: '- Raise a Fleet / Command an Armada viennent naturellement\n- Non-Euclidean Shielding rend votre flotte quasi invincible\n- Commandant : un bien commercial à chaque SUSTAIN DAMAGE',
        },
        late: {
          en: '- Hero: unlimited fleet size for an all-in turn\n- Strike the leader’s home for Supremacy / Conquer the Weak',
          fr: '- Héros : flotte illimitée pour un tour décisif\n- Frapper la capitale du leader pour Supremacy / Conquer the Weak',
        },
      },
    ],
  },

  mentak: {
    color: '#d0802a',
    blurb: {
      en: 'Space pirates who pillage rich neighbours and ambush fleets with cruisers and destroyers.',
      fr: 'Pirates de l’espace qui pillent les voisins riches et tendent des embuscades avec croiseurs et destroyers.',
    },
    aliases: ['mentak', 'pirates', 'coalition'],
    playstyle: {
      en: 'Parasitic economy and skirmishes. [[ability:pillage|Pillage]] taxes neighbours with 3+ trade goods, and [[ability:ambush|Ambush]] gives free shots before space combat. Pressure others, collect protection deals, stay flexible.',
      fr: 'Économie parasitaire et escarmouches. [[ability:pillage|Pillage]] taxe les voisins à 3+ biens commerciaux, [[ability:ambush|Ambush]] offre des tirs gratuits avant le combat. Mettre la pression, vendre de la « protection », rester flexible.',
    },
    strengths: {
      en: '- Steady stolen income\n- Cheap ships punch above their weight\n- Mirror Computing doubles trade goods',
      fr: '- Revenus volés réguliers\n- Vaisseaux bon marché très efficaces\n- Mirror Computing double les biens commerciaux',
    },
    weaknesses: {
      en: '- Makes enemies easily\n- Pillage needs rich neighbours\n- Small home system',
      fr: '- Se fait facilement des ennemis\n- Pillage exige des voisins riches\n- Petit système d’origine',
    },
    keyTechs: ['mc', 'so', 'cr2', 'gd', 'st'],
    goodSC: [5, 6, 8],
    plans: [
      {
        name: { en: 'Pirate economy', fr: 'Économie pirate' },
        summary: {
          en: 'Pillage and sell Promise of Protection, convert trade goods with Mirror Computing, buy objectives.',
          fr: 'Piller et vendre Promise of Protection, convertir les biens via Mirror Computing, acheter les objectifs.',
        },
        opening: {
          en: '- Expand toward rich trading neighbours\n- Pillage whenever possible; negotiate Promise of Protection\n- Cruisers + destroyers fleet for Ambush',
          fr: '- S’étendre vers les voisins commerçants\n- Piller dès que possible ; négocier Promise of Protection\n- Flotte de croiseurs + destroyers pour Ambush',
        },
        mid: {
          en: '- Mirror Computing turns 5 trade goods into 10 value\n- Score spend objectives with doubled trade goods\n- Salvage Operations keeps your fleet topped up',
          fr: '- Mirror Computing transforme 5 biens en 10 de valeur\n- Marquer les objectifs de dépense avec des biens doublés\n- Salvage Operations entretient votre flotte',
        },
        late: {
          en: '- Hero copies enemy ships in a decisive battle\n- Commander steals promissory notes (Support for the Throne!)',
          fr: '- Le héros copie les vaisseaux ennemis lors d’une bataille décisive\n- Le commandant vole des billets à ordre (Support for the Throne !)',
        },
      },
    ],
  },

  muaat: {
    color: '#e0561d',
    blurb: {
      en: 'Fire beings that start with a war sun and forge ships from it.',
      fr: 'Êtres de feu qui commencent avec un soleil de guerre et en forgent des vaisseaux.',
    },
    aliases: ['muaat', 'embers', 'braises'],
    playstyle: {
      en: 'War-sun centric. Your starting war sun and [[ability:star_forge|Star Forge]] (strategy token → 2 fighters or a destroyer) create a mobile threat. Your home planet is tiny (4/1), so you must expand and use your war sun to take ground.',
      fr: 'Centré sur le soleil de guerre. Votre soleil de départ et [[ability:star_forge|Star Forge]] (jeton de stratégie → 2 chasseurs ou un destroyer) créent une menace mobile. Votre planète d’origine est petite (4/1) : il faut s’étendre et utiliser le soleil de guerre.',
    },
    strengths: {
      en: '- War sun from turn 1\n- Free units with Star Forge\n- Engineer a Marvel almost free',
      fr: '- Soleil de guerre dès le tour 1\n- Unités gratuites via Star Forge\n- Engineer a Marvel presque gratuit',
    },
    weaknesses: {
      en: '- One-planet home system: very poor economy\n- War sun is slow until upgraded\n- Strategy tokens are stretched thin',
      fr: '- Une seule planète d’origine : économie très faible\n- Soleil de guerre lent avant amélioration\n- Jetons de stratégie très sollicités',
    },
    keyTechs: ['pws2', 'mr', 'gd', 'st', 'hm'],
    goodSC: [1, 6, 4],
    plans: [
      {
        name: { en: 'Sunforge advance', fr: 'Avancée de la forge solaire' },
        summary: {
          en: 'Escort your war sun outward, spawn units with Star Forge, take planets and Mecatol.',
          fr: 'Escorter votre soleil de guerre vers l’extérieur, générer des unités avec Star Forge, prendre planètes et Mecatol.',
        },
        opening: {
          en: '- Use Leadership for strategy tokens to fuel Star Forge\n- Move the war sun out with carriers of infantry\n- Prototype War Sun II asap (move 3)',
          fr: '- Utiliser Leadership pour les jetons de stratégie de Star Forge\n- Sortir le soleil de guerre avec des porte-vaisseaux d’infanterie\n- Prototype War Sun II au plus vite (mouvement 3)',
        },
        mid: {
          en: '- Magmus Reactor turns supernovas into factories\n- Score Engineer a Marvel, Achieve Supremacy\n- Commander: a trade good per strategy token spent',
          fr: '- Magmus Reactor transforme les supernovas en usines\n- Marquer Engineer a Marvel, Achieve Supremacy\n- Commandant : un bien commercial par jeton de stratégie dépensé',
        },
        late: {
          en: '- Hero: annihilate a system and turn it into a supernova\n- Strike Mecatol or an enemy home for big stage II points',
          fr: '- Héros : anéantir un système et le transformer en supernova\n- Frapper Mecatol ou une capitale pour les gros objectifs de niveau II',
        },
      },
    ],
  },

  naalu: {
    color: '#2ea88f',
    blurb: {
      en: 'Telepathic serpents who always act first and slip away from danger.',
      fr: 'Serpents télépathes qui agissent toujours en premier et esquivent le danger.',
    },
    aliases: ['naalu', 'collective', 'snakes', 'serpents'],
    playstyle: {
      en: 'Tempo and evasion. [[ability:telepathic|Telepathic]] gives you initiative 0 whatever card you take, so you can choose cards for their ability, not their number. [[ability:foresight|Foresight]] lets fleets dodge attacks. Strong fighters make your fleets cheap.',
      fr: 'Tempo et esquive. [[ability:telepathic|Telepathic]] vous donne l’initiative 0 quelle que soit votre carte : choisissez-la pour son effet. [[ability:foresight|Foresight]] permet d’esquiver les attaques. Des chasseurs puissants rendent vos flottes bon marché.',
    },
    strengths: {
      en: '- Always first: grab Mecatol or objectives before others\n- Hard to pin down\n- Cheap fighter swarms',
      fr: '- Toujours premier : prendre Mecatol ou un objectif avant les autres\n- Difficile à coincer\n- Nuées de chasseurs bon marché',
    },
    weaknesses: {
      en: '- Fighters vulnerable to anti-fighter barrage\n- Low resource home\n- Foresight costs strategy tokens',
      fr: '- Chasseurs vulnérables à l’ANTI-FIGHTER BARRAGE\n- Peu de ressources chez soi\n- Foresight coûte des jetons de stratégie',
    },
    keyTechs: ['hcf2', 'ng', 'gd', 'st', 'hm'],
    goodSC: [8, 7, 3],
    plans: [
      {
        name: { en: 'First strike', fr: 'Premier coup' },
        summary: {
          en: 'Use initiative 0 to take the best tempo plays every round and score Imperial-style points.',
          fr: 'Utiliser l’initiative 0 pour les meilleurs coups de tempo à chaque tour et marquer comme avec Imperial.',
        },
        opening: {
          en: '- Pick the card you need (often Imperial or Technology) regardless of number\n- Hybrid Crystal Fighter II for a cheap fleet\n- Expand toward Mecatol',
          fr: '- Choisir la carte voulue (souvent Imperial ou Technology) sans se soucier du numéro\n- Hybrid Crystal Fighter II pour une flotte bon marché\n- S’étendre vers Mecatol',
        },
        mid: {
          en: '- Take Mecatol first in a round before anyone reacts\n- Neuroglaive drains attackers’ fleet tokens\n- Sell Gift of Prescience for big favours',
          fr: '- Prendre Mecatol en premier avant toute réaction\n- Neuroglaive draine les jetons de flotte des attaquants\n- Vendre Gift of Prescience contre de grosses faveurs',
        },
        late: {
          en: '- Hero collects everyone’s promissory notes (possibly Support for the Throne)\n- Act first on the final round to score before others',
          fr: '- Le héros récupère les billets à ordre de tous (peut-être Support for the Throne)\n- Agir en premier au dernier tour pour marquer avant les autres',
        },
      },
    ],
  },

  nekro: {
    color: '#b3232f',
    blurb: {
      en: 'Machine virus that cannot research — it steals technology by killing and predicting votes.',
      fr: 'Virus machinique qui ne peut pas rechercher — il vole les technologies en tuant et en prédisant les votes.',
    },
    aliases: ['nekro', 'virus'],
    playstyle: {
      en: 'Predatory. You gain tech by destroying enemy units ([[ability:technological_singularity|Technological Singularity]]) and by correct agenda predictions, but cannot vote. Researching gives 3 command tokens instead. Valefar Assimilators copy enemy faction techs.',
      fr: 'Prédateur. Vous gagnez des technologies en détruisant des unités ennemies ([[ability:technological_singularity|Technological Singularity]]) et en prédisant les votes, mais vous ne votez pas. Rechercher vous donne 3 jetons à la place. Les Valefar Assimilator copient les technologies de faction ennemies.',
    },
    strengths: {
      en: '- Steals powerful faction technologies\n- Command-token rich via Propagation\n- Combat makes you stronger',
      fr: '- Vole de puissantes technologies de faction\n- Riche en jetons grâce à Propagation\n- Le combat vous renforce',
    },
    weaknesses: {
      en: '- Must fight to progress\n- No votes in politics\n- Tech-objectives are hard',
      fr: '- Doit combattre pour progresser\n- Aucun vote\n- Objectifs technologiques difficiles',
    },
    keyTechs: ['vax', 'vay'],
    goodSC: [6, 1, 8],
    plans: [
      {
        name: { en: 'Assimilation war', fr: 'Guerre d’assimilation' },
        summary: {
          en: 'Hunt fights with tech-rich neighbours, steal their best faction tech, and score combat objectives.',
          fr: 'Chercher le combat avec des voisins riches en technologies, voler leur meilleure technologie de faction, marquer les objectifs de combat.',
        },
        opening: {
          en: '- Take Technology for 3 extra tokens (Propagation)\n- Pick fights you will win — even one kill steals a tech\n- Predict agendas with Galactic Threat',
          fr: '- Prendre Technology pour 3 jetons de plus (Propagation)\n- Choisir des combats gagnables — un seul kill vole une technologie\n- Prédire les ordres du jour avec Galactic Threat',
        },
        mid: {
          en: '- Place X/Y assimilators on the best enemy faction techs\n- Score action secrets (Spark a Rebellion, Destroy Their Greatest Ship)\n- Mech gets +2 against assimilated players',
          fr: '- Placer les assimilateurs X/Y sur les meilleures technologies ennemies\n- Marquer les secrets d’action (Spark a Rebellion, Destroy Their Greatest Ship)\n- Le méca gagne +2 contre les joueurs assimilés',
        },
        late: {
          en: '- Hero: wipe a tech-specialty planet and take a tech\n- Push into a home system for Conquer the Weak',
          fr: '- Héros : vider une planète à spécialité et prendre une technologie\n- Entrer dans un système d’origine pour Conquer the Weak',
        },
      },
    ],
  },

  saar: {
    color: '#b8843f',
    blurb: {
      en: 'Nomadic scavengers with mobile space-dock factories and no attachment to their homeworld.',
      fr: 'Charognards nomades avec des usines spatiales mobiles et aucun attachement à leur monde natal.',
    },
    aliases: ['saar', 'clan of saar', 'clan'],
    playstyle: {
      en: 'Wide, mobile expansion. Floating Factories move like ships and build anywhere; [[ability:scavenge|Scavenge]] gives a trade good per planet taken; [[ability:nomadic|Nomadic]] lets you score without your home.',
      fr: 'Expansion large et mobile. Les Floating Factory se déplacent comme des vaisseaux et produisent partout ; [[ability:scavenge|Scavenge]] donne un bien commercial par planète prise ; [[ability:nomadic|Nomadic]] permet de marquer sans votre système d’origine.',
    },
    strengths: {
      en: '- Production anywhere\n- Great at expansion objectives\n- Can abandon home without penalty',
      fr: '- Production partout\n- Excellent pour les objectifs d’expansion\n- Peut abandonner sa capitale sans pénalité',
    },
    weaknesses: {
      en: '- Floating Factories die if blockaded\n- Spread thin, easy to raid\n- Weak start position (asteroid home)',
      fr: '- Les usines flottantes meurent si elles sont bloquées\n- Dispersé, facile à piller\n- Départ faible',
    },
    keyTechs: ['ffac2', 'cm', 'amd', 'st', 'sar'],
    goodSC: [4, 5, 7],
    plans: [
      {
        name: { en: 'Roaming factories', fr: 'Usines itinérantes' },
        summary: {
          en: 'Push factories outward, grab many planets for Scavenge, score expansion objectives.',
          fr: 'Pousser les usines vers l’extérieur, prendre beaucoup de planètes pour Scavenge, marquer les objectifs d’expansion.',
        },
        opening: {
          en: '- Move a Floating Factory toward unclaimed planets\n- Escort it — blockade kills it\n- Use Scavenge trade goods to buy more ground forces',
          fr: '- Déplacer une usine flottante vers les planètes libres\n- L’escorter — un blocus la détruit\n- Utiliser les biens de Scavenge pour plus de forces terrestres',
        },
        mid: {
          en: '- Floating Factory II: production 7 and move 2\n- Expand Borders, Subdue the Galaxy, Populate the Outer Rim\n- Commander lets fighters/infantry appear at any dock',
          fr: '- Floating Factory II : production 7 et mouvement 2\n- Expand Borders, Subdue the Galaxy, Populate the Outer Rim\n- Le commandant fait apparaître chasseurs/infanterie à n’importe quel dock',
        },
        late: {
          en: '- Hero clears infantry and fighters next to your docks\n- Keep factories safe in asteroid fields with Chaos Mapping',
          fr: '- Le héros élimine infanterie et chasseurs près de vos docks\n- Protéger vos usines dans les astéroïdes avec Chaos Mapping',
        },
      },
    ],
  },

  sardakk: {
    color: '#a83b2b',
    blurb: {
      en: 'Insectoid warrior race with +1 on every combat roll.',
      fr: 'Race guerrière insectoïde avec +1 à tous ses jets de combat.',
    },
    aliases: ['sardakk', "n'orr", 'norr', 'bugs', 'insectes'],
    playstyle: {
      en: 'Pure aggression. [[ability:unrelenting|Unrelenting]] makes every unit better in combat. Pick fights early, take planets from neighbours and score combat and control objectives.',
      fr: 'Agression pure. [[ability:unrelenting|Unrelenting]] améliore chaque unité au combat. Engager tôt, prendre les planètes des voisins et marquer les objectifs de combat et de contrôle.',
    },
    strengths: {
      en: '- Best basic combat in the game\n- Simple and strong\n- Great ground forces with Valkyrie Particle Weave',
      fr: '- Meilleur combat de base du jeu\n- Simple et efficace\n- Excellentes forces terrestres avec Valkyrie Particle Weave',
    },
    weaknesses: {
      en: '- No economic or political tricks\n- Must keep attacking to win\n- Others ally against you',
      fr: '- Aucune astuce économique ou politique\n- Doit attaquer sans cesse pour gagner\n- Les autres s’allient contre vous',
    },
    keyTechs: ['exo2', 'vpw', 'gd', 'st', 'dn2'],
    goodSC: [6, 1, 8],
    plans: [
      {
        name: { en: 'Swarm assault', fr: 'Assaut de l’essaim' },
        summary: {
          en: 'Attack the weakest neighbour early, then roll toward Mecatol and enemy homes.',
          fr: 'Attaquer tôt le voisin le plus faible, puis avancer vers Mecatol et les capitales ennemies.',
        },
        opening: {
          en: '- Build cruisers/dreadnoughts and infantry\n- Take contested planets by force\n- Tekklar Legion is a good trade chip',
          fr: '- Produire croiseurs/cuirassés et infanterie\n- Prendre de force les planètes disputées\n- Tekklar Legion est une bonne monnaie d’échange',
        },
        mid: {
          en: '- Exotrireme II to delete enemy ships\n- Commander: commit troops from adjacent planets\n- Score Spark a Rebellion, Darken the Skies, Conquer the Weak',
          fr: '- Exotrireme II pour supprimer les vaisseaux ennemis\n- Commandant : engager des troupes depuis les planètes adjacentes\n- Marquer Spark a Rebellion, Darken the Skies, Conquer the Weak',
        },
        late: {
          en: '- Hero: surprise invasion landing straight on planets\n- Keep momentum — don’t let the table regroup',
          fr: '- Héros : invasion surprise directement sur les planètes\n- Garder l’élan — ne pas laisser la table se réorganiser',
        },
      },
    ],
  },

  sol: {
    color: '#2d63ad',
    blurb: {
      en: 'The human Federation: extra command tokens and powerful carriers and infantry.',
      fr: 'La Fédération humaine : jetons de commandement supplémentaires et porte-vaisseaux et infanterie puissants.',
    },
    aliases: ['sol', 'federation', 'humans', 'fédération', 'humains'],
    playstyle: {
      en: 'Solid all-rounder, ideal for beginners. [[ability:versatile|Versatile]] gives an extra token each round and [[ability:orbital_drop|Orbital Drop]] puts 2 infantry anywhere you control. Advanced Carriers and Spec Ops make efficient armies.',
      fr: 'Polyvalent et solide, idéal pour débuter. [[ability:versatile|Versatile]] donne un jeton de plus par tour et [[ability:orbital_drop|Orbital Drop]] dépose 2 infanteries sur une de vos planètes. Advanced Carrier et Spec Ops forment une armée efficace.',
    },
    strengths: {
      en: '- More actions than others\n- Strong, flexible ground game\n- Easy to play',
      fr: '- Plus d’actions que les autres\n- Jeu terrestre fort et flexible\n- Facile à jouer',
    },
    weaknesses: {
      en: '- No standout trick\n- Average economy\n- Military Support helps rivals',
      fr: '- Pas d’atout spectaculaire\n- Économie moyenne\n- Military Support aide vos rivaux',
    },
    keyTechs: ['ac2', 'so2', 'gd', 'st', 'hm'],
    goodSC: [1, 6, 8],
    plans: [
      {
        name: { en: 'Steady federation', fr: 'Fédération méthodique' },
        summary: {
          en: 'Out-act everyone with extra tokens, expand efficiently, and adapt to the objectives revealed.',
          fr: 'Surpasser tout le monde en actions grâce aux jetons, s’étendre efficacement et s’adapter aux objectifs révélés.',
        },
        opening: {
          en: '- Expand with Advanced Carriers full of infantry\n- Research Advanced Carrier II (capacity 8)\n- Use Orbital Drop to defend or grab planets',
          fr: '- S’étendre avec des Advanced Carrier pleins d’infanterie\n- Rechercher Advanced Carrier II (capacité 8)\n- Utiliser Orbital Drop pour défendre ou prendre des planètes',
        },
        mid: {
          en: '- Unlock commander (12 resources) for free defenders\n- Spec Ops II infantry are hard to kill\n- Contest Mecatol',
          fr: '- Débloquer le commandant (12 ressources) pour des défenseurs gratuits\n- L’infanterie Spec Ops II est coriace\n- Disputer Mecatol',
        },
        late: {
          en: '- Hero: take all your tokens back for a second wave of actions\n- Use the extra tempo in the final round to score',
          fr: '- Héros : reprendre tous vos jetons pour une seconde vague d’actions\n- Profiter du tempo supplémentaire au dernier tour pour marquer',
        },
      },
    ],
  },

  winnu: {
    color: '#8f4ea6',
    blurb: {
      en: 'Heirs of the Lazax who claim Mecatol Rex for free and boost their strategy cards.',
      fr: 'Héritiers des Lazax qui revendiquent gratuitement Mecatol Rex et renforcent leurs cartes stratégie.',
    },
    aliases: ['winnu'],
    playstyle: {
      en: 'Mecatol-focused politics. [[ability:blood_ties|Blood Ties]] removes the custodians cost and [[ability:reclamation|Reclamation]] puts a dock and PDS on Mecatol. Your commander gives +2 at Mecatol, home and legendary systems.',
      fr: 'Politique centrée sur Mecatol. [[ability:blood_ties|Blood Ties]] supprime le coût des Gardiens et [[ability:reclamation|Reclamation]] place un dock et un SDP sur Mecatol. Votre commandant donne +2 à Mecatol, chez vous et dans les systèmes légendaires.',
    },
    strengths: {
      en: '- Cheap Mecatol and custodians point\n- Lazax Gate Folding gives Mecatol access from wormholes\n- Strong hero (any primary)',
      fr: '- Mecatol et le point des Gardiens bon marché\n- Lazax Gate Folding donne accès à Mecatol par trou de ver\n- Héros puissant (n’importe quelle principale)',
    },
    weaknesses: {
      en: '- Weak home and economy\n- Mecatol makes you a target\n- Few faction combat bonuses',
      fr: '- Origine et économie faibles\n- Mecatol fait de vous une cible\n- Peu de bonus de combat',
    },
    keyTechs: ['lgf', 'htp', 'gd', 'st', 'pds2'],
    goodSC: [8, 3, 2],
    plans: [
      {
        name: { en: 'Throne of the Lazax', fr: 'Trône des Lazax' },
        summary: {
          en: 'Take and fortify Mecatol early, score Imperial points and use politics to stay safe.',
          fr: 'Prendre et fortifier Mecatol tôt, marquer avec Imperial et utiliser la politique pour rester en sécurité.',
        },
        opening: {
          en: '- Rush Mecatol (no 6-influence cost) and take the custodians point\n- Reclamation: free PDS + space dock there\n- Get Lazax Gate Folding for wormhole access',
          fr: '- Foncer sur Mecatol (pas de coût de 6 influence) et prendre le point des Gardiens\n- Reclamation : SDP + dock gratuits\n- Obtenir Lazax Gate Folding',
        },
        mid: {
          en: '- Take Imperial for an extra VP each time\n- Fortify: PDS II, ships with commander +2\n- Sell Acquiescence for alliances',
          fr: '- Prendre Imperial pour un PV de plus à chaque fois\n- Fortifier : PDS II, vaisseaux avec le +2 du commandant\n- Vendre Acquiescence contre des alliances',
        },
        late: {
          en: '- Hero: resolve the primary you need (often Imperial again)\n- Occupy the Seat of the Empire secret',
          fr: '- Héros : résoudre la principale voulue (souvent Imperial à nouveau)\n- Secret Occupy the Seat of the Empire',
        },
      },
    ],
  },

  xxcha: {
    color: '#4f9c5c',
    blurb: {
      en: 'Peaceful turtle diplomats with long-range space cannons and agenda control.',
      fr: 'Tortues diplomates pacifiques aux canons longue portée et maîtres des ordres du jour.',
    },
    aliases: ['xxcha', 'turtles', 'tortues'],
    playstyle: {
      en: 'Defensive diplomacy. [[ability:peace_accords|Peace Accords]] claims empty planets when Diplomacy is used, [[ability:quash|Quash]] replaces agendas, and your flagship/mech shoot adjacent systems. Make yourself an unattractive target and win through politics and points.',
      fr: 'Diplomatie défensive. [[ability:peace_accords|Peace Accords]] prend des planètes vides avec Diplomacy, [[ability:quash|Quash]] remplace les ordres du jour, et votre vaisseau amiral et méca tirent dans les systèmes adjacents. Ne pas être une cible attrayante et gagner par la politique.',
    },
    strengths: {
      en: '- Lots of votes and agenda control\n- Very hard to attack\n- Free expansion via Peace Accords',
      fr: '- Beaucoup de voix et contrôle des ordres du jour\n- Très difficile à attaquer\n- Expansion gratuite via Peace Accords',
    },
    weaknesses: {
      en: '- Slow ships, little offense\n- Needs Diplomacy to be played\n- Can be ignored then outscored',
      fr: '- Vaisseaux lents, peu offensif\n- Dépend du jeu de Diplomacy\n- Peut être ignoré puis dépassé',
    },
    keyTechs: ['nf', 'it', 'pds2', 'gd', 'pi'],
    goodSC: [2, 3, 8],
    plans: [
      {
        name: { en: 'Galactic senate', fr: 'Sénat galactique' },
        summary: {
          en: 'Expand with Peace Accords, defend with PDS and flagship, dominate agendas and score steadily.',
          fr: 'S’étendre avec Peace Accords, défendre avec SDP et vaisseau amiral, dominer les ordres du jour et marquer régulièrement.',
        },
        opening: {
          en: '- Pick Diplomacy (or benefit when others play it) to grab free planets\n- Collect high-influence planets\n- PDS on border planets',
          fr: '- Prendre Diplomacy (ou profiter quand d’autres la jouent) pour obtenir des planètes gratuites\n- Collecter des planètes à forte influence\n- SDP sur les planètes frontalières',
        },
        mid: {
          en: '- Commander: +1 vote per planet; Quash bad agendas\n- Nullification Field stops attackers’ turns\n- Score influence objectives (Sway the Council, Manipulate Galactic Law)',
          fr: '- Commandant : +1 voix par planète ; Quash sur les mauvais ordres du jour\n- Nullification Field stoppe les attaquants\n- Marquer les objectifs d’influence (Sway the Council, Manipulate Galactic Law)',
        },
        late: {
          en: '- Hero: planets count resources + influence for everything\n- Pass key laws and riders for the final points',
          fr: '- Héros : vos planètes comptent ressources + influence pour tout\n- Faire passer les lois et riders clés pour les derniers points',
        },
      },
    ],
  },

  yin: {
    color: '#a69a7c',
    blurb: {
      en: 'Fanatical clone brotherhood that converts enemy infantry and sacrifices ships.',
      fr: 'Confrérie fanatique de clones qui convertit l’infanterie ennemie et sacrifie ses vaisseaux.',
    },
    aliases: ['yin', 'brotherhood', 'confrérie'],
    playstyle: {
      en: 'Tricky combat. [[ability:indoctrination|Indoctrination]] converts enemy infantry for 2 influence and [[ability:devotion|Devotion]] trades your cruisers/destroyers for hits. Your flagship destroys everything when it dies. Play opportunistically and use influence for combat.',
      fr: 'Combat retors. [[ability:indoctrination|Indoctrination]] convertit l’infanterie ennemie pour 2 d’influence et [[ability:devotion|Devotion]] échange croiseurs/destroyers contre des touches. Votre vaisseau amiral détruit tout en mourant. Jouer de façon opportuniste.',
    },
    strengths: {
      en: '- Great at taking defended planets\n- Devotion guarantees hits\n- Yin Spinner gives free infantry',
      fr: '- Excellent pour prendre des planètes défendues\n- Devotion garantit des touches\n- Yin Spinner donne de l’infanterie gratuite',
    },
    weaknesses: {
      en: '- Sacrifices thin out your fleet\n- Weak economy\n- Considered one of the weaker factions',
      fr: '- Les sacrifices réduisent votre flotte\n- Économie faible\n- Souvent considérée parmi les plus faibles',
    },
    keyTechs: ['yso', 'ic', 'gd', 'st', 'inf2'],
    goodSC: [4, 6, 2],
    plans: [
      {
        name: { en: 'Zealot conversion', fr: 'Conversion zélée' },
        summary: {
          en: 'Take planets through Indoctrination and infantry floods, using sacrifices to win key fights.',
          fr: 'Prendre les planètes par Indoctrination et marées d’infanterie, en sacrifiant pour gagner les combats clés.',
        },
        opening: {
          en: '- Yin Spinner Omega early for free infantry\n- Target planets defended by 1–2 infantry\n- Keep influence ready for Indoctrination',
          fr: '- Yin Spinner Omega tôt pour l’infanterie gratuite\n- Cibler les planètes défendues par 1–2 infanteries\n- Garder de l’influence pour Indoctrination',
        },
        mid: {
          en: '- Impulse Core + Devotion to snipe big ships\n- Commander helps with tech prerequisites\n- Score Stake Your Claim / expansion objectives',
          fr: '- Impulse Core + Devotion pour abattre les gros vaisseaux\n- Le commandant aide pour les prérequis\n- Marquer Stake Your Claim / objectifs d’expansion',
        },
        late: {
          en: '- Hero: drop infantry on 3 enemy planets at once\n- Flagship as a deterrent: attacking it costs the enemy their fleet',
          fr: '- Héros : débarquer de l’infanterie sur 3 planètes ennemies à la fois\n- Vaisseau amiral dissuasif : l’attaquer coûte sa flotte à l’ennemi',
        },
      },
    ],
  },

  yssaril: {
    color: '#6f9a3a',
    blurb: {
      en: 'Sneaky spies with unlimited action cards and the ability to stall indefinitely.',
      fr: 'Espions sournois aux cartes action illimitées, capables de temporiser indéfiniment.',
    },
    aliases: ['yssaril', 'tribes', 'goblins', 'tribus'],
    playstyle: {
      en: 'Card advantage and timing. [[ability:crafty|Crafty]] removes the hand limit, [[ability:scheming|Scheming]] filters draws, and [[ability:stall_tactics|Stall Tactics]] lets you “pass” turns to act last. Your agent copies everyone’s agents.',
      fr: 'Avantage de cartes et timing. [[ability:crafty|Crafty]] supprime la limite de main, [[ability:scheming|Scheming]] filtre vos pioches et [[ability:stall_tactics|Stall Tactics]] permet de « passer » des tours pour agir en dernier. Votre agent copie tous les autres.',
    },
    strengths: {
      en: '- Huge hand of action cards\n- Acts last when it matters\n- One of the strongest factions overall',
      fr: '- Énorme main de cartes action\n- Agit en dernier quand ça compte\n- L’une des factions les plus fortes',
    },
    weaknesses: {
      en: '- Needs card knowledge\n- Average military\n- Tables gang up on a full hand',
      fr: '- Demande de connaître les cartes\n- Armée moyenne\n- La table se ligue contre une grosse main',
    },
    keyTechs: ['mi', 'tp', 'nm', 'gd', 'st'],
    goodSC: [3, 7, 8],
    plans: [
      {
        name: { en: 'Spymaster', fr: 'Maître espion' },
        summary: {
          en: 'Hoard action cards, out-wait opponents with Stall Tactics, and win at the last moment.',
          fr: 'Accumuler les cartes action, attendre les adversaires avec Stall Tactics et gagner au dernier moment.',
        },
        opening: {
          en: '- Take Politics for cards; Neural Motivator for more draws\n- Expand normally while building a hand\n- Use your agent as a copy of the best agent at the table',
          fr: '- Prendre Politics pour les cartes ; Neural Motivator pour piocher plus\n- S’étendre normalement en constituant une main\n- Utiliser votre agent comme copie du meilleur agent',
        },
        mid: {
          en: '- Stall to act after everyone (block, punish, grab)\n- Mageon Implants steals key cards\n- Commander (7 cards) reveals others’ secrets',
          fr: '- Temporiser pour agir après tout le monde (bloquer, punir, saisir)\n- Mageon Implants vole les cartes clés\n- Le commandant (7 cartes) révèle les secrets des autres',
        },
        late: {
          en: '- Score Form a Spy Network and action secrets\n- Hero: take the best card from each player',
          fr: '- Marquer Form a Spy Network et les secrets d’action\n- Héros : prendre la meilleure carte de chaque joueur',
        },
      },
    ],
  },
}
