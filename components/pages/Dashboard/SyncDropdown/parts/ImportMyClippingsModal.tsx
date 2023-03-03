import { useContext, useEffect } from "react";

import { Input, Spinner } from "components/ui";
import { UserContext } from "context";
import { useAddBooks } from "services";
import { useAlert, ToastConfig } from "utils/hooks";

import getBooksToImport from "../logic/getBooksToImport";
import useLoadedBookIndicator from "../logic/useLoadedBookIndicator";

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
  const { refs, handleSetImportedBooks } = useLoadedBookIndicator(status);

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
  const onImportMyClippingsFile = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    clearAlert();
    const booksToImport = await getBooksToImport(e);
    handleSetImportedBooks(booksToImport);
    addBooks({ user, importedFrom: "clippings", books: booksToImport });
  };

  return (
    <div className="space-y-4">
      {alert}

      <Input label="File" type="file" acceptFiles=".txt" onChange={onImportMyClippingsFile} />
      {status === "loading" && (
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Importing books <span ref={refs.loadedBookCounter}></span>
            </span>
            <Spinner />
          </div>
          <p ref={refs.loadedBook} className="text-xs text-gray-500 truncate"></p>
        </div>
      )}
    </div>
  );
};

export default ImportMyClippingsModal;
