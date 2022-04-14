import React, { memo } from "react";

import classNames from "utils/classNames";

// import { Icon } from 'components/ui';

import styles from "./Spinner.module.css";

type Theme = "light" | "dark";
type Size = "small" | "large";

type SpinnerProps = {
  theme?: Theme;
  size?: Size;
  className?: string;
};

const Spinner = (props: SpinnerProps): JSX.Element => {
  // props
  const {
    // theme = "dark",
    // size = "large",
    className: additionalClassName,
  } = props;

  const className = classNames(styles.spinner, additionalClassName);

  // const spinnerSize = size === "small" ? "w-5" : "w-12";
  // const color = theme === "dark" ? "text-green-500" : "text-white";

  // const spinnerSVGMarkup = <Icon name="loader" className={`${spinnerSize} ${color}`} />;

  return <span className={className}></span>;
};

export default memo(Spinner);
