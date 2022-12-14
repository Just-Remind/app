import { useCallback, useState } from "react";

import { AlertModal } from "components/ui";

export type AlertConfig = {
  title: string;
  message: string;
  button: string;
  onClick: () => void;
};

type UseAlertModalReturn = [
  alert: JSX.Element | null,
  setAlert: (config: AlertConfig) => void,
  clearAlert: () => void,
];

const useAlertModal = (): UseAlertModalReturn => {
  const [open, setOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);

  const setAlertModal = useCallback((config: AlertConfig): void => {
    setOpen(true);
    setAlertConfig(config);
  }, []);

  const clearAlertModal = useCallback((): void => {
    setOpen(false);
    setAlertConfig(null);
  }, []);

  const alertModal = alertConfig && <AlertModal {...alertConfig} open={open} setOpen={setOpen} />;

  return [alertModal, setAlertModal, clearAlertModal];
};

export default useAlertModal;
