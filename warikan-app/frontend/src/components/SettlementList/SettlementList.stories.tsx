import type { Meta, StoryObj } from "@storybook/react";
import SettlementList from "./SettlementList";

const meta = {
	title: "Components/SettlementList",
	component: SettlementList,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof SettlementList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		settlements: [
			{ from: "Alice", to: "Bob", amount: 3000 },
			{ from: "Charlie", to: "Alice", amount: 2000 },
			{ from: "Bob", to: "Charlie", amount: 1500 },
		],
	},
};

export const Empty: Story = {
	args: {
		settlements: [],
	},
};

export const SingleSettlement: Story = {
	args: {
		settlements: [{ from: "Alice", to: "Bob", amount: 5000 }],
	},
};
