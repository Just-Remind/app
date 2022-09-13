import { useState } from "react";

import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";

import { Modal } from "components/ui";
import { Highlight } from "types";
import { useAlertModal } from "utils/hooks";

import EditHighlightForm from "./EditHighlightForm";

type Props = {
  highlight: Highlight;
  handleDeleteHighlight: (id: number) => void;
};

const HighlightCard = (props: Props): JSX.Element => {
  // PROPS
  const { highlight, handleDeleteHighlight } = props;

  // STATE
  const [open, setOpen] = useState(false);

  // HOOKS
  const [alertModal, setAlertModal, clearAlertModal] = useAlertModal();

  // METHODS
  const openEditHighlightModal = (): void => setOpen(true);
  const handleCloseModal = (): void => setOpen(false);

  const openDeleteHighlightModal = (highlightId: number): void => {
    clearAlertModal();

    setAlertModal({
      title: "Delete highlight",
      message: `Are you sure you want to delete this highlight?`,
      button: "Delete",
      onClick: () => handleDeleteHighlight(highlightId),
    });
  };

  return (
    <>
      {alertModal}
      <Modal open={open} setOpen={setOpen}>
        <EditHighlightForm highlight={highlight} handleCloseModal={handleCloseModal} />
      </Modal>
      <li className="p-6 border rounded shadow border-gray-50">
        <p className="text-gray-700">{highlight.content}</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button>
            <PencilAltIcon
              className="h-4 text-gray-400 hover:text-yellow-600"
              onClick={openEditHighlightModal}
            />
          </button>
          <button>
            <TrashIcon
              className="h-4 text-gray-400 hover:text-red-600"
              onClick={(): void => openDeleteHighlightModal(highlight.id)}
            />
          </button>
        </div>
      </li>
    </>
  );
};

export default HighlightCard;
