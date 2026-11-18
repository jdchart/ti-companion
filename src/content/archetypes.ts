/**
 * Generic game-plan ARCHETYPES (original writing). The catalogue lets players
 * pick a plan first and then a faction that suits it; plan suggestions
 * (objectives, techs) are derived from here.
 *
 * fit: 3 = signature faction for this plan, 2 = strong fit, 1 = workable.
 */
import type { Expansion, L } from './types'

export interface Archetype {
  id: string
  /** key of the illustration in components/Illustrations (ArchetypeIcon) */
  color: string
  name: L
  tagline: L
  summary: L
  opening: L
  mid: L
  late: L
  /** wiki keys: public:x / secret:y */
  objectives: string[]
  techs: string[]
  sc: number[]
  factions: { id: string; fit: 1 | 2 | 3 }[]
  /** what tends to beat this plan */
  risks: L
  needs?: Expansion[]
}

export const archetypes: Archetype[] = [
  {
    id: 'trade',
    color: '#d6a73c',
    name: { en: 'Merchant empire', fr: 'Empire marchand' },
    tagline: { en: 'Turn trade goods into points', fr: 'Transformer les biens commerciaux en points' },
    summary: {
      en: 'Out-earn the table. Generate [[trade-goods]] through [[commodities]], deals and the [[strategy:trade|Trade]] card, then cash them in on "spend" objectives while staying everyone’s useful partner.',
      fr: 'Gagner plus que tout le monde. Produire des [[trade-goods|biens commerciaux]] via les [[commodities|marchandises]], les accords et la carte [[strategy:trade|Trade]], puis les convertir en objectifs « de dépense » en restant le partenaire utile de tous.',
    },
    opening: {
      en: '- Take [[strategy:trade|Trade]] early; sell or gift its secondary to buy goodwill\n- Set up commodity swaps with two different players\n- Expand toward high-resource planets you can defend cheaply',
      fr: '- Prendre [[strategy:trade|Trade]] tôt ; vendre ou offrir son secondaire pour acheter de la bienveillance\n- Mettre en place des échanges de marchandises avec deux joueurs différents\n- S’étendre vers des planètes riches en ressources faciles à défendre',
    },
    mid: {
      en: '- Score spend objectives every round instead of fighting for board ones\n- Keep a reserve of trade goods for votes and emergencies\n- Buy protection: a neighbour’s support promissory note is cheaper than a fleet',
      fr: '- Marquer des objectifs de dépense à chaque tour plutôt que de se battre pour ceux du plateau\n- Garder une réserve de biens commerciaux pour les votes et les urgences\n- Acheter de la protection : un billet de soutien d’un voisin coûte moins cher qu’une flotte',
    },
    late: {
      en: '- Stockpile for the big spend objectives (16 resources, 10 trade goods)\n- Use wealth to swing key [[agendas]]\n- Build one decisive fleet only when a point depends on it',
      fr: '- Accumuler pour les gros objectifs de dépense (16 ressources, 10 biens commerciaux)\n- Utiliser votre richesse pour faire basculer les [[agendas|ordres du jour]] clés\n- Ne construire une flotte décisive que lorsqu’un point en dépend',
    },
    objectives: ['public:trade_routes', 'public:amass_wealth', 'public:monument', 'public:sway_council', 'public:centralize_trade', 'public:golden_age', 'public:vast_reserves', 'secret:sb', 'secret:hrm', 'secret:fsn'],
    techs: ['nm', 'hm', 'st', 'fl', 'ie'],
    sc: [5, 8, 3],
    factions: [
      { id: 'hacan', fit: 3 },
      { id: 'mentak', fit: 2 },
      { id: 'keleres', fit: 2 },
      { id: 'saar', fit: 1 },
      { id: 'xxcha', fit: 1 },
    ],
    risks: {
      en: 'Players who refuse to trade, raiders who steal trade goods (Mentak pillage), and losing the planets that fund you.',
      fr: 'Les joueurs qui refusent de commercer, les pillards qui volent les biens commerciaux (pillage Mentak) et la perte des planètes qui vous financent.',
    },
  },
  {
    id: 'science',
    color: '#3fae7a',
    name: { en: 'Tech race', fr: 'Course technologique' },
    tagline: { en: 'Out-research the galaxy', fr: 'Surpasser la galaxie en recherche' },
    summary: {
      en: 'Grab [[technology]] faster than anyone and score the research objectives. Planets with a [[tech-specialty]] let you skip [[prerequisites]], so expansion targets are chosen for their colours.',
      fr: 'Acquérir des [[technology|technologies]] plus vite que les autres et marquer les objectifs de recherche. Les planètes à [[tech-specialty|spécialité]] permettent d’ignorer des [[prerequisites|prérequis]] : on choisit ses cibles d’expansion pour leurs couleurs.',
    },
    opening: {
      en: '- Take [[strategy:technology|Technology]] in round 1 or 2\n- Research a cheap, flexible first tech (e.g. [[tech:nm]] or [[tech:gd]])\n- Expand toward planets with tech specialties',
      fr: '- Prendre [[strategy:technology|Technology]] au tour 1 ou 2\n- Rechercher une première technologie souple et peu chère (ex. [[tech:nm]] ou [[tech:gd]])\n- S’étendre vers les planètes à spécialité technologique',
    },
    mid: {
      en: '- Follow every Technology secondary you can afford\n- Aim for 2 colours deep, then broaden to all 4\n- Get one strong unit upgrade so you are not an easy target',
      fr: '- Suivre chaque secondaire de Technology que vous pouvez payer\n- Viser 2 couleurs en profondeur, puis élargir aux 4\n- Obtenir une bonne amélioration d’unité pour ne pas être une cible facile',
    },
    late: {
      en: '- Score Master the Sciences / Brain Trust\n- Late game techs are about tempo: extra actions, token economy\n- Keep a few resources for the final round’s scoring',
      fr: '- Marquer Master the Sciences / Brain Trust\n- En fin de partie, les technologies servent le tempo : actions en plus, économie de jetons\n- Garder quelques ressources pour le score du dernier tour',
    },
    objectives: ['public:diversify', 'public:research_outposts', 'public:develop', 'public:brain_trust', 'public:master_science', 'public:revolutionize', 'secret:mlp', 'secret:ans', 'secret:lsc'],
    techs: ['nm', 'pa', 'hm', 'gd', 'aida', 'fl'],
    sc: [7, 8, 2],
    factions: [
      { id: 'jolnar', fit: 3 },
      { id: 'nekro', fit: 2 },
      { id: 'titans', fit: 1 },
      { id: 'l1z1x', fit: 1 },
      { id: 'naaz', fit: 1 },
    ],
    risks: {
      en: 'Early aggression before your techs pay off, and opponents denying the Technology card.',
      fr: 'Une agression précoce avant que vos technologies ne rapportent, et des adversaires qui vous privent de la carte Technology.',
    },
  },
  {
    id: 'warlord',
    color: '#d0473f',
    name: { en: 'Warlord', fr: 'Seigneur de guerre' },
    tagline: { en: 'Win fights, take what you need', fr: 'Gagner les combats, prendre ce qu’il faut' },
    summary: {
      en: 'Build the strongest fleet early and use it to score combat and board-presence objectives. Every fight should earn a point, a planet or a crippled rival — never fight for nothing.',
      fr: 'Construire tôt la flotte la plus forte et s’en servir pour marquer les objectifs de combat et de présence. Chaque combat doit rapporter un point, une planète ou un rival affaibli — jamais se battre pour rien.',
    },
    opening: {
      en: '- Research a unit upgrade or [[tech:gd]] early\n- Build a fleet that can threaten a neighbour by round 2\n- Take planets your neighbours left lightly defended',
      fr: '- Rechercher tôt une amélioration d’unité ou [[tech:gd]]\n- Construire une flotte capable de menacer un voisin au tour 2\n- Prendre les planètes que vos voisins ont peu défendues',
    },
    mid: {
      en: '- Pick fights that score secrets (destroy a flagship, win in a home system)\n- Keep [[fleet-pool]] tokens high; supply limits cap your power\n- Use [[strategy:warfare|Warfare]] to reuse your main fleet',
      fr: '- Choisir des combats qui marquent des secrets (détruire un vaisseau amiral, gagner dans un système d’origine)\n- Garder une [[fleet-pool|réserve de flotte]] élevée ; elle plafonne votre puissance\n- Utiliser [[strategy:warfare|Warfare]] pour réactiver votre flotte principale',
    },
    late: {
      en: '- Hold Mecatol Rex or an enemy home for supremacy objectives\n- Strike the leader when they cannot retaliate before scoring\n- Do not over-extend: a lost fleet costs more than a skipped fight',
      fr: '- Tenir Mecatol Rex ou un système d’origine ennemi pour les objectifs de suprématie\n- Frapper le leader quand il ne peut pas riposter avant le score\n- Ne pas trop s’étendre : une flotte perdue coûte plus qu’un combat évité',
    },
    objectives: ['public:raise_fleet', 'public:develop', 'public:lead', 'public:intimidate', 'public:command_armada', 'public:conquer', 'public:supremacy', 'public:revolutionize', 'secret:dtgs', 'secret:sar', 'secret:dts', 'secret:gamf', 'secret:csl', 'secret:te', 'secret:uf', 'secret:dyp'],
    techs: ['gd', 'ps', 'asc', 'dn2', 'da', 'fl'],
    sc: [6, 1, 8],
    factions: [
      { id: 'sardakk', fit: 3 },
      { id: 'l1z1x', fit: 3 },
      { id: 'letnev', fit: 2 },
      { id: 'muaat', fit: 2 },
      { id: 'mahact', fit: 2 },
      { id: 'nomad', fit: 2 },
      { id: 'argent', fit: 2 },
      { id: 'cabal', fit: 2 },
      { id: 'yin', fit: 1 },
      { id: 'naalu', fit: 1 },
    ],
    risks: {
      en: 'The table ganging up on you, PDS-heavy defenders, and running out of command tokens after a costly war.',
      fr: 'La table qui se ligue contre vous, des défenseurs bardés de SDP, et l’épuisement des jetons de commandement après une guerre coûteuse.',
    },
  },
  {
    id: 'sprawl',
    color: '#4d9b4a',
    name: { en: 'Land grab', fr: 'Ruée territoriale' },
    tagline: { en: 'Claim the map, score the planets', fr: 'S’approprier la carte, marquer les planètes' },
    summary: {
      en: 'Spread wide and fast with cheap [[ground-forces]], then score planet-count, trait and structure objectives. Width is your defence: you are hard to punish everywhere at once.',
      fr: 'S’étendre vite et large avec des [[ground-forces|forces terrestres]] bon marché, puis marquer les objectifs de nombre de planètes, de traits et de structures. La largeur est votre défense : on ne peut pas vous punir partout à la fois.',
    },
    opening: {
      en: '- Take [[strategy:leadership|Leadership]] or [[strategy:construction|Construction]]\n- Carriers full of infantry, two systems per round\n- Note which planet trait you have most of',
      fr: '- Prendre [[strategy:leadership|Leadership]] ou [[strategy:construction|Construction]]\n- Des porte-vaisseaux pleins d’infanterie, deux systèmes par tour\n- Repérer le trait de planète que vous possédez le plus',
    },
    mid: {
      en: '- Drop [[structures]] outside home for infrastructure objectives\n- Keep 1–2 ground forces on frontier planets\n- Trade spare planets’ influence for votes',
      fr: '- Poser des [[structures]] hors de votre système d’origine pour les objectifs d’infrastructure\n- Garder 1–2 forces terrestres sur les planètes frontalières\n- Échanger l’influence de vos planètes en trop contre des votes',
    },
    late: {
      en: '- Push for Subdue the Galaxy (11 planets)\n- Defend the trait sets that score your secrets\n- Grab one last planet from the weakest neighbour if a point needs it',
      fr: '- Viser Subdue the Galaxy (11 planètes)\n- Défendre les ensembles de traits qui valident vos secrets\n- Prendre une dernière planète au voisin le plus faible si un point en dépend',
    },
    objectives: ['public:expand_borders', 'public:corner', 'public:infrastructure', 'public:build_defenses', 'public:push_boundaries', 'public:subdue', 'public:unify_colonies', 'public:massive_cities', 'public:protect_border', 'secret:mrm', 'secret:mp', 'secret:faa', 'secret:fwm', 'secret:hrm', 'secret:eh', 'secret:mtm'],
    techs: ['amd', 'gd', 'st', 'dxa', 'sar', 'inf2'],
    sc: [4, 1, 8],
    factions: [
      { id: 'arborec', fit: 3 },
      { id: 'saar', fit: 2 },
      { id: 'sol', fit: 2 },
      { id: 'titans', fit: 2 },
      { id: 'ghost', fit: 1 },
      { id: 'xxcha', fit: 1 },
    ],
    risks: {
      en: 'Concentrated strikes on thin garrisons, and bombardment wiping out infantry stacks.',
      fr: 'Des frappes concentrées sur des garnisons trop minces, et le bombardement qui efface les piles d’infanterie.',
    },
  },
  {
    id: 'politics',
    color: '#4f7fd6',
    name: { en: 'Galactic senate', fr: 'Sénat galactique' },
    tagline: { en: 'Win with votes and deals', fr: 'Gagner par les votes et les accords' },
    summary: {
      en: 'Accumulate [[influence]] and control the [[agenda-phase]]. Laws and directives that favour you are as good as a fleet, and influence-spend objectives turn your votes into points.',
      fr: 'Accumuler l’[[influence]] et contrôler la [[agenda-phase|phase d’ordre du jour]]. Les lois et directives qui vous favorisent valent une flotte, et les objectifs de dépense d’influence transforment vos votes en points.',
    },
    opening: {
      en: '- Prioritise high-influence planets\n- Take [[strategy:politics|Politics]] to set the agenda deck\n- Make friends: promise votes in exchange for safety',
      fr: '- Privilégier les planètes à forte influence\n- Prendre [[strategy:politics|Politics]] pour orienter la pioche d’ordres du jour\n- Se faire des amis : promettre des votes contre la sécurité',
    },
    mid: {
      en: '- Spend influence on objectives in rounds without key votes\n- Use [[riders]] and vote deals to gain extra cards and points\n- Keep enough defence that being ignored is cheaper than attacking you',
      fr: '- Dépenser l’influence en objectifs les tours sans vote important\n- Utiliser les [[riders|paris]] et les accords de vote pour gagner cartes et points\n- Garder assez de défense pour qu’il soit moins coûteux de vous ignorer que de vous attaquer',
    },
    late: {
      en: '- Manipulate Galactic Law (16 influence)\n- Kill laws that let the leader run away\n- Trade your vote for the last point you need',
      fr: '- Manipulate Galactic Law (16 influence)\n- Faire tomber les lois qui laissent le leader s’envoler\n- Échanger votre vote contre le dernier point qui vous manque',
    },
    objectives: ['public:sway_council', 'public:amass_wealth', 'public:manipulate_law', 'public:vast_reserves', 'secret:dp', 'secret:dtd', 'secret:eh', 'secret:sb'],
    techs: ['nm', 'hm', 'pi', 'gd', 'ie'],
    sc: [3, 2, 8],
    factions: [
      { id: 'xxcha', fit: 3 },
      { id: 'winnu', fit: 2 },
      { id: 'keleres', fit: 2 },
      { id: 'empyrean', fit: 1 },
      { id: 'mahact', fit: 1 },
    ],
    risks: {
      en: 'A table that ignores politics and simply invades you, and losing your high-influence planets.',
      fr: 'Une table qui ignore la politique et vous envahit simplement, et la perte de vos planètes à forte influence.',
    },
  },
  {
    id: 'throne',
    color: '#b88a2e',
    name: { en: 'Throne of Mecatol', fr: 'Trône de Mecatol' },
    tagline: { en: 'Hold the centre of the galaxy', fr: 'Tenir le centre de la galaxie' },
    summary: {
      en: 'Take [[mecatol-rex]] early (the [[custodians-token]] is a point) and hold it. The centre gives influence, map control and several objectives, but it makes you the obvious target.',
      fr: 'Prendre [[mecatol-rex]] tôt (le [[custodians-token|jeton des Gardiens]] vaut un point) et le tenir. Le centre apporte influence, contrôle de la carte et plusieurs objectifs, mais fait de vous la cible évidente.',
    },
    opening: {
      en: '- Plan a route to Mecatol with 6 influence ready\n- Take [[strategy:imperial|Imperial]] when you control Mecatol\n- Bring dreadnoughts or a flagship that can hold the centre',
      fr: '- Prévoir un chemin vers Mecatol avec 6 influence prête\n- Prendre [[strategy:imperial|Imperial]] quand vous tenez Mecatol\n- Amener des cuirassés ou un vaisseau amiral capables de tenir le centre',
    },
    mid: {
      en: '- Score Intimidate Council / Make History from the centre\n- Fortify: PDS and ground forces on Mecatol\n- Make deals with the neighbours of the centre',
      fr: '- Marquer Intimidate Council / Make History depuis le centre\n- Fortifier : SDP et forces terrestres sur Mecatol\n- Passer des accords avec les voisins du centre',
    },
    late: {
      en: '- Keep scoring Imperial every round\n- Use Supremacy / Become a Legend\n- Expect a coalition: keep reinforcements one jump away',
      fr: '- Continuer à marquer avec Imperial chaque tour\n- Utiliser Supremacy / Become a Legend\n- Attendez-vous à une coalition : gardez des renforts à un saut',
    },
    objectives: ['public:intimidate', 'public:make_history', 'public:lead', 'public:supremacy', 'public:become_legend', 'secret:ose', 'secret:sai', 'secret:dtgs'],
    techs: ['gd', 'fl', 'dn2', 'da', 'md'],
    sc: [8, 6, 1],
    factions: [
      { id: 'winnu', fit: 3 },
      { id: 'letnev', fit: 2 },
      { id: 'sol', fit: 1 },
      { id: 'sardakk', fit: 1 },
      { id: 'naalu', fit: 1 },
    ],
    risks: {
      en: 'Everybody else. Holding the centre too early draws the whole table onto you.',
      fr: 'Tous les autres. Tenir le centre trop tôt attire toute la table sur vous.',
    },
  },
  {
    id: 'explorer',
    color: '#2fa6b4',
    name: { en: 'Frontier explorer', fr: 'Explorateur de la frontière' },
    tagline: { en: 'Explore, collect relics, reach the edges', fr: 'Explorer, collecter des reliques, atteindre les bords' },
    summary: {
      en: 'Use [[exploration]] and [[frontier-tokens]] to collect [[relic-fragments]], [[attachments]] and relics, and score the edge-of-map and empty-space objectives others ignore.',
      fr: 'Utiliser l’[[exploration]] et les [[frontier-tokens|jetons frontière]] pour collecter [[relic-fragments|fragments de relique]], [[attachments|rattachements]] et reliques, et marquer les objectifs de bord de carte et d’espace vide que les autres négligent.',
    },
    opening: {
      en: '- Research [[tech:det]] or [[tech:amd]] early\n- Explore every new planet; keep fragments of one type\n- Send cheap ships into empty systems',
      fr: '- Rechercher tôt [[tech:det]] ou [[tech:amd]]\n- Explorer chaque nouvelle planète ; garder les fragments d’un même type\n- Envoyer des vaisseaux bon marché dans les systèmes vides',
    },
    mid: {
      en: '- Turn fragments into [[kind:relic|relics]]\n- Score Explore Deep Space / Populate the Outer Rim\n- Attachments make planets valuable — protect them',
      fr: '- Transformer les fragments en [[kind:relic|reliques]]\n- Marquer Explore Deep Space / Populate the Outer Rim\n- Les rattachements rendent les planètes précieuses — protégez-les',
    },
    late: {
      en: '- Patrol Vast Territories / Control the Borderlands\n- Use relics as your late-game power spike\n- Stay out of the centre’s wars',
      fr: '- Patrol Vast Territories / Control the Borderlands\n- Utiliser vos reliques comme pic de puissance tardif\n- Rester à l’écart des guerres du centre',
    },
    objectives: ['public:deep_space', 'public:outer_rim', 'public:lost_outposts', 'public:make_history', 'public:ancient_monuments', 'public:vast_territories', 'public:control_borderlands', 'public:become_legend', 'secret:dhw', 'secret:btv', 'secret:dfat', 'secret:btgk', 'secret:sai'],
    techs: ['det', 'amd', 'gd', 'pa', 'lwd', 'sr'],
    sc: [4, 7, 1],
    factions: [
      { id: 'naaz', fit: 3 },
      { id: 'empyrean', fit: 2 },
      { id: 'ghost', fit: 2 },
      { id: 'nomad', fit: 1 },
      { id: 'saar', fit: 1 },
    ],
    risks: {
      en: 'Thin, spread-out fleets that are easy to pick off, and bad exploration luck.',
      fr: 'Des flottes minces et dispersées faciles à éliminer, et la malchance à l’exploration.',
    },
    needs: ['pok'],
  },
  {
    id: 'shadow',
    color: '#8a63c9',
    name: { en: 'Shadow game', fr: 'Jeu de l’ombre' },
    tagline: { en: 'Stay quiet, score late', fr: 'Rester discret, marquer tard' },
    summary: {
      en: 'Look harmless, avoid wars, and quietly score secrets and cheap publics. Win by being the player nobody thought to stop — tempo, [[action-cards]] and timing matter more than fleets.',
      fr: 'Paraître inoffensif, éviter les guerres et marquer discrètement secrets et objectifs bon marché. Gagner en étant le joueur que personne n’a pensé à arrêter — le tempo, les [[action-cards|cartes action]] et le timing comptent plus que les flottes.',
    },
    opening: {
      en: '- Take [[strategy:leadership|Leadership]] or [[strategy:diplomacy|Diplomacy]]\n- Expand where nobody else wants to be\n- Collect action cards; keep your hand hidden',
      fr: '- Prendre [[strategy:leadership|Leadership]] ou [[strategy:diplomacy|Diplomacy]]\n- S’étendre là où personne d’autre ne veut aller\n- Collecter des cartes action ; cacher votre main',
    },
    mid: {
      en: '- Score Lead From the Front / Galvanize with spare tokens\n- Point out the leader to the table — never be it\n- Fight only when a secret pays for it',
      fr: '- Marquer Lead From the Front / Galvanize avec vos jetons en trop\n- Désigner le leader à la table — ne jamais l’être\n- Ne combattre que lorsqu’un secret le justifie',
    },
    late: {
      en: '- Plan a final round that scores 2–3 points at once\n- Keep [[strategy:imperial|Imperial]] or a surprise action card for the last turn\n- Pass last for timing secrets',
      fr: '- Prévoir un dernier tour qui marque 2–3 points d’un coup\n- Garder [[strategy:imperial|Imperial]] ou une carte action surprise pour la fin\n- Passer en dernier pour les secrets de timing',
    },
    objectives: ['public:lead', 'public:galvanize', 'public:intimidate', 'public:expand_borders', 'secret:fsn', 'secret:pe', 'secret:ctr', 'secret:btgk', 'secret:fc', 'secret:sb'],
    techs: ['fl', 'gd', 'lwd', 'hm', 'nm'],
    sc: [1, 2, 8],
    factions: [
      { id: 'yssaril', fit: 3 },
      { id: 'naalu', fit: 2 },
      { id: 'empyrean', fit: 2 },
      { id: 'yin', fit: 1 },
      { id: 'ghost', fit: 1 },
      { id: 'mentak', fit: 1 },
    ],
    risks: {
      en: 'Players who track scores closely, and being forced into a war you are not built for.',
      fr: 'Les joueurs qui surveillent de près les scores, et être entraîné dans une guerre pour laquelle vous n’êtes pas fait.',
    },
  },
]

export const archetypeById = new Map(archetypes.map((a) => [a.id, a]))

/** Archetypes a faction appears in, best fit first. */
export function archetypesForFaction(factionId: string) {
  return archetypes
    .map((a) => ({ a, fit: a.factions.find((f) => f.id === factionId)?.fit ?? 0 }))
    .filter((x) => x.fit > 0)
    .sort((x, y) => y.fit - x.fit)
}
