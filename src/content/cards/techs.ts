/** Original summaries of technologies (generic + faction). Not card text. */
import type { SummaryMap } from '../types'

export const techSummaries: SummaryMap = {
  // ---------------- propulsion (blue)
  amd: {
    en: 'Lets your ships enter and cross [[asteroid-field|asteroid fields]], and gives −1 to enemy [[space-cannon]] rolls against you. Free starting blue skip for many players.',
    fr: 'Permet à vos vaisseaux d’entrer dans les [[asteroid-field|champs d’astéroïdes]] et de les traverser, et inflige −1 aux jets de [[space-cannon]] ennemis contre vous.',
  },
  gd: {
    en: '+1 [[move-value|move]] to one ship each tactical action. A cheap and very popular way to reach farther.',
    fr: '+1 en [[move-value|mouvement]] à un vaisseau à chaque action tactique. Un moyen bon marché et très populaire d’aller plus loin.',
  },
  fl: {
    en: 'Take two actions per turn instead of one. Powerful tempo tech, especially late in a round.',
    fr: 'Effectuez deux actions par tour au lieu d’une. Une technologie de tempo puissante, surtout en fin de tour.',
  },
  lwd: {
    en: 'Your ships may move through systems that contain enemy ships (normally they would have to stop).',
    fr: 'Vos vaisseaux peuvent traverser des systèmes contenant des vaisseaux ennemis (ils devraient sinon s’arrêter).',
  },
  det: {
    en: 'Explore [[frontier-tokens]] after tactical actions where you have ships, and retreat into any adjacent empty system.',
    fr: 'Explorez les [[frontier-tokens|jetons frontière]] après vos actions tactiques où vous avez des vaisseaux, et retraitez dans tout système adjacent vide.',
  },
  sr: {
    en: 'Exhaust to build one ship at any of your space docks as a component action.',
    fr: 'Épuisez-la pour produire un vaisseau à n’importe lequel de vos docks spatiaux (action de composant).',
  },
  as: {
    en: 'When you or a neighbor activates a system next to an anomaly, you may give that player’s ships +1 move.',
    fr: 'Quand vous ou un voisin activez un système adjacent à une anomalie, vous pouvez donner +1 mouvement à ses vaisseaux.',
  },
  cm: {
    en: 'Enemies cannot activate asteroid fields with your ships; at the start of your turn, build 1 unit at a PRODUCTION unit.',
    fr: 'Les ennemis ne peuvent pas activer un champ d’astéroïdes contenant vos vaisseaux ; au début de votre tour, produisez 1 unité via une unité à PRODUCTION.',
  },
  scc: {
    en: 'Exhaust after activating a system with your units: that system becomes adjacent to all your other units’ systems.',
    fr: 'Épuisez-la après avoir activé un système contenant vos unités : il devient adjacent à tous les systèmes où vous avez des unités.',
  },
  lgf: {
    en: 'If you don’t hold Mecatol Rex, treat it as having alpha and beta wormholes for you; if you do, exhaust to place an infantry there.',
    fr: 'Si vous ne contrôlez pas Mecatol Rex, il a pour vous des trous de ver alpha et bêta ; si vous le contrôlez, épuisez-la pour y placer une infanterie.',
  },
  wg: {
    en: 'Exhaust to place or move a Creuss wormhole token near your planets or into an empty non-home system.',
    fr: 'Épuisez-la pour placer ou déplacer un jeton trou de ver de Creuss près de vos planètes ou dans un système vide hors origine.',
  },
  // ---------------- biotic (green)
  nm: {
    en: 'Draw 2 action cards instead of 1 each status phase.',
    fr: 'Piochez 2 cartes action au lieu d’1 à chaque phase de statut.',
  },
  dxa: {
    en: 'After winning a ground combat, place a free infantry on that planet.',
    fr: 'Après avoir gagné un combat terrestre, placez une infanterie gratuite sur la planète.',
  },
  hm: {
    en: 'Gain 3 command tokens instead of 2 each status phase. Considered one of the strongest generic techs.',
    fr: 'Gagnez 3 jetons de commandement au lieu de 2 à chaque phase de statut. L’une des meilleures technologies génériques.',
  },
  x89c4: {
    en: 'Your bombardment and ground combat hits are doubled, but planets you bombard become exhausted.',
    fr: 'Vos touches de bombardement et de combat terrestre sont doublées, mais les planètes bombardées sont épuisées.',
  },
  pa: {
    en: 'Use tech specialties without exhausting planets, and exhaust specialty planets for a trade good each.',
    fr: 'Utilisez les spécialités technologiques sans épuiser les planètes, et épuisez ces planètes pour 1 bien commercial chacune.',
  },
  bs: {
    en: 'At the end of your turn, exhaust to ready a tech-specialty planet or one of your other technologies.',
    fr: 'À la fin de votre tour, épuisez-la pour redresser une planète à spécialité ou une autre de vos technologies.',
  },
  bio: {
    en: 'At the end of the status phase, shuffle infantry between your planets in the same or adjacent systems.',
    fr: 'À la fin de la phase de statut, redistribuez votre infanterie entre vos planètes du même système ou de systèmes adjacents.',
  },
  pm: {
    en: 'Spend a strategy token: gain 4 trade goods and give 2 to another player.',
    fr: 'Dépensez un jeton de stratégie : gagnez 4 biens commerciaux et donnez-en 2 à un autre joueur.',
  },
  vw: {
    en: 'Anyone moving ships into a system with your units must give you a promissory note.',
    fr: 'Quiconque déplace des vaisseaux dans un système contenant vos unités doit vous donner un billet à ordre.',
  },
  gr: {
    en: 'Exhaust before a player votes: they vote your way or lose a fleet token.',
    fr: 'Épuisez-la avant qu’un joueur vote : il vote comme vous le voulez ou perd un jeton de flotte.',
  },
  ng: {
    en: 'Whoever activates a system with your ships loses a fleet pool token.',
    fr: 'Quiconque active un système contenant vos vaisseaux perd un jeton de sa réserve de flotte.',
  },
  pfa: {
    en: 'Ready a planet after you explore it.',
    fr: 'Redressez une planète après l’avoir explorée.',
  },
  it: {
    en: 'Exhaust and spend a strategy token to cancel an action card someone plays.',
    fr: 'Épuisez-la et dépensez un jeton de stratégie pour annuler une carte action jouée.',
  },
  mi: {
    en: 'Exhaust to look at a player’s action cards and take one.',
    fr: 'Épuisez-la pour regarder les cartes action d’un joueur et en prendre une.',
  },
  tp: {
    en: 'During your turns, players who have passed cannot play action cards.',
    fr: 'Pendant vos tours, les joueurs ayant passé ne peuvent pas jouer de cartes action.',
  },
  yso: {
    en: 'After producing, place up to 2 free infantry on your planets or with your ships.',
    fr: 'Après une production, placez jusqu’à 2 infanteries gratuites sur vos planètes ou avec vos vaisseaux.',
  },
  // ---------------- warfare (red)
  ps: {
    en: 'One unit rolls an extra die for each bombardment or space cannon roll.',
    fr: 'Une unité lance un dé supplémentaire pour chaque bombardement ou SPACE CANNON.',
  },
  md: {
    en: 'When a system with your structures is activated, add an infantry next to each structure; at the start of ground combat there, deal 1 hit.',
    fr: 'Quand un système contenant vos structures est activé, ajoutez une infanterie à chacune ; au début d’un combat terrestre sur place, infligez 1 touche.',
  },
  da: {
    en: 'Each combat round, repair one damaged unit that didn’t just take damage.',
    fr: 'À chaque round de combat, réparez une unité endommagée qui n’a pas encaissé ce round.',
  },
  asc: {
    en: 'With 3+ non-fighter ships in a space combat, your opponent destroys one of theirs before the fight starts.',
    fr: 'Avec 3+ vaisseaux (hors chasseurs) dans un combat spatial, l’adversaire détruit l’un des siens avant le combat.',
  },
  ds: {
    en: 'At the start of a space combat in a wormhole system, deal 1 hit.',
    fr: 'Au début d’un combat spatial dans un système à trou de ver, infligez 1 touche.',
  },
  nes: {
    en: 'SUSTAIN DAMAGE cancels 2 hits instead of 1.',
    fr: 'SUSTAIN DAMAGE annule 2 touches au lieu d’1.',
  },
  mr: {
    en: 'Your ships may enter supernovas, which gain PRODUCTION 5 for you.',
    fr: 'Vos vaisseaux peuvent entrer dans les supernovas, qui gagnent PRODUCTION 5 pour vous.',
  },
  sc: {
    en: 'Exhaust at the start of a combat round for +1 to all your combat rolls that round.',
    fr: 'Épuisez-la au début d’un round de combat pour +1 à tous vos jets ce round.',
  },
  vpw: {
    en: 'In ground combat, if the opponent scores any hits, you score one extra.',
    fr: 'En combat terrestre, si l’adversaire obtient au moins une touche, vous en obtenez une de plus.',
  },
  vtx: {
    en: 'Exhaust to capture a unit from the reinforcements of a player with units next to your docks.',
    fr: 'Épuisez-la pour capturer une unité dans les renforts d’un joueur présent près de vos docks.',
  },
  // ---------------- cybernetic (yellow)
  aida: {
    en: 'Exhaust to skip a prerequisite on a unit upgrade, or to discount a production by your number of unit upgrades.',
    fr: 'Épuisez-la pour ignorer un prérequis d’amélioration d’unité, ou réduire une production du nombre d’améliorations possédées.',
  },
  sar: {
    en: 'After producing, exhaust to add a free mech on a planet in that system; gain a trade good when a mech dies.',
    fr: 'Après une production, épuisez-la pour ajouter un méca gratuit sur une planète du système ; gagnez un bien commercial quand un méca meurt.',
  },
  st: {
    en: 'Every production costs 1 less. Simple, strong economy tech.',
    fr: 'Chaque production coûte 1 de moins. Simple et efficace.',
  },
  gls: {
    en: 'Exhaust before firing space cannon: hits must target non-fighter ships.',
    fr: 'Épuisez-la avant un SPACE CANNON : les touches doivent viser des vaisseaux hors chasseurs.',
  },
  td: {
    en: 'At the start of your turn, exhaust to relocate up to 4 ground forces onto any of your planets.',
    fr: 'Au début de votre tour, épuisez-la pour déplacer jusqu’à 4 forces terrestres sur n’importe lesquelles de vos planètes.',
  },
  ie: {
    en: 'After taking a planet, build units on it worth up to its resource value.',
    fr: 'Après avoir pris une planète, produisez-y des unités pour une valeur jusqu’à ses ressources.',
  },
  sdn: {
    en: 'When you activate a system, explore one planet there that contains your units.',
    fr: 'Quand vous activez un système, explorez une planète qui y contient vos unités.',
  },
  pi: {
    en: 'Exhaust at the end of your turn to rearrange your command tokens; also +3 votes (exhausts if you lose).',
    fr: 'Épuisez-la à la fin de votre tour pour réorganiser vos jetons ; donne aussi +3 voix (s’épuise si vous perdez le vote).',
  },
  l4: {
    en: 'Nobody can fire space cannon at your units during your invasions.',
    fr: 'Personne ne peut tirer au SPACE CANNON sur vos unités pendant vos invasions.',
  },
  qdn: {
    en: 'End of strategy phase: pay a token and 3 trade goods to swap strategy cards with another player.',
    fr: 'Fin de phase de stratégie : payez un jeton et 3 biens commerciaux pour échanger une carte stratégie avec un joueur.',
  },
  mc: {
    en: 'Each trade good you spend is worth 2.',
    fr: 'Chaque bien commercial dépensé vaut 2.',
  },
  vax: {
    en: 'Copy the text of a faction technology stolen with your abilities (slot X).',
    fr: 'Copie le texte d’une technologie de faction volée via vos capacités (emplacement X).',
  },
  vay: {
    en: 'Copy the text of a faction technology stolen with your abilities (slot Y).',
    fr: 'Copie le texte d’une technologie de faction volée via vos capacités (emplacement Y).',
  },
  tcs: {
    en: 'Exhaust to ready an agent that just exhausted; if it is someone else’s, you may trade with them.',
    fr: 'Épuisez-la pour redresser un agent qui vient d’être épuisé ; s’il appartient à un autre joueur, vous pouvez commercer avec lui.',
  },
  ers: {
    en: 'Gain 4 trade goods whenever someone activates a system with your ships.',
    fr: 'Gagnez 4 biens commerciaux chaque fois qu’un joueur active un système contenant vos vaisseaux.',
  },
  htp: {
    en: 'When producing, swap one planet’s resource and influence values.',
    fr: 'Lors d’une production, échangez les ressources et l’influence d’une planète.',
  },
  nf: {
    en: 'Exhaust and pay a strategy token to end the turn of a player who activates a system with your ships.',
    fr: 'Épuisez-la et payez un jeton de stratégie pour terminer le tour d’un joueur qui active un système contenant vos vaisseaux.',
  },
  ic: {
    en: 'At the start of a space combat, sacrifice a cruiser/destroyer for a hit that must hit a non-fighter.',
    fr: 'Au début d’un combat spatial, sacrifiez un croiseur/destroyer pour une touche qui doit viser un non-chasseur.',
  },
  is: {
    en: 'Exhaust and pay 2 resources to ignore all prerequisites on a research.',
    fr: 'Épuisez-la et payez 2 ressources pour ignorer tous les prérequis d’une recherche.',
  },
  so: {
    en: 'Gain a trade good after any space combat; if you won, rebuild one destroyed ship type there.',
    fr: 'Gagnez un bien commercial après tout combat spatial ; si vous gagnez, reconstruisez un type de vaisseau détruit.',
  },
  ah: {
    en: 'Enemies can’t move through systems with your structures; planets with structures get PRODUCTION 1.',
    fr: 'Les ennemis ne peuvent pas traverser vos systèmes avec structures ; ces planètes gagnent PRODUCTION 1.',
  },
  iihq: {
    en: 'Become neighbors with everyone near Mecatol Rex and gain the Custodia Vigilia planet.',
    fr: 'Devenez voisin de tous ceux qui sont près de Mecatol Rex et gagnez la planète Custodia Vigilia.',
  },
  asn: {
    en: 'Once per action, when one of your units produces, another can also produce anywhere.',
    fr: 'Une fois par action, quand une de vos unités produit, une autre peut aussi produire ailleurs.',
  },
  // ---------------- unit upgrades (generic)
  ws: {
    en: 'Unlocks the war sun: a huge, expensive capital ship that ignores planetary shields.',
    fr: 'Débloque le soleil de guerre : un énorme vaisseau coûteux qui ignore PLANETARY SHIELD.',
  },
  sd2: {
    en: 'Space docks produce more (planet resources + 4) and hold 3 fighters for free.',
    fr: 'Les docks produisent davantage (ressources + 4) et hébergent 3 chasseurs gratuitement.',
  },
  cr2: {
    en: 'Cruisers hit on 6, move 3 and carry 1 unit.',
    fr: 'Les croiseurs touchent sur 6, bougent de 3 et transportent 1 unité.',
  },
  dn2: {
    en: 'Dreadnoughts move 2, hit on 5 and are immune to Direct Hit.',
    fr: 'Les cuirassés bougent de 2, touchent sur 5 et sont immunisés à Direct Hit.',
  },
  dd2: {
    en: 'Destroyers get much stronger anti-fighter barrage and hit on 8.',
    fr: 'Les destroyers gagnent un ANTI-FIGHTER BARRAGE bien plus fort et touchent sur 8.',
  },
  pds2: {
    en: 'PDS hit on 5 and can shoot into adjacent systems.',
    fr: 'Les SDP touchent sur 5 et peuvent tirer dans les systèmes adjacents.',
  },
  cv2: {
    en: 'Carriers move 2 and carry 6.',
    fr: 'Les porte-vaisseaux bougent de 2 et transportent 6 unités.',
  },
  ff2: {
    en: 'Fighters hit on 8 and can move on their own (extra ones count against fleet supply).',
    fr: 'Les chasseurs touchent sur 8 et se déplacent seuls (ceux en excès comptent contre la flotte).',
  },
  inf2: {
    en: 'Infantry hit on 7 and may come back to your home system after dying (on a 6+).',
    fr: 'L’infanterie touche sur 7 et peut revenir dans votre système d’origine après sa mort (sur 6+).',
  },
  // ---------------- faction unit upgrades
  lw2: { en: 'Arborec infantry II: better combat and PRODUCTION 2; can revive.', fr: 'Infanterie Arborec II : meilleur combat et PRODUCTION 2 ; peut revenir en jeu.' },
  swa2: { en: 'Argent destroyer II: strong AFB that can also kill infantry in space.', fr: 'Destroyer Argent II : AFB puissant qui peut aussi tuer l’infanterie dans l’espace.' },
  pws2: { en: 'Muaat war sun II: cheaper and faster (move 3).', fr: 'Soleil de guerre Muaat II : moins cher et plus rapide (mouvement 3).' },
  ac2: { en: 'Sol carrier II: capacity 8 and SUSTAIN DAMAGE.', fr: 'Porte-vaisseaux Sol II : capacité 8 et SUSTAIN DAMAGE.' },
  sdn2: { en: 'L1Z1X super-dreadnought II: hits on 4, carries 2.', fr: 'Super-cuirassé L1Z1X II : touche sur 4, transporte 2.' },
  cl2: { en: 'Mahact infantry II: give commodities/trade goods on death and revive.', fr: 'Infanterie Mahact II : rapporte marchandises/biens à sa mort et revient en jeu.' },
  hcf2: { en: 'Naalu fighter II: hits on 7, moves alone, counts as half a ship.', fr: 'Chasseur Naalu II : touche sur 7, se déplace seul, compte pour un demi-vaisseau.' },
  m2: { en: 'Nomad flagship II: much stronger stats.', fr: 'Vaisseau amiral Nomad II : caractéristiques bien meilleures.' },
  exo2: { en: 'Sardakk dreadnought II: can sacrifice itself to destroy up to 2 ships.', fr: 'Cuirassé N’orr II : peut se sacrifier pour détruire jusqu’à 2 vaisseaux.' },
  se2: { en: 'Titans cruiser II: capacity 2 and SUSTAIN DAMAGE.', fr: 'Croiseur Titans II : capacité 2 et SUSTAIN DAMAGE.' },
  dt2: { en: 'Vuil’raith dock II: PRODUCTION 7 and a bigger free fighter hangar.', fr: 'Dock Vuil’raith II : PRODUCTION 7 et plus de chasseurs gratuits.' },
  so2: { en: 'Sol infantry II: hits on 6 and revives on 5+.', fr: 'Infanterie Sol II : touche sur 6 et revient sur 5+.' },
  ht2: { en: 'Titans PDS II: fights, sustains damage, produces and shoots adjacent.', fr: 'SDP Titans II : combat, encaisse, produit et tire dans les systèmes adjacents.' },
  ffac2: { en: 'Saar floating factory II: moves 2, carries 5, PRODUCTION 7.', fr: 'Usine flottante Saar II : mouvement 2, capacité 5, PRODUCTION 7.' },
}
