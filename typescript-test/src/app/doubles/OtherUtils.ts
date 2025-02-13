import { v4 } from "uuid";
import type { stringInfo } from "../Utils";

type LoggerServiceCallBack = (arg: string) => void;

export function calculateComplexity(info: stringInfo): number {
	return Object.keys(info.extraInfo || {}).length * info.length;
}

export const toLowerCaseWithId = (str: string) => {
	return str.toLowerCase() + v4();
};

export const toUpperCase = (str: string) => {
	return str.toUpperCase();
};

export const toUpperCaseWithCb = (
	arg: string,
	callBack: LoggerServiceCallBack,
) => {
	if (!arg) {
		callBack("Invalid argument!");
		return;
	}

	callBack(`called function with ${arg}`);
	return arg.toUpperCase();
};

export class OtherStringUtils {
	private callExternalService(arg: string) {
		console.log("calling external service!!");
	}

	public toUpperCase(arg: string) {
		return arg.toUpperCase();
	}

	public logString(arg: string) {
		console.log(arg);
	}
}
