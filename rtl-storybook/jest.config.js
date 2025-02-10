/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
	preset: "ts-jest",
	testEnvironment: "jest-environment-jsdom",
	setupFilesAfterEnv: ["./jest.setup.ts"],
	transform: {
		"^.+.tsx?$": ["ts-jest", { tsconfig: "tsconfig.app.json" }],
	},
};
