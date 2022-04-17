import { CheckCircleIcon, XCircleIcon, XIcon } from "@heroicons/react/solid";

import classNames from "utils/classNames";

import styles from "./Alert.module.css";

type Props = {
  type?: "success" | "error";
  message: string;
  close: () => void;
};

const Alert = ({ type = "success", message, close }: Props): JSX.Element => {
  // VARS
  const wrapperStyle = classNames(styles.wrapper, styles[`wrapper--${type}`]);
  const titleStyle = classNames(
    styles["alert-title"],
    styles[`alert-title--${type}`]
  );
  const messageStyle = classNames(
    styles["alert-message"],
    styles[`alert-message--${type}`]
  );
  const buttonStyle = classNames(
    styles["alert-button"],
    styles[`alert-button--${type}`]
  );

  let title;
  let icon;
  switch (type) {
    case "success":
      title = "Success!";
      icon = (
        <CheckCircleIcon className="w-4 text-green-400" aria-hidden="true" />
      );
      break;
    case "error":
      title = "Something went wrong";
      icon = <XCircleIcon className="w-4 text-red-400" aria-hidden="true" />;
      break;
  }

  return (
    <div className={wrapperStyle}>
      <div className="flex">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3">
          <p className={titleStyle}>{title}</p>
          <p className={messageStyle}>{message}</p>
        </div>
        <div className="pl-3 ml-auto">
          <div className="-mx-1.5 -my-1.5">
            <button type="button" className={buttonStyle} onClick={close}>
              <span className="sr-only">Dismiss</span>
              <XIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
