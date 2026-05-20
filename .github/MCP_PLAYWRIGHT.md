# Playwright MCP Server configuration for VS Code
# This enables Copilot to run and interact with Playwright tests via MCP

## Setup

The Playwright MCP server allows GitHub Copilot to:
- Run E2E tests directly from chat
- Navigate and interact with the app in a browser
- Take screenshots for visual validation
- Debug test failures interactively

## VS Code MCP Configuration

Add this to your `.vscode/settings.json` to enable the Playwright MCP server:

```json
{
  "mcp": {
    "servers": {
      "playwright": {
        "command": "npx",
        "args": ["@anthropic-ai/mcp-server-playwright"]
      }
    }
  }
}
```

## Usage with Copilot

In Copilot Chat (Agent mode), you can ask:
- "Run the E2E tests and show me the results"
- "Navigate to localhost:3000 and take a screenshot"
- "Click the 'Nouvelle Tâche' button and fill out the form"
- "Check if the task list shows the correct items"
