import React, { memo } from "react";

import { Spinner } from "components/ui";
import classNames from "utils/classNames";

import styles from "./Button.module.css";

type Color = "red" | "purple" | "yellow" | "white" | "green";
type Size = "xs" | "sm" | "lg" | "xl" | "xxl" | "wide";

type Props = {
  children?: React.ReactNode;
  submit?: boolean;
  size?: Size;
  color?: Color;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  title?: string;
  /** Callback when clicked */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Callback when button becomes focussed */
  onFocus?: () => void;
  /** Callback when focus leaves button */
  onBlur?: () => void;
};

const Button = (props: Props): JSX.Element => {
  const {
    children,
    submit,
    size = "sm",
    disabled,
    loading,
    title,
    onClick,
    onFocus,
    onBlur,
    className: additionalClassName,
    color = "green",
  } = props;

  const isDisabled = disabled || loading;
  const spinnerTheme = color !== "white" ? "light" : "dark";

  const className = classNames(
    styles.button,
    color && styles[`button--${color}`],
    size && styles[`button--${size}`],
    disabled && styles["button--disabled"],
    loading && styles["button--loading"],
    additionalClassName
  );

  const loadingMarkup = loading ? (
    <Spinner
      size="small"
      theme={spinnerTheme}
      className={styles.button__spinner}
    />
  ) : null;

  const childMarkup = children ? (
    <>
      {children}
      {loadingMarkup}
    </>
  ) : null;

  return (
    <button
      type={submit ? "submit" : "button"}
      disabled={isDisabled}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`${className} focus:ring-2`}
      title={title}
    >
      {childMarkup}
    </button>
  );
};

export default memo(Button);
