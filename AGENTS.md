# Project Conventions

- **Vanilla JS:** The project strictly uses raw HTML and vanilla JavaScript without a package manager or build step.
- **Rule of Three:** Apply the Rule of Three for abstraction. Do not prematurely abstract code.
- **Centralized Error Reporting:** All unexpected errors must be funneled through a single, centralized error-reporting function. Every `catch` block must use it rather than silently failing or using `console.error` directly at the call site.
- **URL Parameter Fallbacks:** When fixing typos in public API or URL parameter names, always keep the old misspelled parameter as a fallback to maintain backward compatibility for existing URL integrations.
- **Linting & Formatting:** All linting and formatting is managed via `workspaced` configured in `mise.toml`.

## Important Locations

- `script.js` -> Main execution logic and controllers.
- `.github/workflows/autorelease.yml` -> The sole CI/CD workflow handling all automated jobs.
