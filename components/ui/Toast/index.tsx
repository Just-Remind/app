/* eslint-disable max-len */
import { Fragment } from "react";

import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

type Props = {
  type?: "success" | "warning" | "info" | "error";
  message: string | React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const Toast = (props: Props): JSX.Element => {
  // PROPS
  const { type = "success", message, show, setShow } = props;

  // VARS
  let title;
  let icon;
  switch (type) {
    case "success":
      title = <span className="text-green-600">Success!</span>;
      icon = <CheckCircleIcon className="w-6 text-green-600" />;
      break;
    case "warning":
      title = <span className="text-yellow-600">Attention</span>;
      icon = <ExclamationCircleIcon className="w-6 text-yellow-600" />;
      break;
    case "info":
      title = <span className="text-blue-600">Info</span>;
      icon = <InformationCircleIcon className="w-6 text-blue-600" />;
      break;
    case "error":
      title = <span className="text-red-600">Something went wrong</span>;
      icon = <XCircleIcon className="w-6 text-red-600" />;
      break;
  }

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 z-10 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">{icon}</div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="mt-1 text-sm text-gray-500">{message}</p>
                  </div>
                  <div className="flex flex-shrink-0 ml-4">
                    <button
                      className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={(): void => setShow(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export default Toast;
