/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import classNames from "utils/classNames";

type Props = {
  variant?: "naked" | "standard";
  button: React.ReactNode | string;
  children?: React.ReactNode;
  items?: { label: string; onClick: () => void }[];
};

const DropdownMenu = (props: Props): JSX.Element => {
  const { variant, button, children, items = [] } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={
            variant === "naked"
              ? ""
              : "inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          }
        >
          {button}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 p-4 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children ? (
            children
          ) : (
            <div className="py-1">
              {items.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }): JSX.Element => (
                    <button
                      type="button"
                      onClick={item.onClick}
                      className={classNames(
                        active ? "bg-gray-50 text-gray-900" : "text-gray-700",
                        "group w-full text-left px-4 py-2 text-sm"
                      )}
                    >
                      <span>{item.label}</span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
