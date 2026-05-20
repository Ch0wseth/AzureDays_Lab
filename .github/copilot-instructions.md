# Copilot Instructions - Orange Copilot Demo

## Project Context
This is a JavaScript demo application using **Orange Boosted 5.3** (Bootstrap-based design system) to showcase GitHub Copilot capabilities in VS Code.

## Code Style
- Use ES Modules (`import/export`)
- Use JSDoc for all exported functions
- Prefer `const` over `let`, never use `var`
- Use template literals for string interpolation
- All UI text in French

## Architecture
- Express.js backend with REST API
- Vanilla JS frontend (no framework)
- Orange Boosted for UI components
- Playwright for E2E testing

## Orange Boosted Guidelines
- Always use Boosted classes instead of custom CSS when possible
- Follow Orange Design System color palette (primary: #ff7900)
- Use `data-bs-theme="dark"` for dark mode
- Respect WCAG AA accessibility standards

## Testing
- Unit tests with Jest for services/utils
- E2E tests with Playwright for UI flows
- Test files in `tests/` directory

## Token Optimization Tips
- Keep functions small and focused (< 30 lines)
- Use descriptive file names to help Copilot context
- Leverage `#file` references in prompts
- Use `.copilotignore` to exclude noise
