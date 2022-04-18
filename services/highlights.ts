import axios from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

type EditHighlightPayload = {
  id: number;
  content: string;
};

const deleteHighlight = (highlightId: number): Promise<void> =>
  axios.post("/api/delete_highlight", { id: highlightId });

// eslint-disable-next-line prettier/prettier
const useDeleteHighlight = (): UseMutationResult<void, unknown, number, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((highlightId: number) => deleteHighlight(highlightId), {
    onSuccess: () => {
      queryClient.invalidateQueries("book");
    },
  });
};

const editBook = (payload: EditHighlightPayload): Promise<void> =>
  axios.post("/api/edit_highlight", payload);

// eslint-disable-next-line prettier/prettier
const useEditHighlight = (): UseMutationResult<void, unknown, EditHighlightPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: EditHighlightPayload) => editBook(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("book");
    },
  });
};

export { useDeleteHighlight, useEditHighlight };
