/* eslint-disable max-len */
import { Menu } from "@headlessui/react";

type Props = {
  button: React.ReactNode;
  children: React.ReactNode;
};

const DropdownMenu = (props: Props): JSX.Element => {
  const { button, children } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {button}
        </Menu.Button>
      </div>

      <Menu.Items className="absolute right-0 p-4 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {children}
      </Menu.Items>
    </Menu>
  );
};

export default DropdownMenu;
