import axios from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

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

export { useDeleteHighlight };
