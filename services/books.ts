import axios from "axios";
import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
  useQueryClient,
} from "react-query";

import { User, Book } from "types";

type AddBookPayload = {
  user: User;
  title: string;
  author: string;
  notes: string[];
};

type EditBookPayload = {
  id: number;
  title: string;
  author: string;
};

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

const deleteBook = (bookId: number): Promise<void> =>
  axios.post("/api/delete_book", { id: bookId });

// eslint-disable-next-line prettier/prettier
const useDeleteBook = (): UseMutationResult<void, unknown, number, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((bookId: number) => deleteBook(bookId), {
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
  });
};

const addBook = (payload: AddBookPayload): Promise<void> =>
  axios.post("/api/add_book", payload);

// eslint-disable-next-line prettier/prettier
const useAddBook = (): UseMutationResult<void, unknown, AddBookPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: AddBookPayload) => addBook(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
  });
};

const editBook = (payload: EditBookPayload): Promise<void> =>
  axios.post("/api/edit_book", payload);

// eslint-disable-next-line prettier/prettier
const useEditBook = (): UseMutationResult<void, unknown, EditBookPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: EditBookPayload) => editBook(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
  });
};

export { useGetBooks, useGetBook, useAddBook, useDeleteBook, useEditBook };
