import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";

import { Highlight } from "types";

type EditHighlightPayload = {
  id: number;
  content: string;
};

type EditHighlightEnabledPayload = {
  id: number;
  enabled: boolean;
  user?: string;
};

const useGetHighlight = (id: number): UseQueryResult<Highlight, Error> =>
  useQuery(["highlight", id], async () => {
    const { data } = await axios.get(`/api/get_highlight?id=${id}`);
    return data;
  });

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

const editHighlight = (payload: EditHighlightPayload): Promise<void> =>
  axios.post("/api/edit_highlight", payload);

// eslint-disable-next-line prettier/prettier
const useEditHighlight = (): UseMutationResult<void, unknown, EditHighlightPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: EditHighlightPayload) => editHighlight(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("book");
    },
  });
};

const editHighlightEnabled = (payload: EditHighlightEnabledPayload): Promise<void> =>
  axios.post("/api/edit_highlight_enabled", payload);

// eslint-disable-next-line prettier/prettier
const useEditHighlightEnabled = (): UseMutationResult<void, unknown, EditHighlightEnabledPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: EditHighlightEnabledPayload) => editHighlightEnabled(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("book");
      queryClient.invalidateQueries("highlight");
    },
  });
};

export { useGetHighlight, useDeleteHighlight, useEditHighlight, useEditHighlightEnabled };
