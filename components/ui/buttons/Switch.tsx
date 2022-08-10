import { Switch as ReactSwitch } from "@headlessui/react";

import { classNames } from "utils";

type Props = {
  label: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

const Switch = (props: Props): JSX.Element => {
  // PROPS
  const { label, description, checked, onChange, disabled = false } = props;

  return (
    <ReactSwitch.Group
      as="div"
      className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
    >
      <div className="flex flex-col">
        <ReactSwitch.Label
          as="dt"
          className={`text-sm font-medium ${
            disabled ? "text-gray-300" : "text-gray-600"
          }`}
          passive
        >
          {label}
        </ReactSwitch.Label>
        {description && (
          <ReactSwitch.Description
            className={`text-sm ${
              disabled ? "text-gray-200" : "text-gray-400"
            }`}
          >
            {description}
          </ReactSwitch.Description>
        )}
      </div>
      <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <ReactSwitch
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          className={classNames(
            checked ? "bg-purple-600" : "bg-gray-200",
            disabled && "cursor-not-allowed",
            // eslint-disable-next-line max-len
            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto"
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              checked ? "translate-x-5" : "translate-x-0",
              "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
            )}
          />
        </ReactSwitch>
      </dd>
    </ReactSwitch.Group>
  );
};

export default Switch;