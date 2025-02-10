import { renderHook, act } from "@testing-library/react";
import useCounter from "./useCounter";

describe("useCounter", () => {
	it("should increment the count", () => {
		const { result } = renderHook(() => useCounter(1));
		expect(result.current.count).toBe(1);
		act(() => {
			result.current.increment();
		});
		expect(result.current.count).toBe(2);
	});
	it("should decrement the count", () => {
		const { result } = renderHook(() => useCounter(1));
		expect(result.current.count).toBe(1);
		act(() => {
			result.current.decrement();
		});
		expect(result.current.count).toBe(0);
	});
});
