import React, { useState } from "react";

import { Modal } from "components/ui";

type ModalConfiguration = {
  children: React.ReactNode;
};

type ReturnUseModal = [
  modal: React.ReactNode | null,
  setModal: (configuration: ModalConfiguration) => void,
  toggleModal: () => void,
];

const useModal = (): ReturnUseModal => {
  // STATE
  const [open, setOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<React.ReactNode | null>(null);

  // METHODS
  const toggleModal = (): void => setOpen((prevState) => !prevState);

  const setModal = (configuration: ModalConfiguration): void => {
    setOpen(true);
    setModalChildren(configuration.children);
  };

  const modal = open ? (
    <Modal open={open} setOpen={setOpen}>
      {modalChildren}
    </Modal>
  ) : null;

  return [modal, setModal, toggleModal];
};

export default useModal;
