import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';
import { IntervalIntersect } from '../components/IntervalIntersect.jsx';
import { JoinDiagram } from '../components/JoinDiagram.jsx';

export default function MathLens1Relational() {
  return (
    <SlideFrame
      eyebrow="Math lens · 1 of 3"
      title="Relational algebra &amp; set theory"
      subtitle="Once ETM packets become relations, the analyses become joins."
      ruleColor="var(--color-math)"
    >
      <div style={{ display: 'flex', gap: 60, alignItems: 'stretch' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Animated as="p" animate="up" delay={150}
            style={{ fontSize: 28, lineHeight: 1.4, margin: 0 }}>
            Decoded ETM data is reshaped into <em>execution intervals</em>:
          </Animated>

          <Animated as="div" animate="pop" delay={300}
            className="math-block"
            style={{
              background: 'var(--color-math-soft)',
              borderRadius: 12, padding: '20px 28px', fontSize: 28,
            }}>
            (cpu, addr_start, addr_end, cycle, ts)
          </Animated>

          <Animated as="p" animate="up" delay={500}
            style={{ fontSize: 28, lineHeight: 1.4, margin: 0 }}>
            Interval joins reduce to the half-open intersection test:
          </Animated>

          <Animated as="div" animate="pop" delay={700} style={{ marginTop: -10 }}>
            <IntervalIntersect />
          </Animated>
        </div>

        <Animated as="div" animate="ease" delay={400}
          style={{ flex: 1.05, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <JoinDiagram />
          <div style={{ fontSize: 22, color: 'var(--color-ink-muted)',
            textAlign: 'center', marginTop: -10 }}>
            Execution intervals (R) &times; symbol ranges (S) &nbsp;⟶&nbsp; per-symbol cycles.
          </div>
        </Animated>
      </div>
    </SlideFrame>
  );
}
