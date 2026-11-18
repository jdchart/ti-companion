/**
 * Original summaries of faction abilities, leaders, promissory notes and
 * faction units. Paraphrased in our own words — NOT card text.
 * Keyword abilities (SUSTAIN DAMAGE, PRODUCTION…) keep their English names in
 * the French text, as players usually refer to them that way.
 */
import type { SummaryMap } from '../types'

export const abilitySummaries: SummaryMap = {
  mitosis: {
    en: 'Each [[status-phase]], place 1 free infantry on a planet you control. Downside: your space docks cannot build infantry.',
    fr: 'À chaque [[status-phase|phase de statut]], placez gratuitement 1 infanterie sur une planète que vous contrôlez. En contrepartie, vos docks spatiaux ne peuvent pas produire d’infanterie.',
  },
  creuss_gate: {
    en: 'Your real home system sits off the board; the Creuss Gate tile takes its place on the map and connects to it through a delta [[wormholes|wormhole]].',
    fr: 'Votre vrai système d’origine est hors du plateau ; la tuile Porte de Creuss prend sa place sur la carte et y est reliée par un [[wormholes|trou de ver]] delta.',
  },
  quantum_entanglement: {
    en: 'For you, every alpha and beta [[wormholes|wormhole]] system is adjacent to every other. Nothing can switch this off.',
    fr: 'Pour vous, tous les systèmes à [[wormholes|trou de ver]] alpha et bêta sont adjacents entre eux. Rien ne peut l’empêcher.',
  },
  slipstream: {
    en: 'Ships starting their move in your home system or in a wormhole system get +1 [[move-value|move]].',
    fr: 'Les vaisseaux qui commencent leur déplacement dans votre système d’origine ou dans un système à trou de ver gagnent +1 en [[move-value|mouvement]].',
  },
  arbiters: {
    en: 'You may include [[action-cards]] in [[transactions]].',
    fr: 'Vous pouvez inclure des [[action-cards|cartes action]] dans vos [[transactions]].',
  },
  guild_ships: {
    en: 'You can make [[transactions]] with any player, not just your [[neighbors]].',
    fr: 'Vous pouvez faire des [[transactions]] avec n’importe quel joueur, pas seulement vos [[neighbors|voisins]].',
  },
  master_of_trade: {
    en: 'You may use the secondary of [[strategy:trade|Trade]] without spending a strategy token.',
    fr: 'Vous pouvez utiliser la capacité secondaire de [[strategy:trade|Trade]] sans dépenser de jeton de stratégie.',
  },
  analytical: {
    en: 'When researching a non-[[unit-upgrades|unit-upgrade]] technology, ignore one [[prerequisites|prerequisite]].',
    fr: 'Quand vous recherchez une technologie qui n’est pas une [[unit-upgrades|amélioration d’unité]], ignorez un [[prerequisites|prérequis]].',
  },
  brilliant: {
    en: 'When you follow [[strategy:technology|Technology]], you may resolve its primary ability instead of the secondary.',
    fr: 'Quand vous suivez [[strategy:technology|Technology]], vous pouvez résoudre la capacité principale au lieu de la secondaire.',
  },
  fragile: {
    en: 'All your units suffer −1 on combat rolls.',
    fr: 'Toutes vos unités subissent −1 à leurs jets de combat.',
  },
  assimilate: {
    en: 'When you take a planet, enemy PDS and space docks there become yours.',
    fr: 'Quand vous prenez une planète, les SDP et docks spatiaux ennemis qui s’y trouvent deviennent les vôtres.',
  },
  harrow: {
    en: 'After each round of [[ground-combat]], your ships in the system may [[bombardment|bombard]] the planet again.',
    fr: 'Après chaque round de [[ground-combat|combat terrestre]], vos vaisseaux du système peuvent à nouveau [[bombardment|bombarder]] la planète.',
  },
  armada: {
    en: 'Your [[fleet-pool|fleet limit]] in each system is your fleet tokens + 2 (non-fighter ships).',
    fr: 'Votre [[fleet-pool|limite de flotte]] dans chaque système est égale à vos jetons de flotte + 2 (vaisseaux hors chasseurs).',
  },
  munitions: {
    en: 'At the start of each space combat round, pay 2 [[trade-goods]] to reroll any of your dice for that round.',
    fr: 'Au début de chaque round de combat spatial, payez 2 [[trade-goods|biens commerciaux]] pour relancer autant de vos dés que voulu pendant ce round.',
  },
  ambush: {
    en: 'Before a [[space-combat]] starts, up to 2 of your cruisers/destroyers fire a free shot each.',
    fr: 'Avant le début d’un [[space-combat|combat spatial]], jusqu’à 2 de vos croiseurs/destroyers tirent gratuitement une fois chacun.',
  },
  pillage: {
    en: 'When a [[neighbors|neighbor]] with 3+ trade goods gains trade goods or completes a transaction, steal 1 trade good or commodity from them.',
    fr: 'Quand un [[neighbors|voisin]] qui possède 3 biens commerciaux ou plus en gagne ou conclut une transaction, volez-lui 1 bien commercial ou 1 marchandise.',
  },
  gashlai_physiology: {
    en: 'Your ships can move through [[supernova|supernovas]].',
    fr: 'Vos vaisseaux peuvent traverser les [[supernova|supernovas]].',
  },
  star_forge: {
    en: 'Component action: spend a strategy token to place 2 fighters or 1 destroyer in a system with your war sun.',
    fr: 'Action de composant : dépensez un jeton de stratégie pour placer 2 chasseurs ou 1 destroyer dans un système contenant votre soleil de guerre.',
  },
  foresight: {
    en: 'When enemy ships move into your ships’ system, spend a strategy token to slip your ships away to an adjacent empty system.',
    fr: 'Quand des vaisseaux ennemis entrent dans un système contenant vos vaisseaux, dépensez un jeton de stratégie pour les replier vers un système adjacent vide.',
  },
  telepathic: {
    en: 'You hold the “0” token: you always act first in [[initiative-order]].',
    fr: 'Vous possédez le jeton « 0 » : vous agissez toujours en premier dans l’[[initiative-order|ordre d’initiative]].',
  },
  galactic_threat: {
    en: 'You cannot vote. Once per agenda phase, predict an outcome; if right, take a technology from a player who voted for it.',
    fr: 'Vous ne pouvez pas voter. Une fois par phase d’ordre du jour, prédisez un résultat ; si vous avez raison, prenez une technologie à un joueur ayant voté pour lui.',
  },
  propagation: {
    en: 'You cannot research technology. Whenever you would, gain 3 [[command-tokens]] instead.',
    fr: 'Vous ne pouvez pas rechercher de technologie. À la place, vous gagnez 3 [[command-tokens|jetons de commandement]].',
  },
  technological_singularity: {
    en: 'Once per combat, when you destroy an enemy unit, steal one of that player’s technologies.',
    fr: 'Une fois par combat, quand vous détruisez une unité adverse, volez une technologie à ce joueur.',
  },
  nomadic: {
    en: 'You can score objectives without controlling your home planets.',
    fr: 'Vous pouvez marquer des objectifs sans contrôler vos planètes d’origine.',
  },
  scavenge: {
    en: 'Gain 1 trade good whenever you take control of a planet.',
    fr: 'Gagnez 1 bien commercial chaque fois que vous prenez le contrôle d’une planète.',
  },
  unrelenting: {
    en: 'All your units get +1 on combat rolls.',
    fr: 'Toutes vos unités gagnent +1 à leurs jets de combat.',
  },
  orbital_drop: {
    en: 'Component action: spend a strategy token to drop 2 infantry on a planet you control.',
    fr: 'Action de composant : dépensez un jeton de stratégie pour déposer 2 infanteries sur une planète que vous contrôlez.',
  },
  versatile: {
    en: 'Gain 1 extra [[command-tokens|command token]] each status phase.',
    fr: 'Gagnez 1 [[command-tokens|jeton de commandement]] supplémentaire à chaque phase de statut.',
  },
  blood_ties: {
    en: 'You don’t pay the 6 influence to remove the [[custodians-token]] from Mecatol Rex.',
    fr: 'Vous n’avez pas à payer 6 d’influence pour retirer le [[custodians-token|jeton des Gardiens]] de Mecatol Rex.',
  },
  reclamation: {
    en: 'After taking [[mecatol-rex|Mecatol Rex]], you may place a free PDS and space dock there.',
    fr: 'Après avoir pris [[mecatol-rex|Mecatol Rex]], vous pouvez y placer gratuitement un SDP et un dock spatial.',
  },
  peace_accords: {
    en: 'After using [[strategy:diplomacy|Diplomacy]] (primary or secondary), claim an empty planet adjacent to one of yours.',
    fr: 'Après avoir utilisé [[strategy:diplomacy|Diplomacy]] (principale ou secondaire), prenez une planète vide adjacente à l’une des vôtres.',
  },
  quash: {
    en: 'When an agenda is revealed, spend a strategy token to discard it and reveal another.',
    fr: 'Quand un ordre du jour est révélé, dépensez un jeton de stratégie pour le défausser et en révéler un autre.',
  },
  devotion: {
    en: 'After each space combat round, you may destroy one of your cruisers or destroyers to inflict 1 hit.',
    fr: 'Après chaque round de combat spatial, vous pouvez détruire un de vos croiseurs ou destroyers pour infliger 1 touche.',
  },
  indoctrination: {
    en: 'At the start of a ground combat, pay 2 influence to convert one enemy infantry into yours.',
    fr: 'Au début d’un combat terrestre, payez 2 d’influence pour convertir une infanterie adverse en l’une des vôtres.',
  },
  crafty: {
    en: 'No hand limit for [[action-cards]].',
    fr: 'Aucune limite de main pour les [[action-cards|cartes action]].',
  },
  scheming: {
    en: 'Whenever you draw action cards, draw one extra, then discard one.',
    fr: 'Chaque fois que vous piochez des cartes action, piochez-en une de plus, puis défaussez-en une.',
  },
  stall_tactics: {
    en: 'Component action: discard an action card. Effectively lets you “pass a turn” without passing.',
    fr: 'Action de composant : défaussez une carte action. Permet en pratique de « passer un tour » sans passer.',
  },
  raid_formation: {
    en: 'Excess [[anti-fighter-barrage]] hits (beyond the enemy fighters) damage enemy ships that have [[sustain-damage]].',
    fr: 'Les touches de [[anti-fighter-barrage]] en excès (au-delà des chasseurs ennemis) endommagent des vaisseaux adverses ayant [[sustain-damage]].',
  },
  zeal: {
    en: 'You always vote first and get 1 extra vote per player in the game when you vote.',
    fr: 'Vous votez toujours en premier et gagnez 1 vote supplémentaire par joueur dans la partie quand vous votez.',
  },
  amalgamation: {
    en: 'When producing a unit, return a [[capture|captured]] unit of the same type to build it for free.',
    fr: 'En produisant une unité, rendez une unité [[capture|capturée]] du même type pour la construire gratuitement.',
  },
  devour: {
    en: 'Enemy non-structure units you destroy in combat are [[capture|captured]] instead of returned.',
    fr: 'Les unités adverses (hors structures) détruites au combat sont [[capture|capturées]] par vous.',
  },
  riftmeld: {
    en: 'Return a captured unit to research the matching [[unit-upgrades|unit upgrade]] while ignoring prerequisites.',
    fr: 'Rendez une unité capturée pour rechercher l’[[unit-upgrades|amélioration]] correspondante en ignorant les prérequis.',
  },
  aetherpassage: {
    en: 'You can let another player move through systems containing your ships.',
    fr: 'Vous pouvez autoriser un autre joueur à traverser des systèmes contenant vos vaisseaux.',
  },
  dark_whispers: {
    en: 'You start with two faction promissory notes instead of one.',
    fr: 'Vous commencez avec deux billets à ordre de faction au lieu d’un.',
  },
  voidborn: {
    en: '[[nebula|Nebulae]] do not hinder your ships’ movement.',
    fr: 'Les [[nebula|nébuleuses]] ne gênent pas le déplacement de vos vaisseaux.',
  },
  edict: {
    en: 'When you win a combat, put one of the loser’s command tokens in your fleet pool. Those tokens raise your fleet limit.',
    fr: 'Quand vous gagnez un combat, placez un jeton de commandement du perdant dans votre réserve de flotte. Ces jetons augmentent votre limite de flotte.',
  },
  hubris: {
    en: 'Your “Alliance” note is removed at setup, and nobody can give you theirs.',
    fr: 'Votre billet « Alliance » est retiré à la mise en place, et personne ne peut vous donner le sien.',
  },
  imperia: {
    en: 'While you hold a player’s token in your fleet pool, you can use their unlocked [[commanders|commander]].',
    fr: 'Tant que vous avez un jeton d’un joueur dans votre réserve de flotte, vous pouvez utiliser son [[commanders|commandant]] débloqué.',
  },
  distant_suns: {
    en: 'When exploring a planet with your mech, draw 2 cards and pick one.',
    fr: 'Quand vous explorez une planète contenant votre méca, piochez 2 cartes et choisissez-en une.',
  },
  fabrication: {
    en: 'Component action: trade 2 matching [[relic-fragments]] for a relic, or 1 fragment for a command token.',
    fr: 'Action de composant : échangez 2 [[relic-fragments|fragments de relique]] identiques contre une relique, ou 1 fragment contre un jeton de commandement.',
  },
  future_sight: {
    en: 'Gain 1 trade good whenever an agenda outcome you voted for or predicted is resolved.',
    fr: 'Gagnez 1 bien commercial chaque fois qu’un résultat pour lequel vous avez voté (ou que vous avez prédit) est appliqué.',
  },
  the_company: {
    en: 'You have three [[agents]] instead of one.',
    fr: 'Vous avez trois [[agents]] au lieu d’un.',
  },
  awaken: {
    en: 'When you activate a system with your sleeper tokens, turn them into PDS.',
    fr: 'Quand vous activez un système contenant vos jetons dormeurs, transformez-les en SDP.',
  },
  coalescence: {
    en: 'If your flagship or Awaken puts your units next to an enemy’s, a combat must happen there.',
    fr: 'Si votre vaisseau amiral ou Awaken place vos unités au même endroit qu’un adversaire, un combat a lieu.',
  },
  terragenesis: {
    en: 'After exploring a planet without a sleeper, you may place or move a sleeper token onto it.',
    fr: 'Après avoir exploré une planète sans dormeur, vous pouvez y placer ou y déplacer un jeton dormeur.',
  },
  council_patronage: {
    en: 'At the start of each strategy phase, refill your commodities and gain 1 trade good.',
    fr: 'Au début de chaque phase de stratégie, rechargez vos marchandises et gagnez 1 bien commercial.',
  },
  laws_order: {
    en: 'At the start of any turn, pay 1 trade good or commodity to ignore all [[laws]] for that turn.',
    fr: 'Au début de n’importe quel tour, payez 1 bien commercial ou 1 marchandise pour ignorer toutes les [[laws|lois]] pendant ce tour.',
  },
  the_tribuni: {
    en: 'At setup, borrow the home system of an unpicked faction among Mentak, Xxcha and Argent, and take the matching Keleres hero.',
    fr: 'À la mise en place, empruntez le système d’origine d’une faction non jouée parmi Mentak, Xxcha et Argent, et prenez le héros Keleres correspondant.',
  },
}

export const leaderSummaries: SummaryMap = {
  // ---- agents (always unlocked, exhaust to use, ready in status phase)
  arborecagent: {
    en: 'Let any player upgrade one non-fighter ship to a ship costing up to 2 more.',
    fr: 'Permet à un joueur de remplacer un vaisseau (hors chasseur) par un vaisseau coûtant jusqu’à 2 de plus.',
  },
  argentagent: {
    en: 'When a player builds ground forces, they can place them on their planets in that system or adjacent ones.',
    fr: 'Quand un joueur produit des forces terrestres, il peut les placer sur ses planètes de ce système ou de systèmes adjacents.',
  },
  cabalagent: {
    en: 'After a player refreshes commodities: convert them to trade goods and capture one of their units of matching cost.',
    fr: 'Après qu’un joueur a rechargé ses marchandises : convertissez-les en biens commerciaux et capturez une de ses unités de coût équivalent.',
  },
  ghostagent: {
    en: 'For one tactical action, a wormhole system becomes adjacent to every other wormhole system.',
    fr: 'Pendant une action tactique, un système à trou de ver devient adjacent à tous les autres systèmes à trou de ver.',
  },
  empyreanagent: {
    en: 'When a player moves ships into a system without planets, they gain a command token.',
    fr: 'Quand un joueur déplace des vaisseaux dans un système sans planète, il gagne un jeton de commandement.',
  },
  hacanagent: {
    en: 'Gain 2 commodities, or refill another player’s commodities (great for trade deals).',
    fr: 'Gagnez 2 marchandises, ou rechargez celles d’un autre joueur (idéal pour négocier).',
  },
  jolnaragent: {
    en: 'When a player researches, they can remove infantry from the board to discount the cost 1 per infantry.',
    fr: 'Quand un joueur recherche, il peut retirer de l’infanterie du plateau pour réduire le coût de 1 par infanterie.',
  },
  keleresagent: {
    en: 'Let any player spend commodities as if they were trade goods.',
    fr: 'Permet à un joueur de dépenser ses marchandises comme des biens commerciaux.',
  },
  l1z1xagent: {
    en: 'After a player activates a system, they can swap one of their infantry there for a mech.',
    fr: 'Après l’activation d’un système, le joueur peut remplacer une de ses infanteries sur place par un méca.',
  },
  letnevagent: {
    en: 'At the start of a space combat round, one ship rolls an extra die.',
    fr: 'Au début d’un round de combat spatial, un vaisseau lance un dé supplémentaire.',
  },
  mahactagent: {
    en: 'When following a strategy card, use the active player’s token from the board instead of your own.',
    fr: 'Quand vous suivez une carte stratégie, utilisez un jeton du joueur actif pris sur le plateau au lieu du vôtre.',
  },
  mentakagent: {
    en: 'After Pillage is used, you and the pillaged player each draw an action card.',
    fr: 'Après une utilisation de Pillage, vous et le joueur pillé piochez chacun une carte action.',
  },
  muaatagent: {
    en: 'A player may build up to 2 cheap units (cost ≤ 4) at their war sun or flagship.',
    fr: 'Un joueur peut produire jusqu’à 2 unités de coût ≤ 4 là où se trouve son soleil de guerre ou son vaisseau amiral.',
  },
  naazagent: {
    en: 'At the end of a player’s turn, let them explore one of their planets.',
    fr: 'À la fin du tour d’un joueur, il peut explorer une de ses planètes.',
  },
  nekroagent: {
    en: 'A player may discard an action card or spend a command token to gain 2 trade goods.',
    fr: 'Un joueur peut défausser une carte action ou dépenser un jeton de commandement pour gagner 2 biens commerciaux.',
  },
  nomadagentartuno: {
    en: 'Stores a copy of the trade goods you gain; you collect them when this agent readies.',
    fr: 'Met de côté autant de biens commerciaux que vous en gagnez ; vous les récupérez quand l’agent se redresse.',
  },
  nomadagentmercer: {
    en: 'At the end of a turn, a player may move up to 2 ground forces onto their planets in the active system.',
    fr: 'À la fin d’un tour, un joueur peut déplacer jusqu’à 2 forces terrestres sur ses planètes du système actif.',
  },
  nomadagentthundarian: {
    en: 'After dice are rolled in combat, cancel the whole round’s hits and roll again.',
    fr: 'Après les jets d’un combat, annulez toutes les touches du round et relancez.',
  },
  sardakkagent: {
    en: 'At the end of a tactical action, the player may place 2 infantry on a planet they control there.',
    fr: 'À la fin d’une action tactique, le joueur peut placer 2 infanteries sur une planète qu’il contrôle dans ce système.',
  },
  saaragent: {
    en: 'Boost one ship’s move value to match the fastest ship on the board.',
    fr: 'Augmente le mouvement d’un vaisseau jusqu’à celui du vaisseau le plus rapide du plateau.',
  },
  solagent: {
    en: 'At the start of a ground combat round, one ground force rolls an extra die.',
    fr: 'Au début d’un round de combat terrestre, une force terrestre lance un dé supplémentaire.',
  },
  titansagent: {
    en: 'Cancel a single hit before it is assigned.',
    fr: 'Annulez une touche avant qu’elle ne soit assignée.',
  },
  winnuagent: {
    en: 'Reduce the total cost of one production by 2.',
    fr: 'Réduit de 2 le coût total d’une production.',
  },
  xxchaagent: {
    en: 'Ready any planet; if it is near your planets you can also remove 1 infantry from it.',
    fr: 'Redressez n’importe quelle planète ; si elle est proche des vôtres, vous pouvez aussi en retirer 1 infanterie.',
  },
  yinagent: {
    en: 'When a player’s unit dies in combat, they place 2 fighters (ship) or 2 infantry (ground force) there.',
    fr: 'Quand une unité d’un joueur meurt au combat, il place 2 chasseurs (vaisseau) ou 2 infanteries (force terrestre) sur place.',
  },
  yssarilagent: {
    en: 'Copies the ability of every other player’s agent, even exhausted ones.',
    fr: 'Copie la capacité de l’agent de chaque autre joueur, même épuisé.',
  },
  // ---- commanders (unlock condition, then permanent)
  arboreccommander: {
    en: 'Unlock: 12 ground forces on your planets. When someone activates a system with your PRODUCTION units, build 1 unit there.',
    fr: 'Déblocage : 12 forces terrestres sur vos planètes. Quand quelqu’un active un système contenant vos unités à PRODUCTION, produisez 1 unité sur place.',
  },
  argentcommander: {
    en: 'Unlock: 6 units with AFB/space cannon/bombardment on the board. Unit-ability rolls get one extra die.',
    fr: 'Déblocage : 6 unités avec AFB/SPACE CANNON/BOMBARDMENT sur le plateau. Vos jets de capacité d’unité gagnent un dé.',
  },
  cabalcommander: {
    en: 'Unlock: units in 3 gravity rifts. Up to 2 fighters/infantry per build don’t count toward the production limit.',
    fr: 'Déblocage : unités dans 3 failles gravitationnelles. Jusqu’à 2 chasseurs/infanteries par production ne comptent pas dans la limite.',
  },
  ghostcommander: {
    en: 'Unlock: units in 3 wormhole systems. Carriers moving through wormholes pick up a free fighter.',
    fr: 'Déblocage : unités dans 3 systèmes à trou de ver. Vos vaisseaux de transport passant par un trou de ver reçoivent un chasseur gratuit.',
  },
  empyreancommander: {
    en: 'Unlock: be neighbors with everyone. Recover your command token when an enemy moves into that system.',
    fr: 'Déblocage : être voisin de tous. Récupérez votre jeton de commandement quand un adversaire entre dans ce système.',
  },
  hacancommander: {
    en: 'Unlock: 10 trade goods. Each trade good spent while voting gives 2 votes.',
    fr: 'Déblocage : 10 biens commerciaux. Chaque bien commercial dépensé lors d’un vote donne 2 voix.',
  },
  jolnarcommander: {
    en: 'Unlock: own 8 technologies. Reroll any unit-ability dice (space cannon, AFB, bombardment).',
    fr: 'Déblocage : posséder 8 technologies. Relancez à volonté vos dés de capacité d’unité.',
  },
  kelerescommander: {
    en: 'Unlock: pay 1 trade good after playing a component-action card. After a component action, take another action.',
    fr: 'Déblocage : payer 1 bien commercial après une carte action de composant. Après une action de composant, effectuez une action supplémentaire.',
  },
  l1z1xcommander: {
    en: 'Unlock: 4 dreadnoughts on the board. PLANETARY SHIELD no longer stops your bombardment.',
    fr: 'Déblocage : 4 cuirassés sur le plateau. PLANETARY SHIELD n’empêche plus vos bombardements.',
  },
  letnevcommander: {
    en: 'Unlock: 5 non-fighter ships in one system. Gain a trade good each time you use SUSTAIN DAMAGE.',
    fr: 'Déblocage : 5 vaisseaux (hors chasseurs) dans un système. Gagnez un bien commercial à chaque SUSTAIN DAMAGE.',
  },
  mahactcommander: {
    en: 'Unlock: 2 other players’ tokens in your fleet pool. You may activate a system holding your own token (ends your turn).',
    fr: 'Déblocage : 2 jetons adverses dans votre réserve de flotte. Vous pouvez activer un système contenant déjà votre jeton (cela termine votre tour).',
  },
  mentakcommander: {
    en: 'Unlock: 4 cruisers on the board. After winning a space combat, take a promissory note from the loser.',
    fr: 'Déblocage : 4 croiseurs sur le plateau. Après une victoire spatiale, prenez un billet à ordre au perdant.',
  },
  muaatcommander: {
    en: 'Unlock: build a war sun. Gain a trade good each time you spend a strategy token.',
    fr: 'Déblocage : produire un soleil de guerre. Gagnez un bien commercial chaque fois que vous dépensez un jeton de stratégie.',
  },
  naalucommander: {
    en: 'Unlock: ground forces in/adjacent to Mecatol Rex. Look at neighbors’ promissory notes and the agenda deck’s top and bottom.',
    fr: 'Déblocage : forces terrestres dans/à côté de Mecatol Rex. Consultez les billets à ordre des voisins et le dessus/dessous du paquet d’ordres du jour.',
  },
  naazcommander: {
    en: 'Unlock: mechs in 3 systems. Explore planets you take from other players.',
    fr: 'Déblocage : mécas dans 3 systèmes. Explorez les planètes prises à d’autres joueurs.',
  },
  nekrocommander: {
    en: 'Unlock: own 3 technologies. Draw an action card whenever you gain a technology.',
    fr: 'Déblocage : posséder 3 technologies. Piochez une carte action chaque fois que vous gagnez une technologie.',
  },
  nomadcommander: {
    en: 'Unlock: score a secret objective. Your flagship costs nothing to build.',
    fr: 'Déblocage : marquer un objectif secret. Votre vaisseau amiral ne coûte rien à produire.',
  },
  saarcommander: {
    en: 'Unlock: 3 space docks. Fighters and infantry you build can appear at any of your free docks.',
    fr: 'Déblocage : 3 docks spatiaux. Les chasseurs et infanteries produits peuvent apparaître à n’importe lequel de vos docks non bloqués.',
  },
  sardakkcommander: {
    en: 'Unlock: 5 non-home planets. Commit ground forces from adjacent planets straight into invasions.',
    fr: 'Déblocage : 5 planètes hors origine. Engagez des forces terrestres depuis des planètes adjacentes directement dans l’invasion.',
  },
  solcommander: {
    en: 'Unlock: planets totalling 12 resources. Add a free infantry when defending a planet.',
    fr: 'Déblocage : planètes totalisant 12 ressources. Ajoutez une infanterie gratuite quand vous défendez une planète.',
  },
  titanscommander: {
    en: 'Unlock: 5 structures on the board. Gain a trade good whenever you produce.',
    fr: 'Déblocage : 5 structures sur le plateau. Gagnez un bien commercial chaque fois que vous produisez.',
  },
  winnucommander: {
    en: 'Unlock: control or fight at Mecatol Rex. +2 to combat rolls at Mecatol, your home and legendary planet systems.',
    fr: 'Déblocage : contrôler Mecatol Rex ou y combattre. +2 aux jets de combat à Mecatol, chez vous et dans les systèmes à planète légendaire.',
  },
  xxchacommander: {
    en: 'Unlock: planets totalling 12 influence. Each planet you exhaust to vote gives +1 vote; you can’t be stopped from voting.',
    fr: 'Déblocage : planètes totalisant 12 d’influence. Chaque planète épuisée pour voter donne +1 voix ; on ne peut pas vous empêcher de voter.',
  },
  yincommander: {
    en: 'Unlock: use a faction ability. Counts as a green prerequisite; return an infantry to ignore prerequisites on a tech others own.',
    fr: 'Déblocage : utiliser une capacité de faction. Compte comme un prérequis vert ; rendez une infanterie pour ignorer les prérequis d’une technologie possédée par un autre.',
  },
  yssarilcommander: {
    en: 'Unlock: hold 7 action cards. When someone activates a system with your units, peek at their cards or secrets.',
    fr: 'Déblocage : avoir 7 cartes action. Quand quelqu’un active un système avec vos unités, regardez ses cartes ou ses secrets.',
  },
  // ---- heroes (unlock with 3 scored objectives, usually one-shot then purged)
  arborechero: {
    en: 'Build any number of units in every system where you have ground forces.',
    fr: 'Produisez un nombre quelconque d’unités dans chaque système où vous avez des forces terrestres.',
  },
  argenthero: {
    en: 'Move any of your ships anywhere you have a command token and no enemy ships.',
    fr: 'Déplacez vos vaisseaux vers tout système contenant votre jeton de commandement et aucun vaisseau ennemi.',
  },
  cabalhero: {
    en: 'Enemy ships near your dimensional tears roll; on 1–3 they are captured.',
    fr: 'Les vaisseaux ennemis proches de vos déchirures dimensionnelles lancent un dé ; sur 1–3 ils sont capturés.',
  },
  ghosthero: {
    en: 'Swap the positions of two systems that contain wormholes or your units.',
    fr: 'Échangez la position de deux systèmes contenant des trous de ver ou vos unités.',
  },
  empyreanhero: {
    en: 'Put frontier tokens in every empty system, then explore those where you have ships.',
    fr: 'Placez un jeton frontière dans chaque système vide, puis explorez ceux où vous avez des vaisseaux.',
  },
  hacanhero: {
    en: 'One production where all your units cost 0.',
    fr: 'Une production où toutes vos unités coûtent 0.',
  },
  jolnarhero: {
    en: 'Swap each of your non-unit-upgrade techs for any other tech of the same colour.',
    fr: 'Échangez chacune de vos technologies (hors améliorations) contre une autre de la même couleur.',
  },
  keleresherokuuasi: {
    en: 'At the start of a space combat near your planet, drop your flagship and 2 cruisers/destroyers in.',
    fr: 'Au début d’un combat spatial dans un système avec votre planète, faites entrer votre vaisseau amiral et 2 croiseurs/destroyers.',
  },
  keleresheroodlynn: {
    en: 'Cast 6 extra votes and predict; gain a trade good and a command token per player who voted otherwise.',
    fr: 'Ajoutez 6 voix et faites une prédiction ; gagnez un bien commercial et un jeton par joueur ayant voté autrement.',
  },
  keleresheroharka: {
    en: 'Dig through the action deck and take 3 cards with component actions.',
    fr: 'Fouillez le paquet action et prenez 3 cartes avec une action de composant.',
  },
  l1z1xhero: {
    en: 'Teleport your flagship and any dreadnoughts into one system without enemy ships.',
    fr: 'Téléportez votre vaisseau amiral et vos cuirassés dans un système sans vaisseau ennemi.',
  },
  letnevhero: {
    en: 'For one round, your fleet size is unlimited.',
    fr: 'Pendant un tour de jeu, la taille de vos flottes est illimitée.',
  },
  mahacthero: {
    en: 'Shove all units from one system into an adjacent enemy-held system and force a fight with no retreat.',
    fr: 'Poussez toutes les unités d’un système dans un système adjacent ennemi et forcez un combat sans retraite.',
  },
  mentakhero: {
    en: 'During one space combat, gain a copy of every enemy ship destroyed.',
    fr: 'Pendant un combat spatial, gagnez une copie de chaque vaisseau ennemi détruit.',
  },
  muaathero: {
    en: 'After moving a war sun into a system, wipe out all enemy units there and turn it into a supernova.',
    fr: 'Après y avoir déplacé un soleil de guerre, détruisez toutes les unités ennemies d’un système et transformez-le en supernova.',
  },
  naaluhero: {
    en: 'At the end of the status phase, every other player gives you a promissory note.',
    fr: 'À la fin de la phase de statut, chaque autre joueur vous donne un billet à ordre.',
  },
  naazhero: {
    en: 'Gain a relic and use the secondary of up to 2 strategy cards, paying from reinforcements.',
    fr: 'Gagnez une relique et utilisez la secondaire de 2 cartes stratégie, en payant depuis vos renforts.',
  },
  nekrohero: {
    en: 'Destroy enemy units on a tech-specialty planet; gain trade goods and a matching tech.',
    fr: 'Détruisez les unités ennemies d’une planète à spécialité ; gagnez des biens commerciaux et une technologie correspondante.',
  },
  nomadhero: {
    en: 'For one round, your flagship (and cargo) can leave systems that contain your command tokens.',
    fr: 'Pendant un tour, votre vaisseau amiral (et sa cargaison) peut quitter des systèmes contenant vos jetons.',
  },
  sardakkhero: {
    en: 'Skip straight to landing troops; your ships in the system then go back to reinforcements.',
    fr: 'Passez directement au débarquement ; vos vaisseaux du système retournent ensuite en renfort.',
  },
  saarhero: {
    en: 'Destroy all enemy infantry and fighters in a system next to your space dock.',
    fr: 'Détruisez toute l’infanterie et tous les chasseurs ennemis d’un système adjacent à votre dock spatial.',
  },
  solhero: {
    en: 'Pick up all your command tokens from the board — effectively a second action phase.',
    fr: 'Récupérez tous vos jetons de commandement du plateau — presque une seconde phase d’action.',
  },
  titanshero: {
    en: 'Elysium gets +3/+3 and a strong space cannon for the rest of the game.',
    fr: 'Elysium gagne +3/+3 et un puissant SPACE CANNON pour le reste de la partie.',
  },
  winnuhero: {
    en: 'Resolve any strategy card’s primary; chosen players may follow.',
    fr: 'Résolvez la principale de n’importe quelle carte stratégie ; les joueurs choisis peuvent suivre.',
  },
  xxchahero: {
    en: 'Planets count resources + influence combined for both purposes (permanent).',
    fr: 'Vos planètes comptent ressources + influence cumulées, pour les deux usages (permanent).',
  },
  yinhero: {
    en: 'Land up to 3 infantry from reinforcements on any non-home planets and fight there.',
    fr: 'Débarquez jusqu’à 3 infanteries depuis vos renforts sur des planètes hors origine et combattez.',
  },
  yssarilhero: {
    en: 'Each opponent shows you a card: take it or make them discard 3 at random.',
    fr: 'Chaque adversaire vous montre une carte : prenez-la ou forcez-le à en défausser 3 au hasard.',
  },
}

export const promissorySummaries: SummaryMap = {
  ambuscade: {
    en: 'One unit-ability roll gets an extra die. (Argent)',
    fr: 'Un jet de capacité d’unité gagne un dé. (Argent)',
  },
  war_funding: {
    en: 'In space combat, reroll the opponent’s dice and any of yours. (Letnev)',
    fr: 'En combat spatial, relancez les dés adverses et ceux de votre choix. (Letnev)',
  },
  ragh: {
    en: 'When you land on a planet, relocate the Saar’s ground forces off it. (Saar)',
    fr: 'Quand vous débarquez, les forces terrestres Saar sont déplacées ailleurs. (Saar)',
  },
  fires: {
    en: 'Give up a fleet token to gain the war sun technology. (Muaat)',
    fr: 'Rendez un jeton de flotte pour gagner la technologie soleil de guerre. (Muaat)',
  },
  convoys: {
    en: 'While held, you can trade with non-neighbors. Returns if you attack Hacan. (Hacan)',
    fr: 'Tant que vous l’avez, vous pouvez commercer avec les non-voisins. Revient si vous attaquez Hacan. (Hacan)',
  },
  blood_pact: {
    en: '+4 votes when you vote with the Empyrean. (Empyrean)',
    fr: '+4 voix quand vous votez comme l’Empyrean. (Empyrean)',
  },
  ms: {
    en: 'At the start of Sol’s turn, take one of their strategy tokens away and place 2 infantry. (Sol)',
    fr: 'Au début du tour de Sol, retirez-lui un jeton de stratégie et placez 2 infanteries. (Sol)',
  },
  iff: {
    en: 'Place or move a Creuss wormhole token near your planets. (Creuss)',
    fr: 'Placez ou déplacez un jeton trou de ver de Creuss près de vos planètes. (Creuss)',
  },
  ce: {
    en: '+1 command token during one status phase. (L1Z1X)',
    fr: '+1 jeton de commandement lors d’une phase de statut. (L1Z1X)',
  },
  scepter: {
    en: 'Force everyone whose token Mahact holds to place a token in one of your systems. (Mahact)',
    fr: 'Oblige chaque joueur dont Mahact détient un jeton à en placer un dans un de vos systèmes. (Mahact)',
  },
  pop: {
    en: 'Protection from Mentak’s Pillage while held. (Mentak)',
    fr: 'Protège du Pillage Mentak tant que vous l’avez. (Mentak)',
  },
  gift: {
    en: 'You take the “0” initiative token this round instead of Naalu. (Naalu)',
    fr: 'Vous prenez le jeton d’initiative « 0 » ce tour-ci à la place de Naalu. (Naalu)',
  },
  bmf: {
    en: 'Turn 2 matching relic fragments into a relic. (Naaz-Rokha)',
    fr: 'Transformez 2 fragments de relique identiques en relique. (Naaz-Rokha)',
  },
  antivirus: {
    en: 'Protection from Nekro’s Technological Singularity. (Nekro)',
    fr: 'Protège de la Singularité technologique Nekro. (Nekro)',
  },
  cavalry: {
    en: 'For one space combat, a ship of yours borrows the Nomad flagship’s stats. (Nomad)',
    fr: 'Pendant un combat spatial, un de vos vaisseaux emprunte les caractéristiques du vaisseau amiral Nomad. (Nomad)',
  },
  tekklar: {
    en: '+1 to your rolls during one invasion (−1 to Sardakk’s if they are the defender). (Sardakk N’orr)',
    fr: '+1 à vos jets pendant une invasion (−1 aux N’orr s’ils sont l’adversaire). (Sardakk N’orr)',
  },
  terraform: {
    en: 'Attach to a planet: +1/+1 and all three traits. Permanent. (Titans)',
    fr: 'S’attache à une planète : +1/+1 et les trois traits. Permanent. (Titans)',
  },
  ra: {
    en: 'When Jol-Nar researches a generic technology, you get it too. (Jol-Nar)',
    fr: 'Quand Jol-Nar recherche une technologie générique, vous l’obtenez aussi. (Jol-Nar)',
  },
  crucible: {
    en: 'Your ships move through gravity rifts safely with the bonus. (Vuil’raith)',
    fr: 'Vos vaisseaux traversent les failles gravitationnelles sans risque, avec le bonus. (Vuil’raith)',
  },
  acq: {
    en: 'Follow one Winnu strategy card for free. (Winnu)',
    fr: 'Suivez une carte stratégie Winnu gratuitement. (Winnu)',
  },
  favor: {
    en: 'Spend an Xxcha strategy token to replace the revealed agenda. (Xxcha)',
    fr: 'Dépensez un jeton de stratégie Xxcha pour remplacer l’ordre du jour révélé. (Xxcha)',
  },
  greyfire: {
    en: 'Convert one enemy infantry at the start of a ground combat. (Yin)',
    fr: 'Convertissez une infanterie adverse au début d’un combat terrestre. (Yin)',
  },
  spynet: {
    en: 'Look at Yssaril’s action cards and take one. (Yssaril)',
    fr: 'Regardez les cartes action Yssaril et prenez-en une. (Yssaril)',
  },
  stymie: {
    en: 'When someone moves into your system, lock down one of their systems with their own token. (Arborec)',
    fr: 'Quand quelqu’un entre dans votre système, bloquez un de ses systèmes avec son propre jeton. (Arborec)',
  },
  dark_pact: {
    en: 'Give Empyrean a full load of commodities: you both gain a trade good. (Empyrean)',
    fr: 'Donnez à l’Empyrean toutes vos marchandises : vous gagnez chacun un bien commercial. (Empyrean)',
  },
  rider: {
    en: 'Give up your vote on an agenda to predict it; if correct, draw an action card and gain 2 trade goods. (Keleres)',
    fr: 'Renoncez à voter pour prédire le résultat ; si c’est juste, piochez une carte action et gagnez 2 biens commerciaux. (Keleres)',
  },
}

export const factionUnitSummaries: SummaryMap = {
  arborec_flagship: { en: 'Activating its system lets you build up to 5 units there, even without a space dock.', fr: 'Activer son système permet d’y produire jusqu’à 5 unités, même sans dock spatial.' },
  arborec_infantry: { en: 'Arborec infantry with PRODUCTION 1 — they can build units by themselves.', fr: 'Infanterie Arborec avec PRODUCTION 1 — elle peut produire des unités seule.' },
  arborec_infantry2: { en: 'Letani Warrior II: better combat and PRODUCTION 2 — each stack is a small factory.', fr: 'Letani Warrior II : meilleur combat et PRODUCTION 2 — chaque pile est une petite usine.' },
  arborec_mech: { en: 'Has PRODUCTION; can replace the free Mitosis infantry with a mech.', fr: 'Possède PRODUCTION ; peut remplacer l’infanterie gratuite de Mitosis par un méca.' },
  argent_destroyer: { en: 'Upgraded destroyer with better AFB; the II can hit infantry with excess hits.', fr: 'Destroyer amélioré avec un meilleur AFB ; la version II peut toucher l’infanterie avec ses touches en excès.' },
  argent_destroyer2: { en: 'Strike Wing Alpha II: destroyer hitting on 7 with strong AFB, and capacity 1.', fr: 'Strike Wing Alpha II : destroyer touchant sur 7, avec un fort AFB et une capacité de 1.' },
  argent_flagship: { en: 'Enemy space cannon cannot target your ships in its system.', fr: 'Le SPACE CANNON ennemi ne peut pas cibler vos vaisseaux dans son système.' },
  argent_mech: { en: 'Does not take up capacity when moving with ships.', fr: 'N’occupe pas de capacité quand il voyage avec des vaisseaux.' },
  cabal_flagship: { en: 'Captures every non-structure unit destroyed in its system, even yours. Has bombardment.', fr: 'Capture toute unité (hors structure) détruite dans son système, même les vôtres. Possède BOMBARDMENT.' },
  cabal_mech: { en: 'Your infantry destroyed on its planet are captured by you instead of lost.', fr: 'Vos infanteries détruites sur sa planète sont capturées par vous au lieu d’être perdues.' },
  cabal_spacedock: { en: 'Dimensional Tear: your space dock turns its system into a gravity rift that your ships ignore.', fr: 'Déchirure dimensionnelle : votre dock transforme son système en faille gravitationnelle que vos vaisseaux ignorent.' },
  cabal_spacedock2: { en: 'Dimensional Tear II: a stronger space dock that keeps the gravity-rift effect and produces more.', fr: 'Dimensional Tear II : un dock plus puissant qui garde l’effet de faille gravitationnelle et produit davantage.' },
  empyrean_flagship: { en: 'Pay 2 influence to repair any unit nearby that uses SUSTAIN DAMAGE.', fr: 'Payez 2 d’influence pour réparer une unité proche qui utilise SUSTAIN DAMAGE.' },
  empyrean_mech: { en: 'Sacrifice it to cancel an action card played by a nearby player.', fr: 'Sacrifiez-le pour annuler une carte action jouée par un joueur proche.' },
  ghost_flagship: { en: 'Carries a delta wormhole with it, and can move before or after your other ships.', fr: 'Transporte un trou de ver delta et peut se déplacer avant ou après vos autres vaisseaux.' },
  ghost_mech: { en: 'Remove it to place or move a Creuss wormhole token into the just-activated system.', fr: 'Retirez-le pour placer ou déplacer un jeton trou de ver de Creuss dans le système activé.' },
  hacan_flagship: { en: 'In space combat, spend 1 trade good per die for +1.', fr: 'En combat spatial, dépensez 1 bien commercial par dé pour +1.' },
  hacan_mech: { en: 'Lets you trade the planet it stands on in a transaction.', fr: 'Permet d’échanger la planète sur laquelle il se trouve lors d’une transaction.' },
  jolnar_flagship: { en: 'Each natural 9 or 10 it rolls produces 3 hits.', fr: 'Chaque 9 ou 10 naturel qu’il obtient produit 3 touches.' },
  jolnar_mech: { en: 'Your infantry on its planet ignore Fragile; it also has PLANETARY SHIELD.', fr: 'Vos infanteries sur sa planète ignorent Fragile ; il possède aussi PLANETARY SHIELD.' },
  l1z1x_dreadnought: { en: 'Super-dreadnought: better combat and capacity than a normal dreadnought.', fr: 'Super-cuirassé : meilleur combat et capacité qu’un cuirassé normal.' },
  l1z1x_dreadnought2: { en: 'Super Dreadnought II: hits on 4, moves 2, capacity 2 and better bombardment.', fr: 'Super Dreadnought II : touche sur 4, déplacement 2, capacité 2 et meilleur bombardement.' },
  l1z1x_flagship: { en: 'Hits from it and your dreadnoughts must go on non-fighter ships.', fr: 'Ses touches et celles de vos cuirassés doivent viser des vaisseaux hors chasseurs.' },
  l1z1x_mech: { en: 'Can bombard planets in its system without landing.', fr: 'Peut bombarder les planètes de son système sans y débarquer.' },
  letnev_flagship: { en: 'Enemies in its system lose PLANETARY SHIELD; it repairs itself every combat round.', fr: 'Les ennemis de son système perdent PLANETARY SHIELD ; il se répare à chaque round.' },
  letnev_mech: { en: 'Pay 2 resources mid ground combat to swap an infantry for this mech.', fr: 'Payez 2 ressources en plein combat terrestre pour remplacer une infanterie par ce méca.' },
  mahact_flagship: { en: '+2 to its rolls against players whose token is NOT in your fleet pool.', fr: '+2 à ses jets contre les joueurs dont le jeton n’est PAS dans votre réserve de flotte.' },
  mahact_infantry: { en: 'When it dies, gain a commodity or convert one to a trade good.', fr: 'Quand elle meurt, gagnez une marchandise ou convertissez-en une en bien commercial.' },
  mahact_infantry2: { en: 'Crimson Legionnaire II: better infantry that keeps the commodity-on-death bonus.', fr: 'Crimson Legionnaire II : infanterie améliorée qui garde le bonus de marchandise à la mort.' },
  mahact_mech: { en: 'Spend a player’s captured token to end their turn when they activate its system.', fr: 'Dépensez le jeton capturé d’un joueur pour terminer son tour quand il active ce système.' },
  mentak_flagship: { en: 'Enemy ships in its system cannot use SUSTAIN DAMAGE.', fr: 'Les vaisseaux ennemis de son système ne peuvent pas utiliser SUSTAIN DAMAGE.' },
  mentak_mech: { en: 'Enemy ground forces on its planet cannot use SUSTAIN DAMAGE.', fr: 'Les forces terrestres ennemies de sa planète ne peuvent pas utiliser SUSTAIN DAMAGE.' },
  muaat_flagship: { en: 'Spend a strategy token to place a cruiser in its system.', fr: 'Dépensez un jeton de stratégie pour placer un croiseur dans son système.' },
  muaat_warsun: { en: 'Muaat start with their own war sun technology; enemies in its system lose PLANETARY SHIELD.', fr: 'Les Muaat commencent avec leur propre soleil de guerre ; les ennemis de son système perdent PLANETARY SHIELD.' },
  muaat_warsun2: { en: 'Prototype War Sun II: cheaper (10) and faster (move 3) war sun.', fr: 'Prototype War Sun II : soleil de guerre moins cher (10) et plus rapide (déplacement 3).' },
  muaat_mech: { en: 'When you use Star Forge near it, also place an infantry.', fr: 'Quand vous utilisez Star Forge à proximité, placez aussi une infanterie.' },
  naalu_fighter: { en: 'Better fighters; the II version can move on its own.', fr: 'Chasseurs améliorés ; la version II peut se déplacer seule.' },
  naalu_fighter2: { en: 'Hybrid Crystal Fighter II: fighters hitting on 7 that can move on their own.', fr: 'Hybrid Crystal Fighter II : chasseurs touchant sur 7, capables de se déplacer seuls.' },
  naalu_flagship: { en: 'Your fighters may join invasions as ground forces in its system.', fr: 'Vos chasseurs peuvent participer aux invasions comme forces terrestres dans son système.' },
  naaz_flagship: { en: 'Your mechs in its system roll an extra die.', fr: 'Vos mécas dans son système lancent un dé supplémentaire.' },
  naaz_mech: { en: 'A mech that flips into a ship when in the space area during combat.', fr: 'Un méca qui se retourne en vaisseau quand il est dans l’espace pendant un combat.' },
  naaz_mech_space: { en: 'Flipped side: counts as a ship while in the space area.', fr: 'Face retournée : compte comme un vaisseau dans l’espace.' },
  nekro_flagship: { en: 'Your ground forces in its system can fight in space combat.', fr: 'Vos forces terrestres de son système peuvent combattre dans l’espace.' },
  nekro_mech: { en: '+2 to its rolls against players who have an X or Y assimilator token on a tech.', fr: '+2 à ses jets contre les joueurs ayant un jeton X ou Y sur une technologie.' },
  nomad_flagship: { en: 'Huge flagship (upgradable); counts as adjacent to systems with your mechs.', fr: 'Énorme vaisseau amiral (améliorable) ; considéré adjacent aux systèmes avec vos mécas.' },
  nomad_mech: { en: 'In space during combat, can absorb a hit aimed at your ships.', fr: 'Dans l’espace pendant un combat, peut absorber une touche visant vos vaisseaux.' },
  saar_flagship: { en: 'Strong anti-fighter barrage.', fr: 'Puissant ANTI-FIGHTER BARRAGE.' },
  saar_spacedock: { en: 'Floating Factory: a space dock that lives in space and moves like a ship.', fr: 'Usine flottante : un dock spatial qui reste dans l’espace et se déplace comme un vaisseau.' },
  saar_spacedock2: { en: 'Floating Factory II: a mobile dock with more capacity and production.', fr: 'Floating Factory II : un dock mobile avec plus de capacité et de production.' },
  saar_mech: { en: 'Pay a trade good to drop this mech on a planet you just took.', fr: 'Payez un bien commercial pour placer ce méca sur une planète que vous venez de prendre.' },
  sardakk_dreadnought: { en: 'Exotrireme: the II can sacrifice itself to destroy enemy ships.', fr: 'Exotrirème : la version II peut se sacrifier pour détruire des vaisseaux ennemis.' },
  sardakk_dreadnought2: { en: 'Exotrireme II: faster dreadnought with 2 bombardment dice that can sacrifice itself to destroy enemy ships.', fr: 'Exotrireme II : cuirassé plus rapide avec 2 dés de bombardement, capable de se sacrifier pour détruire des vaisseaux ennemis.' },
  sardakk_flagship: { en: '+1 to your other ships’ rolls in its system.', fr: '+1 aux jets de vos autres vaisseaux dans son système.' },
  sardakk_mech: { en: 'When it absorbs a hit in ground combat, it hits back.', fr: 'Quand il absorbe une touche en combat terrestre, il riposte.' },
  sol_carrier: { en: 'Advanced carriers with more capacity; the II gains SUSTAIN DAMAGE.', fr: 'Porte-vaisseaux avancés avec plus de capacité ; la version II gagne SUSTAIN DAMAGE.' },
  sol_carrier2: { en: 'Advanced Carrier II: capacity 8 and SUSTAIN DAMAGE.', fr: 'Advanced Carrier II : capacité 8 et SUSTAIN DAMAGE.' },
  sol_flagship: { en: 'Places a free infantry in its space area each status phase.', fr: 'Place une infanterie gratuite dans son espace à chaque phase de statut.' },
  sol_infantry: { en: 'Spec Ops: better infantry; the II can come back to life.', fr: 'Spec Ops : infanterie améliorée ; la version II peut revenir en jeu.' },
  sol_infantry2: { en: 'Spec Ops II: infantry hitting on 6 that can come back after being destroyed.', fr: 'Spec Ops II : infanterie touchant sur 6, qui peut revenir après avoir été détruite.' },
  sol_mech: { en: 'Pay 3 resources after Orbital Drop to also land a mech.', fr: 'Payez 3 ressources après Orbital Drop pour déposer aussi un méca.' },
  titans_cruiser: { en: 'Saturn Engine: cruisers with capacity; the II gets SUSTAIN DAMAGE.', fr: 'Saturn Engine : croiseurs avec capacité ; la version II gagne SUSTAIN DAMAGE.' },
  titans_cruiser2: { en: 'Saturn Engine II: cruiser with capacity 2 and SUSTAIN DAMAGE.', fr: 'Saturn Engine II : croiseur avec capacité 2 et SUSTAIN DAMAGE.' },
  titans_flagship: { en: 'Can deploy by replacing one of your PDS.', fr: 'Peut être déployé en remplaçant un de vos SDP.' },
  titans_mech: { en: 'Instead of placing a PDS, place a mech and an infantry.', fr: 'Au lieu de placer un SDP, placez un méca et une infanterie.' },
  titans_pds: { en: 'Hel-Titan: a PDS that also counts as a ground force and fights.', fr: 'Hel-Titan : un SDP qui compte aussi comme force terrestre et combat.' },
  titans_pds2: { en: 'Hel-Titan II: a PDS that fights as a ground force with SUSTAIN DAMAGE, deep space cannon and PRODUCTION 1.', fr: 'Hel-Titan II : un SDP qui combat comme force terrestre, avec SUSTAIN DAMAGE, canon spatial à distance et PRODUCTION 1.' },
  winnu_flagship: { en: 'Rolls one die per enemy non-fighter ship in its system.', fr: 'Lance un dé par vaisseau ennemi (hors chasseurs) dans son système.' },
  winnu_mech: { en: 'After taking its planet, place a free PDS or space dock.', fr: 'Après avoir pris sa planète, placez gratuitement un SDP ou un dock spatial.' },
  xxcha_flagship: { en: 'Its space cannon can hit ships in adjacent systems.', fr: 'Son SPACE CANNON peut toucher les vaisseaux de systèmes adjacents.' },
  xxcha_mech: { en: 'Its space cannon can hit ships in adjacent systems.', fr: 'Son SPACE CANNON peut toucher les vaisseaux de systèmes adjacents.' },
  yin_flagship: { en: 'When it dies, every ship in the system dies with it.', fr: 'Quand il est détruit, tous les vaisseaux du système le sont aussi.' },
  yin_mech: { en: 'Indoctrination can convert an enemy infantry into this mech for 1 more influence.', fr: 'Indoctrination peut convertir une infanterie adverse en ce méca pour 1 d’influence de plus.' },
  yssaril_flagship: { en: 'Can move through systems containing enemy ships.', fr: 'Peut traverser des systèmes contenant des vaisseaux ennemis.' },
  yssaril_mech: { en: 'After Stall Tactics, place this mech on a planet you control.', fr: 'Après Stall Tactics, placez ce méca sur une planète que vous contrôlez.' },
  keleres_flagship: { en: 'Other players must pay 2 influence to activate the system it is in.', fr: 'Les autres joueurs doivent payer 2 d’influence pour activer le système où il se trouve.' },
  keleres_mech: { en: 'Other players must pay 1 influence to land ground forces on its planet.', fr: 'Les autres joueurs doivent payer 1 d’influence pour débarquer sur sa planète.' },
}
