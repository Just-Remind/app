import { useState, useContext } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";

import { Input, Button, TwoColCard } from "components/ui";
import { UserContext } from "context";
import { useGetBooks } from "services/books";
import { Book } from "types";

type ImportBookForm = {
  highlights: FileList;
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
  const { data: books = [] } = useGetBooks(user);

  // HOOKS
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ImportBookForm>();

  // METHODS
  const handleImportNotes = (data: ImportBookForm): void => {
    const file = data.highlights["0"];
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

    axios
      .post("/api/add_notes", {
        userId: localStorage.getItem("userId"),
        title: anaylisedBook.title,
        author: anaylisedBook.author,
        notes: anaylisedBook.notes,
      })
      .then(() => {
        alert("Book & notes successfully saved! 👌");
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <form
        onSubmit={
          anaylisedBook
            ? handleSubmit(handleSaveNotesToDB)
            : handleSubmit(handleImportNotes)
        }
        className="flex items-center pb-6 mb-6 space-x-4 border-b border-gray-300"
      >
        <Input
          {...register("highlights")}
          type="file"
          accept=".html"
          className="flex-1"
          error={errors.highlights?.message}
        />
        <Button submit>{anaylisedBook ? "Save" : "Analyse"}</Button>
      </form>

      <section>
        <h2 className="mb-4 text-xl">Your books</h2>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {books.map((book: Book) => (
              <TwoColCard
                href={`/books/${book.id}`}
                key={book.id}
                leftTitle={book.title}
                leftSubtitle={`By ...`}
                rightTitle={`Notes: xx`}
                rightSubtitle={`Added on ...`}
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
