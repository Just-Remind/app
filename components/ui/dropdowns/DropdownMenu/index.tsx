/* eslint-disable max-len */
import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

type Props = {
  open: boolean;
  button: React.ReactNode;
  children: React.ReactNode;
};

const DropdownMenu = (props: Props): JSX.Element => {
  const { open, button, children } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {button}
        </Menu.Button>
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
            {children}
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
};

export default DropdownMenu;
