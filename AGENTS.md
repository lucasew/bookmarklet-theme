# Bookmarklet Theme - Agent Guidelines

## Tech Stack & Constraints
- **Vanilla JS & Raw HTML**: No framework. No build step. No bundler.
- **No Package Manager**: Do not add `package.json` or `node_modules`.
- **UI Architecture**: Injects DOM elements fixed to the bottom of the screen (button area). Dynamic themes via `<link>` tag insertion/modification.

## Error Handling
- **Centralized Error Reporting**: All unexpected errors *must* be funneled through a single centralized error reporting function (e.g., `reportError`).
- **No Silent Failures**: Every `catch` block or error handler must call the centralized reporting function rather than failing silently or calling `console.error` directly. *(Note: Currently, there are no error handlers in the script, but this rule applies when adding new ones.)*

## Tooling & Verification
- Use `mise` for tasks. To satisfy lint requirements, ensure `mise.toml` has a `lint` task defined (e.g. `node -c script.js`) and run `mise run lint`.
- Local testing and frontend verification can be done by loading `index.html` directly via `file://` URLs.

## Documentation (JSDoc)
- Documentation should focus on explaining the 'why', flow, and nuances (side effects, local storage keys) without altering executable logic.
- Avoid obvious comments (e.g., don't just state the return type if it's clear).

## Operational Memory
- `script.js` -> Main logic. Defines the IIFE that injects the UI and handles theming.
- `index.html` -> Local manual test harness.
