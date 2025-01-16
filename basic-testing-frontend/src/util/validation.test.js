/**
 * @fileoverview Test suite for validation utility functions.
 * @module validation.test
 * 
 * This test file contains unit tests for two validation functions:
 * - validateStringNotEmpty: Tests string validation for non-empty content
 * - validateNumber: Tests number validation for proper numeric values
 * 
 * @requires vitest
 * @requires ./validation.js
 * 
 * @constant {string} EMPTY_STRING_ERROR - Error message for empty string validation
 * @constant {string} INVALID_NUMBER_ERROR - Error message for invalid number validation
 * 
 * @testSuite Validation Utils
 * @description Tests string and number validation utilities with various test cases
 * including edge cases like empty strings, whitespace-only strings, NaN, and
 * string representations of numbers.
 */
import { validateStringNotEmpty, validateNumber } from "./validation.js";
import { describe, it, expect, beforeEach } from "vitest";

// Constants for common error messages
const EMPTY_STRING_ERROR = "Invalid input - must not be empty.";
const INVALID_NUMBER_ERROR = "Invalid number input.";

describe("Validation Utils", () => {
  describe("validateStringNotEmpty()", () => {
    // Using test.each for invalid string inputs
    it.each([
      ["empty string", ""],
      ["whitespace string", "   "]
    ])("should throw error when input is %s", (_, input) => {
      expect(() => validateStringNotEmpty(input)).toThrow(EMPTY_STRING_ERROR);
    });

    it("should accept string with valid text content", () => {
      expect(() => validateStringNotEmpty("valid text")).not.toThrow();
    });
  });

  describe("validateNumber()", () => {
    // Using test.each for invalid number inputs
    it.each([
      ["NaN", Number.NaN],
      ["string number", "123"]
    ])("should throw error when input is %s", (_, input) => {
      expect(() => validateNumber(input)).toThrow(INVALID_NUMBER_ERROR);
    });

    it("should accept valid numeric values", () => {
      expect(() => validateNumber(123)).not.toThrow();
    });
  });
});
