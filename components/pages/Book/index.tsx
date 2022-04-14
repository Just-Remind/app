import { useContext } from "react";

import { useMatch } from "@tanstack/react-location";

import { UserContext } from "context";
import { useGetBook } from "services/books";

const Book = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // RL
  const { params } = useMatch();

  // RQ
  const { data: book = { title: "", notes: [] } } = useGetBook(user, params.id);

  return (
    <div>
      <h2 className="pb-6 mb-6 text-xl border-b border-gray-300">
        {book.title}
      </h2>

      <ul className="space-y-2">
        {book.notes.map((note, index) => (
          <li key={index}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Book;
