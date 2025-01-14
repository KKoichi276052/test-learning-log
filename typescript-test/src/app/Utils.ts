// export const toUpperCase = (str: string): string => {
// 	return str.toUpperCase();
// };

export function toUpperCase(arg: string) {
	return arg.toUpperCase();
}

/**
 * Represents detailed information about a string.
 *
 * @typedef {Object} stringInfo
 * @property {string} lowerCase - The string converted to lowercase.
 * @property {string} upperCase - The string converted to uppercase.
 * @property {string[]} characters - Array containing each character of the string.
 * @property {number} length - The length of the string.
 * @property {object | undefined} extraInfo - Additional information about the string (optional).
 */
export type stringInfo = {
	lowerCase: string;
	upperCase: string;
	characters: string[];
	length: number;
	// extraInfo: Record<string, unknown> | undefined;
	extraInfo: object | undefined;
};

/**
 * Returns an object containing information about the given string.
 *
 * @param {string} arg
 * @returns {stringInfo}
 * @property {string} lowerCase - The string in lower case
 * @property {string} upperCase - The string in upper case
 * @property {string[]} characters - An array of the characters in the string
 * @property {number} length - The length of the string
 * @property {Object} extraInfo - An object that can be used to store additional information about the string
 */
export function getStringInfo(arg: string): stringInfo {
	return {
		lowerCase: arg.toLowerCase(),
		upperCase: arg.toUpperCase(),
		characters: Array.from(arg),
		length: arg.length,
		extraInfo: {},
	};
}
