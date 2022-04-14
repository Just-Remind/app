import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

import { User, Book } from "types";

const useGetBooks = (user: User): UseQueryResult<Book[], Error> =>
  useQuery("books", async () => {
    const { data } = await axios.post("api/get_books", { user });
    return data;
  });

export { useGetBooks };
