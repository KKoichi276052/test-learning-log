import { generateRandomId } from "../../data/IdGenerator";

describe("IdGenerator", () => {
	test("should generate a random hex string of 20 characters", () => {
		const id = generateRandomId();
		expect(id).toMatch(/^[0-9a-f]{20}$/);
	});

	test("should generate unique IDs", () => {
		const id1 = generateRandomId();
		const id2 = generateRandomId();
		expect(id1).not.toBe(id2);
	});
});
