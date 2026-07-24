import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@flint/ui/components/select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Pick a tool" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>Weapons</SelectGroupLabel>
          <SelectItem value="spear">Spear</SelectItem>
          <SelectItem value="club">Club</SelectItem>
          <SelectItem value="rock">Rock</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Fire</SelectGroupLabel>
          <SelectItem value="flint">Flint</SelectItem>
          <SelectItem value="torch" disabled>
            Torch
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
