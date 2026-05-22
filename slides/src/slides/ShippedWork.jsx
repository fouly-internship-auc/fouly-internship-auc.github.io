import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

const GROUPS = [
  {
    tag: 'Stdlib &amp; symbolize',
    color: 'var(--color-accent)',
    items: [
      ['#2035', 'profiling: symbolizer: adds llvm symbolizer'],
      ['#2069', 'ci: add llvm-dev to sandbox ci'],
      ['#2315', 'tp: stdlib: adds _linux_perf_etm_metadata'],
      ['#2375', 'Adds a symbolize function to stdlib'],
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
    <SlideFrame eyebrow="Section 5" title="What landed" subtitle="18 merged changelists, public, at github.com/google/perfetto.">
      <div className="grid-cards grid-cards--4" style={{ marginTop: 16 }}>
        {GROUPS.map((g, i) => (
          <Animated key={i} as="div" animate="up" delay={150 + i * 140}
            className="card"
            style={{ borderTop: `4px solid ${g.color}`, paddingTop: 18 }}>
            <span className="card__tag" style={{ color: g.color }}
              dangerouslySetInnerHTML={{ __html: g.tag }} />
            <ul style={{
              margin: 0, padding: 0, listStyle: 'none',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              {g.items.map(([num, title]) => (
                <li key={num} style={{
                  fontSize: 18, lineHeight: 1.35, display: 'flex', gap: 10,
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
