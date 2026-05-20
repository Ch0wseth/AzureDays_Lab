/**
 * @fileoverview Unit tests for validators utility.
 */
import { isValidEmail, sanitizeInput, validatePagination } from '../src/utils/validators.js';

describe('Validators', () => {
  describe('isValidEmail', () => {
    it('should validate correct emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.user@domain.fr')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('notanemail')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should escape HTML entities', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
      );
    });

    it('should handle non-string input', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(123)).toBe('');
    });

    it('should preserve safe strings', () => {
      expect(sanitizeInput('Hello World')).toBe('Hello World');
    });
  });

  describe('validatePagination', () => {
    it('should return defaults for undefined params', () => {
      const result = validatePagination();
      expect(result).toEqual({ page: 1, limit: 20, offset: 0 });
    });

    it('should calculate correct offset', () => {
      const result = validatePagination(3, 10);
      expect(result.offset).toBe(20);
    });

    it('should cap limit at 100', () => {
      const result = validatePagination(1, 500);
      expect(result.limit).toBe(100);
    });

    it('should enforce minimum page of 1', () => {
      const result = validatePagination(-5, 10);
      expect(result.page).toBe(1);
    });
  });
});
