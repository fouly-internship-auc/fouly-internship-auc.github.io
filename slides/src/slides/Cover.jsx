import { Animated } from '../components/Animated.jsx';

export default function Cover() {
  return (
    <section className="slide slide--dark" style={{ padding: '120px 140px' }}>
      <Animated as="div" animate="fade" delay={100}>
        <div style={{
          fontSize: 22, letterSpacing: '0.22em',
          textTransform: 'uppercase', fontWeight: 600,
          color: '#97a0ad',
        }}>
          The American University in Cairo · Department of Mathematics and Actuarial Science
        </div>
      </Animated>

      <Animated as="h1" animate="ease" delay={250}
        style={{
          fontFamily: 'var(--font-serif)', fontWeight: 600,
          fontSize: 120, lineHeight: 1.0, margin: '60px 0 24px',
          letterSpacing: '-0.02em', color: '#fff',
        }}>
        Practical Internship
      </Animated>

      <Animated as="div" animate="ease" delay={420}
        style={{ fontSize: 38, color: '#d8d3c5', maxWidth: 1500, lineHeight: 1.25 }}>
        Decoding, querying and visualising ARM ETM instruction traces
        inside Google&rsquo;s Perfetto.
      </Animated>

      <Animated as="div" animate="up" delay={650}
        style={{
          marginTop: 'auto', display: 'flex',
          justifyContent: 'space-between', alignItems: 'flex-end',
          paddingTop: 80, gap: 60,
        }}>
        <div>
          <div style={{ fontSize: 32, fontFamily: 'var(--font-serif)', color: '#fff' }}>
            Omar Elfouly
          </div>
          <div style={{ fontSize: 22, color: '#97a0ad', marginTop: 6 }}>
            Mathematics &amp; Computer Engineering · Spring 2026
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 22, color: '#97a0ad' }}>
            Software Engineering Internship
          </div>
          <div style={{ fontSize: 28, color: '#fff', marginTop: 6,
            fontFamily: 'var(--font-mono)' }}>
            Google · Perfetto · London
          </div>
          <div style={{ fontSize: 20, color: '#97a0ad', marginTop: 6,
            fontVariantNumeric: 'tabular-nums' }}>
            2 June &mdash; 29 August 2025
          </div>
        </div>
      </Animated>
    </section>
  );
}
