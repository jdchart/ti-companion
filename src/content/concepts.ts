/**
 * Rules concepts — original explanations based on the Twilight Imperium 4E
 * rules and Living Rules Reference (paraphrased, never copied).
 * Slugs are referenced across all content as [[slug]] — don't rename lightly
 * (run `npm run check:content` after edits).
 */
import type { ConceptEntry } from './types'

export const concepts: ConceptEntry[] = [
  // =================================================================== CORE
  {
    slug: 'victory-points',
    group: 'core',
    title: { en: 'Victory points', fr: 'Points de victoire' },
    summary: {
      en: 'The first player to reach 10 VP (or 14 in a long game) wins immediately.',
      fr: 'Le premier joueur à atteindre 10 PV (ou 14 en partie longue) gagne immédiatement.',
    },
    body: {
      en: 'Most points come from [[objectives]] — public and secret. Others come from the [[custodians-token]], [[strategy:imperial|Imperial]], some agendas and relics.\n\nThe game ends the instant someone reaches the target. If several players would reach it at the same time (e.g. during the status phase), the one earliest in [[initiative-order]] wins.',
      fr: 'La plupart des points viennent des [[objectives|objectifs]] — publics et secrets. D’autres viennent du [[custodians-token|jeton des Gardiens]], de [[strategy:imperial|Imperial]], de certains ordres du jour et reliques.\n\nLa partie s’arrête dès qu’un joueur atteint l’objectif. Si plusieurs l’atteignent en même temps (par ex. en phase de statut), le premier dans l’[[initiative-order|ordre d’initiative]] l’emporte.',
    },
    aliases: ['VP', 'PV', 'points', 'victory', 'win', 'victoire', 'gagner'],
    related: ['objectives', 'custodians-token'],
  },
  {
    slug: 'objectives',
    group: 'core',
    title: { en: 'Objectives', fr: 'Objectifs' },
    summary: {
      en: 'Goals worth victory points: public objectives (stage I = 1 VP, stage II = 2 VP) everyone can score, and secret objectives (1 VP) only you know.',
      fr: 'Buts rapportant des points : objectifs publics (niveau I = 1 PV, niveau II = 2 PV) accessibles à tous, et objectifs secrets (1 PV) connus de vous seul.',
    },
    body: {
      en: '**Public objectives** are revealed one per round during the status phase (5 stage I first, then stage II). Each player can score each public objective once.\n\n**Secret objectives**: you start with one and can hold up to 3 scored or unscored. Some are scored in the status phase, others the moment they happen during the action phase ("Action") or agenda phase.\n\n**Scoring limit:** in each status phase you may score at most 1 public and 1 secret objective. You must control all planets in your home system to score public objectives.\n\nSee [[kind:public|all public objectives]] and [[kind:secret|all secret objectives]].',
      fr: '**Objectifs publics** : un nouveau est révélé à chaque phase de statut (d’abord 5 de niveau I, puis de niveau II). Chaque joueur peut marquer chaque objectif public une fois.\n\n**Objectifs secrets** : vous en commencez avec un et pouvez en avoir 3 au maximum (marqués ou non). Certains se marquent en phase de statut, d’autres au moment où ils se produisent en phase d’action (« Action ») ou d’ordre du jour.\n\n**Limite :** à chaque phase de statut vous pouvez marquer au plus 1 objectif public et 1 secret. Vous devez contrôler toutes les planètes de votre système d’origine pour marquer un objectif public.',
    },
    aliases: ['public', 'secret', 'stage', 'score', 'marquer', 'niveau'],
    related: ['victory-points', 'status-phase', 'strategy:imperial'],
  },
  {
    slug: 'command-tokens',
    group: 'core',
    title: { en: 'Command tokens', fr: 'Jetons de commandement' },
    summary: {
      en: 'Your main action currency, split between the tactic pool (activate systems), fleet pool (fleet size) and strategy pool (follow strategy cards).',
      fr: 'Votre monnaie d’action principale, répartie entre réserve tactique (activer des systèmes), réserve de flotte (taille des flottes) et réserve stratégique (suivre les cartes stratégie).',
    },
    body: {
      en: 'You start with 3 tactic, 3 fleet and 2 strategy tokens on your command sheet; the rest of your 16 are in [[reinforcements]].\n\n- [[tactic-pool|Tactic pool]]: spent to activate a system during a [[tactical-action]].\n- [[fleet-pool|Fleet pool]]: not spent; it caps the number of non-fighter ships you may have in each system.\n- [[strategy-pool|Strategy pool]]: spent to use the secondary ability of other players’ strategy cards.\n\nYou gain 2 tokens each [[status-phase]] (and can redistribute all your tokens then). [[strategy:leadership|Leadership]] is the main way to gain more.',
      fr: 'Vous commencez avec 3 jetons tactiques, 3 de flotte et 2 de stratégie sur votre fiche de commandement ; le reste de vos 16 jetons est en [[reinforcements|renforts]].\n\n- [[tactic-pool|Réserve tactique]] : dépensée pour activer un système lors d’une [[tactical-action|action tactique]].\n- [[fleet-pool|Réserve de flotte]] : non dépensée ; limite le nombre de vaisseaux (hors chasseurs) par système.\n- [[strategy-pool|Réserve stratégique]] : dépensée pour utiliser la capacité secondaire des cartes stratégie des autres.\n\nVous gagnez 2 jetons à chaque [[status-phase|phase de statut]] (et pouvez alors tous les redistribuer). [[strategy:leadership|Leadership]] est la principale source de jetons supplémentaires.',
    },
    aliases: ['tokens', 'jetons', 'command sheet', 'CC'],
    related: ['tactic-pool', 'fleet-pool', 'strategy-pool'],
  },
  {
    slug: 'tactic-pool',
    group: 'core',
    title: { en: 'Tactic pool', fr: 'Réserve tactique' },
    summary: {
      en: 'Command tokens spent to activate systems. Each token placed on the map = one tactical action.',
      fr: 'Jetons de commandement dépensés pour activer des systèmes. Chaque jeton placé sur la carte = une action tactique.',
    },
    body: {
      en: 'When you perform a [[tactical-action]], you take a token from your tactic pool and place it in the system you activate. A system that already holds one of your tokens cannot be activated again this round (until tokens are removed in the status phase).',
      fr: 'Lors d’une [[tactical-action|action tactique]], vous prenez un jeton de votre réserve tactique et le placez dans le système activé. Un système contenant déjà votre jeton ne peut plus être activé ce tour-ci (les jetons sont retirés en phase de statut).',
    },
    aliases: ['tactical tokens', 'tactique'],
    related: ['command-tokens', 'tactical-action', 'activation'],
  },
  {
    slug: 'fleet-pool',
    group: 'core',
    title: { en: 'Fleet pool (fleet supply)', fr: 'Réserve de flotte' },
    summary: {
      en: 'The number of tokens in your fleet pool is the maximum number of non-fighter ships you may have in any one system.',
      fr: 'Le nombre de jetons de votre réserve de flotte est le nombre maximal de vaisseaux (hors chasseurs) que vous pouvez avoir dans un même système.',
    },
    body: {
      en: 'Fleet tokens are never spent for actions. If a system exceeds the limit, you must remove the excess ships. Fighters don’t count unless they exceed your ships’ [[capacity]] (e.g. with [[tech:ff2|Fighter II]]).',
      fr: 'Les jetons de flotte ne sont jamais dépensés pour agir. Si un système dépasse la limite, vous devez retirer les vaisseaux en excès. Les chasseurs ne comptent pas, sauf s’ils dépassent la [[capacity|capacité]] de vos vaisseaux (par ex. avec [[tech:ff2|Fighter II]]).',
    },
    aliases: ['fleet limit', 'fleet supply', 'limite de flotte'],
    related: ['command-tokens', 'capacity'],
  },
  {
    slug: 'strategy-pool',
    group: 'core',
    title: { en: 'Strategy pool', fr: 'Réserve stratégique' },
    summary: {
      en: 'Command tokens spent to follow (use the secondary ability of) another player’s strategy card, and for some faction abilities.',
      fr: 'Jetons dépensés pour suivre (utiliser la capacité secondaire de) la carte stratégie d’un autre joueur, et pour certaines capacités de faction.',
    },
    body: {
      en: 'Using your own strategy card’s primary ability is free. Following someone else’s costs one token from this pool (except [[strategy:leadership|Leadership]], whose secondary needs no token).',
      fr: 'Utiliser la capacité principale de votre propre carte est gratuit. Suivre celle d’un autre coûte un jeton de cette réserve (sauf [[strategy:leadership|Leadership]], dont la secondaire n’en demande pas).',
    },
    aliases: ['strategic tokens', 'stratégie'],
    related: ['command-tokens', 'strategic-action'],
  },
  {
    slug: 'reinforcements',
    group: 'core',
    title: { en: 'Reinforcements', fr: 'Renforts' },
    summary: {
      en: 'Your personal supply of units and command tokens not currently on the board or on your command sheet.',
      fr: 'Votre réserve personnelle d’unités et de jetons qui ne sont ni sur le plateau ni sur votre fiche de commandement.',
    },
    body: {
      en: 'Unit counts are limited by the plastic: if a unit type is not in your reinforcements, you cannot produce it (except fighters/infantry, which may use tokens). Destroyed units return to reinforcements.',
      fr: 'Le nombre d’unités est limité par les figurines : si un type d’unité n’est plus dans vos renforts, vous ne pouvez plus le produire (sauf chasseurs/infanterie, qui peuvent utiliser des jetons). Les unités détruites reviennent en renforts.',
    },
    aliases: ['supply', 'renfort'],
  },
  {
    slug: 'speaker',
    group: 'core',
    title: { en: 'Speaker', fr: 'Orateur' },
    summary: {
      en: 'The player with the speaker token picks strategy cards first, reveals agendas, votes last and breaks ties.',
      fr: 'Le joueur qui a le jeton d’Orateur choisit sa carte stratégie en premier, révèle les ordres du jour, vote en dernier et départage les égalités.',
    },
    body: {
      en: 'The speaker token changes hands mainly through the [[strategy:politics|Politics]] strategy card.',
      fr: 'Le jeton d’Orateur change de main principalement via la carte stratégie [[strategy:politics|Politics]].',
    },
    aliases: ['speaker token', 'orateur'],
    related: ['strategy-phase', 'agenda-phase'],
  },
  {
    slug: 'initiative-order',
    group: 'core',
    title: { en: 'Initiative order', fr: 'Ordre d’initiative' },
    summary: {
      en: 'Turn order in the action phase: by the number on each player’s strategy card, lowest first.',
      fr: 'Ordre de jeu en phase d’action : selon le numéro de la carte stratégie de chaque joueur, du plus petit au plus grand.',
    },
    body: {
      en: 'In 3–4 player games each player has two cards; their lowest number counts. The Naalu’s [[ability:telepathic|Telepathic]] ability gives them initiative 0.',
      fr: 'À 3–4 joueurs, chacun a deux cartes ; seul le plus petit numéro compte. La capacité [[ability:telepathic|Telepathic]] des Naalu leur donne l’initiative 0.',
    },
    aliases: ['turn order', 'initiative'],
  },
  {
    slug: 'neighbors',
    group: 'core',
    title: { en: 'Neighbors', fr: 'Voisins' },
    summary: {
      en: 'Two players are neighbors if they have units or control planets in the same or adjacent systems. Only neighbors may trade.',
      fr: 'Deux joueurs sont voisins s’ils ont des unités ou contrôlent des planètes dans des systèmes identiques ou adjacents. Seuls les voisins peuvent commercer.',
    },
    body: {
      en: 'Neighbors are re-evaluated constantly as units move. Wormholes create adjacency, so they can make distant players neighbors.',
      fr: 'Le voisinage évolue en permanence selon les mouvements. Les trous de ver créent de l’adjacence et peuvent rendre voisins des joueurs éloignés.',
    },
    aliases: ['neighbor', 'neighbour', 'voisin'],
    related: ['transactions', 'adjacency'],
  },
  {
    slug: 'exhausted',
    group: 'core',
    title: { en: 'Exhausted / ready', fr: 'Épuisé / prêt' },
    summary: {
      en: 'Exhausted cards (planets, techs, leaders) are flipped face down and can’t be used again until readied, usually in the status phase.',
      fr: 'Les cartes épuisées (planètes, technologies, dirigeants) sont retournées et inutilisables jusqu’à ce qu’elles soient redressées, généralement en phase de statut.',
    },
    body: {
      en: 'You exhaust planets to spend their [[resources]] or [[influence]]. Newly conquered planets enter play exhausted. Everything readies during the [[status-phase]].',
      fr: 'On épuise les planètes pour dépenser leurs [[resources|ressources]] ou leur [[influence]]. Les planètes nouvellement conquises arrivent épuisées. Tout se redresse en [[status-phase|phase de statut]].',
    },
    aliases: ['exhaust', 'ready', 'épuiser', 'redresser'],
  },
  {
    slug: 'purge',
    group: 'core',
    title: { en: 'Purge', fr: 'Retirer du jeu (purger)' },
    summary: {
      en: 'A purged component is removed from the game for good.',
      fr: 'Un élément purgé est retiré définitivement de la partie.',
    },
    aliases: ['purged', 'purger'],
  },
  {
    slug: 'home-system',
    group: 'core',
    title: { en: 'Home system', fr: 'Système d’origine' },
    summary: {
      en: 'Your faction’s starting system. You must control all of its planets to score public objectives.',
      fr: 'Le système de départ de votre faction. Vous devez contrôler toutes ses planètes pour marquer des objectifs publics.',
    },
    body: {
      en: 'Other players can invade it — taking a planet there can also give them [[secret:dts|Darken the Skies]]-type rewards and the [[relic:shard|Shard of the Throne]] if you hold it.',
      fr: 'D’autres joueurs peuvent l’envahir — y prendre une planète peut leur rapporter certains objectifs ou la [[relic:shard|Shard of the Throne]] si vous l’avez.',
    },
    aliases: ['home', 'HS', 'origine'],
  },
  {
    slug: 'technology',
    group: 'core',
    title: { en: 'Technology & research', fr: 'Technologie et recherche' },
    summary: {
      en: 'Technologies are permanent upgrades. You research them mainly with the Technology strategy card, respecting coloured prerequisites.',
      fr: 'Les technologies sont des améliorations permanentes. On les recherche surtout via la carte stratégie Technology, en respectant les prérequis de couleur.',
    },
    body: {
      en: 'There are four colours: **biotic** (green), **propulsion** (blue), **cybernetic** (yellow) and **warfare** (red), plus [[unit-upgrades|unit upgrades]] (no colour). Each faction also has 2 faction technologies.\n\nTo research a tech you need to own technologies matching its [[prerequisites]]. Planets with a [[tech-specialty]] can be exhausted to skip one prerequisite of that colour.',
      fr: 'Il existe quatre couleurs : **biotique** (vert), **propulsion** (bleu), **cybernétique** (jaune) et **guerre** (rouge), plus les [[unit-upgrades|améliorations d’unité]] (sans couleur). Chaque faction a aussi 2 technologies de faction.\n\nPour rechercher une technologie, il faut posséder des technologies correspondant à ses [[prerequisites|prérequis]]. Une planète avec une [[tech-specialty|spécialité]] peut être épuisée pour ignorer un prérequis de sa couleur.',
    },
    aliases: ['tech', 'research', 'recherche', 'technologies'],
    related: ['prerequisites', 'tech-specialty', 'strategy:technology'],
  },
  {
    slug: 'prerequisites',
    group: 'core',
    title: { en: 'Prerequisites', fr: 'Prérequis' },
    summary: {
      en: 'Coloured symbols on a technology: you must already own that many techs of each colour before researching it.',
      fr: 'Symboles de couleur sur une technologie : vous devez déjà posséder autant de technologies de chaque couleur pour la rechercher.',
    },
    aliases: ['prereq', 'skip', 'prérequis'],
    related: ['technology', 'tech-specialty'],
  },
  {
    slug: 'tech-specialty',
    group: 'core',
    title: { en: 'Technology specialty (skip)', fr: 'Spécialité technologique' },
    summary: {
      en: 'A coloured symbol on some planets; exhaust the planet when researching to ignore one prerequisite of that colour.',
      fr: 'Symbole de couleur présent sur certaines planètes ; épuisez la planète lors d’une recherche pour ignorer un prérequis de cette couleur.',
    },
    aliases: ['skip', 'tech skip', 'spécialité'],
    related: ['prerequisites'],
  },
  {
    slug: 'unit-upgrades',
    group: 'core',
    title: { en: 'Unit upgrades', fr: 'Améliorations d’unité' },
    summary: {
      en: 'Technologies that replace a unit’s stats with a stronger “II” version (e.g. Carrier II).',
      fr: 'Technologies qui remplacent les caractéristiques d’une unité par une version « II » plus forte (par ex. Carrier II).',
    },
    body: {
      en: 'Unit upgrades have no colour, so they never count as prerequisites, but they count for objectives such as [[public:develop|Develop Weaponry]].',
      fr: 'Elles n’ont pas de couleur et ne comptent donc jamais comme prérequis, mais elles comptent pour des objectifs comme [[public:develop|Develop Weaponry]].',
    },
    aliases: ['upgrade', 'unit upgrade'],
  },
  {
    slug: 'action-cards',
    group: 'core',
    title: { en: 'Action cards', fr: 'Cartes action' },
    summary: {
      en: 'Hidden one-shot effects. Draw 1 each status phase; hand limit 7. Each card says when it can be played.',
      fr: 'Effets cachés à usage unique. Piochez-en 1 à chaque phase de statut ; limite de main 7. Chaque carte indique quand la jouer.',
    },
    body: {
      en: 'Cards whose timing is “Action” are [[component-action|component actions]] and use your turn. Others are played in reaction to a timing window. [[action:sabo|Sabotage]] can cancel most of them.',
      fr: 'Les cartes dont le moment est « Action » sont des [[component-action|actions de composant]] et utilisent votre tour. Les autres se jouent en réaction. [[action:sabo|Sabotage]] peut annuler la plupart.',
    },
    aliases: ['AC', 'action card', 'carte action'],
  },
  {
    slug: 'promissory-notes',
    group: 'core',
    title: { en: 'Promissory notes', fr: 'Billets à ordre' },
    summary: {
      en: 'Tradable favour cards. Each player has 5 generic notes plus a faction one; they are given away in transactions.',
      fr: 'Cartes de faveur échangeables. Chaque joueur a 5 billets génériques plus un de faction ; on les donne lors des transactions.',
    },
    body: {
      en: 'The generic notes are:\n\n- **Ceasefire** — stop the owner from moving into your systems for a turn.\n- **Trade Agreement** — when the owner refills commodities, they give them to you.\n- **Political Secret** — the holder can make the owner unable to vote on one agenda.\n- **Support for the Throne** — worth 1 VP while you hold it (lost if you attack its owner).\n- **Alliance** — lets you use the owner’s commander.\n\nYou can’t play notes of your own colour, and you can hold at most one note from a given player per transaction.',
      fr: 'Les billets génériques sont :\n\n- **Ceasefire** (cessez-le-feu) — empêche son propriétaire d’entrer dans vos systèmes pendant un tour.\n- **Trade Agreement** (accord commercial) — quand le propriétaire recharge ses marchandises, il vous les donne.\n- **Political Secret** (secret politique) — empêche le propriétaire de voter sur un ordre du jour.\n- **Support for the Throne** (soutien au trône) — vaut 1 PV tant que vous le détenez (perdu si vous attaquez son propriétaire).\n- **Alliance** — permet d’utiliser le commandant du propriétaire.\n\nVous ne pouvez pas jouer vos propres billets.',
    },
    aliases: ['PN', 'promissory', 'support for the throne', 'ceasefire', 'alliance', 'billet'],
    related: ['transactions'],
  },

  // ========================================================== GAME ROUND
  {
    slug: 'game-round',
    group: 'round',
    title: { en: 'Game round', fr: 'Tour de jeu' },
    summary: {
      en: 'Each round has four phases: strategy, action, status, then agenda (once Mecatol Rex’s custodians token has been removed).',
      fr: 'Chaque tour comporte quatre phases : stratégie, action, statut, puis ordre du jour (une fois le jeton des Gardiens retiré de Mecatol Rex).',
    },
    body: {
      en: '1. [[strategy-phase|Strategy phase]] — pick strategy cards.\n2. [[action-phase|Action phase]] — take turns performing actions until everyone passes.\n3. [[status-phase|Status phase]] — score objectives, reveal a new one, gain tokens, ready cards.\n4. [[agenda-phase|Agenda phase]] — vote on two agendas (only after the [[custodians-token]] is taken).',
      fr: '1. [[strategy-phase|Phase de stratégie]] — choix des cartes stratégie.\n2. [[action-phase|Phase d’action]] — chacun agit à tour de rôle jusqu’à ce que tous passent.\n3. [[status-phase|Phase de statut]] — marquer des objectifs, en révéler un, gagner des jetons, tout redresser.\n4. [[agenda-phase|Phase d’ordre du jour]] — voter sur deux ordres du jour (seulement après la prise du [[custodians-token|jeton des Gardiens]]).',
    },
    aliases: ['round', 'phases', 'tour'],
  },
  {
    slug: 'strategy-phase',
    group: 'round',
    title: { en: 'Strategy phase', fr: 'Phase de stratégie' },
    summary: {
      en: 'Starting with the speaker, each player picks one strategy card (two each in 3–4 player games). Unpicked cards gain a trade good.',
      fr: 'En commençant par l’Orateur, chaque joueur choisit une carte stratégie (deux chacun à 3–4 joueurs). Les cartes non prises reçoivent un bien commercial.',
    },
    body: {
      en: 'Trade goods accumulated on a card go to whoever picks it later — a nice bonus on unpopular cards. Your card sets your [[initiative-order|initiative]] and gives you one powerful [[strategic-action]].',
      fr: 'Les biens commerciaux accumulés sur une carte reviennent à celui qui la prend — un bonus sur les cartes délaissées. Votre carte détermine votre [[initiative-order|initiative]] et vous donne une puissante [[strategic-action|action stratégique]].',
    },
    aliases: ['pick', 'draft cards', 'stratégie'],
    related: ['kind:strategy'],
  },
  {
    slug: 'action-phase',
    group: 'round',
    title: { en: 'Action phase', fr: 'Phase d’action' },
    summary: {
      en: 'In initiative order, players take one action per turn — tactical, strategic or component — until everyone has passed.',
      fr: 'Dans l’ordre d’initiative, chaque joueur effectue une action par tour — tactique, stratégique ou de composant — jusqu’à ce que tous aient passé.',
    },
    body: {
      en: 'You cannot [[pass]] until you have used your strategy card’s [[strategic-action]]. Once you pass you take no more turns, but you can still follow other players’ strategy cards and play reaction cards.',
      fr: 'Vous ne pouvez pas [[pass|passer]] avant d’avoir utilisé votre [[strategic-action|action stratégique]]. Une fois passé, vous ne jouez plus de tour, mais pouvez encore suivre les cartes stratégie des autres et jouer des cartes en réaction.',
    },
    aliases: ['actions', 'turn'],
    related: ['tactical-action', 'strategic-action', 'component-action'],
  },
  {
    slug: 'status-phase',
    group: 'round',
    title: { en: 'Status phase', fr: 'Phase de statut' },
    summary: {
      en: 'Score objectives, reveal the next public objective, draw an action card, remove tokens from the board, gain and redistribute command tokens, ready everything.',
      fr: 'Marquer des objectifs, révéler l’objectif public suivant, piocher une carte action, retirer ses jetons du plateau, gagner et redistribuer des jetons, tout redresser.',
    },
    body: {
      en: 'Steps in order:\n\n- Score up to 1 public and 1 secret objective (in initiative order).\n- Reveal a new public objective.\n- Each player draws 1 [[action-cards|action card]].\n- Remove your command tokens from the board.\n- Gain 2 command tokens and redistribute your command sheet.\n- Ready all cards (planets, technologies, leaders).\n- Repair damaged units.\n- Return strategy cards.',
      fr: 'Dans l’ordre :\n\n- Marquer au plus 1 objectif public et 1 secret (dans l’ordre d’initiative).\n- Révéler un nouvel objectif public.\n- Chaque joueur pioche 1 [[action-cards|carte action]].\n- Retirer vos jetons de commandement du plateau.\n- Gagner 2 jetons et réorganiser votre fiche de commandement.\n- Redresser toutes les cartes (planètes, technologies, dirigeants).\n- Réparer les unités endommagées.\n- Rendre les cartes stratégie.',
    },
    aliases: ['status', 'statut', 'scoring'],
  },
  {
    slug: 'agenda-phase',
    group: 'round',
    title: { en: 'Agenda phase', fr: 'Phase d’ordre du jour' },
    summary: {
      en: 'Galactic council: two agendas are revealed and voted on, using planets’ influence as votes. Starts once the custodians token has been removed.',
      fr: 'Conseil galactique : deux ordres du jour sont révélés et votés, l’influence des planètes servant de voix. Commence une fois le jeton des Gardiens retiré.',
    },
    body: {
      en: 'For each agenda: the speaker reveals it, players may play “when revealed” cards, then each player votes in turn starting left of the speaker, exhausting planets for votes (1 influence = 1 vote) or abstaining. The outcome with the most votes resolves; the speaker breaks ties.\n\nAfterwards, ready all planets. See [[laws]], [[directives]], [[voting]] and [[riders]].',
      fr: 'Pour chaque ordre du jour : l’Orateur le révèle, les cartes « quand révélé » peuvent être jouées, puis chacun vote à tour de rôle en commençant à gauche de l’Orateur, en épuisant des planètes (1 influence = 1 voix) ou en s’abstenant. Le résultat ayant le plus de voix s’applique ; l’Orateur départage.\n\nEnsuite, toutes les planètes se redressent. Voir [[laws|lois]], [[directives]], [[voting|vote]] et [[riders]].',
    },
    aliases: ['agenda', 'council', 'politics', 'conseil', 'vote'],
    related: ['voting', 'laws', 'directives'],
  },
  {
    slug: 'pass',
    group: 'actions',
    title: { en: 'Passing', fr: 'Passer' },
    summary: {
      en: 'Once you have used your strategy card, you may pass instead of acting; you take no more turns this round.',
      fr: 'Après avoir utilisé votre carte stratégie, vous pouvez passer au lieu d’agir ; vous ne jouez plus de tour ce tour-ci.',
    },
    aliases: ['passer'],
  },

  // ============================================================== ACTIONS
  {
    slug: 'tactical-action',
    group: 'actions',
    title: { en: 'Tactical action', fr: 'Action tactique' },
    summary: {
      en: 'The core move: place a command token to activate a system, move ships in, fight, invade and produce there.',
      fr: 'L’action principale : placez un jeton pour activer un système, puis déplacez-y des vaisseaux, combattez, envahissez et produisez.',
    },
    body: {
      en: 'Steps:\n\n- **Activation** — place a token from your [[tactic-pool]] in a system without your token.\n- **Movement** — move ships into it (they cannot leave systems containing your tokens). Enemy [[space-cannon]] may fire at arriving ships.\n- **Space combat** — if enemy ships are present.\n- **Invasion** — [[bombardment]], commit ground forces, [[ground-combat]], take control of planets.\n- **Production** — units with [[production|PRODUCTION]] in the system may build.',
      fr: 'Étapes :\n\n- **Activation** — placez un jeton de votre [[tactic-pool|réserve tactique]] dans un système sans votre jeton.\n- **Mouvement** — déplacez-y des vaisseaux (ils ne peuvent pas quitter un système contenant votre jeton). Le [[space-cannon]] ennemi peut tirer sur eux.\n- **Combat spatial** — s’il y a des vaisseaux ennemis.\n- **Invasion** — [[bombardment]], débarquement, [[ground-combat|combat terrestre]], prise de contrôle.\n- **Production** — les unités à [[production|PRODUCTION]] du système peuvent produire.',
    },
    aliases: ['tactical', 'activate', 'tactique', 'activer'],
    related: ['activation', 'movement', 'space-combat', 'invasion', 'production'],
  },
  {
    slug: 'activation',
    group: 'actions',
    title: { en: 'Activation', fr: 'Activation' },
    summary: {
      en: 'Placing a command token from your tactic pool into a system; that system becomes the “active system” for this tactical action.',
      fr: 'Placer un jeton de votre réserve tactique dans un système ; il devient le « système actif » de cette action tactique.',
    },
    body: {
      en: 'You may activate a system even if you have no units nearby (e.g. to use production). You cannot activate a system that already contains one of your tokens.',
      fr: 'Vous pouvez activer un système même sans unité à proximité (par ex. pour produire). Vous ne pouvez pas activer un système contenant déjà votre jeton.',
    },
    aliases: ['active system', 'activate', 'système actif'],
  },
  {
    slug: 'strategic-action',
    group: 'actions',
    title: { en: 'Strategic action', fr: 'Action stratégique' },
    summary: {
      en: 'Use the primary ability of your strategy card; the other players may then follow its secondary ability.',
      fr: 'Utilisez la capacité principale de votre carte stratégie ; les autres joueurs peuvent ensuite suivre sa capacité secondaire.',
    },
    body: {
      en: 'Each strategy card can be used once per round and must be used before you can pass. Following usually costs a token from the [[strategy-pool]].',
      fr: 'Chaque carte stratégie s’utilise une fois par tour et doit l’être avant de pouvoir passer. Suivre coûte généralement un jeton de la [[strategy-pool|réserve stratégique]].',
    },
    aliases: ['primary', 'secondary', 'follow', 'principale', 'secondaire', 'suivre'],
    related: ['kind:strategy', 'strategy-pool'],
  },
  {
    slug: 'component-action',
    group: 'actions',
    title: { en: 'Component action', fr: 'Action de composant' },
    summary: {
      en: 'An action granted by a card or ability marked “ACTION:” — an action card, technology, leader, relic or faction ability.',
      fr: 'Une action accordée par une carte ou capacité marquée « ACTION : » — carte action, technologie, dirigeant, relique ou capacité de faction.',
    },
    aliases: ['ACTION:', 'composant'],
  },

  // ============================================================== COMBAT
  {
    slug: 'space-combat',
    group: 'combat',
    title: { en: 'Space combat', fr: 'Combat spatial' },
    summary: {
      en: 'When ships of two players share the active system, they fight in rounds: each ship rolls, hits are assigned, until one side is gone or retreats.',
      fr: 'Quand des vaisseaux de deux joueurs se trouvent dans le système actif, ils combattent par rounds : chaque vaisseau lance ses dés, les touches sont assignées, jusqu’à élimination ou retraite.',
    },
    body: {
      en: 'Before the first round: [[anti-fighter-barrage]]. Each round: announce [[retreat|retreats]], roll dice (a die hits if it equals or beats the unit’s [[combat-value]]), assign [[hits]] (choose which of your units die; [[sustain-damage]] can absorb one hit per unit), then retreat if announced.\n\nThe attacker wins only if all defending ships are destroyed.',
      fr: 'Avant le premier round : [[anti-fighter-barrage]]. À chaque round : annonce des [[retreat|retraites]], jets de dés (un dé touche s’il égale ou dépasse la [[combat-value|valeur de combat]]), assignation des [[hits|touches]] (vous choisissez vos pertes ; [[sustain-damage]] absorbe une touche par unité), puis retraite éventuelle.',
    },
    aliases: ['combat', 'battle', 'bataille', 'spatial'],
    related: ['hits', 'retreat', 'sustain-damage'],
  },
  {
    slug: 'invasion',
    group: 'combat',
    title: { en: 'Invasion', fr: 'Invasion' },
    summary: {
      en: 'The step of a tactical action where you bombard planets, land ground forces, fight ground combats and take control of planets.',
      fr: 'L’étape d’une action tactique où vous bombardez, débarquez vos forces terrestres, livrez les combats terrestres et prenez le contrôle des planètes.',
    },
    body: {
      en: 'Order: [[bombardment]] → commit ground forces from ships in the space area → defending [[space-cannon]] (PDS fire at landing troops) → [[ground-combat]] → establish control.\n\nTaking an empty uncontrolled planet needs no combat — just land a ground force. Newly controlled planets are [[exhausted]].',
      fr: 'Ordre : [[bombardment]] → débarquement des forces terrestres depuis l’espace → [[space-cannon]] défensif (les SDP tirent sur les troupes) → [[ground-combat|combat terrestre]] → prise de contrôle.\n\nPrendre une planète vide non contrôlée ne demande pas de combat. Les planètes nouvellement contrôlées sont [[exhausted|épuisées]].',
    },
    aliases: ['invade', 'land', 'commit', 'envahir', 'débarquer'],
  },
  {
    slug: 'ground-combat',
    group: 'combat',
    title: { en: 'Ground combat', fr: 'Combat terrestre' },
    summary: {
      en: 'Fight between ground forces (infantry, mechs) on a planet, resolved in rounds like space combat but with no retreat.',
      fr: 'Combat entre forces terrestres (infanterie, mécas) sur une planète, résolu par rounds comme le combat spatial mais sans retraite.',
    },
    aliases: ['ground', 'terrestre'],
    related: ['invasion', 'ground-forces'],
  },
  {
    slug: 'ground-forces',
    group: 'units',
    title: { en: 'Ground forces', fr: 'Forces terrestres' },
    summary: {
      en: 'Infantry and mechs: units that take and hold planets. They travel inside ships with capacity.',
      fr: 'Infanterie et mécas : les unités qui prennent et tiennent les planètes. Elles voyagent dans des vaisseaux à capacité.',
    },
    aliases: ['infantry', 'mech', 'troops', 'troupes'],
  },
  {
    slug: 'combat-value',
    group: 'combat',
    title: { en: 'Combat value', fr: 'Valeur de combat' },
    summary: {
      en: 'The number a die must equal or beat to score a hit. “(x2)” means the unit rolls two dice.',
      fr: 'Le nombre qu’un dé doit égaler ou dépasser pour toucher. « (x2) » signifie que l’unité lance deux dés.',
    },
    aliases: ['hit on', 'combat', 'roll'],
  },
  {
    slug: 'hits',
    group: 'combat',
    title: { en: 'Hits & damage', fr: 'Touches et dégâts' },
    summary: {
      en: 'Each hit destroys one unit chosen by its owner, unless a unit with sustain damage absorbs it.',
      fr: 'Chaque touche détruit une unité choisie par son propriétaire, sauf si une unité avec SUSTAIN DAMAGE l’absorbe.',
    },
    aliases: ['hit', 'assign hits', 'touche'],
    related: ['sustain-damage'],
  },
  {
    slug: 'retreat',
    group: 'combat',
    title: { en: 'Retreat', fr: 'Retraite' },
    summary: {
      en: 'At the start of a combat round a player may announce a retreat; at the end of the round, all their ships move to an adjacent system they control or have units in.',
      fr: 'Au début d’un round, un joueur peut annoncer une retraite ; à la fin du round, tous ses vaisseaux partent vers un système adjacent où il a des unités ou des planètes.',
    },
    body: {
      en: 'The defender announces first. The destination must not contain enemy ships. Retreating places a command token from reinforcements in the destination.',
      fr: 'Le défenseur annonce en premier. La destination ne doit pas contenir de vaisseaux ennemis. Retraiter place un jeton de vos renforts dans la destination.',
    },
    aliases: ['retreat', 'flee', 'fuir'],
  },
  {
    slug: 'capture',
    group: 'combat',
    title: { en: 'Capture', fr: 'Capture' },
    summary: {
      en: 'A captured unit sits on the captor’s faction sheet and can’t be used by its owner until released.',
      fr: 'Une unité capturée est posée sur la fiche du capteur et son propriétaire ne peut plus l’utiliser tant qu’elle n’est pas libérée.',
    },
    body: {
      en: 'Captured fighters and infantry become tokens; captured ships are kept. The [[faction:cabal|Vuil’raith Cabal]] is the main capturing faction.',
      fr: 'Les chasseurs et infanteries capturés deviennent des jetons ; les vaisseaux sont conservés. Le [[faction:cabal|Vuil’raith Cabal]] est la faction de la capture.',
    },
    aliases: ['captured', 'capturer'],
  },
  {
    slug: 'blockade',
    group: 'combat',
    title: { en: 'Blockade', fr: 'Blocus' },
    summary: {
      en: 'A space dock is blockaded when enemy ships are in its system and none of yours. It cannot produce ships, and any of the blockader’s units it had captured are returned.',
      fr: 'Un dock spatial est bloqué quand des vaisseaux ennemis sont dans son système et aucun des vôtres. Il ne peut plus produire de vaisseaux, et les unités du bloqueur qu’il avait capturées lui sont rendues.',
    },
    aliases: ['blockaded', 'blocus'],
  },

  // ======================================================== UNIT ABILITIES
  {
    slug: 'sustain-damage',
    group: 'units',
    title: { en: 'SUSTAIN DAMAGE', fr: 'SUSTAIN DAMAGE (encaisser)' },
    summary: {
      en: 'The unit can cancel one hit by becoming damaged. A damaged unit is destroyed by the next hit; units are repaired in the status phase.',
      fr: 'L’unité peut annuler une touche en devenant endommagée. Une unité endommagée est détruite à la touche suivante ; les unités sont réparées en phase de statut.',
    },
    aliases: ['sustain', 'damaged', 'repair', 'encaisser', 'endommagé'],
  },
  {
    slug: 'anti-fighter-barrage',
    group: 'units',
    title: { en: 'ANTI-FIGHTER BARRAGE', fr: 'ANTI-FIGHTER BARRAGE (tir antichasseur)' },
    summary: {
      en: 'Before the first round of space combat, the unit fires dice that can only destroy enemy fighters.',
      fr: 'Avant le premier round de combat spatial, l’unité lance des dés qui ne peuvent détruire que des chasseurs ennemis.',
    },
    aliases: ['AFB', 'barrage'],
  },
  {
    slug: 'bombardment',
    group: 'units',
    title: { en: 'BOMBARDMENT', fr: 'BOMBARDMENT (bombardement)' },
    summary: {
      en: 'During invasion, the unit rolls against ground forces on a planet before troops land. Blocked by planetary shield.',
      fr: 'Pendant l’invasion, l’unité tire sur les forces terrestres d’une planète avant le débarquement. Bloqué par PLANETARY SHIELD.',
    },
    aliases: ['bombard', 'bombarder'],
    related: ['planetary-shield', 'invasion'],
  },
  {
    slug: 'space-cannon',
    group: 'units',
    title: { en: 'SPACE CANNON', fr: 'SPACE CANNON (canon spatial)' },
    summary: {
      en: 'Lets a unit (mostly PDS) fire at enemy ships entering its system (offense) and at ground forces landing on its planet (defense).',
      fr: 'Permet à une unité (surtout les SDP) de tirer sur les vaisseaux ennemis entrant dans son système (offensif) et sur les troupes débarquant sur sa planète (défensif).',
    },
    body: {
      en: 'Space cannon offense happens after movement, before space combat — any player with space cannon in range may fire, not just the defender. [[tech:pds2|PDS II]] can also shoot into adjacent systems.',
      fr: 'Le tir offensif a lieu après le mouvement, avant le combat spatial — tout joueur à portée peut tirer, pas seulement le défenseur. [[tech:pds2|PDS II]] peut aussi tirer dans les systèmes adjacents.',
    },
    aliases: ['PDS fire', 'canon'],
  },
  {
    slug: 'planetary-shield',
    group: 'units',
    title: { en: 'PLANETARY SHIELD', fr: 'PLANETARY SHIELD (bouclier planétaire)' },
    summary: {
      en: 'If a planet has a unit with planetary shield, enemy bombardment can’t target it (war suns ignore this).',
      fr: 'Si une planète contient une unité avec PLANETARY SHIELD, le bombardement ennemi ne peut pas la viser (les soleils de guerre l’ignorent).',
    },
    aliases: ['shield', 'bouclier'],
  },
  {
    slug: 'production',
    group: 'units',
    title: { en: 'PRODUCTION', fr: 'PRODUCTION' },
    summary: {
      en: 'Lets a unit (mainly space docks) build units in its system: the number is the max units per activation; you pay their cost in resources.',
      fr: 'Permet à une unité (surtout les docks spatiaux) de produire dans son système : le nombre indique le maximum d’unités par activation ; vous payez leur coût en ressources.',
    },
    body: {
      en: 'A space dock’s PRODUCTION equals its planet’s resources + 2. Fighters and infantry come in pairs for their cost (each counts toward the limit). Ships are placed in the space area, ground forces on the planet. You can’t build ships in a system with enemy ships.',
      fr: 'La PRODUCTION d’un dock spatial vaut les ressources de sa planète + 2. Chasseurs et infanterie sont produits par deux pour leur coût (chacun compte dans la limite). Les vaisseaux vont dans l’espace, les forces terrestres sur la planète. On ne peut pas produire de vaisseaux dans un système contenant des vaisseaux ennemis.',
    },
    aliases: ['produce', 'build', 'construire', 'produire'],
  },
  {
    slug: 'deploy',
    group: 'units',
    title: { en: 'DEPLOY', fr: 'DEPLOY (déploiement)' },
    summary: {
      en: 'A mech ability that puts the mech on the board when its condition triggers, without producing it.',
      fr: 'Capacité de méca qui le place en jeu quand sa condition se déclenche, sans le produire.',
    },
    aliases: ['déployer'],
  },
  {
    slug: 'capacity',
    group: 'movement',
    title: { en: 'Capacity', fr: 'Capacité' },
    summary: {
      en: 'How many fighters and ground forces a ship can carry. Carriers have the most.',
      fr: 'Le nombre de chasseurs et de forces terrestres qu’un vaisseau peut transporter. Les porte-vaisseaux en ont le plus.',
    },
    aliases: ['transport', 'carry'],
    related: ['transport'],
  },
  {
    slug: 'structures',
    group: 'units',
    title: { en: 'Structures', fr: 'Structures' },
    summary: {
      en: 'PDS and space docks: units placed on planets that never move.',
      fr: 'SDP et docks spatiaux : unités placées sur les planètes qui ne se déplacent jamais.',
    },
    aliases: ['structure', 'PDS', 'space dock'],
  },

  // ============================================================ MOVEMENT
  {
    slug: 'movement',
    group: 'movement',
    title: { en: 'Movement', fr: 'Déplacement' },
    summary: {
      en: 'Ships move a number of systems equal to their move value into the active system; they can’t pass through enemy ships or leave systems with your tokens.',
      fr: 'Les vaisseaux se déplacent d’autant de systèmes que leur mouvement jusqu’au système actif ; ils ne peuvent ni traverser des vaisseaux ennemis ni quitter un système contenant votre jeton.',
    },
    body: {
      en: 'Ships may pick up ground forces and fighters along the way (see [[transport]]). [[anomalies|Anomalies]] restrict movement; [[wormholes]] create shortcuts.',
      fr: 'Les vaisseaux peuvent embarquer forces terrestres et chasseurs en chemin (voir [[transport]]). Les [[anomalies]] gênent le mouvement ; les [[wormholes|trous de ver]] créent des raccourcis.',
    },
    aliases: ['move', 'déplacer'],
    related: ['move-value', 'transport'],
  },
  {
    slug: 'move-value',
    group: 'movement',
    title: { en: 'Move value', fr: 'Valeur de mouvement' },
    summary: {
      en: 'The maximum number of systems a ship can move during a tactical action.',
      fr: 'Le nombre maximal de systèmes qu’un vaisseau peut parcourir pendant une action tactique.',
    },
    aliases: ['move', 'speed', 'vitesse'],
  },
  {
    slug: 'transport',
    group: 'movement',
    title: { en: 'Transport', fr: 'Transport' },
    summary: {
      en: 'Ships with capacity carry fighters and ground forces from their starting system and any systems they move through (if those systems don’t hold your tokens).',
      fr: 'Les vaisseaux à capacité emportent chasseurs et forces terrestres depuis leur système de départ et les systèmes traversés (s’ils ne contiennent pas votre jeton).',
    },
    aliases: ['carry', 'transporter'],
  },
  {
    slug: 'adjacency',
    group: 'movement',
    title: { en: 'Adjacency', fr: 'Adjacence' },
    summary: {
      en: 'Systems sharing an edge are adjacent; matching wormholes also make systems adjacent. A planet is adjacent to its own system and its neighbors.',
      fr: 'Les systèmes partageant un côté sont adjacents ; des trous de ver identiques rendent aussi des systèmes adjacents.',
    },
    aliases: ['adjacent', 'adjacents'],
  },
  {
    slug: 'wormholes',
    group: 'map',
    title: { en: 'Wormholes', fr: 'Trous de ver' },
    summary: {
      en: 'Systems with the same wormhole type (alpha, beta, gamma, delta) are adjacent to each other.',
      fr: 'Les systèmes ayant le même type de trou de ver (alpha, bêta, gamma, delta) sont adjacents entre eux.',
    },
    body: {
      en: 'Alpha connects to alpha, beta to beta. Delta wormholes are mostly the [[faction:ghost|Creuss]]’ territory. Gamma wormholes appear through exploration and the [[wormhole-nexus]].',
      fr: 'Alpha relie alpha, bêta relie bêta. Les trous de ver delta sont surtout le domaine des [[faction:ghost|Creuss]]. Les gamma apparaissent via l’exploration et le [[wormhole-nexus|Nexus]].',
    },
    aliases: ['wormhole', 'alpha', 'beta', 'gamma', 'delta', 'trou de ver'],
  },

  // ================================================================= MAP
  {
    slug: 'mecatol-rex',
    group: 'map',
    title: { en: 'Mecatol Rex', fr: 'Mecatol Rex' },
    summary: {
      en: 'The former imperial capital at the centre of the galaxy (1 resource, 6 influence). Guarded by the custodians token at the start.',
      fr: 'L’ancienne capitale impériale au centre de la galaxie (1 ressource, 6 influence). Gardée au départ par le jeton des Gardiens.',
    },
    body: {
      en: 'Holding Mecatol scores with [[strategy:imperial|Imperial]] and helps many objectives. It is also exposed: every player can reach it.',
      fr: 'Tenir Mecatol rapporte des points avec [[strategy:imperial|Imperial]] et aide pour de nombreux objectifs. Mais tout le monde peut l’atteindre.',
    },
    aliases: ['mecatol', 'MR', 'rex', 'capital'],
    related: ['custodians-token'],
  },
  {
    slug: 'custodians-token',
    group: 'map',
    title: { en: 'Custodians token', fr: 'Jeton des Gardiens' },
    summary: {
      en: 'Placed on Mecatol Rex at setup. Spend 6 influence while landing ground forces there to remove it: gain 1 VP and start the agenda phase.',
      fr: 'Placé sur Mecatol Rex au départ. Dépensez 6 d’influence en y débarquant pour le retirer : gagnez 1 PV et lancez les phases d’ordre du jour.',
    },
    aliases: ['custodian', 'custodians', 'gardiens'],
  },
  {
    slug: 'anomalies',
    group: 'map',
    title: { en: 'Anomalies', fr: 'Anomalies' },
    summary: {
      en: 'Special systems with movement or combat effects: asteroid fields, nebulae, supernovas and gravity rifts.',
      fr: 'Systèmes spéciaux avec effets sur le mouvement ou le combat : champs d’astéroïdes, nébuleuses, supernovas et failles gravitationnelles.',
    },
    body: {
      en: '- [[asteroid-field|Asteroid field]] — ships can’t enter.\n- [[nebula|Nebula]] — ships must stop; defender +1.\n- [[supernova|Supernova]] — ships can’t enter.\n- [[gravity-rift|Gravity rift]] — speed boost, risk of loss.',
      fr: '- [[asteroid-field|Champ d’astéroïdes]] — infranchissable.\n- [[nebula|Nébuleuse]] — arrêt obligatoire ; défenseur +1.\n- [[supernova|Supernova]] — infranchissable.\n- [[gravity-rift|Faille gravitationnelle]] — accélère, au risque de pertes.',
    },
    aliases: ['anomaly', 'anomalie'],
  },
  {
    slug: 'asteroid-field',
    group: 'map',
    title: { en: 'Asteroid field', fr: 'Champ d’astéroïdes' },
    summary: {
      en: 'Ships cannot move into or through it — unless they have Antimass Deflectors.',
      fr: 'Les vaisseaux ne peuvent ni y entrer ni le traverser — sauf avec Antimass Deflectors.',
    },
    aliases: ['asteroids', 'astéroïdes'],
    related: ['tech:amd'],
  },
  {
    slug: 'nebula',
    group: 'map',
    title: { en: 'Nebula', fr: 'Nébuleuse' },
    summary: {
      en: 'Ships can only enter as the active system and must stop there; ships starting there have move 1. The defender gets +1 in combat.',
      fr: 'On ne peut y entrer que s’il s’agit du système actif et il faut s’y arrêter ; les vaisseaux qui y commencent ont un mouvement de 1. Le défenseur y gagne +1 au combat.',
    },
    aliases: ['nebulae', 'nébuleuses'],
  },
  {
    slug: 'supernova',
    group: 'map',
    title: { en: 'Supernova', fr: 'Supernova' },
    summary: {
      en: 'Ships cannot move into or through it (the Embers of Muaat are the exception).',
      fr: 'Les vaisseaux ne peuvent ni y entrer ni la traverser (sauf les Braises de Muaat).',
    },
    aliases: ['supernovae'],
  },
  {
    slug: 'gravity-rift',
    group: 'map',
    title: { en: 'Gravity rift', fr: 'Faille gravitationnelle' },
    summary: {
      en: 'Ships leaving or passing through get +1 move, but each rolls a die: on 1–3 it is destroyed.',
      fr: 'Les vaisseaux qui en sortent ou la traversent gagnent +1 en mouvement, mais chacun lance un dé : sur 1–3 il est détruit.',
    },
    aliases: ['rift', 'faille'],
  },
  {
    slug: 'planet-traits',
    group: 'map',
    title: { en: 'Planet traits', fr: 'Traits des planètes' },
    summary: {
      en: 'Most planets are cultural, hazardous or industrial. Traits matter for objectives and choose which exploration deck to draw from.',
      fr: 'La plupart des planètes sont culturelles, hostiles ou industrielles. Les traits comptent pour certains objectifs et déterminent le paquet d’exploration.',
    },
    aliases: ['cultural', 'hazardous', 'industrial', 'culturelle', 'hostile', 'industrielle', 'trait'],
    related: ['exploration'],
  },
  {
    slug: 'legendary-planets',
    group: 'pok',
    title: { en: 'Legendary planets', fr: 'Planètes légendaires' },
    summary: {
      en: 'Rare planets (Primor, Hope’s End, Mallice…) that come with a legendary ability card usable once per round.',
      fr: 'Planètes rares (Primor, Hope’s End, Mallice…) accompagnées d’une carte de capacité légendaire utilisable une fois par tour.',
    },
    aliases: ['legendary', 'légendaire'],
  },
  {
    slug: 'wormhole-nexus',
    group: 'pok',
    title: { en: 'Wormhole Nexus', fr: 'Nexus des trous de ver' },
    summary: {
      en: 'Off-board system with alpha, beta and gamma wormholes and the legendary planet Mallice. It becomes active once a unit enters it.',
      fr: 'Système hors plateau avec trous de ver alpha, bêta et gamma et la planète légendaire Mallice. Il s’active dès qu’une unité y entre.',
    },
    aliases: ['nexus', 'mallice'],
  },

  // ============================================================= ECONOMY
  {
    slug: 'resources',
    group: 'economy',
    title: { en: 'Resources', fr: 'Ressources' },
    summary: {
      en: 'The left number on a planet. Spent (by exhausting planets) to produce units and research technology.',
      fr: 'Le chiffre de gauche d’une planète. Dépensé (en épuisant des planètes) pour produire des unités et rechercher des technologies.',
    },
    aliases: ['resource', 'res', 'ressource'],
    related: ['influence', 'trade-goods'],
  },
  {
    slug: 'influence',
    group: 'economy',
    title: { en: 'Influence', fr: 'Influence' },
    summary: {
      en: 'The right number on a planet. Spent to gain command tokens (Leadership), vote on agendas and pay certain costs.',
      fr: 'Le chiffre de droite d’une planète. Dépensé pour gagner des jetons (Leadership), voter et payer certains coûts.',
    },
    aliases: ['inf', 'votes'],
    related: ['resources', 'voting'],
  },
  {
    slug: 'trade-goods',
    group: 'economy',
    title: { en: 'Trade goods', fr: 'Biens commerciaux' },
    summary: {
      en: 'Universal currency: each trade good can be spent as 1 resource or 1 influence (but not for votes).',
      fr: 'Monnaie universelle : chaque bien commercial vaut 1 ressource ou 1 influence (mais ne sert pas à voter).',
    },
    aliases: ['TG', 'tg', 'money', 'argent'],
    related: ['commodities'],
  },
  {
    slug: 'commodities',
    group: 'economy',
    title: { en: 'Commodities', fr: 'Marchandises' },
    summary: {
      en: 'Worthless to you, but they become trade goods when given to another player. Refilled up to your faction’s commodity value.',
      fr: 'Sans valeur pour vous, mais elles deviennent des biens commerciaux quand vous les donnez à un autre joueur. Rechargées jusqu’à la valeur de votre faction.',
    },
    body: {
      en: 'Commodities are refilled mainly through [[strategy:trade|Trade]]. Swapping commodities with a neighbor turns both stacks into trade goods — the basis of the trade economy.',
      fr: 'On les recharge surtout via [[strategy:trade|Trade]]. Échanger ses marchandises avec un voisin transforme les deux piles en biens commerciaux — la base de l’économie de commerce.',
    },
    aliases: ['comms', 'commodity', 'marchandise'],
    related: ['transactions', 'trade-goods'],
  },
  {
    slug: 'transactions',
    group: 'economy',
    title: { en: 'Transactions', fr: 'Transactions' },
    summary: {
      en: 'Once per neighbor per turn, during your turn you may exchange commodities, trade goods and promissory notes with them. Deals are not binding.',
      fr: 'Une fois par voisin et par tour, pendant votre tour, vous pouvez échanger marchandises, biens commerciaux et billets à ordre. Les accords ne sont pas contraignants.',
    },
    body: {
      en: 'Only the active player can initiate a transaction (also during the agenda phase, with anyone). Promises about future actions are allowed but not enforceable — except what is physically exchanged.',
      fr: 'Seul le joueur actif peut initier une transaction (également en phase d’ordre du jour, avec n’importe qui). Les promesses sont permises mais non contraignantes.',
    },
    aliases: ['trade', 'deal', 'negotiate', 'commerce', 'négocier'],
  },

  // =========================================================== POLITICS
  {
    slug: 'voting',
    group: 'politics',
    title: { en: 'Voting', fr: 'Vote' },
    summary: {
      en: 'Exhaust planets to cast votes equal to their influence for one outcome; trade goods cannot be used for votes.',
      fr: 'Épuisez des planètes pour obtenir autant de voix que leur influence pour un résultat ; les biens commerciaux ne servent pas à voter.',
    },
    aliases: ['vote', 'votes', 'voter'],
    related: ['agenda-phase', 'influence'],
  },
  {
    slug: 'agendas',
    group: 'politics',
    title: { en: 'Agendas', fr: 'Ordres du jour' },
    summary: {
      en: 'Cards voted on in the agenda phase. They are either laws (permanent) or directives (one-time).',
      fr: 'Cartes votées en phase d’ordre du jour. Ce sont des lois (permanentes) ou des directives (ponctuelles).',
    },
    aliases: ['agenda card', 'ordre du jour'],
    related: ['laws', 'directives', 'kind:agenda'],
  },
  {
    slug: 'laws',
    group: 'politics',
    title: { en: 'Laws', fr: 'Lois' },
    summary: {
      en: 'Agendas that stay in play permanently once passed (unless repealed). If “Against” wins, a law’s against effect resolves and it is discarded.',
      fr: 'Ordres du jour qui restent en jeu de façon permanente une fois adoptés (sauf abrogation).',
    },
    aliases: ['law', 'loi'],
  },
  {
    slug: 'directives',
    group: 'politics',
    title: { en: 'Directives', fr: 'Directives' },
    summary: {
      en: 'Agendas that resolve once and are then discarded.',
      fr: 'Ordres du jour qui s’appliquent une fois puis sont défaussés.',
    },
    aliases: ['directive'],
  },
  {
    slug: 'elect',
    group: 'politics',
    title: { en: 'Elect', fr: 'Élire' },
    summary: {
      en: 'Some agendas ask players to vote for a player, planet, law or card instead of For/Against; the winner is “elected”.',
      fr: 'Certains ordres du jour font voter pour un joueur, une planète, une loi ou une carte au lieu de Pour/Contre ; le gagnant est « élu ».',
    },
    aliases: ['elected', 'élu'],
  },
  {
    slug: 'riders',
    group: 'politics',
    title: { en: 'Riders', fr: 'Riders' },
    summary: {
      en: 'Action cards played after an agenda is revealed: you give up your vote, predict the outcome, and gain a reward if right.',
      fr: 'Cartes action jouées après la révélation d’un ordre du jour : vous renoncez à voter, prédisez le résultat et gagnez une récompense si vous avez raison.',
    },
    aliases: ['rider', 'predict', 'prédire'],
  },

  // ================================================================ POK
  {
    slug: 'exploration',
    group: 'pok',
    title: { en: 'Exploration', fr: 'Exploration' },
    summary: {
      en: 'When you take control of a planet for the first time, draw a card from the exploration deck matching its trait and resolve it.',
      fr: 'Quand vous prenez le contrôle d’une planète pour la première fois, piochez une carte du paquet d’exploration correspondant à son trait et appliquez-la.',
    },
    body: {
      en: 'There are four exploration decks: cultural, hazardous, industrial and frontier (for [[frontier-tokens]]). Results include trade goods, units, [[attachments]] and [[relic-fragments]].',
      fr: 'Il existe quatre paquets : culturel, hostile, industriel et frontière (pour les [[frontier-tokens|jetons frontière]]). On y trouve des biens commerciaux, des unités, des [[attachments|attachements]] et des [[relic-fragments|fragments de relique]].',
    },
    aliases: ['explore', 'explorer'],
    related: ['kind:explore'],
  },
  {
    slug: 'frontier-tokens',
    group: 'pok',
    title: { en: 'Frontier tokens', fr: 'Jetons frontière' },
    summary: {
      en: 'Placed in empty systems at setup; explored with Dark Energy Tap or certain effects to draw from the frontier deck.',
      fr: 'Placés dans les systèmes vides à la mise en place ; explorés via Dark Energy Tap ou certains effets pour piocher dans le paquet frontière.',
    },
    aliases: ['frontier', 'frontière'],
  },
  {
    slug: 'relic-fragments',
    group: 'pok',
    title: { en: 'Relic fragments', fr: 'Fragments de relique' },
    summary: {
      en: 'Exploration cards that can be combined: purge 3 of the same type (unknown counts as any) to gain a relic.',
      fr: 'Cartes d’exploration à combiner : retirez-en 3 du même type (l’inconnu compte comme n’importe lequel) pour gagner une relique.',
    },
    aliases: ['fragment', 'fragments'],
    related: ['kind:relic'],
  },
  {
    slug: 'attachments',
    group: 'pok',
    title: { en: 'Attachments', fr: 'Attachements' },
    summary: {
      en: 'Exploration results attached to a planet, usually boosting its values or adding a tech specialty. They stay with the planet when it changes hands.',
      fr: 'Résultats d’exploration attachés à une planète, augmentant ses valeurs ou ajoutant une spécialité. Ils restent avec la planète si elle change de main.',
    },
    aliases: ['attach', 'attachment'],
  },
  {
    slug: 'leaders',
    group: 'pok',
    title: { en: 'Leaders', fr: 'Dirigeants' },
    summary: {
      en: 'Each faction has an agent (ready from the start), a commander (unlocked by a condition) and a hero (unlocked with 3 scored objectives).',
      fr: 'Chaque faction a un agent (prêt dès le départ), un commandant (débloqué par une condition) et un héros (débloqué avec 3 objectifs marqués).',
    },
    aliases: ['leader', 'dirigeant'],
    related: ['agents', 'commanders', 'heroes'],
  },
  {
    slug: 'agents',
    group: 'pok',
    title: { en: 'Agents', fr: 'Agents' },
    summary: {
      en: 'Unlocked from the start; exhaust to use, readies each status phase. Many agents can be used on other players — a great bargaining chip.',
      fr: 'Disponibles dès le départ ; s’épuisent à l’usage et se redressent en phase de statut. Beaucoup peuvent bénéficier à d’autres joueurs — une bonne monnaie d’échange.',
    },
    aliases: ['agent'],
  },
  {
    slug: 'commanders',
    group: 'pok',
    title: { en: 'Commanders', fr: 'Commandants' },
    summary: {
      en: 'Passive abilities unlocked when you meet the condition on the card. The Alliance promissory note shares them with others.',
      fr: 'Capacités passives débloquées quand la condition de la carte est remplie. Le billet Alliance permet de les partager.',
    },
    aliases: ['commander', 'commandant'],
  },
  {
    slug: 'heroes',
    group: 'pok',
    title: { en: 'Heroes', fr: 'Héros' },
    summary: {
      en: 'Unlocked when you have scored 3 objectives; very powerful, usually used once and then purged.',
      fr: 'Débloqués après 3 objectifs marqués ; très puissants, généralement utilisés une fois puis retirés du jeu.',
    },
    aliases: ['hero', 'héros'],
  },
]
