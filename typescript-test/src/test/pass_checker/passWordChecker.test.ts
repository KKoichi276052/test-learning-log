import {
	ERROR_NAME,
	PassWordChecker,
} from "../../app/pass_checker/passWordChecker";

describe("PasswordChecker test suite", () => {
	let sut: PassWordChecker;

	beforeEach(() => {
		sut = new PassWordChecker();
	});

	describe("checkPassword()", () => {
		// it("should throw error when password is less than 8 characters", () => {
		// 	const password = "1234567";

		// 	expect(() => {
		// 		sut.checkPassword(password);
		// 	}).toThrow("Password must be at least 8 characters");
		// });
		it("should return false when password is less than 8 characters", () => {
			const password = "1234567";

			const result = sut.checkPassword(password);

			expect(result.valid).toBe(false);
			expect(result.reasons).toContain(ERROR_NAME.PASSWORD_TOO_SHORT);
		});

		it("should return false when password does not contain uppercase letter", () => {
			const password = "12345678";

			const result = sut.checkPassword(password);

			expect(result.valid).toBe(false);
			expect(result.reasons).toContain(ERROR_NAME.NO_UPPERCASE_LETTER);
		});

		it("should return false when password does not contain lowercase letter", () => {
			// to fail test
			// const password = "12345678f";

			// to pass test
			const password = "12345678";

			const result = sut.checkPassword(password);

			expect(result.valid).toBe(false);
			expect(result.reasons).toContain(ERROR_NAME.NO_LOWERCASE_LETTER);
		});

		it("should return true when password is valid", () => {
			const password = "12345678Ff";

			const result = sut.checkPassword(password);

			expect(result.valid).toBe(true);
			expect(result.reasons).toHaveLength(0);
		});
	});
});
