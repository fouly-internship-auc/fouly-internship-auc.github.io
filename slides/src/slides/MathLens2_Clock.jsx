import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';
import { ClockAlign } from '../components/ClockAlign.jsx';

export default function MathLens2Clock() {
  return (
    <SlideFrame
      eyebrow="Math lens · 2 of 3"
      title="Aligning two clocks"
      subtitle="ETM runs on its own hardware clock. The system clock is the one Perfetto trusts."
      ruleColor="var(--color-math)"
    >
      <Animated as="div" animate="up" delay={150} style={{ marginTop: 0 }}>
        <ClockAlign />
      </Animated>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 12,
      }}>
        <Animated as="div" animate="up" delay={1400} className="card">
          <span className="card__tag">The model</span>
          <div className="card__title" style={{ fontSize: 28 }}>
            An affine map in one dimension
          </div>
          <div className="card__sub" style={{ fontSize: 22 }}>
            Two unknowns: a frequency ratio &alpha; and an offset &beta;. Both
            recovered by fitting against synchronisation events visible in
            both domains.
          </div>
        </Animated>
        <Animated as="div" animate="up" delay={1550} className="card">
          <span className="card__tag">What I delivered</span>
          <div className="card__title" style={{ fontSize: 28 }}>
            A design document
          </div>
          <div className="card__sub" style={{ fontSize: 22 }}>
            Implementation shipped for the common single-domain case; the doc
            captures the general estimator, the failure modes (sleep states,
            counter overflow) and the future roadmap.
          </div>
        </Animated>
      </div>
    </SlideFrame>
  );
}
