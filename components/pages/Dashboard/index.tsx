import { useState, useContext, useEffect } from "react";

import { useForm } from "react-hook-form";

import { Input, Button, Spinner } from "components/ui";
import { UserContext } from "context";
import { useAddBook, useGetBooks, useDeleteBook } from "services/books";
import { Book } from "types";
import { useToast } from "utils/hooks";

import BookCard from "./BookCard";

type ImportBookForm = {
  book: FileList;
};

type AnalysedBook = {
  title: string;
  author: string;
  notes: string[];
};

const Dashboard = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // STATE
  const [anaylisedBook, setAnalysedBook] = useState<AnalysedBook | null>(null);

  // RQ
  const { data: books = [], isLoading } = useGetBooks(user);
  const { mutate: addBook, isSuccess: isBookAdded } = useAddBook();
  const { mutate: deleteBook, isSuccess: isBookDeleted } = useDeleteBook();

  // RHF
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<ImportBookForm>();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  useEffect(() => {
    if (isBookAdded) {
      clearToast();
      setAnalysedBook(null);
      setToast({ message: "Book added!" });
    }
  }, [isBookAdded, setToast, clearToast]);

  useEffect(() => {
    if (isBookDeleted) {
      clearToast();
      resetField("book");
      setToast({ message: "Book deleted!" });
    }
  }, [isBookDeleted, setToast, clearToast, resetField]);

  // METHODS
  const handleDeleteBook = (bookId: number): void => {
    deleteBook(bookId);
  };

  const handleImportNotes = (data: ImportBookForm): void => {
    const file = data.book["0"];
    if (!file) return;

    const notes: string[] = [];
    let title = "";
    let author = "";

    const fileReader = new FileReader();
    fileReader.onload = (e): void => {
      if (!e.target) return;
      const text = e.target.result;

      if (typeof text !== "string") return;
      const htmlObject = document.createElement("div");
      htmlObject.innerHTML = text;

      const titleElement = htmlObject.querySelector(".bookTitle");
      if (titleElement && titleElement.textContent) {
        title = titleElement.textContent.trim() || "";
      }

      const authorElement = htmlObject.querySelector(".authors");
      if (authorElement && authorElement.textContent) {
        author = authorElement?.textContent;
      }

      const noteTextnodes = htmlObject.querySelectorAll(".noteText");
      noteTextnodes.forEach((note) => {
        if (note.firstChild && note.firstChild.nodeValue) {
          notes.push(note.firstChild.nodeValue.trim());
        }
      });
      setAnalysedBook({ title, notes, author });
    };

    fileReader.readAsText(file);
  };

  const handleSaveNotesToDB = (): void => {
    if (!anaylisedBook) return alert("No book analysed");
    addBook({
      user: user,
      title: anaylisedBook.title,
      author: anaylisedBook.author,
      notes: anaylisedBook.notes,
    });
  };

  return (
    <>
      {toast}
      <form
        onSubmit={
          anaylisedBook
            ? handleSubmit(handleSaveNotesToDB)
            : handleSubmit(handleImportNotes)
        }
        className="hidden pb-6 mb-6 border-b border-gray-300 md:block"
      >
        <div className="flex items-center space-x-4">
          <Input
            {...register("book")}
            type="file"
            accept=".html"
            className="flex-1"
            error={errors.book?.message}
          />
          <Button type="submit">{anaylisedBook ? "Save" : "Analyse"}</Button>
        </div>
        {anaylisedBook && (
          <div className="mt-2">
            <p className="font-medium">Your book</p>
            <div className="text-sm text-gray-700">
              <span>
                {anaylisedBook?.title} by {anaylisedBook?.author} (
                {anaylisedBook?.notes.length} highlights)
              </span>
            </div>
          </div>
        )}
      </form>

      <section>
        <h2 className="mb-4 text-xl">Your books</h2>
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
