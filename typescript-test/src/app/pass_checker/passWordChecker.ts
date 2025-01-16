// export type ERROR_NAME =
// 	| "PASSWORD_TOO_SHORT"
// 	| "NO_UPPERCASE_LETTER"
// 	| "NO_LOWERCASE_LETTER";

export enum ERROR_NAME {
	PASSWORD_TOO_SHORT = "Password is too short! Must be at least 8 characters",
	NO_UPPERCASE_LETTER = "Password must contain at least one uppercase letter",
	NO_LOWERCASE_LETTER = "Password must contain at least one lowercase letter",
}

export interface CheckResult {
	valid: boolean;
	reasons: ERROR_NAME[];
}

export class PassWordChecker {
	public checkPassword(password: string): CheckResult {
		const reasons: ERROR_NAME[] = [];

		// must be at least 8 characters
		if (password.length < 8) {
			reasons.push(ERROR_NAME.PASSWORD_TOO_SHORT);
		}

		//  must contain at least one uppercase letter
		if (!password.match(/[A-Z]/)) {
			reasons.push(ERROR_NAME.NO_UPPERCASE_LETTER);
		}

		// must contain at least one lowercase letter
		if (!password.match(/[a-z]/)) {
			reasons.push(ERROR_NAME.NO_LOWERCASE_LETTER);
		}

		return {
			valid: reasons.length === 0,
			reasons: reasons,
		};
	}
}
