# Bookmarklet Theme Agent Guidelines

## General Philosophy
- Vanilla HTML/JS project: DO NOT introduce package managers (no `package.json`), build steps, or third-party frameworks.
- Keep dependencies minimal, directly imported via CDN (e.g. `unpkg`).

## Conventions
- **Centralized Error Reporting:** All unexpected errors must be funneled through a centralized function (e.g. `reportError`). Every `catch` block MUST use it. Silent failures and direct `console.error` calls are prohibited.
- **Rule of Three:** Do not prematurely abstract code until duplication occurs at least three times. When it does, refactoring to adhere to the Single Responsibility Principle is required.
- **Security:** Ensure inputs are sanitized (especially URL parameters and user-controlled innerHTML) to prevent DOM-based XSS or arbitrary local storage poisoning. Reference `Sentinel` PRs.

## Directory Layout
- `/script.js` -> Main entrypoint and UI controller.
- `/index.html` -> Bookmarklet anchor and test playground.
