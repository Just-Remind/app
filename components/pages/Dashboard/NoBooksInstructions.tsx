import { useContext } from "react";

import axios from "axios";

import { Button, Cards, Modal } from "components/ui";
import { UserContext } from "context";
import { Card } from "types";
import { MESSAGES } from "utils/constants";
import { useToast, useModalContent } from "utils/hooks";

import ImportMyClippingsModal from "./SyncDropdown/ImportMyClippingsModal";

const NoBooksInstructions = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // HOOKS
  const [toast, setToast, clearToast] = useToast();
  const [isOpen, toggle, setIsOpen] = useModalContent();

  // METHODS
  const sendReminderEmail = (): void => {
    clearToast();

    axios
      .post("/api/finish_setup_email", { email: user.email })
      .then(() => setToast({ message: "Email sent!" }))
      .catch(() =>
        setToast({
          type: "error",
          message: "Something went wrong. Please reload and try again.",
        }),
      );
  };

  const handleConnectWhispersync = (): void => {
    clearToast();
    const isChrome = !!chrome && !!chrome.runtime;
    if (!isChrome) return setToast({ type: "error", message: MESSAGES.onlyChromeSupport });

    const extensionId = process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID;
    if (extensionId && chrome.runtime) {
      chrome.runtime.sendMessage(extensionId, { userEmail: user.email }, (response) => {
        if (response) {
          window.open("https://read.amazon.com/notebook?ref_=kcr_notebook_lib", "_blank");
        } else {
          setToast({
            type: "info",
            message:
              "You first need to add our Chrome extension before importing your books from amazon.",
          });
          window.open(
            "https://chrome.google.com/webstore/detail/just-remind-chrome-extens/iidldfielonfgiabbjjkbigjjclcpefa",
            "_blank",
          );
        }
      });
    }
  };

  // VARS
  const syncBookOptions: Card[] = [
    {
      title: "Kindle",
      description: "Sync your Kindle higlhights via Amazon (Google Chrome only)",
      btnText: "Import",
      onClick: handleConnectWhispersync,
    },
    {
      title: "My Clippings.txt",
      description: "Import your My Clippings.txt file",
      btnText: "Import",
      onClick: toggle,
    },
  ];

  return (
    <>
      {toast}

      <Modal open={isOpen} setOpen={setIsOpen}>
        <ImportMyClippingsModal setIsOpen={setIsOpen} setToast={setToast} clearToast={clearToast} />
      </Modal>

      <div className="space-y-4 lg:hidden">
        <p className="text-grey-500">
          To sync your Kindle highlights, you need to be on a desktop computer using Google Chrome
          👌
        </p>
        <div className="flex justify-center">
          <Button onClick={sendReminderEmail}>Email me a link to finish on desktop</Button>
        </div>
      </div>

      <div className="hidden lg:block">
        <p className="mb-4 text-xl">Welcome on Just Remind! 🥳</p>
        <p className="mb-2">You don&apos;t have any book yet, so let&apos;s quickly fix that!</p>

        <Cards cards={syncBookOptions} containerClassName="mt-6" />
      </div>
    </>
  );
};

export default NoBooksInstructions;
