// Practical Internship Report — AUC Mathematics
// Omar Elfouly
// Google UK Limited, Web Performance team (Perfetto)
// 2 June 2025 – 29 August 2025

#set page(
  paper: "a4",
  margin: (top: 2.4cm, bottom: 2.4cm, left: 2.4cm, right: 2.4cm),
  numbering: "1",
  number-align: center,
)

#set par(justify: true, leading: 0.72em)
#set text(size: 11pt, lang: "en")
#show heading.where(level: 1): it => {
  pagebreak(weak: true)
  v(0.4em)
  block(text(size: 18pt, weight: "bold", it.body))
  v(0.6em)
}
#show heading.where(level: 2): it => {
  v(0.8em)
  block(text(size: 13pt, weight: "bold", it.body))
  v(0.2em)
}
#show heading.where(level: 3): it => {
  v(0.4em)
  block(text(size: 11.5pt, weight: "bold", style: "italic", it.body))
}
#show link: set text(fill: rgb("#1a4ea3"))
#show raw: set text(size: 9.8pt)

// ---------- Title page ----------
#set page(numbering: none)
#align(center)[
  #v(2.4cm)
  #text(size: 14pt)[The American University in Cairo]
  #v(0.2em)
  #text(size: 12pt, style: "italic")[Department of Mathematics and Actuarial Science]
  #v(2.6cm)
  #text(size: 24pt, weight: "bold")[Practical Internship Report]
  #v(0.8em)
  #text(size: 13pt)[Software Engineering Internship, Google UK Limited]
  #v(0.4em)
  #text(size: 12pt, style: "italic")[Web Performance team — Perfetto]
  #v(2.8cm)
  #grid(
    columns: (auto, auto),
    column-gutter: 1.4em,
    row-gutter: 0.8em,
    align: (right, left),
    text(weight: "bold")[Name], [Omar Elfouly],
    text(weight: "bold")[Major], [Mathematics and Computer Engineering],
    text(weight: "bold")[Submitted for], [Mathematics practical internship course],
    text(weight: "bold")[Internship dates], [2 June 2025 — 29 August 2025],
    text(weight: "bold")[Location], [London, United Kingdom],
    text(weight: "bold")[Industry supervisor], [Rasika Navarange, Software Engineer, Google],
    text(weight: "bold")[Faculty adviser], [Dr Wafik],
    text(weight: "bold")[Submitted], [Spring 2026],
  )
  #v(1fr)
]
#pagebreak()
#set page(numbering: "1")
#counter(page).update(1)

#outline(title: [Contents], indent: 1em)

#include "sections/01_obtaining.typ"
#include "sections/02_work.typ"
#include "sections/03_coursework.typ"
#include "sections/04_learning.typ"
#include "sections/05_industry_benefit.typ"
#include "sections/06_program_suggestions.typ"
#include "sections/07_interactions.typ"
#include "sections/08_evaluation_response.typ"
#include "sections/09_future.typ"

= Appendix

The two attachments referenced throughout this report are bundled with the
submission as separate PDFs:

- `appendix/evaluation_letter.pdf` — evaluative letter from the industry
  supervisor, Rasika Navarange.
- `appendix/employment_verification.pdf` — official letter of employment
  from Google UK Limited.
