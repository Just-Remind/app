import { useContext, useEffect, useMemo } from "react";

import { Link } from "@tanstack/react-location";

import { Spinner, Table, TextButton, Toggle } from "components/ui";
import { UserContext } from "context";
import { useGetBooks, useDeleteBook, useToggleBook } from "services/books";
import { Book } from "types";
import { useToast, useAlertModal, useModal } from "utils/hooks";

import EditBookForm from "./EditBookForm";
import NoBooksInstructions from "./NoBooksInstructions";
import SyncDropdown from "./SyncDropdown";

const Dashboard = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // RQ
  const { data: books = [], isLoading } = useGetBooks(user);
  const { mutate: deleteBook, isSuccess: isBookDeleted } = useDeleteBook();
  const {
    mutate: toggleBook,
    data: toggleBookResponse = { data: { enabled: "" } },
    isSuccess: isBookToggled,
    isError: isToggleBookError,
  } = useToggleBook();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();
  const [alertModal, setAlertModal, clearAlertModal] = useAlertModal();
  const [modal, setModal, toggleModal] = useModal();

  useEffect(() => {
    if (isBookDeleted) {
      clearToast();
      setToast({ message: "Book deleted!" });
    }
  }, [isBookDeleted, setToast, clearToast]);

  useEffect(() => {
    if (isBookToggled) {
      clearToast();
      const message = toggleBookResponse.data.enabled
        ? "Book activated"
        : "Book deactivated";
      setToast({ message });
    }

    if (isToggleBookError) {
      clearToast();
      setToast({ type: "error", message: "Something went wrong" });
    }
  }, [
    isBookToggled,
    toggleBookResponse,
    isToggleBookError,
    setToast,
    clearToast,
  ]);

  // METHODS
  const openEditBookModal = (book: Book): void => {
    setModal({
      children: <EditBookForm book={book} handleCloseModal={toggleModal} />,
    });
  };

  const handleDeleteBook = (bookId: number): void => {
    deleteBook(bookId);
  };

  const openDeleteBookModal = (book: Book): void => {
    clearAlertModal();

    setAlertModal({
      title: "Delete book",
      message: `Are you sure you want to delete ${book.title} and all its highlights?`,
      button: "Delete",
      onClick: () => handleDeleteBook(book.id),
    });
  };

  const handleToggleBook = (id: number, enabled: boolean): void => {
    toggleBook({ id, enabled });
  };

  // VARS
  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Author",
      accessor: "author",
    },
    {
      Header: "Highlights",
      accessor: "highlights",
    },
    {
      Header: "Enabled",
      accessor: "enabled",
    },
    {
      Header: "",
      accessor: "actions",
    },
  ] as const;

  const formatedData = books.map((book) => ({
    title: (
      <Link
        to={`books/${book.id}`}
        className="block truncate w-72 hover:text-gray-700"
      >
        {book.title}
      </Link>
    ),
    author: <p className="w-40 truncate">{book.author}</p>,
    highlights: book.highlights.length,
    enabled: (
      <Toggle
        value={book.enabled}
        onChange={(checked): void => handleToggleBook(book.id, checked)}
      />
    ),
    actions: (
      <div className="space-x-4">
        <TextButton
          onClick={(): void => openEditBookModal(book)}
          color="yellow"
        >
          Edit
        </TextButton>
        <TextButton onClick={(): void => openDeleteBookModal(book)} color="red">
          Delete
        </TextButton>
      </div>
    ),
  }));

  const memoizedData = useMemo(() => formatedData, [formatedData]);

  return (
    <>
      {toast}
      {alertModal}
      {modal}

      <section>
        <div className="flex items-center justify-between mb-4 space-x-2">
          <h2 className="text-xl">Your books ({books.length})</h2>
          <div className="hidden lg:block">
            <SyncDropdown />
          </div>
        </div>
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <>
            {memoizedData.length > 0 ? (
              <Table columns={columns} data={memoizedData} />
            ) : (
              <NoBooksInstructions />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Dashboard;
