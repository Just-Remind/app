import { useContext, useEffect, useMemo } from "react";

import { Spinner, Table, TextButton } from "components/ui";
import { UserContext } from "context";
import { useGetBooks, useDeleteBook } from "services/books";
import { Book } from "types";
import { useToast, useAlertModal } from "utils/hooks";

const Dashboard = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // RQ
  const { data: books = [], isLoading } = useGetBooks(user);
  const { mutate: deleteBook, isSuccess: isBookDeleted } = useDeleteBook();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();
  const [alertModal, setAlertModal, clearAlertModal] = useAlertModal();

  useEffect(() => {
    if (isBookDeleted) {
      clearToast();
      setToast({ message: "Book deleted!" });
    }
  }, [isBookDeleted, setToast, clearToast]);

  // METHODS
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
    title: <p className="truncate w-72">{book.title}</p>,
    author: <p className="w-40 truncate">{book.author}</p>,
    highlights: book.highlights.length,
    enabled: "true",
    actions: (
      <TextButton onClick={(): void => openDeleteBookModal(book)} color="red">
        Delete
      </TextButton>
    ),
  }));

  const memoizedData = useMemo(() => formatedData, [formatedData]);

  return (
    <>
      {toast}
      {alertModal}

      <section>
        <h2 className="mb-4 text-xl">Your books ({books.length})</h2>
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <Table columns={columns} data={memoizedData} />
        )}
      </section>
    </>
  );
};

export default Dashboard;
