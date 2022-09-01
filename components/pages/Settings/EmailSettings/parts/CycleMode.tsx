import { useEffect } from "react";

import { Switch } from "components/ui";
import { useEditCycleMode } from "services/cronjobs";
import { ToastConfig } from "utils/hooks";

type Props = {
  cronId: number;
  cycleMode: boolean;
  setToast: (config: ToastConfig) => void;
  clearToast: () => void;
};

const CycleMode = (props: Props): JSX.Element => {
  // PROPS
  const { cronId, cycleMode, setToast, clearToast } = props;

  // HOOKS
  const { mutate, isSuccess, isError } = useEditCycleMode();

  useEffect(() => {
    clearToast();

    if (isSuccess) {
      setToast({
        message: "Cycle mode updated!",
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
  const handleToggleCycleMode = (checked: boolean): void => {
    mutate({
      cronId,
      cycleMode: checked,
    });
  };

  return (
    <Switch
      label="Cycle Mode"
      description="Every highlight will be sent once per cycle"
      checked={cycleMode}
      onChange={handleToggleCycleMode}
    />
  );
};

export default CycleMode;
