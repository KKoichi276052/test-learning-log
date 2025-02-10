import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserSearch } from "./UserSearch";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("UserSearch", () => {
	let user: ReturnType<typeof userEvent.setup>;

	beforeEach(() => {
		mockedAxios.get.mockClear();
		user = userEvent.setup();
	});

	test("makes API request with query when submit button clicked", async () => {
		const mockUser = { id: 1, name: "John Doe" };
		mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

		render(<UserSearch />);

		const input = screen.getByRole("textbox");
		await user.type(input, mockUser.name);

		const button = screen.getByRole("button");
		await user.click(button);

		expect(mockedAxios.get).toHaveBeenCalledWith(
			`/api/users?query=${mockUser.name}`,
		);
		expect(mockedAxios.get).toHaveBeenCalledTimes(1);
	});

	test("data from API response is displayed", async () => {
		const mockUser = { id: 1, name: "John Doe" };
		mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

		render(<UserSearch />);

		const input = screen.getByRole("textbox");
		await user.type(input, mockUser.name);

		const button = screen.getByRole("button");
		await user.click(button);

		await waitFor(() =>
			expect(screen.getByText(mockUser.name)).toBeInTheDocument(),
		);
	});
});
