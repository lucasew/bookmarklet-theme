# Project Conventions

## Core Principles

* **Vanilla JS constraints**: The project is a vanilla frontend Bookmarklet Theme project using raw HTML and JavaScript without a package manager. Do not use build steps, bundlers, or module imports.
* **Backward compatibility**: When fixing typos in public API or URL parameter names, always keep the old misspelled parameter as a fallback to maintain backward compatibility for existing URL integrations.
* **The Rule of Three**: Before refactoring duplicated logic, wait until it is used in at least three places. Premature abstractions should be avoided.
* **Centralized Error Reporting**: All unexpected errors must be funneled through a single centralized function (e.g., `reportError` in `script.js`). Every catch block must use it rather than silently failing or using `console.error` directly at the call site.

## Where to find things

* **Entrypoint & Logic**: `script.js` contains the entire Bookmarklet application logic, including URL parsing, DOM manipulation, styling initialization, and event handling.
* **Documentation**: `README.md` includes the instructions to load the script as a bookmarklet.
* **CI/Linting Config**: `mise.toml` defines the CI tools and tasks, specifically the `lint` task using `node -c`.
