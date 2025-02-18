import { render } from "@testing-library/react";
import SettlementList from "./SettlementList";
import type { Settlement } from "../../type";

describe("SettlementList", () => {
	test("snapshot test", () => {
		const settlements: Settlement[] = [
			{ from: "Alice", to: "Steve", amount: 1000 },
		];

		const { container } = render(<SettlementList settlements={settlements} />);
		expect(container).toMatchSnapshot();
	});
});
