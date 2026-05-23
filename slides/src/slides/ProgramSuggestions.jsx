import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

const SUGGESTIONS = [
  { tag: '01', title: 'Applied / computational track',
    note: 'Numerical conditioning, costs of operations, behaviour under finite precision — taught as mathematics.' },
  { tag: '02', title: 'Formal optimisation',
    note: 'Convex optimisation, LP, non-linear methods. For join-cost reasoning and the clock-alignment design.' },
  { tag: '03', title: 'Formal verification',
    note: 'Stating what a program is supposed to do before deciding how it does it. Pre/post-conditions, loop invariants, proof assistants.' },
  { tag: '04', title: 'Complexity analysis as mathematics',
    note: 'Treated as a structural theory, not just a tool inside an algorithms course.' },
  { tag: '05', title: 'Earlier programming, taught for mathematicians',
    note: 'Programming through symbolic algebra, set manipulation and proof checking — not through web apps.' },
];

export default function ProgramSuggestions() {
  return (
    <SlideFrame
      eyebrow="Section 6"
      title="What I would add to the AUC Mathematics programme"
      subtitle="One intern, one experience. Offered in that spirit."
    >
      <div className="grid-cards grid-cards--5" style={{ marginTop: 24 }}>
        {SUGGESTIONS.map((s, i) => (
          <Animated key={i} as="div" animate="up" delay={150 + i * 130}
            className="card" style={{ minHeight: 320 }}>
            <span className="card__tag">{s.tag}</span>
            <div className="card__title" style={{ fontSize: 24 }}>{s.title}</div>
            <div className="card__sub" style={{ fontSize: 18, lineHeight: 1.5 }}>
              {s.note}
            </div>
          </Animated>
        ))}
      </div>

      <Animated as="div" animate="fade" delay={150 + SUGGESTIONS.length * 130 + 100}
        className="callout" style={{ marginTop: 28 }}>
        What the programme <em>does</em> get right: discrete maths, linear
        algebra, graph theory and probability are taught at a high enough
        standard that I could sit at a senior-engineer table and contribute.
        The suggestions above extend that foundation rather than replace it.
      </Animated>
    </SlideFrame>
  );
}
