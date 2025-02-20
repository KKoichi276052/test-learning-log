import { test, expect } from "@playwright/test";
import axios from "axios";

test.describe("warikan-app", () => {
	test.beforeEach(async ({ page }) => {
		await axios.get("http://localhost:3000/init");

		await page.goto("http://localhost:3001");
	});

	test.describe("create group", () => {
		test("redirects to settlement create page after creating group", async ({
			page,
		}) => {
			const groupNameInput = page.getByLabel("グループ名");
			await groupNameInput.fill("group1");
			const memberListInput = page.getByLabel("メンバー");
			await memberListInput.fill("member1, member2, member3");

			const submitButton = page.getByRole("button");
			await submitButton.click();

			await expect(page).toHaveURL(/.+\/group\/group1/);
		});

		test("should show error when group name is empty and stay at same page", async ({
			page,
		}) => {
			const groupNameInput = page.getByLabel("グループ名");
			await groupNameInput.fill("");
			const memberListInput = page.getByLabel("メンバー");
			await memberListInput.fill("member1, member2, member3");

			const submitButton = page.getByRole("button");
			await submitButton.click();

			await expect(page.getByText("グループ名は必須です")).toBeVisible();
			await expect(page).toHaveURL("http://localhost:3001"); // Ensure it stays on the same page
		});

		test("should show error when member name is empty and stay at same page", async ({
			page,
		}) => {
			const groupNameInput = page.getByLabel("グループ名");
			await groupNameInput.fill("group1");
			const memberListInput = page.getByLabel("メンバー");
			await memberListInput.fill("");

			const submitButton = page.getByRole("button");
			await submitButton.click();

			await expect(page.getByText("メンバーは2人以上必要です")).toBeVisible();
			await expect(page).toHaveURL("http://localhost:3001");
		});
	});

	test.describe("create payment", () => {
		test.beforeEach(async ({ page }) => {
			const groupNameInput = page.getByLabel("グループ名");
			await groupNameInput.fill("group1");
			const memberListInput = page.getByLabel("メンバー");
			await memberListInput.fill("member1, member2");

			const submitButton = page.getByRole("button");
			await submitButton.click();
		});

		test("update settlement list", async ({ page }) => {
			const expenseNameInput = page.getByLabel("支出名");
			await expenseNameInput.fill("expense1");
			const amountInput = page.getByLabel("金額");
			await amountInput.fill("1000");
			const memberSelect = page.getByLabel("支払うメンバー");
			await memberSelect.selectOption("member1");

			const submitButton = page.getByRole("button");
			await submitButton.click();

			await expect(page).toHaveURL(/.+\/group\/group1/);
			await expect(page.getByRole("list")).toHaveText("member2 → member1500円");
		});

		test("when error settlement list will not update", async ({ page }) => {
			const submitButton = page.getByRole("button");
			await submitButton.click();

			await expect(page.getByText("支出名は必須です")).toBeVisible();
			await expect(
				page.getByText("金額は1円以上の整数で必須です"),
			).toBeVisible();
			await expect(page.getByText("支払うメンバーは必須です")).toBeVisible();

			await expect(page.getByRole("list")).toHaveText("");
		});
	});
});
