import { useEffect } from "react";

import { Switch } from "components/ui";
import { useEditHighlightsQualityFilter } from "services/cronjobs";
import { ToastConfig } from "utils/hooks";

type Props = {
  cronId: number;
  highlightsQualityFilter: boolean;
  setToast: (config: ToastConfig) => void;
  clearToast: () => void;
};

const HighlightsQualityFilter = (props: Props): JSX.Element => {
  // PROPS
  const { cronId, highlightsQualityFilter, setToast, clearToast } = props;

  // HOOKS
  const { mutate, isSuccess, isError } = useEditHighlightsQualityFilter();

  useEffect(() => {
    clearToast();

    if (isSuccess) {
      setToast({
        message: "Highlights quality filter updated!",
      });
    }

    if (isError) {
      setToast({
        type: "error",
        message: "Please try again or contact support",
      });
    }
  }, [isSuccess, isError, setToast, clearToast]);

  // METHODS
  const handleToggleHighlightsQualityFilter = (checked: boolean): void => {
    mutate({
      cronId,
      highlightsQualityFilter: checked,
    });
  };

  return (
    <Switch
      label="Highlights quality filter"
      description="Remove very small highlights from your daily email"
      checked={highlightsQualityFilter}
      onChange={handleToggleHighlightsQualityFilter}
    />
  );
};

export default HighlightsQualityFilter;
