---
name: generate-tests
description: "Generate comprehensive Jest unit tests for a service module (ES Modules, describe/it, edge cases, French test names)."
user-invocable: true
---

# Generate Unit Tests

Create comprehensive unit tests for the specified service module.

## Requirements
- Use Jest with ES Module syntax
- Test all exported functions
- Include positive and negative test cases
- Test edge cases (empty input, boundary values, invalid types)
- Use `describe`/`it` blocks with descriptive names (in French)
- Reset state in `beforeEach` if the service uses in-memory storage

## Test Structure
```javascript
import { jest } from '@jest/globals';
import { functionName } from '../src/services/serviceName.js';

describe('ServiceName', () => {
  describe('functionName', () => {
    it('devrait gérer le cas nominal', () => { ... });
    it('devrait lever une erreur sur entrée invalide', () => { ... });
    it('devrait gérer le cas limite X', () => { ... });
  });
});
```

## Coverage Goals
- All public methods tested
- Error paths tested
- Boundary conditions covered
