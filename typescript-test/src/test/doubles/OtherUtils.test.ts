import {
	calculateComplexity,
	OtherStringUtils,
	toUpperCaseWithCb,
} from "../../app/doubles/OtherUtils";
import type { stringInfo } from "../../app/Utils";

describe("OtherUtils test suite", () => {
	describe("OtherStringUtils tests with suites", () => {
		let sut: OtherStringUtils;

		beforeEach(() => {
			sut = new OtherStringUtils();
		});

		it("Use a spy to track calls", () => {
			const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
			sut.toUpperCase("abc");
			expect(toUpperCaseSpy).toHaveBeenCalledWith("abc");
		});

		it("Use a spy to track calls to other module", () => {
			const consoleLogSpy = jest.spyOn(console, "log");
			sut.logString("abc");
			expect(consoleLogSpy).toHaveBeenCalledWith("abc");
		});

		it("Use a spy to replace the implementation of a method", () => {
			// biome-ignore lint: for learning purpose it's ok
			jest.spyOn(sut as any, "callExternalService").mockImplementation(() => {
				console.log("calling mocked implementation!!");
			});
			// biome-ignore lint: for learning purpose it's ok
			(sut as any).callExternalService();
		});
	});

	describe("Tracking callbacks with Jest mocks", () => {
		const callBackMock = jest.fn();

		afterEach(() => {
			jest.clearAllMocks();
		});

		it("calls callback for invalid argument", () => {
			const actual = toUpperCaseWithCb("", callBackMock);
			expect(actual).toBeUndefined();
			expect(callBackMock).toHaveBeenCalledWith("Invalid argument!");
			expect(callBackMock).toHaveBeenCalledTimes(1);
		});

		it("calls callback for valid argument", () => {
			const actual = toUpperCaseWithCb("abc", callBackMock);
			expect(actual).toBe("ABC");
			expect(callBackMock).toHaveBeenCalledWith("called function with abc");
			expect(callBackMock).toHaveBeenCalledTimes(1);
		});
	});

	describe("Tracking callbacks", () => {
		const cbArgs: string[] = [];
		let timesCalled: number;

		beforeEach(() => {
			timesCalled = 0;
		});

		function callBackMock(arg: string) {
			cbArgs.push(arg);
			timesCalled++;
		}

		it("calls callback for invalid argument", () => {
			const actual = toUpperCaseWithCb("", callBackMock);
			expect(actual).toBeUndefined();
			expect(cbArgs).toContain("Invalid argument!");
			expect(timesCalled).toBe(1);
		});

		it("calls callback for valid argument", () => {
			const actual = toUpperCaseWithCb("abc", callBackMock);
			expect(actual).toBe("ABC");
			expect(cbArgs).toContain("called function with abc");
			expect(timesCalled).toBe(1);
		});
	});

	it("ToUppercase - calls callback for invalid argument", () => {
		const actual = toUpperCaseWithCb("", () => {});
		expect(actual).toBeUndefined();
	});

	// Stub Example.
	it("calculateComplexity()", () => {
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
