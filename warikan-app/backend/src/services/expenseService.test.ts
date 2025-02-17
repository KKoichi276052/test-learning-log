import { ExpenseService } from "./expenseService";
import type { GroupService } from "./groupService";
import type { ExpenseRepository } from "../repositories/expenseRepository";
import type { Expense, Group } from "../type";

describe("ExpenseService", () => {
	let mockGroupService: Partial<GroupService>;
	let mockExpenseRepository: Partial<ExpenseRepository>;
	let expenseService: ExpenseService;

	const group: Group = { name: "group1", members: ["a", "b", "c"] };
	const expense: Expense = {
		groupName: "group1",
		expenseName: "expense1",
		amount: 2000,
		payer: "a",
	};

	beforeEach(() => {
		mockGroupService = {
			getGroupByName: jest.fn(),
		};
		mockExpenseRepository = {
			loadExpenses: jest.fn(),
			saveExpense: jest.fn(),
		};
		expenseService = new ExpenseService(
			mockExpenseRepository as ExpenseRepository,
			mockGroupService as GroupService,
		);
	});

	describe("addExpense", () => {
		test("should add expense successfully", () => {
			(mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce(group);

			expenseService.addExpense(expense);

			expect(mockExpenseRepository.saveExpense).toHaveBeenCalledWith(expense);
		});

		test("should throw error when group not found", () => {
			(mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce(null);

			expect(() => expenseService.addExpense(expense)).toThrow;
		});

		test("should throw error when payer is not a member of the group", () => {
			// (mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce({
			// 	name: "group1",
			// 	members: ["c", "b"],
			// });
			// OR
			(mockGroupService.getGroupByName as jest.Mock).mockReturnValueOnce(group);
			const nonMemberExpense: Expense = {
				...expense,
				payer: "d",
			};

			expect(() => expenseService.addExpense(nonMemberExpense)).toThrow;
		});
	});
});
