import { useContext, useEffect } from "react";

import { useMatch } from "@tanstack/react-location";

import { UserContext } from "context";
import { useGetBook } from "services/books";
import { useDeleteHighlight } from "services/highlights";
import { useToast } from "utils/hooks";

import HighlightCard from "./HighlightCard";

const Book = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // RL
  const { params } = useMatch();

  // RQ
  const { data: book = { title: "", author: "", highlights: [] } } = useGetBook(
    user,
    params.id
  );

  // HOOKS
  const [toast, setToast, clearToast] = useToast();
  const { mutate: deleteHighlight, isSuccess } = useDeleteHighlight();

  useEffect(() => {
    if (isSuccess) {
      clearToast();
      setToast({ message: "Highlight deleted" });
    }
  }, [isSuccess, setToast, clearToast]);

  // METHODS
  const handleDeleteHighlight = (highlightId: number): void =>
    deleteHighlight(highlightId);

  return (
    <>
      {toast}
      <div>
        <h2 className="pb-6 mb-6 text-xl border-b border-gray-300">
          {book.title}
          <span className="pl-2 text-xs text-gray-600">by {book.author}</span>
        </h2>

        <ul className="space-y-6">
          {book.highlights.map((highlight) => (
            <HighlightCard
              key={highlight.id}
              highlight={highlight}
              handleDeleteHighlight={handleDeleteHighlight}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Book;
