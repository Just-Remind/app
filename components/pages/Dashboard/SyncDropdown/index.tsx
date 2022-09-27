import { useState } from "react";

import { Dropdown, Modal } from "components/ui";
import { useToast } from "utils/hooks";
import useModalContent from "utils/hooks/useModalContent";

import ImportAndroidHTMLFileModal from "./ImportAndroidHTMLFileModal";
import ImportMyClippingsModal from "./ImportMyClippingsModal";
import SyncWithAndroidApp from "./SyncWithAndroidApp";
import SyncWithExtension from "./SyncWithExtension";
import SyncWithMyClippings from "./SyncWithMyClippings";

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

  return (
    <>
      {toast}

      <Modal open={isOpen} setOpen={setIsOpen}>
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
