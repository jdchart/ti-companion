/** Strategy cards and generic units: richer hand-written entries. */
import type { L } from '../types'

export interface RichSummary {
  title?: L
  summary: L
  body?: L
  related?: string[]
}

export const strategySummaries: Record<string, RichSummary> = {
  leadership: {
    summary: {
      en: 'Initiative 1. Gain 3 command tokens, and buy more at 3 influence each. Others may buy tokens with influence too.',
      fr: 'Initiative 1. Gagnez 3 jetons de commandement et achetez-en d’autres à 3 d’influence pièce. Les autres peuvent aussi en acheter avec de l’influence.',
    },
    body: {
      en: '**Primary:** gain 3 [[command-tokens]], then spend any amount of [[influence]] to gain 1 more token per 3 influence.\n\n**Secondary:** spend influence to gain 1 token per 3 influence spent (no strategy token required).\n\nLeadership acts first in the round, which is useful to grab a contested system or score an action-phase secret early. The tokens fuel more tactical actions in a long round.',
      fr: '**Principale :** gagnez 3 [[command-tokens|jetons de commandement]], puis dépensez autant d’[[influence]] que voulu pour 1 jeton par tranche de 3.\n\n**Secondaire :** dépensez de l’influence pour 1 jeton par tranche de 3 (sans jeton de stratégie).\n\nLeadership joue en premier dans le tour, pratique pour prendre un système disputé. Les jetons permettent plus d’actions tactiques.',
    },
    related: ['command-tokens', 'initiative-order'],
  },
  diplomacy: {
    summary: {
      en: 'Initiative 2. Lock down one of your systems (others place a token there) and ready 2 planets. Followers ready 2 planets.',
      fr: 'Initiative 2. Protégez un de vos systèmes (les autres y placent un jeton) et redressez 2 planètes. Les suiveurs redressent 2 planètes.',
    },
    body: {
      en: '**Primary:** choose a system (not Mecatol Rex) with a planet you control; every other player puts a command token from their reinforcements there, so they cannot activate it this round. Then ready up to 2 of your planets.\n\n**Secondary:** spend a strategy token to ready up to 2 of your exhausted planets.\n\nGreat defensively when a big fleet threatens your home, and the readying gives you a second use of your best planets.',
      fr: '**Principale :** choisissez un système (hors Mecatol Rex) contenant une de vos planètes ; chaque autre joueur y place un jeton de commandement de ses renforts : il ne pourra pas l’activer ce tour-ci. Puis redressez jusqu’à 2 de vos planètes.\n\n**Secondaire :** dépensez un jeton de stratégie pour redresser jusqu’à 2 de vos planètes épuisées.\n\nExcellent en défense face à une grosse flotte, et le redressement permet de réutiliser vos meilleures planètes.',
    },
    related: ['exhausted', 'command-tokens'],
  },
  politics: {
    summary: {
      en: 'Initiative 3. Pass the [[speaker]] token to someone else, draw 2 action cards and arrange the top 2 agendas. Followers draw 2 action cards.',
      fr: 'Initiative 3. Donnez le jeton [[speaker|Orateur]] à un autre joueur, piochez 2 cartes action et organisez les 2 premiers ordres du jour. Les suiveurs piochent 2 cartes action.',
    },
    body: {
      en: '**Primary:** choose a player other than the current speaker to become [[speaker]], draw 2 [[action-cards]], and look at the top 2 [[agendas]] — put each on the top or bottom of the deck.\n\n**Secondary:** spend a strategy token to draw 2 action cards.\n\nControlling the speaker decides who picks strategy cards first next round and breaks agenda ties.',
      fr: '**Principale :** choisissez un joueur (autre que l’Orateur actuel) qui devient [[speaker|Orateur]], piochez 2 [[action-cards|cartes action]] et regardez les 2 premiers [[agendas|ordres du jour]] — placez chacun dessus ou dessous le paquet.\n\n**Secondaire :** dépensez un jeton de stratégie pour piocher 2 cartes action.\n\nL’Orateur choisit en premier sa carte stratégie au tour suivant et départage les votes.',
    },
    related: ['speaker', 'agenda-phase'],
  },
  construction: {
    summary: {
      en: 'Initiative 4. Place a PDS or space dock, plus another PDS. Followers place one structure but leave a command token in that system.',
      fr: 'Initiative 4. Placez un SDP ou un dock spatial, plus un autre SDP. Les suiveurs placent une structure mais laissent un jeton de commandement dans le système.',
    },
    body: {
      en: '**Primary:** place 1 [[unit:pds|PDS]] or 1 [[unit:spacedock|space dock]] on a planet you control, then place 1 more PDS on a planet you control.\n\n**Secondary:** spend a strategy token and place it in a system: you may place 1 PDS or 1 space dock on a planet you control there. Careful — that token blocks you from activating the system this round.\n\nUseful for structure objectives and a second production site.',
      fr: '**Principale :** placez 1 [[unit:pds|SDP]] ou 1 [[unit:spacedock|dock spatial]] sur une planète que vous contrôlez, puis 1 SDP supplémentaire.\n\n**Secondaire :** dépensez un jeton de stratégie et placez-le dans un système : vous pouvez y placer 1 SDP ou 1 dock spatial sur une de vos planètes. Attention : ce jeton vous empêche d’activer ce système ce tour-ci.\n\nUtile pour les objectifs de structures et pour un second site de production.',
    },
    related: ['structures', 'production'],
  },
  trade: {
    summary: {
      en: 'Initiative 5. Gain 3 trade goods, refill your commodities, and let chosen players follow for free.',
      fr: 'Initiative 5. Gagnez 3 biens commerciaux, rechargez vos marchandises et laissez les joueurs choisis suivre gratuitement.',
    },
    body: {
      en: '**Primary:** gain 3 [[trade-goods]], replenish your [[commodities]], and choose any players: they may follow without spending a strategy token.\n\n**Secondary:** spend a strategy token to replenish your commodities.\n\nThe free-follow choice is a strong bargaining chip: trade it for votes, peace or goods.',
      fr: '**Principale :** gagnez 3 [[trade-goods|biens commerciaux]], rechargez vos [[commodities|marchandises]] et choisissez des joueurs : ils peuvent suivre sans dépenser de jeton.\n\n**Secondaire :** dépensez un jeton de stratégie pour recharger vos marchandises.\n\nLe suivi gratuit est une excellente monnaie d’échange : votes, paix ou marchandises.',
    },
    related: ['commodities', 'trade-goods', 'transactions'],
  },
  warfare: {
    summary: {
      en: 'Initiative 6. Pick a command token back up from the board and rearrange your tokens. Followers build at one space dock.',
      fr: 'Initiative 6. Reprenez un jeton de commandement du plateau et réorganisez vos jetons. Les suiveurs produisent à un dock spatial.',
    },
    body: {
      en: '**Primary:** remove 1 of your command tokens from the board (gain it back), then redistribute the tokens on your command sheet.\n\n**Secondary:** spend a strategy token to use the [[production|PRODUCTION]] of one space dock in your home system (without activating it).\n\nRemoving a token lets you activate the same system twice in one round — the classic way to move a fleet two steps.',
      fr: '**Principale :** retirez 1 de vos jetons de commandement du plateau (vous le récupérez), puis réorganisez les jetons de votre fiche de commandement.\n\n**Secondaire :** dépensez un jeton de stratégie pour utiliser la [[production|PRODUCTION]] d’un dock spatial de votre système d’origine (sans l’activer).\n\nRetirer un jeton permet d’activer deux fois le même système dans le tour : idéal pour avancer une flotte deux fois.',
    },
    related: ['command-tokens', 'tactical-action'],
  },
  technology: {
    summary: {
      en: 'Initiative 7. Research 1 technology for free, and a second for 6 resources. Followers research for 4 resources.',
      fr: 'Initiative 7. Recherchez 1 technologie gratuitement, et une seconde pour 6 ressources. Les suiveurs recherchent pour 4 ressources.',
    },
    body: {
      en: '**Primary:** research 1 [[technology]]; then you may spend 6 [[resources]] to research another.\n\n**Secondary:** spend a strategy token and 4 resources to research 1 technology.\n\nThe main way to gain techs. Plan your [[prerequisites]] and [[tech-specialty|tech specialties]] in advance.',
      fr: '**Principale :** recherchez 1 [[technology|technologie]] ; vous pouvez ensuite dépenser 6 [[resources|ressources]] pour en rechercher une autre.\n\n**Secondaire :** dépensez un jeton de stratégie et 4 ressources pour rechercher 1 technologie.\n\nLe moyen principal d’obtenir des technologies. Anticipez [[prerequisites|prérequis]] et [[tech-specialty|spécialités]].',
    },
    related: ['technology', 'prerequisites'],
  },
  imperial: {
    summary: {
      en: 'Initiative 8. Score a public objective immediately, then gain 1 VP if you hold Mecatol Rex (or draw a secret). Followers draw a secret objective.',
      fr: 'Initiative 8. Marquez immédiatement un objectif public, puis gagnez 1 PV si vous tenez Mecatol Rex (sinon piochez un secret). Les suiveurs piochent un objectif secret.',
    },
    body: {
      en: '**Primary:** immediately score 1 public objective you qualify for; then gain 1 [[victory-points|VP]] if you control [[mecatol-rex|Mecatol Rex]], otherwise draw a [[objectives|secret objective]].\n\n**Secondary:** spend a strategy token to draw 1 secret objective.\n\nOften the strongest card for points: it allows a second public objective in the same round.',
      fr: '**Principale :** marquez immédiatement 1 objectif public dont vous remplissez les conditions ; puis gagnez 1 [[victory-points|PV]] si vous contrôlez [[mecatol-rex|Mecatol Rex]], sinon piochez un [[objectives|objectif secret]].\n\n**Secondaire :** dépensez un jeton de stratégie pour piocher 1 objectif secret.\n\nSouvent la meilleure carte pour les points : elle permet de marquer un second objectif public dans le même tour.',
    },
    related: ['objectives', 'mecatol-rex'],
  },
}

export const unitSummaries: Record<string, RichSummary> = {
  carrier: {
    summary: { en: 'Cheap transport ship (capacity 4). The backbone of moving fighters and ground forces.', fr: 'Vaisseau de transport bon marché (capacité 4). Indispensable pour déplacer chasseurs et forces terrestres.' },
    body: { en: 'Upgrade: [[tech:cv2|Carrier II]] (move 2, capacity 6).', fr: 'Amélioration : [[tech:cv2|Carrier II]] (mouvement 2, capacité 6).' },
  },
  carrier2: { summary: { en: 'Upgraded carrier: move 2, capacity 6.', fr: 'Porte-vaisseaux amélioré : mouvement 2, capacité 6.' } },
  cruiser: {
    summary: { en: 'Fast, cost-efficient warship (move 2, hits on 7).', fr: 'Navire de guerre rapide et rentable (mouvement 2, touche sur 7).' },
    body: { en: 'Upgrade: [[tech:cr2|Cruiser II]] (move 3, hits on 6, capacity 1).', fr: 'Amélioration : [[tech:cr2|Cruiser II]] (mouvement 3, touche sur 6, capacité 1).' },
  },
  cruiser2: { summary: { en: 'Upgraded cruiser: move 3, hits on 6, carries 1.', fr: 'Croiseur amélioré : mouvement 3, touche sur 6, transporte 1.' } },
  destroyer: {
    summary: { en: 'Cheapest ship (1 resource); its [[anti-fighter-barrage]] screens against fighters.', fr: 'Le vaisseau le moins cher (1 ressource) ; son [[anti-fighter-barrage]] protège contre les chasseurs.' },
    body: { en: 'Upgrade: [[tech:dd2|Destroyer II]].', fr: 'Amélioration : [[tech:dd2|Destroyer II]].' },
  },
  destroyer2: { summary: { en: 'Upgraded destroyer: hits on 8 with a strong anti-fighter barrage.', fr: 'Destroyer amélioré : touche sur 8 avec un fort ANTI-FIGHTER BARRAGE.' } },
  dreadnought: {
    summary: { en: 'Heavy ship with [[sustain-damage]] and [[bombardment]]. Soaks hits and supports invasions.', fr: 'Vaisseau lourd avec [[sustain-damage]] et [[bombardment]]. Encaisse les touches et soutient les invasions.' },
    body: { en: 'Upgrade: [[tech:dn2|Dreadnought II]] (move 2, immune to Direct Hit).', fr: 'Amélioration : [[tech:dn2|Dreadnought II]] (mouvement 2, immunisé à Direct Hit).' },
  },
  dreadnought2: { summary: { en: 'Upgraded dreadnought: move 2, hits on 5, immune to Direct Hit.', fr: 'Cuirassé amélioré : mouvement 2, touche sur 5, immunisé à Direct Hit.' } },
  fighter: {
    summary: { en: 'Two for 1 resource. Must be carried by ships with capacity; great hit fodder.', fr: 'Deux pour 1 ressource. Doivent être transportés ; excellente chair à canon.' },
    body: { en: 'Upgrade: [[tech:ff2|Fighter II]] lets them move on their own.', fr: 'Amélioration : [[tech:ff2|Fighter II]] leur permet de se déplacer seuls.' },
  },
  fighter2: { summary: { en: 'Upgraded fighter: hits on 8 and moves without transport.', fr: 'Chasseur amélioré : touche sur 8 et se déplace sans transport.' } },
  flagship: {
    summary: { en: 'Each faction’s unique capital ship (cost 8, one per player) with a special ability.', fr: 'Le vaisseau unique de chaque faction (coût 8, un seul par joueur) avec une capacité spéciale.' },
  },
  infantry: {
    summary: { en: 'Two for 1 resource. Ground forces used to take and hold planets.', fr: 'Deux pour 1 ressource. Forces terrestres pour prendre et tenir les planètes.' },
    body: { en: 'Upgrade: [[tech:inf2|Infantry II]].', fr: 'Amélioration : [[tech:inf2|Infantry II]].' },
  },
  infantry2: { summary: { en: 'Upgraded infantry: hits on 7 and may return home after dying.', fr: 'Infanterie améliorée : touche sur 7 et peut revenir après sa mort.' } },
  mech: {
    summary: { en: 'Prophecy of Kings ground unit (cost 2) with [[sustain-damage]] and a faction-specific ability.', fr: 'Unité terrestre de La Prophétie des Rois (coût 2) avec [[sustain-damage]] et une capacité propre à la faction.' },
    body: { en: 'Many mechs have a [[deploy|DEPLOY]] ability that places them without production.', fr: 'Beaucoup de mécas ont une capacité [[deploy|DEPLOY]] qui les place sans production.' },
  },
  pds: {
    summary: { en: 'Planetary defense structure with [[space-cannon]] and [[planetary-shield]].', fr: 'Structure de défense planétaire avec [[space-cannon]] et [[planetary-shield]].' },
    body: { en: 'Max 6 on the board. Upgrade: [[tech:pds2|PDS II]].', fr: '6 maximum sur le plateau. Amélioration : [[tech:pds2|PDS II]].' },
  },
  pds2: { summary: { en: 'Upgraded PDS: hits on 5 and fires into adjacent systems.', fr: 'SDP amélioré : touche sur 5 et tire dans les systèmes adjacents.' } },
  spacedock: {
    summary: { en: 'Structure that lets you build units ([[production|PRODUCTION]] = planet resources + 2).', fr: 'Structure permettant de produire des unités ([[production|PRODUCTION]] = ressources de la planète + 2).' },
    body: { en: 'Max 3 on the board; also stores up to 3 fighters. Upgrade: [[tech:sd2|Space Dock II]].', fr: '3 maximum ; héberge aussi 3 chasseurs. Amélioration : [[tech:sd2|Space Dock II]].' },
  },
  spacedock2: { summary: { en: 'Upgraded space dock: PRODUCTION = resources + 4.', fr: 'Dock amélioré : PRODUCTION = ressources + 4.' } },
  warsun: {
    summary: { en: 'Colossal ship requiring the [[tech:ws|War Sun]] tech: 3 dice, sustain damage, bombardment, ignores planetary shields.', fr: 'Vaisseau colossal nécessitant la techno [[tech:ws|War Sun]] : 3 dés, encaisse, bombarde, ignore les boucliers.' },
  },
  nowarsun: { summary: { en: 'War sun placeholder before researching the technology.', fr: 'Soleil de guerre avant la recherche de la technologie.' } },
  cavalry1: { summary: { en: 'Stats lent by the Nomad’s “The Cavalry” promissory note.', fr: 'Caractéristiques prêtées par le billet « The Cavalry » des Nomad.' } },
  cavalry2: { summary: { en: 'Upgraded stats lent by “The Cavalry” once Nomad have Memoria II.', fr: 'Caractéristiques améliorées prêtées par « The Cavalry » quand les Nomad ont Memoria II.' } },
}
