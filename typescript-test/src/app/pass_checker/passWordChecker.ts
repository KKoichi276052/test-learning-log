// export type ERROR_NAME =
// 	| "PASSWORD_TOO_SHORT"
// 	| "NO_UPPERCASE_LETTER"
// 	| "NO_LOWERCASE_LETTER";

export enum ERROR_NAME {
	PASSWORD_TOO_SHORT = "Password is too short! Must be at least 8 characters",
	NO_UPPERCASE_LETTER = "Password must contain at least one uppercase letter",
	NO_LOWERCASE_LETTER = "Password must contain at least one lowercase letter",
	NO_NUMBER = "Password must contain at least one number",
}

export interface CheckResult {
	valid: boolean;
	reasons: ERROR_NAME[];
}

export class PassWordChecker {
	public checkPassword(password: string): CheckResult {
		const reasons: ERROR_NAME[] = [];

		this.checkLength(password, reasons);
		this.checkUppercase(password, reasons);
		this.checkLowercase(password, reasons);
		this.checkNumber(password, reasons);

		return {
			valid: reasons.length === 0,
			reasons: reasons,
		};
	}

	private checkLength(password: string, reasons: ERROR_NAME[]): void {
		// must be at least 8 characters
		if (password.length < 8) {
			reasons.push(ERROR_NAME.PASSWORD_TOO_SHORT);
		}
	}

	private checkUppercase(password: string, reasons: ERROR_NAME[]): void {
		// must contain at least one uppercase letter
		if (!password.match(/[A-Z]/)) {
			reasons.push(ERROR_NAME.NO_UPPERCASE_LETTER);
		}
	}

	private checkLowercase(password: string, reasons: ERROR_NAME[]): void {
		// must contain at least one lowercase letter
		if (!password.match(/[a-z]/)) {
			reasons.push(ERROR_NAME.NO_LOWERCASE_LETTER);
		}
	}

	private checkNumber(password: string, reasons: ERROR_NAME[]): void {
		// must contain at least one number
		if (!password.match(/\d/)) {
			reasons.push(ERROR_NAME.NO_NUMBER);
		}
	}

	public checkAdminPassword(password: string): CheckResult {
		const basicCheck = this.checkPassword(password);
		this.checkNumber(password, basicCheck.reasons);

		return {
			valid: basicCheck.reasons.length === 0,
			reasons: basicCheck.reasons,
		};
	}
}
