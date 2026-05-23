# Practical Internship Deliverables — AUC Mathematics

Report and presentation submitted for the AUC Mathematics practical-internship
course, based on a Software Engineering internship at Google UK (Web
Performance team, Perfetto) from 2 June 2025 to 29 August 2025.

## Hosted at

The latest deck and report are published at
**https://fouly-internship-auc.github.io** on every push to `main`,
via `.github/workflows/deploy.yml`.

- `/` — slide deck (use ←/→/space, `R` to reset, `1`–`9` for direct jumps)
- `/report.pdf` — report PDF

## Quick start

```sh
nix develop          # enter dev shell with typst, node, npm
make                 # build report PDF + slide bundle
make help            # list every target
```

| Target              | What it does                                          |
|---------------------|-------------------------------------------------------|
| `make`              | Build `report/main.pdf` and `slides/dist`             |
| `make report`       | Typst-compile the report                              |
| `make slides`       | Build the static slide deck                           |
| `make slides-dev`   | Vite dev server at `http://localhost:5173`            |
| `make slides-preview` | Serve the production slide bundle locally           |
| `make watch-report` | Typst watch — rebuild PDF on every save               |
| `make deploy`       | Trigger the GitHub Actions deploy workflow            |
| `make deploy-watch` | Tail the latest deploy run                            |
| `make clean`        | Remove every build artefact                           |

## Hosting setup (first time only)

1. Create a GitHub user **or** org with the login `fouly-internship-auc`.
2. Under it, create a repository named `fouly-internship-auc.github.io`
   (the matching repo name is what makes the GitHub Pages user/org site
   live at the root of `fouly-internship-auc.github.io`).
3. Point this repo at it and push `main`:

   ```sh
   git remote add origin git@github.com:fouly-internship-auc/fouly-internship-auc.github.io.git
   git push -u origin main
   ```

4. In the GitHub repo, open **Settings → Pages** and set
   **Source: GitHub Actions**.
5. Every push to `main` after that will rebuild and redeploy. To trigger
   a deploy without a new commit, run `make deploy`.

## Layout

```
Makefile               build + deploy entry points
flake.nix              dev shell pinning typst + node + npm
.github/workflows/     CI: build + deploy report and slides to Pages
report/                Typst sources, one file per guideline section
report/appendix/       Supervisor evaluation letter + employment verification
slides/                React + Vite deck (one component per slide)
```
