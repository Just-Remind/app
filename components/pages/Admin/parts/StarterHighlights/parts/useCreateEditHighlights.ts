import { UseMutateFunction } from "react-query";

import { useCreateStarterHighlight, useEditStarterHighlight } from "services";
import { CreateStarterHighlightPayload, EditStarterHighlightPayload } from "types";

type UseCreateEditHighlightsReturn = [
  createHighlight: UseMutateFunction<unknown, unknown, CreateStarterHighlightPayload, unknown>,
  editHighlight: UseMutateFunction<unknown, unknown, EditStarterHighlightPayload, unknown>,
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
];

const useCreateEditHighlights = (): UseCreateEditHighlightsReturn => {
  // RQ
  const {
    mutate: createHighlight,
    isLoading: isCreating,
    isSuccess: isSuccessCreating,
    isError: isErrorCreating,
  } = useCreateStarterHighlight();
  const {
    mutate: editHighlight,
    isLoading: isEditing,
    isSuccess: isSuccessEditing,
    isError: isErrorEditing,
  } = useEditStarterHighlight();

  // VARS
  const isLoading = isCreating || isEditing;
  const isSuccess = isSuccessCreating || isSuccessEditing;
  const isError = isErrorCreating || isErrorEditing;

  return [createHighlight, editHighlight, isLoading, isSuccess, isError];
};

export default useCreateEditHighlights;
