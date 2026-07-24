import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@flint/ui/components/checkbox";
import { Label } from "@flint/ui/components/label";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultChecked: true } };

export const Unchecked: Story = {};

export const Indeterminate: Story = { args: { indeterminate: true } };

export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

export const WithLabel: Story = {
  render: (args) => (
    <Label>
      <Checkbox {...args} />
      Accept terms and conditions
    </Label>
  ),
};
