import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

import { User, Book } from "types";

const useGetBooks = (user: User): UseQueryResult<Book[], Error> =>
  useQuery("books", async () => {
    const { data } = await axios.post("/api/get_books", { user });
    return data;
  });

const useGetBook = (user: User, bookId: string): UseQueryResult<Book, Error> =>
  useQuery("book", async () => {
    const { data } = await axios.post("/api/get_book", { user, bookId });
    return data;
  });

export { useGetBooks, useGetBook };
