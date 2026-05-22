import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

const BEATS = [
  { tag: '01', title: 'The problem',
    body: 'An open-source profiling tool that could not see what instructions a CPU was executing.' },
  { tag: '02', title: 'The mathematics',
    body: 'Three lenses that made the problem tractable — relations, an affine map, and a fold.' },
  { tag: '03', title: 'The takeaway',
    body: 'Eighteen merged changelists, a stack of design documents, and a return offer signed.' },
];

export default function Agenda() {
  return (
    <SlideFrame eyebrow="Talk · 20 minutes" title="What I want to cover">
      <div className="grid-cards grid-cards--3" style={{ marginTop: 30 }}>
        {BEATS.map((b, i) => (
          <Animated key={i} as="div" animate="up" delay={200 + i * 180}
            className="card" style={{ minHeight: 360 }}>
            <span className="card__tag">{b.tag}</span>
            <div className="card__title" style={{ fontSize: 36 }}>{b.title}</div>
            <div className="card__sub" style={{ fontSize: 24, marginTop: 8 }}>{b.body}</div>
          </Animated>
        ))}
      </div>
    </SlideFrame>
  );
}
