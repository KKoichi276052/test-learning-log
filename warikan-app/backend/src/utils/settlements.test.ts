import type { Expense, Settlement } from "../type";
import { calculateSettlements } from "./settlements";

describe("calculateSettlements", () => {
	test("can calculate settlements", () => {
		const expenses: Expense[] = [
			{
				groupName: "group1",
				expenseName: "expense1",
				payer: "a",
				amount: 100,
			},
			{
				groupName: "group1",
				expenseName: "expense2",
				payer: "b",
				amount: 300,
			},
		];
		const groupMembers = ["a", "b", "c"];
		const expectedSettlements: Settlement[] = [
			{
				from: "a",
				to: "b",
				amount: 34,
			},
			{
				from: "c",
				to: "b",
				amount: 133,
			},
		];
		const result = calculateSettlements(expenses, groupMembers);
		expect(result).toEqual(expectedSettlements);
	});
});
