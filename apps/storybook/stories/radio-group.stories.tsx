import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  RadioGroup,
  RadioGroupItem,
} from "@flint/ui/components/radio-group";
import { Label } from "@flint/ui/components/label";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="fire">
      {["fire", "rock", "spear"].map((value) => (
        <Label key={value}>
          <RadioGroupItem value={value} />
          {value}
        </Label>
      ))}
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="fire" disabled>
      {["fire", "rock"].map((value) => (
        <Label key={value}>
          <RadioGroupItem value={value} />
          {value}
        </Label>
      ))}
    </RadioGroup>
  ),
};
