import { expect, it } from "vitest";
import { transformToNumber } from "./numbers";

it('should transform a string number to a number type', () => {
	const input = '1';
	const result = transformToNumber(input);
	expect(result).toBe(1);
});

it('should yield NaN for non-transformable values', () => {
	const input = 'invalid';
	const result = transformToNumber(input);
	expect(result).toBeNaN();
});

it('should transform numeric input to number type', () => {
	const input = 5;
	const result = transformToNumber(input);
	expect(result).toBe(5);
});

it('should transform string decimal to number', () => {
	const input = '3.14';
	const result = transformToNumber(input);
	expect(result).toBe(3.14);
});

it('should handle empty string input', () => {
	const input = '';
	const result = transformToNumber(input);
	expect(result).toBe(0);
});
