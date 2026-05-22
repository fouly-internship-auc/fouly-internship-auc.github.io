import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

/**
 * Reachability — small CFG-style graph, used to make the point that ETM
 * interpretation is a graph problem too. The arrows fade in last.
 */
const NODES = [
  { id: 'entry', x: 120,  y: 200, label: 'entry' },
  { id: 'loop',  x: 380,  y: 200, label: 'loop_head' },
  { id: 'body',  x: 620,  y: 110, label: 'body' },
  { id: 'cont',  x: 620,  y: 290, label: 'continue' },
  { id: 'exit',  x: 880,  y: 200, label: 'exit' },
];
const EDGES = [
  ['entry', 'loop'],
  ['loop', 'body'],
  ['loop', 'cont'],
  ['body', 'loop'],
  ['cont', 'exit'],
];

function nodeById(id) { return NODES.find((n) => n.id === id); }

export default function Reachability() {
  return (
    <SlideFrame
      eyebrow="Aside · graph theory"
      title="A trace is a walk in a graph"
      subtitle="Decoded ETM data is a sequence of nodes visited in the control-flow graph of the traced program."
      ruleColor="var(--color-math)"
    >
      <div style={{ display: 'flex', gap: 40, alignItems: 'center', marginTop: 12 }}>
        <Animated as="svg" animate="up" delay={150}
          viewBox="0 0 1000 400" width="100%"
          style={{ flex: 1.15, maxWidth: 1100 }}>
          {EDGES.map(([a, b], i) => {
            const A = nodeById(a), B = nodeById(b);
            return (
              <Animated key={i} as="g" animate="fade" delay={500 + i * 120}>
                <line x1={A.x + 56} y1={A.y} x2={B.x - 56} y2={B.y}
                      stroke="var(--color-math)" strokeWidth="2.5"
                      strokeOpacity="0.8" markerEnd="url(#arr)" />
              </Animated>
            );
          })}
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5"
                    markerWidth="9" markerHeight="9" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--color-math)" />
            </marker>
          </defs>
          {NODES.map((n) => (
            <Animated key={n.id} as="g" animate="pop" delay={200}>
              <circle cx={n.x} cy={n.y} r="56" fill="var(--color-bg-elevated)"
                      stroke="var(--color-math)" strokeWidth="3" />
              <text x={n.x} y={n.y + 6} textAnchor="middle"
                    fontSize="20" fontFamily="var(--font-mono)"
                    fill="var(--color-ink)">{n.label}</text>
            </Animated>
          ))}
        </Animated>

        <Animated as="div" animate="up" delay={900}
          style={{ flex: 0.85, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="callout callout--math">
            Branch packets in the ETM stream are <em>edges</em>; each decoded
            instruction range is a <em>node</em>. Symbolisation, range
            attribution and coverage analysis are reachability arguments.
          </div>
          <p style={{ fontSize: 24, lineHeight: 1.45, color: 'var(--color-ink-muted)' }}>
            Graph theory gives me the language for those arguments. It is the
            third place the mathematics showed up in the work.
          </p>
        </Animated>
      </div>
    </SlideFrame>
  );
}
