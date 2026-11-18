/**
 * Original illustrations (our own geometric SVG art — no FFG artwork).
 * Colours come from CSS tokens so everything works in light & dark themes.
 * Animations are CSS-driven and disabled under prefers-reduced-motion.
 */
import { useId, type ReactNode } from 'react'
import type { PlanetFact, TechFact } from '../wiki/facts'
import { parseReq, units as allUnits } from '../wiki/facts'

const HEX = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')

/** Respect the OS "reduce motion" setting for SMIL animations too. */
const REDUCED = typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Rotate children around an explicit centre (cx, cy) in the PARENT's user
 * space. SVG-native (animateTransform) rather than CSS, because a CSS
 * animation would replace any transform attribute and rotates around the
 * bounding box, which made shapes drift outside their frame.
 */
export function Spin({ cx = 0, cy = 0, dur = 8, reverse, children }: { cx?: number; cy?: number; dur?: number; reverse?: boolean; children: ReactNode }) {
  return (
    <g>
      {!REDUCED && (
        <animateTransform attributeName="transform" type="rotate" from={`${reverse ? 360 : 0} ${cx} ${cy}`} to={`${reverse ? 0 : 360} ${cx} ${cy}`} dur={`${dur}s`} repeatCount="indefinite" />
      )}
      {children}
    </g>
  )
}

/** Gentle scale pulse around the local origin (place inside a translated group). */
function Pulse({ children, dur = 2.4, to = 1.12 }: { children: ReactNode; dur?: number; to?: number }) {
  return (
    <g>
      {!REDUCED && <animateTransform attributeName="transform" type="scale" values={`1;${to};1`} dur={`${dur}s`} repeatCount="indefinite" />}
      {children}
    </g>
  )
}

function Frame({ children, label, w = 200, h = 120 }: { children: ReactNode; label: string; w?: number; h?: number }) {
  return (
    <svg className="illu" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label}>
      {children}
    </svg>
  )
}

// ------------------------------------------------------------ concept art

function PhaseCycle({ active }: { active?: number }) {
  const labels = ['S', 'A', 'St', 'Ag']
  return (
    <Frame label="Game round cycle">
      <g transform="translate(100 60)">
        <circle r="42" className="i-line" strokeDasharray="3 5" />
        <Spin dur={12}>
          <path d="M 0 -42 A 42 42 0 0 1 42 0" className="i-accent" strokeWidth="3" fill="none" />
        </Spin>
        {labels.map((t, i) => {
          const a = -Math.PI / 2 + (Math.PI / 2) * i
          const x = 42 * Math.cos(a)
          const y = 42 * Math.sin(a)
          const on = active === i
          return (
            <g key={t} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              {on ? (
                <Pulse>
                  <circle r="13" className="i-fill-gold" />
                  <text textAnchor="middle" dy="4" className="i-text-inv">
                    {t}
                  </text>
                </Pulse>
              ) : (
                <>
                  <circle r="13" className="i-fill-surface i-line" />
                  <text textAnchor="middle" dy="4" className="i-text">
                    {t}
                  </text>
                </>
              )}
            </g>
          )
        })}
        <polygon points={HEX(0, 0, 14)} className="i-gold" />
      </g>
    </Frame>
  )
}

function HexMove() {
  return (
    <Frame label="Activate a system and move ships in">
      <polygon points={HEX(55, 60, 30)} className="i-line" />
      <polygon points={HEX(100, 34, 30)} className="i-line" />
      <polygon points={HEX(145, 60, 30)} className="i-gold i-glow" />
      <circle cx="145" cy="60" r="7" className="i-fill-gold i-drop" />
      <g className="i-fly">
        <path d="M -8 -5 L 8 0 L -8 5 L -4 0 Z" className="i-fill-accent" />
      </g>
      <path d="M 62 60 Q 100 20 136 58" className="i-accent" strokeDasharray="3 4" fill="none" />
    </Frame>
  )
}

function Adjacency() {
  const c: [number, number][] = [
    [100, 60],
    [100, 26],
    [100, 94],
    [71, 43],
    [129, 43],
    [71, 77],
    [129, 77],
  ]
  return (
    <Frame label="Adjacent systems">
      {c.map(([x, y], i) => (
        <polygon key={i} points={HEX(x, y, 19)} className={i === 0 ? 'i-gold i-glow' : 'i-accent i-fade'} style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
      <circle cx="100" cy="60" r="5" className="i-fill-gold" />
    </Frame>
  )
}

function Wormholes() {
  return (
    <Frame label="Wormholes">
      {[
        [55, 'α'],
        [145, 'β'],
      ].map(([x, t]) => (
        <g key={t as string} transform={`translate(${x} 60)`}>
          <polygon points={HEX(0, 0, 32)} className="i-line" />
          <Spin dur={6} reverse={t === 'β'}>
            {[18, 12, 6].map((r) => (
              <circle key={r} r={r} className={t === 'α' ? 'i-gold' : 'i-accent'} strokeDasharray="6 4" />
            ))}
          </Spin>
          <text textAnchor="middle" dy="5" className="i-text" style={{ fontSize: 13 }}>
            {t}
          </text>
        </g>
      ))}
      <path d="M 82 52 Q 100 40 118 52" className="i-line" strokeDasharray="2 3" fill="none" />
      <path d="M 82 68 Q 100 80 118 68" className="i-line" strokeDasharray="2 3" fill="none" />
    </Frame>
  )
}

function Anomaly({ kind }: { kind?: string }) {
  const all = ['asteroid-field', 'nebula', 'supernova', 'gravity-rift']
  const show = kind && all.includes(kind) ? [kind] : all
  const w = show.length === 1 ? 120 : 200
  const step = show.length === 1 ? 0 : 46
  const x0 = show.length === 1 ? 60 : 31
  return (
    <Frame label="Anomalies" w={w}>
      {show.map((k, i) => {
        const x = x0 + i * step
        const r = show.length === 1 ? 44 : 22
        return (
          <g key={k} transform={`translate(${x} 60)`}>
            <polygon points={HEX(0, 0, r)} className="i-line" />
            {k === 'asteroid-field' &&
              [
                [-0.4, -0.3, 0.13],
                [0.3, -0.2, 0.1],
                [0, 0.3, 0.16],
                [-0.3, 0.35, 0.08],
                [0.4, 0.3, 0.07],
              ].map(([a, b, s], j) => <circle key={j} cx={a * r} cy={b * r} r={s * r} className="i-fill-muted i-bob" style={{ animationDelay: `${j * 0.3}s` }} />)}
            {k === 'nebula' && (
              <g className="i-breathe">
                <ellipse rx={r * 0.6} ry={r * 0.35} className="i-fill-violet" opacity=".35" />
                <ellipse rx={r * 0.35} ry={r * 0.55} className="i-fill-violet" opacity=".3" transform="rotate(30)" />
              </g>
            )}
            {k === 'supernova' && (
              <Pulse to={1.15}>
                <circle r={r * 0.25} className="i-fill-danger" />
                {Array.from({ length: 8 }, (_, j) => (
                  <line key={j} x1="0" y1={-r * 0.35} x2="0" y2={-r * 0.6} className="i-danger" transform={`rotate(${j * 45})`} />
                ))}
              </Pulse>
            )}
            {k === 'gravity-rift' && (
              <Spin dur={5}>
                {[0.6, 0.42, 0.25].map((s) => (
                  <ellipse key={s} rx={r * s} ry={r * s * 0.6} className="i-accent" strokeDasharray="4 3" />
                ))}
                <circle r={r * 0.08} className="i-fill-text" />
              </Spin>
            )}
          </g>
        )
      })}
    </Frame>
  )
}

export function Dice({ values = [3, 7, 9], target }: { values?: number[]; target?: number }) {
  return (
    <Frame label="Combat dice">
      {values.map((v, i) => {
        const hit = target != null ? v >= target : v >= 7
        return (
          <g key={i} transform={`translate(${45 + i * 55} 60)`}>
            <g className="i-roll" style={{ animationDelay: `${i * 0.2}s` }}>
              <rect x="-20" y="-20" width="40" height="40" rx="7" className={hit ? 'i-gold i-fill-goldbg' : 'i-line i-fill-surface'} />
              <text textAnchor="middle" dy="6" className={hit ? 'i-text-gold' : 'i-text'} style={{ fontSize: 18 }}>
                {v}
              </text>
            </g>
            {hit && <circle r="26" className="i-gold i-ring" />}
          </g>
        )
      })}
    </Frame>
  )
}

function Invasion() {
  return (
    <Frame label="Invasion">
      <circle cx="100" cy="98" r="44" className="i-fill-accentbg i-accent" />
      <path d="M 40 26 L 70 30 L 40 34 L 46 30 Z" className="i-fill-text" />
      <g className="i-bomb">
        <circle cx="78" cy="40" r="3" className="i-fill-danger" />
      </g>
      <path d="M 120 18 h 22 l 8 6 h -38 z" className="i-fill-text" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={124 + i * 7} y="30" width="4" height="6" rx="1" className="i-fill-gold i-land" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
    </Frame>
  )
}

function Pools({ hl }: { hl?: string }) {
  const pools = [
    ['tactic-pool', 'Tactic', 3],
    ['fleet-pool', 'Fleet', 3],
    ['strategy-pool', 'Strategy', 2],
  ] as const
  return (
    <Frame label="Command token pools">
      {pools.map(([k, label, n], i) => (
        <g key={k} transform={`translate(${40 + i * 60} 0)`} opacity={hl && hl !== k ? 0.45 : 1}>
          <rect x="-24" y="18" width="48" height="74" rx="6" className={hl === k ? 'i-gold' : 'i-line'} />
          {Array.from({ length: n }, (_, j) => (
            <polygon key={j} points={HEX(0, 78 - j * 18, 9)} className="i-fill-gold i-stack" style={{ animationDelay: `${(i * 3 + j) * 0.12}s` }} />
          ))}
          <text x="0" y="108" textAnchor="middle" className="i-text" style={{ fontSize: 9 }}>
            {label}
          </text>
        </g>
      ))}
    </Frame>
  )
}

function PlanetTraits() {
  const t = [
    ['cultural', 'var(--accent)'],
    ['hazardous', 'var(--danger)'],
    ['industrial', 'var(--ok)'],
  ]
  return (
    <Frame label="Planet traits">
      {t.map(([k, c], i) => (
        <g key={k} transform={`translate(${40 + i * 60} 55)`}>
          <circle r="22" fill={c} opacity=".2" stroke={c} />
          <ellipse rx="32" ry="8" fill="none" stroke={c} opacity=".6" strokeDasharray="5 4">
            {!REDUCED && <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="3s" repeatCount="indefinite" />}
          </ellipse>
          {k === 'cultural' && <path d="M -8 6 L 0 -10 L 8 6 Z" fill={c} />}
          {k === 'hazardous' && <path d="M 0 -10 L 3 -2 L 10 -2 L 4 3 L 6 11 L 0 6 L -6 11 L -4 3 L -10 -2 L -3 -2 Z" fill={c} />}
          {k === 'industrial' && <path d="M -9 8 V -2 L -3 2 V -2 L 3 2 V -8 H 9 V 8 Z" fill={c} />}
          <text y="44" textAnchor="middle" className="i-text" style={{ fontSize: 9 }}>
            {k}
          </text>
        </g>
      ))}
    </Frame>
  )
}

function TechTree() {
  const cols = ['var(--t-biotic)', 'var(--t-propulsion)', 'var(--t-cybernetic)', 'var(--t-warfare)']
  return (
    <Frame label="Technology tree">
      {cols.map((c, i) => (
        <g key={i} transform={`translate(${32 + i * 46} 0)`}>
          {[0, 1, 2].map((lvl) => (
            <g key={lvl}>
              {lvl > 0 && <line x1="0" y1={100 - (lvl - 1) * 34 - 9} x2="0" y2={100 - lvl * 34 + 9} stroke={c} strokeWidth="2" className="i-draw" style={{ animationDelay: `${i * 0.2 + lvl * 0.3}s` }} />}
              <circle cy={100 - lvl * 34} r="9" fill={c} opacity={lvl === 0 ? 1 : 0.85 - lvl * 0.2} className="i-fade" style={{ animationDelay: `${i * 0.2 + lvl * 0.3}s` }} />
            </g>
          ))}
        </g>
      ))}
    </Frame>
  )
}

function VPTrack() {
  return (
    <Frame label="Victory point track">
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i} transform={`translate(${14 + i * 17} 70)`}>
          <rect x="-7" y="-7" width="14" height="14" rx="2" className={i <= 6 ? 'i-fill-gold i-fade' : 'i-line'} style={{ animationDelay: `${i * 0.1}s` }} />
          <text y="22" textAnchor="middle" className="i-text" style={{ fontSize: 8 }}>
            {i}
          </text>
        </g>
      ))}
      <rect x="30" y="16" width="44" height="30" rx="3" className="i-gold" />
      <text x="52" y="36" textAnchor="middle" className="i-text-gold" style={{ fontSize: 12 }}>
        I · 1
      </text>
      <rect x="126" y="16" width="44" height="30" rx="3" className="i-accent" />
      <text x="148" y="36" textAnchor="middle" className="i-text" style={{ fontSize: 12, fill: 'var(--accent)' }}>
        II · 2
      </text>
    </Frame>
  )
}

function SpaceCannon() {
  return (
    <Frame label="Space cannon">
      <circle cx="50" cy="96" r="40" className="i-fill-accentbg i-accent" />
      <path d="M 50 56 a 46 46 0 0 1 0 0" />
      <path d="M 10 84 A 46 46 0 0 1 90 84" className="i-accent i-breathe" strokeDasharray="3 3" fill="none" />
      <rect x="44" y="50" width="12" height="10" rx="2" className="i-fill-gold" />
      <line x1="56" y1="52" x2="150" y2="22" className="i-gold i-shot" strokeWidth="2" />
      <path d="M 140 16 L 160 22 L 140 28 L 145 22 Z" className="i-fill-text" />
    </Frame>
  )
}

function Explore() {
  return (
    <Frame label="Exploration">
      <circle cx="70" cy="62" r="28" className="i-fill-surface i-line" />
      <Spin cx={70} cy={62} dur={4}>
        <path d="M 70 62 L 70 34 A 28 28 0 0 1 94 48 Z" className="i-fill-accent" opacity=".35" />
      </Spin>
      {[
        ['var(--danger)', 128],
        ['var(--accent)', 152],
        ['var(--ok)', 176],
      ].map(([c, x], i) => (
        <polygon key={i} points={`${x},44 ${(x as number) + 9},58 ${x},72 ${(x as number) - 9},58`} fill={c as string} className="i-bob" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      <text x="152" y="92" textAnchor="middle" className="i-text" style={{ fontSize: 9 }}>
        fragments
      </text>
    </Frame>
  )
}

function Vote() {
  return (
    <Frame label="Voting">
      <rect x="70" y="56" width="60" height="44" rx="4" className="i-line i-fill-surface" />
      <rect x="86" y="54" width="28" height="4" className="i-fill-text" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="92" y="10" width="16" height="22" rx="2" className="i-fill-accent i-ballot" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
      <text x="40" y="70" textAnchor="middle" className="i-text-gold" style={{ fontSize: 16 }}>
        For
      </text>
      <text x="160" y="70" textAnchor="middle" className="i-text" style={{ fontSize: 16 }}>
        Against
      </text>
    </Frame>
  )
}

const CONCEPT_ART: Record<string, () => ReactNode> = {
  'game-round': () => <PhaseCycle />,
  'strategy-phase': () => <PhaseCycle active={0} />,
  'action-phase': () => <PhaseCycle active={1} />,
  'status-phase': () => <PhaseCycle active={2} />,
  'agenda-phase': () => <PhaseCycle active={3} />,
  'tactical-action': () => <HexMove />,
  activation: () => <HexMove />,
  movement: () => <HexMove />,
  'move-value': () => <HexMove />,
  adjacency: () => <Adjacency />,
  neighbors: () => <Adjacency />,
  wormholes: () => <Wormholes />,
  'wormhole-nexus': () => <Wormholes />,
  anomalies: () => <Anomaly />,
  'asteroid-field': () => <Anomaly kind="asteroid-field" />,
  nebula: () => <Anomaly kind="nebula" />,
  supernova: () => <Anomaly kind="supernova" />,
  'gravity-rift': () => <Anomaly kind="gravity-rift" />,
  'space-combat': () => <Dice values={[4, 8, 6]} />,
  'combat-value': () => <Dice values={[5, 9, 2]} target={6} />,
  hits: () => <Dice values={[10, 3, 7]} />,
  'sustain-damage': () => <Dice values={[9, 2, 4]} />,
  'anti-fighter-barrage': () => <Dice values={[9, 6, 3]} target={9} />,
  invasion: () => <Invasion />,
  bombardment: () => <Invasion />,
  'ground-combat': () => <Invasion />,
  'command-tokens': () => <Pools />,
  'tactic-pool': () => <Pools hl="tactic-pool" />,
  'fleet-pool': () => <Pools hl="fleet-pool" />,
  'strategy-pool': () => <Pools hl="strategy-pool" />,
  'planet-traits': () => <PlanetTraits />,
  technology: () => <TechTree />,
  prerequisites: () => <TechTree />,
  'tech-specialty': () => <TechTree />,
  'unit-upgrades': () => <TechTree />,
  objectives: () => <VPTrack />,
  'victory-points': () => <VPTrack />,
  'space-cannon': () => <SpaceCannon />,
  'planetary-shield': () => <SpaceCannon />,
  exploration: () => <Explore />,
  'frontier-tokens': () => <Explore />,
  'relic-fragments': () => <Explore />,
  voting: () => <Vote />,
  agendas: () => <Vote />,
  laws: () => <Vote />,
  directives: () => <Vote />,
  elect: () => <Vote />,
}

export function ConceptArt({ slug }: { slug: string }) {
  const f = CONCEPT_ART[slug]
  return f ? <div className="illu-box">{f()}</div> : null
}

// ------------------------------------------------------------ archetype icons

const ARCH_PATHS: Record<string, ReactNode> = {
  trade: (
    <>
      <ellipse cx="12" cy="17" rx="7" ry="2.5" />
      <ellipse cx="12" cy="13" rx="7" ry="2.5" />
      <ellipse cx="12" cy="9" rx="7" ry="2.5" />
      <path d="M5 9v8M19 9v8" />
    </>
  ),
  science: (
    <>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-60 12 12)" />
    </>
  ),
  warlord: (
    <>
      <path d="M4 20 L16 8 L18 4 L20 6 L16 8" />
      <path d="M7 14 L10 17 M5 19 L3 21" />
      <path d="M20 20 L8 8 L6 4 L4 6 L8 8" />
    </>
  ),
  sprawl: (
    <>
      <polygon points="12,3 16,5.5 16,10.5 12,13 8,10.5 8,5.5" />
      <polygon points="6,12 10,14.5 10,19.5 6,22 2,19.5 2,14.5" />
      <polygon points="18,12 22,14.5 22,19.5 18,22 14,19.5 14,14.5" />
    </>
  ),
  politics: (
    <>
      <path d="M4 20h16M6 20v-9M10 20v-9M14 20v-9M18 20v-9M3 11h18L12 4z" />
    </>
  ),
  throne: (
    <>
      <path d="M4 18 L6 8 L10 12 L12 6 L14 12 L18 8 L20 18 Z" />
      <path d="M4 21h16" />
    </>
  ),
  explorer: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 L13.5 13.5 L8.5 15.5 L10.5 10.5 Z" />
    </>
  ),
  shadow: (
    <>
      <path d="M2 12 C 6 5, 18 5, 22 12 C 18 19, 6 19, 2 12 Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M4 4 L20 20" />
    </>
  ),
}

export function ArchetypeIcon({ id, size = 28, color }: { id: string; size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color ?? 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}>
      {ARCH_PATHS[id]}
    </svg>
  )
}

// ------------------------------------------------------------ faction sigils

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

/**
 * A generated abstract emblem per faction: hexagonal frame + a few rings,
 * spokes and a core shape derived from a hash of the id. Purely our own art.
 */
export function FactionSigil({ id, color, size = 56, spin }: { id: string; color?: string; size?: number; spin?: boolean }) {
  const h = hash(id)
  const spokes = 3 + (h % 4) // 3..6
  const rings = 1 + ((h >> 3) % 2)
  const core = (h >> 5) % 3
  const rot = (h >> 8) % 60
  const c = color ?? 'var(--gold)'
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} aria-hidden="true" className="sigil" style={{ flex: 'none' }}>
      <polygon points={HEX(0, 0, 46)} fill={c} fillOpacity=".12" stroke={c} strokeWidth="2" />
      <g transform={`rotate(${rot})`}>
        {(() => {
          const inner = (
            <>
              {Array.from({ length: rings }, (_, i) => (
                <circle key={i} r={30 - i * 10} fill="none" stroke={c} strokeWidth="1.5" strokeDasharray={i ? '4 3' : undefined} opacity={0.9 - i * 0.3} />
              ))}
              {Array.from({ length: spokes }, (_, i) => (
                <line key={i} x1="0" y1="-12" x2="0" y2="-34" stroke={c} strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${(360 / spokes) * i})`} />
              ))}
            </>
          )
          // Everything stays inside the hexagon (apothem ≈ 39.8 > 34).
          return spin ? <Spin dur={30}>{inner}</Spin> : inner
        })()}
      </g>
      {core === 0 && <circle r="9" fill={c} />}
      {core === 1 && <polygon points={HEX(0, 0, 10)} fill={c} />}
      {core === 2 && <polygon points="0,-11 10,6 -10,6" fill={c} />}
    </svg>
  )
}

// ------------------------------------------------------------ expansions

export function ExpansionArt({ id, size = 44 }: { id: 'base' | 'pok' | 'codex' | 'te'; size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" style={{ flex: 'none' }} className="exp-art">
      <polygon points={HEX(24, 24, 22)} fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".5" />
      {id === 'base' && (
        <>
          <circle cx="24" cy="24" r="8" fill="var(--gold)" />
          <circle cx="24" cy="24" r="14" fill="none" stroke="var(--gold)" strokeDasharray="2 3" />
        </>
      )}
      {id === 'pok' && (
        <>
          <circle cx="24" cy="24" r="7" fill="var(--accent)" />
          <ellipse cx="24" cy="24" rx="16" ry="5" fill="none" stroke="var(--accent)" transform="rotate(-20 24 24)" />
          <circle cx="38" cy="18" r="2.5" fill="var(--gold)" />
        </>
      )}
      {id === 'codex' && (
        <>
          <path d="M14 14 h9 v20 h-9 z M25 14 h9 v20 h-9 z" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
          <path d="M16 19h5M16 23h5M27 19h5M27 23h5" stroke="var(--gold)" />
        </>
      )}
      {id === 'te' && (
        <path d="M26 10 L16 26 H23 L20 38 L32 21 H25 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  )
}

/** Arrow connector for the tech path (horizontal on wide screens, vertical on mobile via CSS). */
export function FlowArrow({ ok = true }: { ok?: boolean }) {
  return (
    <svg className={`flow-arrow${ok ? '' : ' warn'}`} viewBox="0 0 32 16" aria-hidden="true">
      <line x1="2" y1="8" x2="26" y2="8" className="flow-line" />
      <path d="M 22 3 L 30 8 L 22 13" fill="none" />
    </svg>
  )
}

// ------------------------------------------------------------ planets

const safeId = (s: string) => s.replace(/[^a-zA-Z0-9_-]/g, '')

const TRAIT_COLOR: Record<string, string> = {
  cultural: 'var(--accent)',
  hazardous: 'var(--danger)',
  industrial: 'var(--ok)',
}
const SKIP_COLOR: Record<string, string> = {
  biotic: 'var(--t-biotic)',
  propulsion: 'var(--t-propulsion)',
  cybernetic: 'var(--t-cybernetic)',
  warfare: 'var(--t-warfare)',
}

/**
 * A generated planet portrait from its facts: colour = trait, size =
 * resources + influence, surface bands and moons from a hash of the id,
 * gold ring when legendary, badge for a tech specialty.
 */
export function PlanetArt({ p, size = 120, detail = true }: { p: PlanetFact; size?: number; detail?: boolean }) {
  const uidv = safeId(useId())
  const h = hash(p.id)
  const col = TRAIT_COLOR[p.trait] ?? 'var(--gold)'
  const R = Math.min(38, 20 + (p.res + p.inf) * 2.6)
  const cx = 60
  const cy = 60
  const bands = 2 + (h % 3)
  const moons = detail ? (h >> 4) % 3 : 0
  const tilt = ((h >> 7) % 40) - 20
  const stars = detail ? Array.from({ length: 14 }, (_, i) => [(hash(p.id + i) % 116) + 2, (hash(i + p.id) % 116) + 2, (hash(p.id + 'z' + i) % 3) * 0.4 + 0.4]) : []
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={p.name} className="planet-art" style={{ flex: 'none' }}>
      <defs>
        <radialGradient id={`g${uidv}`} cx="35%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity=".35" />
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity=".55" />
        </radialGradient>
        <clipPath id={`c${uidv}`}>
          <circle cx={cx} cy={cy} r={R} />
        </clipPath>
      </defs>
      {stars.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="var(--text-3)" opacity=".6" />
      ))}
      {p.legendary && <ellipse cx={cx} cy={cy} rx={R + 16} ry={(R + 16) * 0.28} fill="none" stroke="var(--gold)" strokeWidth="2" opacity=".55" transform={`rotate(${tilt} ${cx} ${cy})`} />}
      <circle cx={cx} cy={cy} r={R} fill={col} />
      <g clipPath={`url(#c${uidv})`} transform={`rotate(${tilt} ${cx} ${cy})`}>
        {Array.from({ length: bands }, (_, i) => {
          const y = cy - R + ((i + 1) * 2 * R) / (bands + 1) + (((h >> (i * 3)) % 7) - 3)
          return <ellipse key={i} cx={cx} cy={y} rx={R * 1.3} ry={2 + ((h >> (i + 2)) % 4)} fill="#000" opacity={0.12 + (i % 2) * 0.08} />
        })}
        {p.trait === 'hazardous' && <circle cx={cx + R * 0.3} cy={cy - R * 0.2} r={R * 0.22} fill="#000" opacity=".2" />}
        {p.trait === 'industrial' && <rect x={cx - R} y={cy + R * 0.15} width={R * 2} height={R * 0.12} fill="#fff" opacity=".18" />}
      </g>
      <circle cx={cx} cy={cy} r={R} fill={`url(#g${uidv})`} />
      {p.legendary && (
        <path
          d={`M ${cx - R - 16} ${cy} A ${R + 16} ${(R + 16) * 0.28} 0 0 0 ${cx + R + 16} ${cy}`}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
          transform={`rotate(${tilt} ${cx} ${cy})`}
        />
      )}
      {Array.from({ length: moons }, (_, i) => {
        const orbit = R + 8 + i * 7
        if (orbit > 56) return null
        return (
          <Spin key={i} cx={cx} cy={cy} dur={10 + i * 6} reverse={i % 2 === 1}>
            <circle cx={cx + orbit} cy={cy} r={2.5 - i * 0.5} fill="var(--text-2)" />
          </Spin>
        )
      })}
      {p.skip.map((sk, i) => (
        <g key={sk} transform={`translate(${104 - i * 16} 16)`}>
          <circle r="7" fill={SKIP_COLOR[sk] ?? 'var(--gold)'} stroke="var(--surface)" strokeWidth="2" />
        </g>
      ))}
      {detail && (
        <g fontFamily="var(--font-head)" fontWeight="700" fontSize="13" textAnchor="middle">
          <polygon points={HEX(14, 106, 11)} fill="var(--gold-bg)" stroke="var(--gold)" />
          <text x="14" y="110.5" fill="var(--gold)">
            {p.res}
          </text>
          <polygon points={HEX(38, 106, 11)} fill="var(--accent-bg)" stroke="var(--accent)" />
          <text x="38" y="110.5" fill="var(--accent)">
            {p.inf}
          </text>
        </g>
      )}
    </svg>
  )
}

// ------------------------------------------------------------ units

/** Simple original silhouettes for each unit type, drawn in a 100×100 box. */
export function UnitGlyph({ type, color = 'currentColor' }: { type: string; color?: string }) {
  const f = { fill: color }
  const st = { fill: 'none', stroke: color, strokeWidth: 4, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
  switch (type) {
    case 'fighter':
      return <path d="M50 18 L64 70 L50 60 L36 70 Z M28 74 L50 64 L72 74 L50 80 Z" {...f} />
    case 'destroyer':
      return <path d="M50 10 L60 40 L60 84 L50 92 L40 84 L40 40 Z M30 70 L40 62 L40 78 Z M70 70 L60 62 L60 78 Z" {...f} />
    case 'cruiser':
      return <path d="M50 8 L64 34 L66 86 L50 94 L34 86 L36 34 Z M22 60 L36 52 L36 76 Z M78 60 L64 52 L64 76 Z" {...f} />
    case 'carrier':
      return (
        <>
          <path d="M30 14 H70 L80 30 V86 L70 94 H30 L20 86 V30 Z" {...f} />
          <rect x="38" y="36" width="24" height="40" rx="3" fill="var(--surface)" opacity=".6" />
        </>
      )
    case 'dreadnought':
      return (
        <>
          <path d="M50 4 L70 26 L72 90 L50 98 L28 90 L30 26 Z" {...f} />
          {[34, 54, 74].map((y) => (
            <circle key={y} cx="50" cy={y} r="6" fill="var(--surface)" opacity=".6" />
          ))}
        </>
      )
    case 'flagship':
      return (
        <>
          <path d="M50 2 L74 22 L84 60 L70 96 L30 96 L16 60 L26 22 Z" {...f} />
          <path d="M50 20 L60 46 L50 70 L40 46 Z" fill="var(--surface)" opacity=".55" />
        </>
      )
    case 'warsun':
      return (
        <>
          <circle cx="50" cy="50" r="30" {...f} />
          <ellipse cx="50" cy="50" rx="46" ry="12" {...st} />
          <circle cx="40" cy="40" r="8" fill="var(--surface)" opacity=".5" />
        </>
      )
    case 'infantry':
      return (
        <>
          <circle cx="50" cy="24" r="12" {...f} />
          <path d="M30 92 L34 50 Q50 38 66 50 L70 92 Z" {...f} />
        </>
      )
    case 'mech':
      return (
        <>
          <rect x="30" y="18" width="40" height="34" rx="6" {...f} />
          <rect x="40" y="26" width="20" height="8" fill="var(--surface)" opacity=".6" />
          <path d="M34 52 L28 92 M66 52 L72 92" {...st} strokeWidth={9} />
          <path d="M30 30 L14 46 M70 30 L86 46" {...st} strokeWidth={6} />
        </>
      )
    case 'pds':
      return (
        <>
          <path d="M24 92 L50 64 L76 92 Z" {...f} />
          <path d="M50 66 L72 22" {...st} strokeWidth={9} />
          <circle cx="50" cy="64" r="10" {...f} />
        </>
      )
    case 'spacedock':
      return (
        <>
          <circle cx="50" cy="50" r="34" {...st} strokeWidth={8} />
          <circle cx="50" cy="50" r="12" {...f} />
          <path d="M50 16 V38 M50 62 V84 M16 50 H38 M62 50 H84" {...st} />
        </>
      )
    default:
      return <polygon points={HEX(50, 50, 40)} {...f} />
  }
}

export function UnitArt({ type, size = 120, label, upgraded }: { type: string; size?: number; label?: string; upgraded?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={label ?? type} style={{ flex: 'none' }} className="unit-art">
      <polygon points={HEX(60, 60, 56)} fill="var(--surface-2)" stroke="var(--line-strong)" />
      <g transform="translate(20 20) scale(.8)" className="unit-hover">
        <UnitGlyph type={type} color="var(--gold)" />
      </g>
      {upgraded && (
        <text x="96" y="104" textAnchor="middle" fontFamily="var(--font-brand)" fontWeight="700" fontSize="16" fill="var(--accent)">
          II
        </text>
      )}
    </svg>
  )
}

// ------------------------------------------------------------ technologies

const TECH_COLOR: Record<string, string> = { ...SKIP_COLOR, unitupgrade: 'var(--t-unit)' }

function TechEmblem({ type, color }: { type: string; color: string }) {
  const st = { fill: 'none', stroke: color, strokeWidth: 3, strokeLinecap: 'round' as const }
  switch (type) {
    case 'biotic': {
      // DNA double helix
      const pts = (ph: number) => Array.from({ length: 21 }, (_, i) => `${35 + 25 * Math.sin((i / 20) * Math.PI * 2.5 + ph)},${22 + i * 3.8}`).join(' ')
      return (
        <>
          <polyline points={pts(0)} {...st} />
          <polyline points={pts(Math.PI)} {...st} opacity=".7" />
          {Array.from({ length: 8 }, (_, i) => {
            const y = 26 + i * 9.5
            const t = ((y - 22) / 76) * Math.PI * 2.5
            return <line key={i} x1={35 + 25 * Math.sin(t)} y1={y} x2={35 + 25 * Math.sin(t + Math.PI)} y2={y} stroke={color} strokeWidth="1.5" opacity=".5" />
          })}
        </>
      )
    }
    case 'propulsion':
      return (
        <>
          <path d="M60 18 L76 44 L70 78 L50 78 L44 44 Z" fill={color} opacity=".85" transform="translate(-25 0)" />
          <g className="thrust">
            <path d="M26 82 L35 102 L44 82" {...st} />
            <path d="M30 82 L35 94 L40 82" {...st} strokeWidth={2} opacity=".7" />
          </g>
          <path d="M14 40 L22 48 M56 40 L48 48" {...st} />
        </>
      )
    case 'cybernetic':
      return (
        <>
          <rect x="18" y="38" width="34" height="34" rx="4" fill={color} opacity=".85" />
          {[44, 55, 66].map((y) => (
            <path key={y} d={`M18 ${y} H6 M52 ${y} H64`} {...st} strokeWidth={2} />
          ))}
          {[24, 35, 46].map((x) => (
            <path key={x} d={`M${x} 38 V26 M${x} 72 V84`} {...st} strokeWidth={2} />
          ))}
          <path d="M64 55 H70 V20 H35 V26" {...st} strokeWidth={2} strokeDasharray="4 4" className="trace" />
        </>
      )
    case 'warfare':
      return (
        <>
          <circle cx="35" cy="56" r="28" {...st} />
          <circle cx="35" cy="56" r="6" fill={color} />
          <Spin cx={35} cy={56} dur={10}>
            <circle cx="35" cy="56" r="18" {...st} strokeWidth={2} strokeDasharray="6 8" />
          </Spin>
          <path d="M35 22 V36 M35 76 V90 M1 56 H15 M55 56 H69" {...st} />
        </>
      )
    default:
      return <polygon points={HEX(35, 56, 26)} fill={color} opacity=".8" />
  }
}

/** Tech portrait: colour emblem (or the upgraded unit), prerequisite dots, faction sigil. */
export function TechArt({ tech, size = 120 }: { tech: TechFact; size?: number }) {
  const type = tech.types[0] ?? 'none'
  const color = TECH_COLOR[type] ?? 'var(--gold)'
  const req = parseReq(tech.req)
  const dots = Object.entries(req).flatMap(([c, n]) => Array.from({ length: n }, () => c))
  const unit = type === 'unitupgrade' ? allUnits.find((u) => u.requiredTech === tech.id) : undefined
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={tech.name} className="tech-art" style={{ flex: 'none' }}>
      <rect x="3" y="3" width="114" height="114" rx="10" fill={color} fillOpacity=".1" stroke={color} strokeWidth="2" />
      <path d="M3 24 L24 3" stroke={color} strokeWidth="2" opacity=".6" />
      <path d="M96 117 L117 96" stroke={color} strokeWidth="2" opacity=".6" />
      {unit ? (
        <g transform="translate(18 14) scale(.7)">
          <UnitGlyph type={unit.type} color={color} />
        </g>
      ) : (
        <g transform="translate(25 0)">
          <TechEmblem type={type} color={color} />
        </g>
      )}
      {unit && (
        <text x="98" y="30" textAnchor="middle" fontFamily="var(--font-brand)" fontWeight="700" fontSize="18" fill={color}>
          II
        </text>
      )}
      <g transform={`translate(${60 - (dots.length - 1) * 7} 108)`}>
        {dots.map((c, i) => (
          <circle key={i} cx={i * 14} cy="0" r="5" fill={SKIP_COLOR[c]} stroke="var(--surface)" strokeWidth="1.5" />
        ))}
      </g>
      {tech.faction && (
        <g transform="translate(86 74)">
          <FactionSigil id={tech.faction} size={26} />
        </g>
      )}
    </svg>
  )
}
