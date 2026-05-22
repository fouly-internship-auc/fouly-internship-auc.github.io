# Practical Internship Deliverables — AUC Mathematics

Report and presentation submitted for the AUC Mathematics practical-internship
course, based on a Software Engineering internship at Google UK (Web
Performance team, Perfetto) from 2 June 2025 to 29 August 2025.

## Build the report

```sh
nix develop
typst compile report/main.typ
```

Output: `report/main.pdf`.

## Run the slide deck

```sh
nix develop
cd slides
npm install
npm run dev       # http://localhost:5173
npm run build     # static bundle in slides/dist
npm run preview   # serves the production bundle
```

## Layout

```
report/             Typst sources, one file per guideline section
report/appendix/    Supervisor evaluation letter + employment verification
slides/             React + Vite deck (one component per slide)
```
