import React, { useState, useRef } from 'react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  passwordToggle?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  type?: 'text' | 'password' | 'email' | 'number';
  autoFocus?: boolean;
}

const sizeClasses = {
  sm: 'py-1 px-2 text-sm',
  md: 'py-2 px-3 text-base',
  lg: 'py-3 px-4 text-lg',
};

const variantClasses = {
  filled: 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700',
  outlined: 'bg-white dark:bg-gray-900 border border-gray-400 dark:border-gray-600',
  ghost: 'bg-transparent border-b border-gray-300 dark:border-gray-700',
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
  clearable = false,
  passwordToggle = false,
  prefixIcon,
  suffixIcon,
  type = 'text',
  autoFocus = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputType = passwordToggle ? (showPassword ? 'text' : 'password') : type;

  const baseClass =
    'block w-full rounded-lg outline-none transition-all duration-200 ' +
    sizeClasses[size] +
    ' ' +
    variantClasses[variant] +
    (invalid ? ' border-red-500 ring-red-500' : '') +
    ' text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ' +
    ' focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400';

  const labelClass = value
    ? 'absolute left-2 top-0 text-xs text-blue-600 dark:text-blue-400 font-semibold ' +
      'bg-white dark:bg-gray-900 px-1 -translate-y-1/2 transition-all duration-200 rounded ' +
      'border border-gray-200 dark:border-gray-800 shadow-sm z-10'
    : 'absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none px-1 transition-all duration-200';

  // Combine IDs for helper text and error message for accessibility
  const helperId = helperText ? 'helper-text' : undefined;
  const errorId = invalid && errorMessage ? 'error-msg' : undefined;
  const ariaDescribedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="w-full max-w-lg mb-4 relative">
      {label && (
        <span className={labelClass} aria-label={label}>
          {label}
        </span>
      )}
      <div className="relative flex items-center group">
        {prefixIcon && (
          <div className="absolute left-2 text-gray-400 dark:text-gray-500 pointer-events-none">
            {prefixIcon}
          </div>
        )}
        <input
          ref={inputRef}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          aria-invalid={invalid}
          aria-describedby={ariaDescribedBy}
          className={`${baseClass} ${prefixIcon ? 'pl-9' : ''} ${
            suffixIcon || passwordToggle || clearable ? 'pr-10' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          autoComplete={passwordToggle ? 'current-password' : undefined}
        />
        {clearable && value && !disabled && (
          <button
            type="button"
            aria-label="Clear input"
            onClick={() =>
              onChange &&
              onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
            }
            className="absolute right-10 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            tabIndex={-1}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l8 8M14 6l-8 8"/>
            </svg>
          </button>
        )}
        {passwordToggle && (
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ) : (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
          </button>
        )}
        {suffixIcon && (
          <div className="absolute right-2 text-gray-400 dark:text-gray-500">
            {suffixIcon}
          </div>
        )}
      </div>
      {helperText && (
        <p id="helper-text" className={`text-xs mt-1 ${invalid ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}>
          {helperText}
        </p>
      )}
      {invalid && errorMessage && (
        <p id="error-msg" className="text-xs text-red-600 mt-1" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
