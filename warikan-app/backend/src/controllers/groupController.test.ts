import type express from "express";
import type { GroupService } from "../services/groupService";
import { GroupController } from "./groupController";
import { Group } from "../type";

describe("GroupController", () => {
	let mockGroupService: Partial<GroupService>;
	let req: Partial<express.Request>;
	let res: Partial<express.Response>;
	let next: jest.Mock;
	let groupController: GroupController;

	beforeEach(() => {
		mockGroupService = {
			getGroups: jest.fn(),
			getGroupByName: jest.fn(),
			addGroup: jest.fn(),
		};
		groupController = new GroupController(mockGroupService as GroupService);
		req = {};
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
			send: jest.fn(),
		};
		next = jest.fn();
	});

	describe("addGroup", () => {
		test("should add group successfully", () => {
			const group: Group = { name: "group1", members: ["a", "b", "c"] };

			req.body = group;

			(mockGroupService.getGroups as jest.Mock).mockReturnValueOnce([]);

			groupController.addGroup(
				req as express.Request,
				res as express.Response,
				next as express.NextFunction,
			);

			expect(mockGroupService.addGroup).toHaveBeenCalledWith(group);
			expect(res.status).toHaveBeenCalledWith(200);
		});

		test("group is not empty", () => {
			const invalidGroup: Group = { name: "", members: ["a", "b"] };

			req.body = invalidGroup;
			groupController.addGroup(
				req as express.Request,
				res as express.Response,
				next as express.NextFunction,
			);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.send).toHaveBeenCalledWith(["グループ名は必須です"]);
		});

		test("member should be more than 1", () => {
			const invalidGroup: Group = { name: "group1", members: ["a"] };

			req.body = invalidGroup;
			groupController.addGroup(
				req as express.Request,
				res as express.Response,
				next as express.NextFunction,
			);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.send).toHaveBeenCalledWith(["メンバーは2人以上必要です"]);
		});

		test("member name should not be same", () => {
			const invalidGroup: Group = { name: "group1", members: ["a", "a"] };

			req.body = invalidGroup;
			groupController.addGroup(
				req as express.Request,
				res as express.Response,
				next as express.NextFunction,
			);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.send).toHaveBeenCalledWith(["メンバー名が重複しています"]);
		});
	});
});
