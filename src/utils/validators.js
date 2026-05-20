/**
 * @fileoverview Input validation utilities.
 * Demonstrates Copilot generating utility functions with comprehensive validation.
 * @module utils/validators
 */

/**
 * Validates an email address format.
 * @param {string} email - Email to validate.
 * @returns {boolean} True if valid.
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitizes a string to prevent XSS.
 * @param {string} input - Raw input string.
 * @returns {string} Sanitized string.
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Validates pagination parameters.
 * @param {number} page - Page number.
 * @param {number} limit - Items per page.
 * @returns {{ page: number, limit: number, offset: number }}
 */
export function validatePagination(page = 1, limit = 20) {
  const validPage = Math.max(1, Math.floor(Number(page) || 1));
  const validLimit = Math.min(100, Math.max(1, Math.floor(Number(limit) || 20)));
  return {
    page: validPage,
    limit: validLimit,
    offset: (validPage - 1) * validLimit,
  };
}
