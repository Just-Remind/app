import { useContext, useEffect } from "react";

import { Input, Spinner } from "components/ui";
import { UserContext } from "context";
import { useAddBooks } from "services/books";
import { useAlert, ToastConfig } from "utils/hooks";

type BookToImport = {
  title: string;
  author?: string;
  highlights: string[];
};

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setToast: (config: ToastConfig) => void;
  clearToast: () => void;
};

const ImportMyClippingsModal = (props: Props): JSX.Element => {
  // PROPS
  const { setIsOpen, setToast, clearToast } = props;

  // CONTEXT
  const user = useContext(UserContext);

  // RQ
  const { mutate: addBooks, status } = useAddBooks();

  // HOOKS
  const [alert, setAlert, clearAlert] = useAlert();

  useEffect(() => {
    clearToast();

    if (status === "success") {
      setToast({
        message: "Books imported!",
      });
      setIsOpen(false);
    }
  }, [status, clearToast, setToast, setIsOpen]);

  useEffect(() => {
    clearAlert();

    if (status === "error") {
      setAlert({
        type: "error",
        message: "Something went wrong",
      });
    }
  }, [status, clearAlert, setAlert]);

  // METHODS
  const splitTitleAndAuthor = (string: string): [title: string, author: string] => {
    if (string.at(-1) !== ")") return [string, ""];

    const authorParts = [];
    let title = "";

    let isAuthorNotFound = true;
    const breakerPoint = string.length;
    let i = -1;
    while (isAuthorNotFound) {
      if (string.at(i) === "(" || -i === breakerPoint) isAuthorNotFound = false;
      authorParts.push(string.at(i));
      i--;
    }

    const author = authorParts.reverse().join("");
    title = string.split(author)[0].trimEnd().replace("\n", "");
    const formattedAuthor = author.slice(1, -1).split(", ").reverse().join(" ");
    return [title, formattedAuthor];
  };

  const onImportMyClippingsFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    clearAlert();

    const booksToImport: BookToImport[] = [];

    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (evt): void => {
      if (!evt.target || !evt.target.result || typeof evt.target.result !== "string") return;

      if (!evt.target.result.includes("=========="))
        return setAlert({
          type: "error",
          message: "It doesn't look like a clippings file.",
        });

      const clippings = evt.target.result.split("==========\r");
      clippings.forEach((clipping) => {
        const [titleAndAuhor, , , highlight] = clipping.split("\r\n");
        if (!highlight) return;

        const [title, author] = splitTitleAndAuthor(titleAndAuhor);

        const importedBook = booksToImport.find((book) => book.title === title);
        if (importedBook) {
          importedBook.highlights.push(highlight);
        } else {
          booksToImport.push({
            title,
            author,
            highlights: [highlight],
          });
        }
      });

      if (booksToImport.length === 0) {
        return setAlert({
          type: "error",
          message: "No books were found.",
        });
      }
      addBooks({ user, books: booksToImport });
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      {alert}

      <h2>Import your My Clippings.txt file</h2>
      <Input label="File" type="file" acceptFiles=".txt" onChange={onImportMyClippingsFile} />
      {status === "loading" && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Importing books</span>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ImportMyClippingsModal;
