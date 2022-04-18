import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";
import { Link } from "@tanstack/react-location";

import { Book } from "types";
import { useAlertModal } from "utils/hooks";

type Props = {
  book: Book;
  handleDeleteBook: (bookId: number) => void;
};

const BookCard = ({ book, handleDeleteBook }: Props): JSX.Element => {
  // HOOKS
  const [alertModal, setAlertModal, clearAlertModal] = useAlertModal();

  // METHODS
  const openDeleteBookModal = (): void => {
    clearAlertModal();

    setAlertModal({
      title: "Delete book",
      message: `Are you sure you want to delete ${book.title} and all its highlights?`,
      button: "Delete",
      onClick: () => handleDeleteBook(book.id),
    });
  };

  return (
    <>
      {alertModal}
      <li className="flex group">
        <Link
          to={`/books/${book.id}`}
          className="flex-1 block group-hover:bg-gray-50"
        >
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="flex items-center flex-1 min-w-0">
              <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {book.title}
                  </p>
                  <p className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="truncate">By {book.author}</span>
                  </p>
                </div>
                <div className="hidden md:block">
                  <div>
                    <p className="text-sm text-gray-900">
                      Highlights: {book.notes.length}
                    </p>
                    <p className="flex items-center mt-2 text-sm text-gray-500">
                      Added on ...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex flex-col justify-center px-2 space-y-3 group-hover:bg-gray-50 ">
          <PencilAltIcon
            onClick={(): void => console.log("clicked")}
            className="w-5 text-gray-400 hover:text-yellow-600"
          />
          <TrashIcon
            onClick={openDeleteBookModal}
            className="w-5 text-gray-400 hover:text-red-600"
          />
        </div>
      </li>
    </>
  );
};

export default BookCard;
