# Build the practical-internship deliverables: the Typst report PDF
# and the React slide deck. Run `make help` to see every target.

REPORT_DIR     := report
SLIDES_DIR     := slides
REPORT_SRC     := $(REPORT_DIR)/main.typ
REPORT_PDF     := $(REPORT_DIR)/main.pdf
REPORT_DEPS    := $(REPORT_SRC) $(wildcard $(REPORT_DIR)/sections/*.typ)
SLIDES_DIST    := $(SLIDES_DIR)/dist
SLIDES_MARKER  := $(SLIDES_DIR)/node_modules/.install-stamp

.DEFAULT_GOAL := all
.PHONY: all help report slides slides-dev slides-preview slides-install \
        watch-report deploy deploy-watch clean clean-report clean-slides

help:
	@echo "Targets:"
	@echo "  make              build the report PDF and the slide bundle"
	@echo "  make report       compile report/main.typ -> report/main.pdf"
	@echo "  make slides       build the static slide deck -> slides/dist"
	@echo "  make slides-dev   start the slide deck dev server (localhost:5173)"
	@echo "  make slides-preview  serve the production slide bundle locally"
	@echo "  make watch-report typst watch — rebuild PDF on every save"
	@echo "  make deploy       trigger the GitHub Actions deploy workflow"
	@echo "  make deploy-watch tail the latest deploy run"
	@echo "  make clean        remove every build artefact"

all: report slides

# ── Report ───────────────────────────────────────────────────────────────────

report: $(REPORT_PDF)

$(REPORT_PDF): $(REPORT_DEPS)
	typst compile $(REPORT_SRC)

watch-report:
	typst watch $(REPORT_SRC)

# ── Slides ───────────────────────────────────────────────────────────────────

slides: $(SLIDES_MARKER)
	cd $(SLIDES_DIR) && npm run build

slides-dev: $(SLIDES_MARKER)
	cd $(SLIDES_DIR) && npm run dev

slides-preview: slides
	cd $(SLIDES_DIR) && npm run preview

slides-install: $(SLIDES_MARKER)

$(SLIDES_MARKER): $(SLIDES_DIR)/package.json $(SLIDES_DIR)/package-lock.json
	cd $(SLIDES_DIR) && npm ci
	@mkdir -p $(dir $@) && touch $@

# ── Deploy ───────────────────────────────────────────────────────────────────
#
# Hosting model: the repository lives at the GitHub user/org
# `fouly-internship-auc`, in a repo named `fouly-internship-auc.github.io`,
# which makes the site available at https://fouly-internship-auc.github.io.
# The .github/workflows/deploy.yml workflow builds both artefacts on every
# push to main and publishes them via GitHub Pages.
#
# `make deploy` re-runs the workflow without needing a fresh commit.

deploy:
	@echo "Triggering deploy workflow on GitHub Actions…"
	gh workflow run deploy.yml
	@echo "Tail with: make deploy-watch"

deploy-watch:
	gh run watch $$(gh run list --workflow=deploy.yml --limit=1 --json databaseId --jq '.[0].databaseId')

# ── Clean ────────────────────────────────────────────────────────────────────

clean: clean-report clean-slides

clean-report:
	@rm -f $(REPORT_PDF)

clean-slides:
	@rm -rf $(SLIDES_DIST) $(SLIDES_DIR)/.vite $(SLIDES_MARKER)
