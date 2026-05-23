import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

export default function TheProblem() {
  return (
    <SlideFrame eyebrow="Section 2 · The problem"
      title="What Perfetto could not see"
      ruleColor="var(--color-warm)"
    >
      <div style={{ display: 'flex', gap: 60, alignItems: 'stretch', marginTop: 20 }}>
        <Animated as="div" animate="up" delay={150}
          style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <p style={{ fontSize: 32, lineHeight: 1.4, margin: 0 }}>
            Perfetto already understood the scheduler, memory, GPU and custom
            events. It did <em>not</em> understand <strong>what instructions a CPU had
            executed</strong>, because that data lives in a much lower-level
            facility:
          </p>
          <Animated as="div" animate="pop" delay={500}
            className="label-chip"
            style={{ fontSize: 28, padding: '10px 22px', alignSelf: 'flex-start' }}>
            ARM Embedded Trace Macrocell &nbsp;·&nbsp; ETM
          </Animated>
          <p style={{ fontSize: 26, lineHeight: 1.4, margin: 0,
            color: 'var(--color-ink-muted)' }}>
            Cycle-accurate. Per-CPU. Up to gigabytes per second per core
            when saturated.
          </p>
        </Animated>

        <Animated as="div" animate="up" delay={300}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ borderColor: 'var(--color-warm)' }}>
            <span className="card__tag" style={{ color: 'var(--color-warm)' }}>
              The gap
            </span>
            <div className="card__title">Three things had to become true</div>
            <ol style={{
              fontSize: 24, lineHeight: 1.5, paddingLeft: 28, margin: '6px 0 0',
            }}>
              <li>Trace bytes <strong>decoded</strong> into structured records.</li>
              <li>Records <strong>aligned</strong> to the global timeline.</li>
              <li>Aligned records <strong>queryable</strong> as relations.</li>
            </ol>
          </div>
          <Animated as="div" animate="fade" delay={900}
            className="callout callout--warm" style={{ fontSize: 26 }}>
            Each turned out to be a question with both engineering and
            mathematical themes.
          </Animated>
        </Animated>
      </div>
    </SlideFrame>
  );
}
