import { useState } from "react";

import { Dropdown, Modal } from "components/ui";
import { useToast } from "utils/hooks";
import useModalContent from "utils/hooks/useModalContent";

import ImportAndroidHTMLFileModal from "./parts/ImportAndroidHTMLFileModal";
import ImportMyClippingsModal from "./parts/ImportMyClippingsModal";
import SyncWithAndroidApp from "./parts/SyncWithAndroidApp";
import SyncWithExtension from "./parts/SyncWithExtension";
import SyncWithMyClippings from "./parts/SyncWithMyClippings";

const SyncButton = (): JSX.Element => {
  // STATE
  const [openedModal, setOpenedModal] = useState("");

  // HOOKS
  const [isOpen, toggle, setIsOpen] = useModalContent();
  const [toast, setToast, clearToast] = useToast();

  // METHODS
  const handleOpenModal = (modalName: string): void => {
    setOpenedModal(modalName);
    toggle();
  };

  const getModalTitle = (type: string): string | undefined => {
    let title;
    switch (type) {
      case "Clippings Modal":
        title = "Import your My Clippings.txt file";
        break;

      case "Android App Modal":
        title = "Import the HTML file from your Kindle Android app";
        break;
    }

    return title;
  };

  return (
    <>
      {toast}

      <Modal open={isOpen} setOpen={setIsOpen} title={getModalTitle(openedModal)}>
        {openedModal === "Clippings Modal" && (
          <ImportMyClippingsModal
            setIsOpen={setIsOpen}
            setToast={setToast}
            clearToast={clearToast}
          />
        )}
        {openedModal === "Android App Modal" && (
          <ImportAndroidHTMLFileModal
            setIsOpen={setIsOpen}
            setToast={setToast}
            clearToast={clearToast}
          />
        )}
      </Modal>

      <Dropdown buttonText="Import your books">
        <Dropdown.Item>
          <SyncWithExtension />
        </Dropdown.Item>
        <Dropdown.Item>
          <SyncWithMyClippings handleOpenModal={handleOpenModal} />
        </Dropdown.Item>
        <Dropdown.Item>
          <SyncWithAndroidApp handleOpenModal={handleOpenModal} />
        </Dropdown.Item>
      </Dropdown>
    </>
  );
};

export default SyncButton;
