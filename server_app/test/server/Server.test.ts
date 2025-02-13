import { Server } from "../../server/Server";

const requestMock = {};
const responseMock = {};

jest.mock("http,", () => ({
	createServer: (cb: (req: any, res: any) => void) => ({
		cb(requestMock, responseMock)
	}),
}));

describe("Server test suite", () => {
	let sut: Server;
	beforeEach(() => {
		sut = new Server();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
});
