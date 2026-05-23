import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';
import { ClockAlign } from '../components/ClockAlign.jsx';

export default function MathLens2Clock() {
  return (
    <SlideFrame
      eyebrow="Math lens · 2 of 3"
      title="Aligning two clocks"
      subtitle="The interesting math wasn't in the model — it was in the path from the wrong solution to the right one."
      ruleColor="var(--color-math)"
    >
      <Animated as="div" animate="up" delay={150} style={{ marginTop: 0 }}>
        <ClockAlign />
      </Animated>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 12,
      }}>
        <Animated as="div" animate="up" delay={1400} className="card"
          style={{ borderLeft: '4px solid var(--color-warm)' }}>
          <span className="card__tag" style={{ color: 'var(--color-warm)' }}>
            The path not taken
          </span>
          <div className="card__title" style={{ fontSize: 28 }}>
            A sidecar trace and a fit
          </div>
          <div className="card__sub" style={{ fontSize: 22 }}>
            Iteration one of the design doc: emit synchronisation markers
            in both clock domains, treat the pair of sequences as a
            one-dimensional regression, recover (&alpha;, &beta;) at the end.
            Workable. Also unsatisfying.
          </div>
        </Animated>
        <Animated as="div" animate="up" delay={1550} className="card"
          style={{ borderLeft: '4px solid var(--color-math)' }}>
          <span className="card__tag" style={{ color: 'var(--color-math)' }}>
            What shipped
          </span>
          <div className="card__title" style={{ fontSize: 28 }}>
            Read the register
          </div>
          <div className="card__sub" style={{ fontSize: 22 }}>
            The device exposes its clock configuration directly. Read it
            in the trace prologue, parse it into (&alpha;, &beta;), and the
            affine map applies to every subsequent ETM timestamp by
            construction. No fit, no sidecar, no sync events.
          </div>
        </Animated>
      </div>
    </SlideFrame>
  );
}
