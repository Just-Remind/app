import { useContext, useEffect } from "react";

import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";
import { useMatch } from "@tanstack/react-location";

import { Spinner } from "components/ui";
import { UserContext } from "context";
import { useGetBook } from "services/books";
import { useDeleteHighlight } from "services/highlights";
import { useAlertModal, useToast } from "utils/hooks";

const Book = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // RL
  const { params } = useMatch();

  // RQ
  const { data: book = { title: "", author: "", notes: [] } } = useGetBook(
    user,
    params.id
  );

  // HOOKS
  const [toast, setToast, clearToast] = useToast();
  const [alertModal, setAlertModal, clearAlertModal] = useAlertModal();
  const { mutate: deleteHighlight, isSuccess } = useDeleteHighlight();

  useEffect(() => {
    if (isSuccess) {
      clearToast();
      setToast({ message: "Highlight deleted" });
    }
  }, [isSuccess, setToast, clearToast]);

  // METHODS
  const handleEditHighlight = (): void => {};
  const handleDeleteHighlight = (highlightId: number): void =>
    deleteHighlight(highlightId);

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
      {toast}
      {alertModal}
      <div>
        <h2 className="pb-6 mb-6 text-xl border-b border-gray-300">
          {book.title}
          <span className="pl-2 text-xs text-gray-600">by {book.author}</span>
        </h2>

        <ul className="space-y-6">
          {book.notes.map((note, index) => (
            <li
              className="p-6 border rounded shadow border-gray-50"
              key={index}
            >
              <p className="text-gray-700">{note.content}</p>
              <div className="flex justify-end mt-4 space-x-2">
                <button>
                  <PencilAltIcon
                    className="h-4 text-gray-400 hover:text-yellow-600"
                    onClick={handleEditHighlight}
                  />
                </button>
                <button>
                  <TrashIcon
                    className="h-4 text-gray-400 hover:text-red-600"
                    onClick={(): void => openDeleteHighlightModal(note.id)}
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Book;
