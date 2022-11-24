import { Switch as ReactSwitch } from "@headlessui/react";

import { classNames } from "utils";

type Props = {
  label: string | JSX.Element;
  description?: string | JSX.Element;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  groupClassName?: string;
  labelClassName?: string;
};

const Switch = (props: Props): JSX.Element => {
  // PROPS
  const {
    label,
    description,
    checked,
    onChange,
    disabled = false,
    groupClassName,
    labelClassName,
  } = props;

  return (
    <ReactSwitch.Group
      as="div"
      className={groupClassName || "py-4 sm:py-5 sm:pt-5 sm:flex sm:items-end sm:justify-between"}
    >
      <div className="flex flex-col">
        <ReactSwitch.Label
          as="dt"
          className={`text-sm font-medium ${labelClassName} ${
            disabled ? "text-gray-300" : "text-gray-600"
          }`}
          passive
        >
          {label}
        </ReactSwitch.Label>
        {description && (
          <ReactSwitch.Description
            className={`text-sm ${disabled ? "text-gray-200" : "text-gray-400"}`}
          >
            {description}
          </ReactSwitch.Description>
        )}
      </div>
      <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0">
        <ReactSwitch
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          className={classNames(
            checked ? "bg-purple-600" : "bg-gray-200",
            disabled && "cursor-not-allowed",
            // eslint-disable-next-line max-len
            "relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto",
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              checked ? "translate-x-5" : "translate-x-0",
              "inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
            )}
          />
        </ReactSwitch>
      </dd>
    </ReactSwitch.Group>
  );
};

export default Switch;
