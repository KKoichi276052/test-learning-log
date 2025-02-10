import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button.tsx", () => {
	test("renders button with correct label", () => {
		const mockOnClick = jest.fn();
		render(<Button label="Test Button" onClick={mockOnClick} />);

		const button = screen.getByText("Test Button");
		expect(button).toBeInTheDocument();
	});

	test("calls onClick handler when clicked", () => {
		const mockOnClick = jest.fn();
		render(<Button label="Test Button" onClick={mockOnClick} />);

		const button = screen.getByText("Test Button");
		fireEvent.click(button);

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});

describe("Button.tsx from course", () => {
	it("ボタンがレンダリングされる", () => {
		render(<Button label="Button" onClick={() => alert("Clicked")} />);
		const element = screen.getByRole("button");
		expect(element).toBeInTheDocument();
	});
});
