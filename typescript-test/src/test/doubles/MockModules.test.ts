jest.mock("../../app/doubles/OtherUtils", () => ({
	...jest.requireActual("../../app/doubles/OtherUtils"),
	calculateComplexity: () => {
		return 10;
	},
}));

jest.mock("uuid", () => ({
	v4: () => {
		return "123";
	},
}));

import * as OtherUtils from "../../app/doubles/OtherUtils";

describe("moodule test", () => {
	test("calculateComplexity", () => {
		const result = OtherUtils.calculateComplexity({} as any);
		expect(result).toBe(10);
	});

	test("keep other functions", () => {
		const result = OtherUtils.toUpperCase("abc");
		expect(result).toBe("ABC");
	});

	test("string with Id", () => {
		const result = OtherUtils.toLowerCaseWithId("abc");
		expect(result).toBe("abc123");
	});
});
