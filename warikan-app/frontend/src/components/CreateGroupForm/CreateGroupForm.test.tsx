import { render, screen, waitFor } from "@testing-library/react";
import CreateGroupForm from "./CreateGroupForm";
import userEvent from "@testing-library/user-event";

const mockOnSubmit = jest.fn();
const user = userEvent.setup();

describe("CreateGroupForm", () => {
	beforeEach(() => {
		render(<CreateGroupForm onSubmit={mockOnSubmit} />);
		mockOnSubmit.mockClear();
	});

	it("renders form elements correctly", () => {
		expect(screen.getByLabelText("グループ名")).toBeInTheDocument();
		expect(screen.getByLabelText("メンバー")).toBeInTheDocument();
		expect(screen.getByText("グループを作成")).toBeInTheDocument();
	});

	it("submits form with valid data", async () => {
		await user.type(screen.getByLabelText("グループ名"), "group1");
		await user.type(screen.getByLabelText("メンバー"), "member1, member2");
		await user.click(screen.getByRole("button"));

		expect(mockOnSubmit).toHaveBeenCalledWith({
			name: "group1",
			members: ["member1", "member2"],
		});

		await waitFor(() => {
			expect(screen.queryByDisplayValue("group1")).toBeNull();
		});
	});

	it("shows validation errors for empty fields", async () => {
		await user.click(screen.getByRole("button"));

		expect(screen.getByText("グループ名は必須です")).toBeInTheDocument();
		expect(screen.getByText("メンバーは2人以上必要です")).toBeInTheDocument;
	});
});
