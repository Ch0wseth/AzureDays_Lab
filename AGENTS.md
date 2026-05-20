# AGENTS.md — Orange Copilot Demo

This file is the primary instructions source read automatically by the **GitHub Copilot CLI** (`copilot`) at the start of every session in this repository.

## Project Context
JavaScript demo application using **Orange Boosted 5.3** (Bootstrap-based design system) to showcase GitHub Copilot CLI capabilities in the terminal.

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
- Attach files explicitly with `@path/to/file` in CLI prompts
- Use the `Caveman Mode` agent for minimal token responses (see `.github/agents/caveman-mode.agent.md`)
- Run `/usage` and `/context` in the CLI to monitor consumption
