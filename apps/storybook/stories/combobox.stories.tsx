import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@flint/ui/components/combobox";

const tools = [
  "Spear",
  "Club",
  "Rock",
  "Flint",
  "Torch",
  "Axe",
  "Bow",
  "Sling",
];

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-56">
      <Combobox items={tools}>
        <ComboboxInput placeholder="Search tools..." />
        <ComboboxContent>
          <ComboboxEmpty>No tools found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};
