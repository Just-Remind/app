import { forwardRef, memo, ChangeEvent } from "react";

import classNames from "utils/classNames";

import styles from "./Input.module.css";

type InputType = "text" | "email" | "number" | "password" | "file" | "textarea";
type AutoCompleteType = "email" | "current-password";
type Size = "xs" | "sm";

type Props = {
  label?: string;
  placeholder?: string;
  name?: string;
  type?: InputType;
  error?: string | boolean;
  required?: boolean;
  autoComplete?: AutoCompleteType;
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement | undefined>;
  className?: string;
  size?: Size;
  disabled?: boolean;
  value?: string | number;
  step?: string;
  rows?: number;
  autoFocus?: boolean;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  accept?: string;
};

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    label,
    type,
    name,
    placeholder,
    disabled,
    className,
    size = "sm",
    error,
    value,
    required,
    step,
    rows = 3,
    autoFocus = false,
    ...restProps
  } = props;

  const classNameInput = classNames(
    styles["input-field"],
    disabled && styles["text-field--disabled"]
  );

  const classNameLabel = classNames(
    styles["input-label"],
    error && styles["input-label--error"]
  );

  return (
    <>
      {type === "textarea" ? (
        <div
          className={`
          ${styles["input-container"]}
          ${styles[`input-container--${size}`]}
          ${className}`}
        >
          {label && (
            <label htmlFor={name} className={classNameLabel}>
              {label}
            </label>
          )}
          <textarea
            className={`${classNameInput} bg-white focus:ring-0`}
            name={name}
            id={name}
            required={required}
            value={value}
            rows={rows}
          />
        </div>
      ) : (
        <div
          className={`
            ${styles["input-container"]}
            ${styles[`input-container--${size}`]}
            ${className}`}
        >
          {label && (
            <label htmlFor={name} className={classNameLabel}>
              {label}
            </label>
          )}

          <input
            {...restProps}
            className={`${classNameInput} bg-white focus:ring-0`}
            type={type}
            name={name}
            id={name}
            required={required}
            ref={ref}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            step={step}
            autoFocus={autoFocus}
          />
        </div>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </>
  );
});

Input.displayName = "Input";

export default memo(Input);
