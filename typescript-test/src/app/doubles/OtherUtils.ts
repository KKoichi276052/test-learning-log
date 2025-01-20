import type { stringInfo } from "../Utils";

export function calculateComplexity(info: stringInfo): number {
	return Object.keys(info.extraInfo || {}).length * info.length;
}

export const toUpperCaseWithCb = (
	arg: string,
	callBack: (arg: string) => void,
) => {
	if (!arg) {
		callBack("Invalid argument!");
		return;
	}

	callBack(`called function with ${arg}`);
	return arg.toUpperCase();
};
