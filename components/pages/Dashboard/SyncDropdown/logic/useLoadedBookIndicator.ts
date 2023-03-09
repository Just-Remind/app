import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";

import { BookToImport } from "types";

type UseLoadedBookIndicatorReturn = {
  refs: {
    loadedBookCounter: MutableRefObject<null>;
    loadedBook: MutableRefObject<null>;
  };
  handleSetImportedBooks: (state: BookToImport[]) => void;
};

const useLoadedBookIndicator = (status: string): UseLoadedBookIndicatorReturn => {
  // STATE
  const [importedBooks, setImportedBooks] = useState<BookToImport[]>([]);

  // REF
  const loadedBookCounterRef = useRef(null);
  const loadedBookRef = useRef(null);

  // METHODS
  const handleSetImportedBooks = useCallback(
    (state: BookToImport[]) => setImportedBooks(state),
    [],
  );

  // HOOKS
  useEffect(() => {
    const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
    let index = 0;
    if (loadedBookCounterRef && loadedBookRef && status === "loading") {
      const loadedBooks = async (): Promise<void> => {
        while (index < importedBooks.length && status === "loading") {
          await sleep(1000);
          if (loadedBookRef.current) {
            (loadedBookRef.current as HTMLParagraphElement).textContent =
              importedBooks[index].title;
          }
          if (loadedBookCounterRef.current) {
            const text = `(${index + 1}/${importedBooks.length})`;
            (loadedBookCounterRef.current as HTMLSpanElement).textContent = text;
          }
          index++;
        }
      };
      loadedBooks();
    }
  }, [importedBooks, status]);

  return {
    refs: {
      loadedBookCounter: loadedBookCounterRef,
      loadedBook: loadedBookRef,
    },
    handleSetImportedBooks,
  };
};

export default useLoadedBookIndicator;
