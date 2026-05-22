import Cover from './Cover.jsx';
import Agenda from './Agenda.jsx';
import HowIGotHere from './HowIGotHere.jsx';
import TeamAndProduct from './TeamAndProduct.jsx';
import TheProblem from './TheProblem.jsx';
import WhatIsETM from './WhatIsETM.jsx';
import MathLens1 from './MathLens1_Relational.jsx';
import MathLens2 from './MathLens2_Clock.jsx';
import MathLens3 from './MathLens3_Aggregation.jsx';
import Reachability from './Reachability.jsx';
import IndustryBenefit from './IndustryBenefit.jsx';
import ShippedWork from './ShippedWork.jsx';
import CoursesThatMattered from './CoursesThatMattered.jsx';
import ProgramSuggestions from './ProgramSuggestions.jsx';
import Interactions from './Interactions.jsx';
import Anecdote from './Anecdote.jsx';
import Reflections from './Reflections.jsx';
import Return from './Return.jsx';
import Closing from './Closing.jsx';

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
  Reachability,
  ShippedWork,
  IndustryBenefit,
  CoursesThatMattered,
  ProgramSuggestions,
  Interactions,
  Anecdote,
  Reflections,
  Return,
  Closing,
];

// Per-slide metadata for the SlideMetaContext (kept thin — the deck-stage
// chrome only needs num/total, which it derives, but future PPTX/print
// scripts may want named labels).
export const slideMeta = slideComponents.map((C) => ({ label: C.name }));
