import { forwardRef, memo, ChangeEvent } from "react";

import classNames from "utils/classNames";

import styles from "./Input.module.css";

type InputType = "text" | "email" | "number" | "password" | "tel" | "file";
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
    autoFocus = false,
    ...restProps
  } = props;

  const classNameInput = classNames(
    styles["input-field"],
    disabled && styles["text-field--disabled"]
    // multiline && styles['text-field--multiline'],
    // readOnly && styles['text-field--readonly'],
    // !!spanText && styles['text-field--has-span'],
    // additionalClassname,
  );

  const classNameLabel = classNames(
    styles["input-label"],
    error && styles["input-label--error"]
  );

  return (
    <>
      {error && (
        <span className="pb-[6px] block text-red-500 text-xs">{error}</span>
      )}

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
    </>
  );
});

Input.displayName = "Input";

export default memo(Input);
