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

const ImportAndroidHTMLFileModal = (props: Props): JSX.Element => {
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
        message: "Book imported!",
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
  const onImportHTMLFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    clearAlert();

    const booksToImport: BookToImport[] = [];

    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const reader = new FileReader();
    reader.onload = (evt): void => {
      if (!evt.target || !evt.target.result || typeof evt.target.result !== "string") return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(evt.target.result, "text/html");

      if (!doc.querySelector(".noteText"))
        return setAlert({
          type: "error",
          message: "There seems to be no highlight in this file.",
        });

      const title = doc.querySelector(".bookTitle")?.textContent || "";
      const author = doc.querySelector(".authors")?.textContent || "";

      const highlightsNodes = doc.querySelectorAll(".noteText");

      highlightsNodes.forEach((node) => {
        const highlight = node.textContent;
        if (!highlight) return;

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

      addBooks({ user, books: booksToImport, importedFrom: "android-html" });
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      {alert}

      <h2>Import the HTML file from your Kindle Android app</h2>
      <Input label="File" type="file" acceptFiles=".html" onChange={onImportHTMLFile} />
      {status === "loading" && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Importing books</span>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ImportAndroidHTMLFileModal;
