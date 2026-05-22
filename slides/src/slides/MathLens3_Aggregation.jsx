import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';
import { CycleCount } from '../components/CycleCount.jsx';

export default function MathLens3Aggregation() {
  return (
    <SlideFrame
      eyebrow="Math lens · 3 of 3"
      title="Aggregation as a fold"
      subtitle="Once intervals are relations, &ldquo;how many cycles in this range?&rdquo; is a scan."
      ruleColor="var(--color-math)"
    >
      <Animated as="div" animate="up" delay={150}>
        <CycleCount />
      </Animated>

      <div style={{ display: 'flex', gap: 32, marginTop: 10 }}>
        <Animated as="div" animate="fade" delay={1400}
          className="callout callout--math" style={{ flex: 1.1 }}>
          <strong>Cumulative cycles.</strong> A user-defined aggregate function
          over execution intervals. PR <span className="mono">#2643</span> adds
          it; PR <span className="mono">#2706</span> fixes the join semantics.
        </Animated>
        <Animated as="div" animate="fade" delay={1550}
          className="callout" style={{ flex: 1 }}>
          <strong>Last-seen timestamp.</strong> The same shape, replacing the
          sum with a <span className="mono">max</span>. Both exposed through
          the same SQL surface so analysts can use them in any query.
        </Animated>
      </div>
    </SlideFrame>
  );
}
