import { DataBase } from "../../data/DataBase";
import { UserCredentialsDataAccess } from "../../data/UserCredentialsDataAccess";
import type { Account } from "../../model/AuthModel";

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock("../../data/DataBase", () => {
	return {
		DataBase: jest.fn().mockImplementation(() => {
			return {
				insert: insertMock,
				getBy: getByMock,
			};
		}),
	};
});

describe("UserCredentialsDataAccess", () => {
	let sut: UserCredentialsDataAccess;

	const someAccount: Account = {
		id: "",
		userName: "someUserName",
		password: "somePassword",
	};

	const someId = "1234";

	beforeEach(() => {
		sut = new UserCredentialsDataAccess();
		expect(DataBase).toHaveBeenCalledTimes(1);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should add user and return the id", async () => {
		insertMock.mockResolvedValueOnce(someId);

		const actual = await sut.addUser(someAccount);

		expect(actual).toBe(someId);
		expect(insertMock).toHaveBeenCalledWith(someAccount);
	});

	it("should get user by id", async () => {
		getByMock.mockResolvedValueOnce(someAccount);

		const actual = await sut.getUserById(someId);

		expect(actual).toBe(someAccount);
		expect(getByMock).toHaveBeenCalledWith("id", someId);
	});

	it("should get user by userName", async () => {
		getByMock.mockResolvedValueOnce(someAccount);

		const actual = await sut.getUserByUserName(someAccount.userName);

		expect(actual).toBe(someAccount);
		expect(getByMock).toHaveBeenCalledWith("userName", someAccount.userName);
	});
});
