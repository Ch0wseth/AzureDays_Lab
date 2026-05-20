---
description: "Generate unit tests for a service module"
---

# Generate Unit Tests

Create comprehensive unit tests for the specified service module.

## Requirements
- Use Jest with ES Module syntax
- Test all exported functions
- Include positive and negative test cases
- Test edge cases (empty input, boundary values, invalid types)
- Use `describe`/`it` blocks with descriptive names
- Reset state in `beforeEach` if the service uses in-memory storage

## Test Structure
```javascript
import { jest } from '@jest/globals';
import { functionName } from '../src/services/serviceName.js';

describe('ServiceName', () => {
  describe('functionName', () => {
    it('should handle the happy path', () => { ... });
    it('should throw on invalid input', () => { ... });
    it('should handle edge case X', () => { ... });
  });
});
```

## Coverage Goals
- All public methods tested
- Error paths tested
- Boundary conditions covered
