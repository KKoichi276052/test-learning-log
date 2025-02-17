import fs from "node:fs";
import { GroupRepository } from "./groupRepository";
import type { Group } from "../type";

jest.mock("node:fs");

describe("GroupRepository", () => {
	const mockFs = jest.mocked(fs);
	let repo: GroupRepository;

	beforeEach(() => {
		mockFs.existsSync.mockClear();
		mockFs.readFileSync.mockClear();
		mockFs.writeFileSync.mockClear();
		repo = new GroupRepository("groups.json");
	});

	describe("loadGroups", () => {
		test("can get list of groups", () => {
			const groups: Group[] = [
				{
					name: "group1",
					members: ["a", "b", "c"],
				},
				{
					name: "group2",
					members: ["d", "e", "f"],
				},
			];
			const mockData = JSON.stringify(groups);
			mockFs.existsSync.mockReturnValueOnce(true);
			mockFs.readFileSync.mockReturnValueOnce(mockData);
			const result = repo.loadGroups();
			expect(result).toEqual(groups);
		});

		test("returns empty array if file does not exist", () => {
			mockFs.existsSync.mockReturnValueOnce(false);
			const result = repo.loadGroups();
			expect(result).toEqual([]);
		});
	});

	describe("saveGroup", () => {
		test("can save group", () => {
			const group: Group = {
				name: "group1",
				members: ["a", "b", "c"],
			};
			mockFs.existsSync.mockReturnValueOnce(true);
			mockFs.readFileSync.mockReturnValueOnce(JSON.stringify([]));

			repo.saveGroup(group);
			expect(mockFs.writeFileSync).toHaveBeenCalledWith(
				"groups.json",
				JSON.stringify([group]),
			);
		});
	});
});
