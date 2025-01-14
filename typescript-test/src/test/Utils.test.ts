import { toUpperCase } from "../app/Utils";
import { getStringInfo } from "../app/Utils";

describe("toUpperCase()", () => {
	it("should return the string in upper case", () => {
		const input = "hello world";
		const result = toUpperCase(input);
		expect(result).toBe("HELLO WORLD");
	});
});

describe("getStringInfo()", () => {
	test.each([
		{
			input: "Hello",
			expected: {
				lowerCase: "hello",
				upperCase: "HELLO",
				characters: ["H", "e", "l", "l", "o"],
				length: 5,
				extraInfo: {},
			},
		},
		{
			input: "",
			expected: {
				lowerCase: "",
				upperCase: "",
				characters: [],
				length: 0,
				extraInfo: {},
			},
		},
	])("should return correct info for '$input'", ({ input, expected }) => {
		const result = getStringInfo(input);
		expect(result).toEqual(expected);
	});
});
