import { Animated } from '../components/Animated.jsx';

export default function Closing() {
  return (
    <section className="slide slide--dark"
      style={{ padding: '120px 140px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Animated as="div" animate="fade" delay={100}
        style={{
          fontSize: 22, letterSpacing: '0.22em',
          textTransform: 'uppercase', fontWeight: 600,
          color: '#97a0ad',
        }}>
        Thank you
      </Animated>

      <Animated as="h1" animate="ease" delay={300}
        style={{
          fontFamily: 'var(--font-serif)', fontWeight: 600,
          fontSize: 140, lineHeight: 1.0, margin: '32px 0 24px',
          letterSpacing: '-0.02em', color: '#fff',
        }}>
        Questions?
      </Animated>

      <Animated as="div" animate="up" delay={500}
        style={{ fontSize: 30, color: '#d8d3c5', maxWidth: 1300, lineHeight: 1.4 }}>
        The full set of merged changelists, with diffs and review threads,
        is at <span style={{ fontFamily: 'var(--font-mono)', color: '#fff' }}>
          github.com/google/perfetto/pulls?q=is:pr+author:OmarElfouly+is:closed
        </span>.
      </Animated>

      <Animated as="div" animate="up" delay={700}
        style={{
          marginTop: 80, display: 'flex', gap: 60,
          fontSize: 22, color: '#97a0ad',
        }}>
        <div>
          <div style={{ color: '#fff', fontSize: 26, marginBottom: 4 }}>
            Omar Elfouly
          </div>
          omarelfouly29@gmail.com
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: 26, marginBottom: 4 }}>
            Supervisor
          </div>
          Rasika Navarange · Google
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: 26, marginBottom: 4 }}>
            Internship dates
          </div>
          2 June &mdash; 29 August 2025
        </div>
      </Animated>
    </section>
  );
}
