import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

const MATH = [
  { title: 'Discrete Math &amp; Formal Logic',
    note: 'Sets, relations, predicate logic. Specification-first query reasoning; joins under NULLs.' },
  { title: 'Linear Algebra',
    note: 'Affine maps, conditioning, residuals — the clock-alignment lens, including the fit that turned out not to ship.' },
  { title: 'Graph Theory',
    note: 'Control-flow graphs, reachability, branch packets as edges.' },
  { title: 'Probability &amp; Statistics',
    note: 'Stability of the path-not-taken fit; systematic vs. random error against hardware counters.' },
];

const CS = [
  { title: 'Algorithms &amp; Data Structures', note: 'Interval trees, join cost.' },
  { title: 'Databases', note: 'The trace processor is a database. Literally.' },
  { title: 'Computer Architecture', note: 'ARM, pipelines, PMU, hardware clocks.' },
];

export default function CoursesThatMattered() {
  return (
    <SlideFrame eyebrow="Section 3" title="The courses that mattered"
      subtitle="The mathematics gave me the lens. The CS courses gave me the implementation vocabulary.">
      <div style={{ marginTop: 12 }}>
        <Animated as="div" animate="fade" delay={100}
          style={{
            fontSize: 18, letterSpacing: '0.16em', textTransform: 'uppercase',
            fontWeight: 700, color: 'var(--color-math)', marginBottom: 12,
          }}>
          Mathematics
        </Animated>
        <div className="grid-cards grid-cards--4">
          {MATH.map((c, i) => (
            <Animated key={i} as="div" animate="up" delay={150 + i * 140}
              className="card">
              <div className="card__title" style={{ fontSize: 24 }}
                dangerouslySetInnerHTML={{ __html: c.title }} />
              <div className="card__sub" style={{ fontSize: 18 }}
                dangerouslySetInnerHTML={{ __html: c.note }} />
            </Animated>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <Animated as="div" animate="fade" delay={750}
          style={{
            fontSize: 18, letterSpacing: '0.16em', textTransform: 'uppercase',
            fontWeight: 700, color: 'var(--color-accent)', marginBottom: 12,
          }}>
          Adjacent (Computer Science)
        </Animated>
        <div className="grid-cards grid-cards--3">
          {CS.map((c, i) => (
            <Animated key={i} as="div" animate="up" delay={850 + i * 140}
              className="card">
              <div className="card__title" style={{ fontSize: 24 }}
                dangerouslySetInnerHTML={{ __html: c.title }} />
              <div className="card__sub" style={{ fontSize: 18 }}
                dangerouslySetInnerHTML={{ __html: c.note }} />
            </Animated>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
