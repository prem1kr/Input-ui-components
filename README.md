A customizable, accessible, and responsive React input component with:

- Floating labels  
- Helper text & error messages  
- Variants: `filled`, `outlined`, `ghost`  
- Sizes: `sm`, `md`, `lg`  
- Prefix & suffix icons  
- Clearable input  
- Password toggle  
- Dark mode support  

---

## Installation

```bash
npm install your-package-name
# or
yarn add your-package-name
````

---

## Usage

```tsx
import React, { useState } from 'react';
import { InputField } from 'your-package-name';

export const Example = () => {
  const [value, setValue] = useState('');

  return (
    <InputField
      label="Username"
      placeholder="Enter your username"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helperText="This will be publicly visible."
      errorMessage={value.length < 3 ? "Username is too short" : undefined}
      invalid={value.length > 0 && value.length < 3}
      variant="outlined"
      size="md"
      clearable
    />
  );
};
```

---

## Props

| Prop             | Type                                               | Default      | Description                          |
| ---------------- | -------------------------------------------------- | ------------ | ------------------------------------ |
| `value`          | `string`                                           | `undefined`  | Controlled input value               |
| `onChange`       | `(e: React.ChangeEvent<HTMLInputElement>) => void` | `undefined`  | Change handler                       |
| `label`          | `string`                                           | `undefined`  | Floating label text                  |
| `placeholder`    | `string`                                           | `undefined`  | Input placeholder                    |
| `helperText`     | `string`                                           | `undefined`  | Guidance below input                 |
| `errorMessage`   | `string`                                           | `undefined`  | Error message when `invalid` is true |
| `disabled`       | `boolean`                                          | `false`      | Disable input                        |
| `invalid`        | `boolean`                                          | `false`      | Marks input invalid                  |
| `variant`        | `'filled' \| 'outlined' \| 'ghost'`                | `'outlined'` | Input style variant                  |
| `size`           | `'sm' \| 'md' \| 'lg'`                             | `'md'`       | Input size                           |
| `clearable`      | `boolean`                                          | `false`      | Show clear button                    |
| `passwordToggle` | `boolean`                                          | `false`      | Toggle password visibility           |
| `prefixIcon`     | `ReactNode`                                        | `undefined`  | Icon before input                    |
| `suffixIcon`     | `ReactNode`                                        | `undefined`  | Icon after input                     |
| `type`           | `'text' \| 'password' \| 'email' \| 'number'`      | `'text'`     | Input type                           |
| `autoFocus`      | `boolean`                                          | `false`      | Auto-focus input                     |

---


## ScreenShot 

![alt text](<Screenshot 2025-10-04 113306.png>)
![alt text](<Screenshot 2025-10-04 113321-1.png>)
![alt text](<Screenshot 2025-10-04 113333.png>)
![alt text](<Screenshot 2025-10-04 113345.png>)
![alt text](<Screenshot 2025-10-04 113356.png>)
![alt text](<Screenshot 2025-10-04 113410.png>)