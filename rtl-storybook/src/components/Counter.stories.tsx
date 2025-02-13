import type { Meta, StoryObj } from "@storybook/react";
import Counter from "./Counter";

const meta = {
	title: "Components/Counter",
	component: Counter,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} as Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {
	args: {
		initialCount: 0,
	},
};

export const StartFromTen: Story = {
	args: {
		initialCount: 10,
	},
};

export const StartFromNegative: Story = {
	args: {
		initialCount: -5,
	},
};
