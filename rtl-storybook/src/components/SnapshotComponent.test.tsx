import { render } from "@testing-library/react";
import SnapshotComponent from "./SnapshotComponent";

it("snapshot test", () => {
	const { container } = render(<SnapshotComponent text="React" />);
	expect(container).toMatchSnapshot();
});
