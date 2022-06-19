import { Dropdown } from "components/ui";
import { useToast } from "utils/hooks";
import useModalContent from "utils/hooks/useModalContent";

import ImportMyClippingsModal from "./ImportMyClippingsModal";
import SyncWithExtension from "./SyncWithExtension";
import SyncWithMyClippings from "./SyncWithMyClippings";

const SyncButton = (): JSX.Element => {
  // HOOKS
  const [isOpen, toggle, setIsOpen] = useModalContent();
  const [toast, setToast, clearToast] = useToast();

  return (
    <>
      {toast}

      <ImportMyClippingsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setToast={setToast}
        clearToast={clearToast}
      />

      <Dropdown buttonText="Import your books">
        <Dropdown.Item>
          <SyncWithExtension />
        </Dropdown.Item>
        <Dropdown.Item>
          <SyncWithMyClippings toggle={toggle} />
        </Dropdown.Item>
      </Dropdown>
    </>
  );
};

export default SyncButton;
