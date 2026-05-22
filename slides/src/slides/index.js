import Cover from './Cover.jsx';
import Agenda from './Agenda.jsx';
import HowIGotHere from './HowIGotHere.jsx';
import TeamAndProduct from './TeamAndProduct.jsx';
import TheProblem from './TheProblem.jsx';
import WhatIsETM from './WhatIsETM.jsx';
import MathLens1 from './MathLens1_Relational.jsx';
import MathLens2 from './MathLens2_Clock.jsx';
import MathLens3 from './MathLens3_Aggregation.jsx';
import ShippedWork from './ShippedWork.jsx';
import CoursesThatMattered from './CoursesThatMattered.jsx';
import ProgramSuggestions from './ProgramSuggestions.jsx';
import Interactions from './Interactions.jsx';
import Anecdote from './Anecdote.jsx';
import Reflections from './Reflections.jsx';
import Return from './Return.jsx';
import Closing from './Closing.jsx';

// 20-minute target. Talk arc (timing budgets in seconds):
//   Cover 30 · Agenda 45 · HowIGotHere 45 · TeamAndProduct 60 ·
//   TheProblem 75 · WhatIsETM 60 ·
//   MathLens1 90 · MathLens2 90 · MathLens3 75 ·
//   ShippedWork 90 · CoursesThatMattered 75 · ProgramSuggestions 75 ·
//   Interactions 45 · Anecdote 120 · Reflections 75 ·
//   Return 45 · Closing 30
// Subtotal ≈ 1125s (18.75 min) → leaves ~1.25 min buffer for Q&A.

export const slideComponents = [
  Cover,
  Agenda,
  HowIGotHere,
  TeamAndProduct,
  TheProblem,
  WhatIsETM,
  MathLens1,
  MathLens2,
  MathLens3,
  ShippedWork,
  CoursesThatMattered,
  ProgramSuggestions,
  Interactions,
  Anecdote,
  Reflections,
  Return,
  Closing,
];

export const slideMeta = slideComponents.map((C) => ({ label: C.name }));
