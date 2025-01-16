import { expect, it } from "vitest";
import { add } from "./math.js";

it("should sum up all numbers in an array", () => {
	// Arrange
	const numbers = [1, 2, 3];

	// Act
	const result = add(numbers);

	// Assert
	expect(result).toBe(6);
});

it("should yield NaN if at least one invalid number is provided", () => {
	// Arrange
	const inputs = [1, "invalid"];

	// Act
	const result = add(inputs);

	// Assert
	expect(result).toBeNaN();
});

it("should yield correct sum if an array of numeric string values is provided", () => {
	// Arrange
	const inputs = ["1", "2"];

	// Act
	const result = add(inputs);

	const expectedResult = inputs.reduce(
		(prevValue, curValue) => prevValue + +curValue,
		0,
	);

	// Assert
	expect(result).toBe(expectedResult);
});

it("should yield 0 if an empty array is provided", () => {
	// Arrange
	const inputs = [];

	// Act
	const result = add(inputs);

	// Assert
	expect(result).toBe(0);
});

it("should throw an error if no value is passed into the function", () => {
	// Arrange
	const resultFn = () => {
		add();
	};

	// Assert
	expect(resultFn).toThrow();
});

it("should throw an error if the passed value is not an array", () => {
	// Arrange
	const num1 = 1;
	const num2 = 2;

	const resultFn = () => {
		add(num1, num2);
	};

	// Assert
	expect(resultFn).toThrow(/is not iterable/);
});
