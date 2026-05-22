import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

export default function IndustryBenefit() {
  return (
    <SlideFrame eyebrow="Section 5 (cont.)"
      title="How Google benefitted"
      subtitle="Public artefacts, with the receipts attached.">
      <div style={{ display: 'flex', gap: 56, marginTop: 20, alignItems: 'stretch' }}>
        <Animated as="div" animate="pop" delay={150}
          style={{
            flex: '0 0 380px', display: 'flex', flexDirection: 'column',
            gap: 28, justifyContent: 'center',
          }}>
          <div className="stat">
            <div className="stat__value" style={{ fontSize: 160 }}>18</div>
            <div className="stat__label">merged changelists</div>
          </div>
          <div className="stat">
            <div className="stat__value" style={{ fontSize: 100,
              color: 'var(--color-math)' }}>1</div>
            <div className="stat__label">major design document (clock alignment)</div>
          </div>
          <div className="stat">
            <div className="stat__value" style={{ fontSize: 100,
              color: 'var(--color-warm)' }}>LLVM</div>
            <div className="stat__label">added as a first-class build dependency</div>
          </div>
        </Animated>

        <Animated as="div" animate="up" delay={400}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <ul className="bullets bullets--math" style={{ fontSize: 25 }}>
            <li>New SQL stdlib surface for ETM: <span className="mono">
              symbolize</span>, <span className="mono">_linux_perf_etm_metadata</span>,
              cumulative cycles, last-seen timestamps.</li>
            <li>Trace-processor side of ETM decode reshaped from
              experimental to usable.</li>
            <li>Diff-test scaffolding for ETM conditional on package
              availability — reusable for the next engineer.</li>
            <li>UI session track so ETM data is visible alongside the rest
              of the trace.</li>
            <li>CI sandbox extended with <span className="mono">llvm-dev</span>;
              symbolisation now in-process.</li>
          </ul>
        </Animated>
      </div>
    </SlideFrame>
  );
}
