import type { L } from '../types'

/**
 * "Things to look out for" when a faction is your OPPONENT (original writing).
 * Shown on the plan's Table tab when you add an opponent.
 */
export const opponentTips: Record<string, L> = {
  arborec: {
    en: '- Very hard to dig out of planets: their ground forces multiply over time\n- Weak in space early — strike their fleets, not their planets\n- [[bombardment]] is your friend against their infantry stacks',
    fr: '- Très difficiles à déloger : leurs forces terrestres se multiplient\n- Faibles dans l’espace au début — frappez leurs flottes, pas leurs planètes\n- Le [[bombardment|bombardement]] est votre allié contre leurs piles d’infanterie',
  },
  argent: {
    en: '- Their destroyers shred fighter screens ([[anti-fighter-barrage]])\n- Cheap, upgraded small ships hit harder than they look\n- Don’t count on your [[space-cannon]] against their flagship’s system',
    fr: '- Leurs destroyers déchiquettent les écrans de chasseurs ([[anti-fighter-barrage]])\n- Leurs petits vaisseaux améliorés frappent plus fort qu’il n’y paraît\n- Ne comptez pas sur votre [[space-cannon|canon spatial]] dans le système de leur vaisseau amiral',
  },
  cabal: {
    en: '- Units destroyed fighting them feed their production — avoid long grinding battles\n- Their space docks create [[gravity-rift|gravity rifts]] around them\n- Keep your flagship away from them unless you can win outright',
    fr: '- Les unités détruites contre eux alimentent leur production — évitez les longues batailles d’usure\n- Leurs docks spatiaux créent des [[gravity-rift|failles gravitationnelles]] autour d’eux\n- Éloignez votre vaisseau amiral d’eux, sauf victoire assurée',
  },
  empyrean: {
    en: '- Move through [[nebula|nebulae]] freely and can open paths for allies\n- Deal-makers: watch what they gain from every agreement\n- Hard to pin down — they rarely sit where you expect',
    fr: '- Traversent librement les [[nebula|nébuleuses]] et peuvent ouvrir des passages à leurs alliés\n- Négociateurs : surveillez ce qu’ils gagnent à chaque accord\n- Difficiles à coincer — rarement là où on les attend',
  },
  ghost: {
    en: '- Can arrive through any [[wormholes|wormhole]] — guard systems next to wormholes\n- Their home sits off-map, so it is hard to pressure\n- Expect sudden raids, not long wars',
    fr: '- Peuvent surgir de n’importe quel [[wormholes|trou de ver]] — gardez les systèmes voisins\n- Leur système d’origine est hors carte, difficile à menacer\n- Attendez-vous à des raids soudains, pas à de longues guerres',
  },
  hacan: {
    en: '- Will out-spend the table on spend objectives\n- Every trade with them also helps them — make deals cost them something\n- Taking [[strategy:trade|Trade]] yourself slows them a lot',
    fr: '- Dépenseront plus que tout le monde sur les objectifs de dépense\n- Chaque échange avec eux les aide aussi — faites payer vos accords\n- Prendre [[strategy:trade|Trade]] vous-même les ralentit beaucoup',
  },
  jolnar: {
    en: '- Their tech lead snowballs into science objectives\n- Their units fight worse — pressure them early\n- Late game their tech makes them dangerous; don’t wait',
    fr: '- Leur avance technologique se transforme en objectifs scientifiques\n- Leurs unités combattent moins bien — mettez-les sous pression tôt\n- En fin de partie leurs technologies les rendent dangereux ; n’attendez pas',
  },
  keleres: {
    en: '- Their flagship and mech make you pay influence to activate or land near them\n- Strong at the [[agenda-phase]]\n- Can cancel an action card at a key moment',
    fr: '- Leur vaisseau amiral et leur méca vous font payer de l’influence pour activer ou débarquer près d’eux\n- Forts en [[agenda-phase|phase d’ordre du jour]]\n- Peuvent annuler une carte action au moment clé',
  },
  l1z1x: {
    en: '- Heavy dreadnought fleets with strong [[bombardment]]\n- Ground forces get ground down under their fleets\n- Structures you lose to them may become theirs',
    fr: '- Lourdes flottes de cuirassés au fort [[bombardment|bombardement]]\n- Vos forces terrestres s’usent sous leurs flottes\n- Les structures que vous perdez peuvent devenir les leurs',
  },
  letnev: {
    en: '- Large fleets that pay trade goods to reroll dice\n- Their home is very hard to attack\n- Avoid fair fights — use [[space-cannon]] and terrain',
    fr: '- Grandes flottes qui paient des biens commerciaux pour relancer des dés\n- Leur système d’origine est très difficile à attaquer\n- Évitez les combats équitables — utilisez [[space-cannon|canon spatial]] et terrain',
  },
  mahact: {
    en: '- When they beat you in combat they can take one of your [[command-tokens]]\n- Holding your token lets them use your commander\n- Losing a fight to them costs more than ships',
    fr: '- Quand ils vous battent, ils peuvent prendre un de vos [[command-tokens|jetons de commandement]]\n- Votre jeton leur donne accès à votre commandant\n- Perdre un combat contre eux coûte plus que des vaisseaux',
  },
  mentak: {
    en: '- Pillage: with 3+ [[trade-goods]] near them, expect to lose one — spend before trading\n- Their cruisers/destroyers shoot before combat starts\n- Keep your trade goods low on their border',
    fr: '- Pillage : avec 3+ [[trade-goods|biens commerciaux]] près d’eux, attendez-vous à en perdre un — dépensez avant d’échanger\n- Leurs croiseurs/destroyers tirent avant le combat\n- Gardez peu de biens commerciaux à leur frontière',
  },
  muaat: {
    en: '- Can field war suns very early\n- Respect the war sun’s range and [[bombardment]]\n- [[supernova|Supernovae]] near them are their territory',
    fr: '- Peuvent aligner des soleils de guerre très tôt\n- Respectez la portée et le [[bombardment|bombardement]] du soleil de guerre\n- Les [[supernova|supernovas]] près d’eux sont leur territoire',
  },
  naalu: {
    en: '- Always act first in the [[action-phase]]\n- Their fighters are strong and plentiful\n- Their ships can slip away when you activate their system',
    fr: '- Agissent toujours en premier en [[action-phase|phase d’action]]\n- Leurs chasseurs sont forts et nombreux\n- Leurs vaisseaux peuvent s’échapper quand vous activez leur système',
  },
  naaz: {
    en: '- Exploration and relic engine — contest fragment-rich areas\n- Their mechs are cheap and appear quickly\n- Don’t let them sit on [[attachments|attached]] planets',
    fr: '- Moteur d’exploration et de reliques — disputez les zones riches en fragments\n- Leurs mécas sont bon marché et arrivent vite\n- Ne les laissez pas sur des planètes avec [[attachments|rattachements]]',
  },
  nekro: {
    en: '- Destroying your units can give them your technology\n- Avoid feeding them easy kills\n- They can’t vote normally but profit from agendas',
    fr: '- Détruire vos unités peut leur donner vos technologies\n- Évitez de leur offrir des victoires faciles\n- Ils ne votent pas normalement mais profitent des ordres du jour',
  },
  nomad: {
    en: '- Their flagship is a fortress with strong [[anti-fighter-barrage]]\n- Three agents mean many small boosts each round\n- Allies can borrow their flagship — watch their promissory note',
    fr: '- Leur vaisseau amiral est une forteresse au fort [[anti-fighter-barrage]]\n- Trois agents : beaucoup de petits bonus à chaque tour\n- Leurs alliés peuvent emprunter leur vaisseau amiral — surveillez leur billet à ordre',
  },
  saar: {
    en: '- Their space docks move — production can appear anywhere\n- A floating dock can be destroyed in space combat\n- They gain trade goods as they take planets',
    fr: '- Leurs docks spatiaux se déplacent — la production peut surgir n’importe où\n- Un dock flottant peut être détruit en combat spatial\n- Ils gagnent des biens commerciaux en prenant des planètes',
  },
  sardakk: {
    en: '- +1 on all combat rolls — never take an even fight\n- Brutal in [[ground-combat]]\n- Bring [[space-cannon]] and numbers',
    fr: '- +1 à tous leurs jets de combat — n’acceptez jamais un combat équilibré\n- Redoutables en [[ground-combat|combat terrestre]]\n- Venez avec du [[space-cannon|canon spatial]] et du nombre',
  },
  sol: {
    en: '- Can drop infantry onto their planets at any time\n- More command tokens, so more actions per round\n- Their infantry is tougher than usual',
    fr: '- Peuvent larguer de l’infanterie sur leurs planètes à tout moment\n- Plus de jetons de commandement, donc plus d’actions par tour\n- Leur infanterie est plus coriace que d’habitude',
  },
  titans: {
    en: '- Sleeper tokens can turn into PDS — planets are better defended than they look\n- Strong cruisers and flagship\n- Cheap structures everywhere',
    fr: '- Les jetons dormeurs peuvent devenir des SDP — leurs planètes sont mieux défendues qu’il n’y paraît\n- Croiseurs et vaisseau amiral puissants\n- Structures bon marché partout',
  },
  winnu: {
    en: '- They want [[mecatol-rex]] badly\n- Their hero can copy strategy cards\n- Make the centre expensive for them',
    fr: '- Ils veulent absolument [[mecatol-rex]]\n- Leur héros peut copier des cartes stratégie\n- Rendez le centre coûteux pour eux',
  },
  xxcha: {
    en: '- [[space-cannon]] everywhere — attack with many ships\n- Can cancel action cards and agendas\n- Diplomatic: they buy safety with votes',
    fr: '- Du [[space-cannon|canon spatial]] partout — attaquez avec beaucoup de vaisseaux\n- Peuvent annuler cartes action et ordres du jour\n- Diplomates : ils achètent leur sécurité avec des votes',
  },
  yin: {
    en: '- Sacrifice cheap ships for guaranteed hits\n- Can convert your infantry to their side\n- Ground battles against them are risky',
    fr: '- Sacrifient des vaisseaux bon marché pour des touches garanties\n- Peuvent convertir votre infanterie\n- Les combats terrestres contre eux sont risqués',
  },
  yssaril: {
    en: '- Huge hand of [[action-cards]] and endless stalling — they often pass last\n- Watch for surprise scoring\n- Expect your strategies to be copied or countered',
    fr: '- Énorme main de [[action-cards|cartes action]] et temporisation sans fin — ils passent souvent en dernier\n- Méfiez-vous des scores surprises\n- Attendez-vous à voir vos stratégies copiées ou contrées',
  },
}
