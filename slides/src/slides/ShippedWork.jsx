import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

const GROUPS = [
  {
    tag: 'Symbolization (the schism)',
    color: 'var(--color-accent)',
    items: [
      ['#2375', 'Adds a symbolize function to stdlib'],
      ['#2035', 'profiling: symbolizer: adds llvm symbolizer'],
      ['#2315', 'tp: stdlib: adds _linux_perf_etm_metadata'],
      ['#2069', 'ci: add llvm-dev to sandbox ci'],
      ['#2382', 'tp: stdlib: adds symbolize and etm diff tests'],
    ],
  },
  {
    tag: 'ETM decode',
    color: 'var(--color-math)',
    items: [
      ['#1853', 'tp: etm: symbolize vtable'],
      ['#2419', 'tp: build: mutual exclusion of llvm_symbolizer and libcxx'],
      ['#2498', 'tp: etm: rename trace to chunk'],
      ['#2500', 'tp: etm: fix current hack for zips'],
      ['#2587', 'tp: etm: binary info error fix'],
      ['#2664', 'tp: etm: improve etm decode'],
    ],
  },
  {
    tag: 'Aggregation &amp; tests',
    color: 'var(--color-warm)',
    items: [
      ['#1756', 'tp: migrate memory snapshot tables to stdlib'],
      ['#2482', 'tp: diff test: conditional etm package inclusion'],
      ['#2574', 'tp: diff_tests: optional diff tests based on config'],
      ['#2643', 'tp: etm: last seen timestamp and cumulative cycles'],
      ['#2706', 'tp: etm: fix cycle count for joins'],
    ],
  },
  {
    tag: 'UI',
    color: 'var(--color-good)',
    items: [
      ['#2712', 'UI: ETM: session track for etm'],
    ],
  },
];

export default function ShippedWork() {
  return (
    <SlideFrame eyebrow="Sections 2 &amp; 5"
      title="What landed"
      subtitle="18 reviewed and merged changelists, public, at github.com/google/perfetto. Grouped into four themes."
    >
      {/* Top-line stats — rolled in from the former Industry Benefit slide */}
      <div style={{
        display: 'flex', gap: 40, marginTop: 4, marginBottom: 20,
        alignItems: 'flex-end',
      }}>
        <Animated as="div" animate="pop" delay={150} className="stat">
          <div className="stat__value" style={{ fontSize: 88 }}>18</div>
          <div className="stat__label">merged CLs</div>
        </Animated>
        <Animated as="div" animate="pop" delay={280} className="stat">
          <div className="stat__value" style={{ fontSize: 88, color: 'var(--color-math)' }}>3</div>
          <div className="stat__label">substantial design docs (+ smaller ones)</div>
        </Animated>
        <Animated as="div" animate="pop" delay={410} className="stat">
          <div className="stat__value" style={{ fontSize: 88, color: 'var(--color-warm)' }}>LLVM</div>
          <div className="stat__label">added as build dep</div>
        </Animated>
        <Animated as="div" animate="pop" delay={540} className="stat">
          <div className="stat__value" style={{ fontSize: 88, color: 'var(--color-good)' }}>1</div>
          <div className="stat__label">new UI session track</div>
        </Animated>
      </div>

      <div className="grid-cards grid-cards--4" style={{ marginTop: 8 }}>
        {GROUPS.map((g, i) => (
          <Animated key={i} as="div" animate="up" delay={700 + i * 120}
            className="card"
            style={{ borderTop: `4px solid ${g.color}`, paddingTop: 16 }}>
            <span className="card__tag" style={{ color: g.color }}
              dangerouslySetInnerHTML={{ __html: g.tag }} />
            <ul style={{
              margin: 0, padding: 0, listStyle: 'none',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              {g.items.map(([num, title]) => (
                <li key={num} style={{
                  fontSize: 17, lineHeight: 1.3, display: 'flex', gap: 10,
                }}>
                  <span className="mono"
                    style={{ color: g.color, fontWeight: 700, minWidth: 56 }}>
                    {num}
                  </span>
                  <span style={{ color: 'var(--color-ink)' }}>{title}</span>
                </li>
              ))}
            </ul>
          </Animated>
        ))}
      </div>
    </SlideFrame>
  );
}
