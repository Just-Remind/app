import { useContext, useEffect } from "react";

import { Spinner } from "components/ui";
import { UserContext } from "context";
import { useGetBooks, useDeleteBook } from "services/books";
import { Book } from "types";
import { useToast } from "utils/hooks";

import BookCard from "./BookCard";

const Dashboard = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // RQ
  const { data: books = [], isLoading } = useGetBooks(user);
  const { mutate: deleteBook, isSuccess: isBookDeleted } = useDeleteBook();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

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

  return (
    <>
      {toast}
      <section>
        <h2 className="mb-4 text-xl">Your books ({books.length})</h2>
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {books.map((book: Book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  handleDeleteBook={handleDeleteBook}
                />
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
