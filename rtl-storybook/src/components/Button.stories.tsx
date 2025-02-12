import Button from "./Button";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta = {
	title: "Button",
	component: Button,
	args: {
		onClick: fn(),
	},
	argTypes: {
		label: {
			options: ["Primary", "Secondary"],
			control: { type: "select" },
		},
	},
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		label: "Primary Button",
		primary: true,
	},
};

export const Secondary: Story = {
	args: {
		label: "Secondary Button",
		primary: false,
	},
};
