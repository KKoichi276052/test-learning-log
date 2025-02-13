import { getRequestBody } from "../../utils/Utils";
import type { IncomingMessage } from "node:http";

const requestMock = {
	on: jest.fn(),
};

const someObject = {
	name: "John",
	age: 30,
	city: "Paris",
};

const someObjectAsString = JSON.stringify(someObject);

describe("getRequestBody()", () => {
	it("should return object for valid JSON", async () => {
		requestMock.on.mockImplementation((event, cb) => {
			if (event === "data") {
				cb(someObjectAsString);
			} else {
				cb();
			}
		});

		// biome-ignore lint/suspicious/noExplicitAny: ok for learning purpose
		const actual = await getRequestBody(requestMock as any as IncomingMessage);
		expect(actual).toEqual(someObject);
	});

	it("should thorw error for invalid JSON", async () => {
		requestMock.on.mockImplementation((event, cb) => {
			if (event === "data") {
				// biome-ignore lint/style/useTemplate: ok for learning purpose
				cb("a" + someObjectAsString);
			} else {
				cb();
			}
		});

		await expect(getRequestBody(requestMock as any)).rejects.toThrow(
			/Unexpected token/,
		);
	});

	it("should throw error for unexpected error", async () => {
		const someError = new Error("something went wrong!");
		requestMock.on.mockImplementation((event, cb) => {
			if (event === "error") {
				cb(someError);
			}
		});
		await expect(
			getRequestBody(requestMock as any as IncomingMessage),
		).rejects.toThrow(someError.message);
	});
});
