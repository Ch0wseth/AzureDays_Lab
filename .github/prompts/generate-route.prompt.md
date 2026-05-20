---
description: "Generate a new Express route with Orange Boosted conventions"
---

# Generate Express Route

Create a new Express.js route module following project conventions:

## Requirements
- Use ES Module syntax (`import/export`)
- Include JSDoc documentation for the module
- Add proper error handling with try/catch
- Return JSON responses with `{ data: ... }` or `{ error: ... }` format
- Use HTTP status codes appropriately (200, 201, 400, 404, 500)

## Template
```javascript
import { Router } from 'express';
export const ${routeName}Router = Router();

// GET endpoint
${routeName}Router.get('/', (req, res) => { ... });

// POST endpoint
${routeName}Router.post('/', (req, res) => { ... });
```

## Context
- Project uses Orange Boosted 5.3 for UI
- All API routes are under `/api/` prefix
- Service layer handles business logic (see `src/services/`)
