import { useEffect, useState } from "react";

import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";

import { Modal, Switch } from "components/ui";
import { useEditHighlightEnabled } from "services/highlights";
import { Highlight } from "types";
import { useAlertModal, useToast } from "utils/hooks";

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

  // RQ
  const { mutate: editHighlightEnabled, isSuccess } = useEditHighlightEnabled();

  // HOOKS
  const [alertModal, setAlertModal, clearAlertModal] = useAlertModal();
  const [toast, setToast, clearToast] = useToast();

  useEffect(() => {
    clearToast();

    if (isSuccess) {
      setToast({
        message: `Your highlight has been ${highlight?.enabled ? "activated" : "deactivated"}`,
      });
    }
  }, [clearToast, isSuccess, setToast, highlight.enabled]);

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

  const handleEditHighlightEnabled = (checked: boolean): void => {
    editHighlightEnabled({ id: highlight.id, enabled: checked });
  };

  return (
    <>
      {alertModal}
      {toast}

      <Modal open={open} setOpen={setOpen} title="Edit this highlight">
        <EditHighlightForm highlight={highlight} handleCloseModal={handleCloseModal} />
      </Modal>
      <li className="px-6 pt-6 pb-2 border rounded shadow border-gray-50">
        <p className="text-gray-700">{highlight.content}</p>
        <div className="flex justify-between pt-2 mt-4 space-x-2 border-t">
          <Switch
            label="Include in daily email"
            labelClassName="mr-2 text-gray-500 text-medium"
            groupClassName="sm:flex sm:items-end sm:justify-between"
            checked={highlight.enabled}
            onChange={handleEditHighlightEnabled}
          />
          <div>
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
        </div>
      </li>
    </>
  );
};

export default HighlightCard;
