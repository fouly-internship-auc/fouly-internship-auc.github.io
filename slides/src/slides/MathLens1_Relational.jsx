import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';
import { IntervalIntersect } from '../components/IntervalIntersect.jsx';
import { JoinDiagram } from '../components/JoinDiagram.jsx';

export default function MathLens1Relational() {
  return (
    <SlideFrame
      eyebrow="Math lens · 1 of 3"
      title="Relations, joins, and query cost"
      subtitle="ETM becomes a SQL table. Analyses become joins. The math is in how cheap each join is on a hundred-million-row engine."
      ruleColor="var(--color-math)"
    >
      <div style={{ display: 'flex', gap: 60, alignItems: 'stretch' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Animated as="p" animate="up" delay={150}
            style={{ fontSize: 28, lineHeight: 1.4, margin: 0 }}>
            Decoded ETM data is reshaped into a virtual SQL table:
          </Animated>

          <Animated as="div" animate="pop" delay={300}
            className="math-block"
            style={{
              background: 'var(--color-math-soft)',
              borderRadius: 12, padding: '20px 28px',
              fontSize: 22, fontFamily: 'var(--font-mono)',
              textAlign: 'left', lineHeight: 1.5,
            }}>
            element_type, timestamp, cycle_count,<br/>
            last_seen_timestamp, cumulative_cycles,<br/>
            isa, instruction_range, &hellip;
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
            This join <em>is</em> symbolization &mdash; the join that turns an
            opaque ETM packet into a source-line attribution.
          </div>
        </Animated>
      </div>
    </SlideFrame>
  );
}
