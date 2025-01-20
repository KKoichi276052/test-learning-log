import { calculateComplexity } from "../../app/doubles/OtherUtils";
import type { stringInfo } from "../../app/Utils";

describe("OtherUtils test suite", () => {
	// Stub Example.
	test("calculateComplexity()", () => {
		const someInfo = {
			length: 5,
			extraInfo: {
				field1: "someValue",
				field2: "someOtherValue",
			},
		};

		const result = calculateComplexity(someInfo as stringInfo);

		expect(result).toBe(10);
	});
});
