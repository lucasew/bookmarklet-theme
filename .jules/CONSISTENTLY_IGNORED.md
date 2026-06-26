## IGNORE: Premature Abstraction

**- Pattern:** Extracting functions or classes (like `BookmarkletThemeController` or `createControlButton`) for logic that is not duplicated.
**- Justification:** Violates the Rule of Three. Prematurely abstracting code in a simple script adds unnecessary complexity.
**- Files Affected:** `script.js`

## IGNORE: False Positive Security Mitigations

**- Pattern:** Adding SRI hashes, local storage prefixing, or refactoring `innerHTML` to `textContent` to prevent theoretical XSS or storage poisoning.
**- Justification:** These are overly complex security measures for a simple local bookmarklet that operates on user-provided URL parameters, adding noise without real security value.
**- Files Affected:** `script.js`, `index.html`

## IGNORE: Excessive Documentation

**- Pattern:** Adding comprehensive, block-level JSDoc comments to self-explanatory internal functions.
**- Justification:** Over-documenting simple vanilla JS functions creates noise and maintenance overhead. Documentation should focus on 'why', not 'what'.
**- Files Affected:** `script.js`

## IGNORE: Minor Stylistic Refactoring

**- Pattern:** Churning code purely for stylistic reasons, such as simplifying variable initializations or changing `==` to `===` where it does not solve a bug.
**- Justification:** Low-value stylistic churn that clutters the git history without providing meaningful structural or functional improvements.
**- Files Affected:** `script.js`

## IGNORE: CI and Tooling Configuration

**- Pattern:** Adding configuration files for CI/CD, task runners, or formatters like `mise.toml`, `.github/workflows/autorelease.yml`, or `workspaced.lock.json`.
**- Justification:** The project is a simple vanilla frontend bookmarklet that requires no build step, package manager, or CI pipeline. Adding these introduces unnecessary tooling overhead.
**- Files Affected:** `mise.toml`, `.github/workflows/autorelease.yml`, `workspaced.lock.json`

## IGNORE: Adding Project Conventions

**- Pattern:** Creating `AGENTS.md` files to document project conventions.
**- Justification:** The repository does not want project conventions codified in `AGENTS.md` by agents, or the simple nature of the project does not warrant a separate agent rule file.
**- Files Affected:** `AGENTS.md`
