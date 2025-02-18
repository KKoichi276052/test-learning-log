import type { Meta, StoryObj } from "@storybook/react";
import CreateGroupForm from "./CreateGroupForm";
// import { ChakraProvider } from "@chakra-ui/react";

const meta: Meta<typeof CreateGroupForm> = {
	title: "Components/CreateGroupForm",
	component: CreateGroupForm,
	// decorators: [
	// 	(Story) => (
	// 		<ChakraProvider>
	// 			<Story />
	// 		</ChakraProvider>
	// 	),
	// ],
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof CreateGroupForm>;

export const Default: Story = {
	args: {
		onSubmit: async () => {
			return new Promise((resolve) => setTimeout(() => resolve(), 1000));
		},
	},
};

export const WithMockError: Story = {
	args: {
		onSubmit: async () => {
			return Promise.reject(new Error("Mock error"));
		},
	},
};
