import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";

import {
  StarterHighlight,
  CreateStarterHighlightPayload as CreatePayload,
  EditStarterHighlightPayload as EditPayload,
} from "types";
import { QUERYKEYS } from "utils/constants";

const { STARTERHIGHLIGHT } = QUERYKEYS;

type GetStarterHighlightsParams = {
  admin?: boolean;
  lastStarterHighlightSent?: number;
};

// ------ GET STARTER HIGHLIGHTS ------
const fetchStarterHighlights = async (
  params: GetStarterHighlightsParams,
): Promise<StarterHighlight[]> => {
  const { admin = false, lastStarterHighlightSent } = params;
  const { data } = await axios.get(
    `/api/starter_highlights?admin=${admin}&lastStarterHighlightSent=${lastStarterHighlightSent}`,
  );
  return data;
};

const useGetStarterHighlights = (
  params: GetStarterHighlightsParams = { admin: false },
): UseQueryResult<StarterHighlight[], Error> =>
  useQuery([STARTERHIGHLIGHT], () => fetchStarterHighlights(params));

// ------ POST STARTER HIGHLIGHT ------
const postStarterHighlight = async (payload: CreatePayload): Promise<void> => {
  await axios.post("/api/starter_highlights", payload);
};

// eslint-disable-next-line prettier/prettier
const useCreateStarterHighlight = (): UseMutationResult<unknown, unknown, CreatePayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: CreatePayload) => postStarterHighlight(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(STARTERHIGHLIGHT);
    },
  });
};

// ------ PATCH STARTER HIGHLIGHT ------
const editStarterHighlight = async (payload: EditPayload): Promise<void> => {
  await axios.patch("/api/starter_highlights", payload);
};

const useEditStarterHighlight = (): UseMutationResult<unknown, unknown, EditPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: EditPayload) => editStarterHighlight(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(STARTERHIGHLIGHT);
    },
  });
};

// ------ DELETE STARTER HIGHLIGHT ------
const deleteStarterHighlight = async (id: number): Promise<void> => {
  await axios.delete(`/api/starter_highlights?id=${id}`);
};

// eslint-disable-next-line prettier/prettier
const useDeleteStarterHighlight = (): UseMutationResult<unknown, Error, number, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => deleteStarterHighlight(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(STARTERHIGHLIGHT);
    },
  });
};

export {
  useGetStarterHighlights,
  useCreateStarterHighlight,
  useEditStarterHighlight,
  useDeleteStarterHighlight,
};
