import { useContext, useEffect, useState } from "react";

import { Input, Spinner } from "components/ui";
import { UserContext } from "context";
import { useAddBooks } from "services";
import { UploadedBook } from "types";
import { useAlert, ToastConfig } from "utils/hooks";

import getBooksToImport from "../logic/getBooksToImport";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setToast: (config: ToastConfig) => void;
  clearToast: () => void;
};

const ImportMyClippingsModal = (props: Props): JSX.Element => {
  // PROPS
  const { setIsOpen, setToast, clearToast } = props;

  // STATE
  const [uploadedBook, setUploadedBook] = useState<UploadedBook>();

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
    if (status === "error") {
      setAlert({
        type: "error",
        message: "Something went wrong",
      });
    }
  }, [status, clearToast, setToast, setAlert, setIsOpen]);

  // METHODS
  const handleSetUploadedBook = (value: UploadedBook): void => setUploadedBook(value);

  const onImportMyClippingsFile = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    clearAlert();
    const booksToImport = await getBooksToImport(e);
    addBooks({ user, importedFrom: "clippings", books: booksToImport, handleSetUploadedBook });
  };

  return (
    <div className="space-y-4">
      {alert}

      <Input label="File" type="file" acceptFiles=".txt" onChange={onImportMyClippingsFile} />
      {status === "loading" && (
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Importing books{" "}
              {uploadedBook && (
                <span>
                  ({uploadedBook.index}/{uploadedBook.total})
                </span>
              )}
            </span>

            <Spinner />
          </div>
          {uploadedBook && <p className="text-xs text-gray-500 truncate">{uploadedBook.title}</p>}
        </div>
      )}
    </div>
  );
};

export default ImportMyClippingsModal;
