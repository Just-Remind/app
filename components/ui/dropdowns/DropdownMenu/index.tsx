/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import classNames from "utils/classNames";

import styles from "./DropdownMenu.module.css";

type Props = {
  open?: boolean;
  buttonClassName?: string;
  button: React.ReactNode | string;
  children?: React.ReactNode;
  items?: { label: string; onClick: () => void }[];
};

const DropdownMenu = (props: Props): JSX.Element => {
  const {
    open = true,
    buttonClassName = styles["dropdown-button"],
    button,
    children,
    items = [],
  } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={buttonClassName}>{button}</Menu.Button>
      </div>

      {open && (
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
      )}
    </Menu>
  );
};

export default DropdownMenu;
