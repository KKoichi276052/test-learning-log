import type { Authorizer } from "../../auth/Authorizer";
import { RegisterHandler } from "../../handlers/RegisterHandler";
import type { IncomingMessage, ServerResponse } from "node:http";
import { HTTP_CODES, HTTP_METHODS } from "../../model/ServerModel";
import type { Account } from "../../model/AuthModel";

const getRequestBodyMock = jest.fn();

jest.mock("../../utils/Utils", () => ({
	getRequestBody: () => getRequestBodyMock(),
}));

describe("RegisterHandler test suite", () => {
	let sut: RegisterHandler;

	const request = {
		method: undefined as undefined | HTTP_METHODS,
	};

	const responseMock = {
		statusCode: 0,
		writeHead: jest.fn(),
		write: jest.fn(),
	};

	const authorizerMock = {
		registerUser: jest.fn(),
	};

	const someAccount: Account = {
		id: "",
		userName: "someUserName",
		password: "somePassword",
	};

	beforeEach(() => {
		sut = new RegisterHandler(
			request as IncomingMessage,
			// biome-ignore lint/suspicious/noExplicitAny: ok for learning purpose
			responseMock as any as ServerResponse,
			// biome-ignore lint/suspicious/noExplicitAny: ok for learning purpose
			authorizerMock as any as Authorizer,
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should register valid accounts in request", async () => {
		request.method = HTTP_METHODS.POST;
		getRequestBodyMock.mockResolvedValueOnce(someAccount);
		authorizerMock.registerUser.mockResolvedValueOnce("someId");

		await sut.handleRequest();

		expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
		expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, {
			"Content-Type": "application/json",
		});
		expect(responseMock.write).toHaveBeenCalledWith(
			JSON.stringify({ userId: "someId" }),
		);
	});
});
