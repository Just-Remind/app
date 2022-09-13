/* eslint-disable max-len */
import { Switch } from "@headlessui/react";

import classNames from "utils/classNames";

type Props = {
  label?: string;
  value: boolean;
  onChange: (checked: boolean) => void;
};

const Toggle = ({ label, value, onChange }: Props): JSX.Element => {
  // METHODS
  const handleOnChange = (checked: boolean): void => onChange(checked);

  return (
    <Switch.Group as="div" className="flex items-center">
      {label && (
        <Switch.Label as="span" className="mr-3">
          <span className="text-sm font-medium text-gray-900">{label}</span>
        </Switch.Label>
      )}
      <Switch
        checked={value}
        onChange={handleOnChange}
        className={classNames(
          value ? "bg-blue-600" : "bg-gray-200",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            value ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
          )}
        />
      </Switch>
    </Switch.Group>
  );
};

export default Toggle;
