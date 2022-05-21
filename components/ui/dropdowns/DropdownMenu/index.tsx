/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import { Fragment } from "react";

import { Popover, Transition } from "@headlessui/react";

type Props = {
  button: string;
  children: React.ReactNode;
};

const DropdownMenu = (props: Props): JSX.Element => {
  const { button, children } = props;

  return (
    <Popover className="relative">
      <Popover.Button>{button}</Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 p-4 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default DropdownMenu;
