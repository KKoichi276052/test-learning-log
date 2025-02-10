import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AsyncComponent from "./AsyncComponent";

describe("AsyncComponent", () => {
	const user = userEvent.setup();

	test("renders initial text", async () => {
		render(<AsyncComponent />);
		expect(screen.getByText("Initial text")).toBeInTheDocument();

		const button = screen.getByRole("button");
		await user.click(button);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
		await waitFor(
			() => {
				expect(screen.getByText("Updated text")).toBeInTheDocument();
			},
			{
				interval: 50,
				timeout: 3000,
			},
		);
	});
});
