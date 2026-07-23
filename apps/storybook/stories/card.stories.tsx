import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@flint/ui/components/button";
import { Input } from "@flint/ui/components/input";
import { Label } from "@flint/ui/components/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@flint/ui/components/card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignUpForm: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          All colors, radii and fonts on this card come from flint design
          tokens.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input id="signup-email" type="email" placeholder="og@cave.dev" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input id="signup-password" type="password" placeholder="••••••••" />
        </div>
      </CardContent>
      <CardFooter className="gap-3">
        <Button className="flex-1">Sign up</Button>
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  ),
};
