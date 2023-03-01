import { useCallback, useEffect, useMemo } from "react";

import { Spinner, ReactTable } from "components/ui";
import { useGetStarterHighlights, useDeleteStarterHighlight } from "services";
import { StarterHighlight } from "types";
import { useAlert, useAlertModal } from "utils/hooks";

import { getStarterHighlightsColumns } from "./columns";

type Props = {
  handleSetFormMode: (value?: string) => void;
  handletSelectedHighlight: (value: StarterHighlight) => void;
};

const StarterHighlightsTable = (props: Props): JSX.Element => {
  // PROPS
  const { handleSetFormMode, handletSelectedHighlight } = props;

  // RQ
  const { data: starterHighlights = [], isLoading } = useGetStarterHighlights({ admin: true });
  const {
    mutate: deleteHighlight,
    isSuccess: isDeleted,
    isError: isDeletingError,
    error: deleteError,
  } = useDeleteStarterHighlight();

  // HOOKS
  const [alertModal, setAlertModal] = useAlertModal();
  const [alert, setAlert, clearAlert] = useAlert();

  useEffect(() => {
    clearAlert();
    if (isDeleted) {
      setAlert({
        message: "Starter highlight deleted.",
      });
    }
  }, [clearAlert, setAlert, isDeleted]);

  useEffect(() => {
    clearAlert();
    if (isDeletingError) {
      setAlert({
        type: "error",
        message: deleteError?.message || "Something went wrong",
      });
    }
  }, [clearAlert, setAlert, isDeletingError, deleteError]);

  // METHODS
  const handleEditHighlight = useCallback(
    (highlight: StarterHighlight): void => {
      handleSetFormMode("edit");
      handletSelectedHighlight(highlight);
    },
    [handleSetFormMode, handletSelectedHighlight],
  );

  const handleDeleteHighlight = useCallback(
    (highlight: StarterHighlight): void => {
      setAlertModal({
        title: "Are you sure?",
        message: "You are about to delete this highlight",
        button: "Delete",
        onClick: () => deleteHighlight(highlight.id),
      });
    },
    [deleteHighlight, setAlertModal],
  );

  // VARS
  const memoizedData = useMemo(() => starterHighlights, [starterHighlights]);
  const columns = useMemo(() => {
    const args = { handleEditHighlight, handleDeleteHighlight };
    return getStarterHighlightsColumns(args);
  }, [handleEditHighlight, handleDeleteHighlight]);

  if (isLoading) return <Spinner />;

  if (starterHighlights.length === 0)
    return <p className="text-sm text-gray-500 ">No starter highlights.</p>;

  return (
    <>
      {alertModal}
      {alert}
      <ReactTable data={memoizedData} columns={columns} />
    </>
  );
};

export default StarterHighlightsTable;
