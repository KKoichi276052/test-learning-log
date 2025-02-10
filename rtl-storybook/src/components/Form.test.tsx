import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";

const user = userEvent.setup();

describe("Form", () => {
	test("submits the form with input value", () => {
		const alertMock = jest.spyOn(window, "alert").mockImplementation();
		render(<Form />);

		const input = screen.getByPlaceholderText("Enter text");
		const submitButton = screen.getByText("Submit");

		fireEvent.change(input, { target: { value: "test value" } });
		fireEvent.click(submitButton);

		expect(alertMock).toHaveBeenCalledWith("submitted: test value");
		alertMock.mockRestore();
	});

	test("renders input and submit button", () => {
		render(<Form />);

		expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
		expect(screen.getByText("Submit")).toBeInTheDocument();
	});
});

describe("Form from course", () => {
	it("初期状態ではテキストは空欄", () => {
		render(<Form />);
		const input = screen.getByPlaceholderText("Enter text");
		expect(input).toBeInTheDocument();
		expect(input).toHaveTextContent("");
	});

	it("entered text will be submitted", async () => {
		const alertSpy = jest.spyOn(window, "alert").mockReturnValue();
		render(<Form />);
		const input = screen.getByPlaceholderText("Enter text");
		const submitButton = screen.getByText("Submit");

		await user.type(input, "test value");
		expect(input).toHaveValue("test value");

		await user.click(submitButton);
		expect(screen.getByDisplayValue("test value")).toBeInTheDocument();
		expect(input).toHaveTextContent("");
		expect(alertSpy).toHaveBeenCalledWith("submitted: test value");
		alertSpy.mockRestore();
	});
});
