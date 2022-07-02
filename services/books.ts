import axios from "axios";
import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
  useQueryClient,
} from "react-query";

import { User, Book } from "types";
import { nestedArraysBuilder } from "utils";

type AddBooksPayload = {
  user: User;
  books: {
    title: string;
    author?: string;
    highlights: string[];
  }[];
};

type EditBookPayload = {
  id: number;
  title: string;
  author: string;
};

type ToggleBookPayload = {
  id: number;
  enabled: boolean;
};

// ****************** GET BOOKS ******************

const useGetBooks = (user: User): UseQueryResult<Book[], Error> =>
  useQuery("books", async () => {
    const { data } = await axios.post("/api/get_books", { user });
    return data;
  });

// ****************** GET BOOK ******************

const useGetBook = (user: User, bookId: string): UseQueryResult<Book, Error> =>
  useQuery("book", async () => {
    const { data } = await axios.post("/api/get_book", { user, bookId });
    return data;
  });

// ****************** DELETE BOOK ******************

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

// ****************** CREATE BOOK ******************

const addBooks = (payload: AddBooksPayload): Promise<void> =>
  axios.post("/api/add_book", payload);

// eslint-disable-next-line prettier/prettier
const useAddBooks = (): UseMutationResult<void, unknown, AddBooksPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: AddBooksPayload) => addBooks(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
  });
};

// ****************** EDIT BOOK ******************

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

// ****************** TOGGLE BOOK ******************

const toggleBook = (payload: ToggleBookPayload): Promise<void> =>
  axios.post("/api/toggle_book", payload);

// eslint-disable-next-line prettier/prettier
const useToggleBook = (): UseMutationResult<void, unknown, ToggleBookPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: ToggleBookPayload) => toggleBook(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
  });
};

// ****************** GET BOOK COUNT ******************

const getBookCount = async (email: string): Promise<void> => {
  const { data } = await axios.post("/api/get_book_count", { email });
  return data;
};

const useBookCount = (email: string): UseQueryResult<number, Error> =>
  useQuery("book_book", () => getBookCount(email));

export {
  useGetBooks,
  useGetBook,
  useAddBooks,
  useDeleteBook,
  useEditBook,
  useToggleBook,
  useBookCount,
};
