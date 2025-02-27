import { useApi } from "./useApi";
import { renderHook, waitFor, act } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { handlers } from "../../mock/handler";

const server = setupServer(...handlers);
const url = "http://localhost:3002/test";

describe("useApi", () => {
	beforeAll(() => server.listen());
	afterAll(() => server.close());
	afterEach(() => server.resetHandlers());

	describe("GET", () => {
		it("fetches data correctly", async () => {
			const { result } = renderHook(() => useApi(url));
			await waitFor(() => {
				expect(result.current.data).not.toBeNull();
			});

			expect(result.current.data).toEqual({ message: "get data" });
			expect(result.current.error).toBeNull();
		});

		it("throws an error if the request fails", async () => {
			server.use(
				rest.get(url, (_, res, ctx) => {
					return res(ctx.status(500));
				}),
			);

			const { result } = renderHook(() => useApi(url));
			await waitFor(() => {
				expect(result.current.error).toBe("エラーが発生しました");
			});
		});
	});

	describe("POST", () => {
		it("POST request is corectly handled", async () => {
			const { result } = renderHook(() => useApi(url));
			// @ts-ignore
			let response;

			await act(async () => {
				response = await result.current.postData({});
			});
			// @ts-ignore
			expect(response!.data).toEqual({ message: "post data" });

			await waitFor(() => {
				expect(result.current.data).not.toBeNull();
			});

			expect(result.current.data).toEqual({ message: "get data" });
			expect(result.current.error).toBeNull();
		});

		it("throws an error if the request fails", async () => {
			server.use(
				rest.post(url, (_, res, ctx) => {
					return res(ctx.status(500));
				}),
			);

			const { result } = renderHook(() => useApi(url));
			await act(async () => {
				await result.current.postData({});
			});
			await waitFor(() => {
				expect(result.current.error).toBe("エラーが発生しました");
			});
		});
	});
});
