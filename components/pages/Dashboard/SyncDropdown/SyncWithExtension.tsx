import { useContext } from "react";

import { ExternalLinkIcon } from "@heroicons/react/solid";
import ExternalLink from "next/link";

import { UserContext } from "context";
import { MESSAGES } from "utils/constants";
import { useToast } from "utils/hooks";

const SyncWithExtension = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // HOOKS
  const [toast, setToast] = useToast();

  // METHODS
  const sendInfoToChromeExtension = (): void => {
    const extensionId = process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID;
    const isChrome = !!window.chrome && !!window.chrome.runtime;
    if (!isChrome) return setToast({ type: "error", message: MESSAGES.onlyChromeSupport });

    if (extensionId && chrome.runtime) {
      chrome.runtime.sendMessage(extensionId, { userEmail: user.email });
    }
  };

  return (
    <>
      {toast}
      <ExternalLink href="https://read.amazon.com/notebook?ref_=kcr_notebook_lib">
        <a target="_blank" onClick={sendInfoToChromeExtension}>
          <div className="flex items-center space-x-1 group whitespace-nowrap">
            <span className="text-sm text-gray-500 group-hover:text-gray-700">
              Use the chrome extension (recommanded)
            </span>
            <ExternalLinkIcon className="w-4 text-gray-700 group-hover:text-gray-900" />
          </div>
        </a>
      </ExternalLink>
    </>
  );
};

export default SyncWithExtension;
