import request from "supertest";
import fs from "node:fs";
import { createApp } from "../src/app";
import type { Group } from "../src/type";
import type express from "express";

const GROUP_FILE_PATH = "../../data/integration/groups.json";
const EXPENSE_FILE_PATH = "../../data/integration/expenses.json";

const testGroups: Group[] = [
	{
		name: "group1",
		members: ["a", "b", "c"],
	},
	{
		name: "group2",
		members: ["d", "e", "f"],
	},
];

const testExpenses = [
	{
		groupName: "group1",
		expenseName: "expense1",
		amount: 1000,
		payer: "a",
	},
];

describe("integration test", () => {
	let app: express.Express;

	beforeEach(() => {
		fs.writeFileSync(GROUP_FILE_PATH, JSON.stringify(testGroups));
		fs.writeFileSync(EXPENSE_FILE_PATH, JSON.stringify(testExpenses));
		app = createApp(GROUP_FILE_PATH, EXPENSE_FILE_PATH);
	});

	describe("GET /groups", () => {
		test("should return 200 and groups", async () => {
			const response = await request(app).get("/groups");
			expect(response.status).toBe(200);
			expect(response.body).toEqual(testGroups);
		});
	});

	describe("POST /groups", () => {
		test("should return 201 and the created group", async () => {
			const group: Group = {
				name: "group3",
				members: ["g", "h", "i"],
			};
			const response = await request(app).post("/groups").send(group);
			expect(response.status).toBe(200);
			expect(response.text).toEqual("グループの作成が成功しました");
		});
	});
});
