import { randomBytes } from "node:crypto";

export function generateRandomId() {
	const randomId = randomBytes(10).toString("hex");
	return randomId;
}
