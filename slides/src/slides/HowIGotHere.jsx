import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

const STEPS = [
  { tag: 'Referred', label: 'A friend already interning at Google sent me a referral and coached me on the loop.' },
  { tag: 'Applied', label: 'EMEA SWE Internship cycle, via Google Careers.' },
  { tag: 'Interviewed', label: 'Recruiter screen → two coding rounds → host match.' },
  { tag: 'Joined', label: 'Web Performance · Perfetto team, London office.' },
];

export default function HowIGotHere() {
  return (
    <SlideFrame eyebrow="Section 1" title="How I obtained the internship">
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, marginTop: 30 }}>
        {STEPS.map((s, i) => (
          <Animated key={i} as="div" animate="up" delay={150 + i * 180}
            style={{
              flex: 1,
              padding: '24px 28px',
              borderRight: i < STEPS.length - 1 ? '1px solid var(--color-rule)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}>
            <div style={{
              fontSize: 18, letterSpacing: '0.16em', textTransform: 'uppercase',
              fontWeight: 700, color: 'var(--color-accent)',
            }}>{s.tag}</div>
            <div style={{ fontSize: 26, lineHeight: 1.35, color: 'var(--color-ink)' }}>
              {s.label}
            </div>
          </Animated>
        ))}
      </div>

      <Animated as="div" animate="fade" delay={150 + STEPS.length * 180 + 100}
        className="callout" style={{ marginTop: 48 }}>
        Standard pipeline, standard interview loop. The interesting part of the
        story started on the first day.
      </Animated>
    </SlideFrame>
  );
}
