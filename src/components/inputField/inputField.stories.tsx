import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5"; // ✅ use framework-specific import
import { InputField } from "./inputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};
export default meta;

export const Default = () => {
  const [value, setValue] = useState("");
  return (
    <InputField
      label="Username"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter username"
      helperText="Your unique username."
    />
  );
};

export const ErrorState = () => {
  const [value, setValue] = useState("");
  return (
    <InputField
      label="Email"
      type="email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      invalid
      errorMessage="Email is required"
      placeholder="Email"
    />
  );
};

export const Disabled = () => (
  <InputField
    label="Disabled"
    value="Can't touch this"
    disabled
    placeholder="Disabled"
  />
);

export const PasswordToggle = () => {
  const [value, setValue] = useState("");
  return (
    <InputField
      label="Password"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      passwordToggle
      placeholder="Enter password"
    />
  );
};
