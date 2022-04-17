import { useState } from "react";

import { Alert } from "components/ui";

type AlertConfig = {
  type?: "success" | "error";
  message: string;
};

type UseAlertReturn = [
  alert: JSX.Element | null,
  setAlert: (config: AlertConfig) => void,
  clearAlert: () => void
];

const useAlert = (): UseAlertReturn => {
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);

  const setAlert = (config: AlertConfig): void => setAlertConfig(config);
  const clearAlert = (): void => setAlertConfig(null);

  const alert = alertConfig && <Alert {...alertConfig} close={clearAlert} />;

  return [alert, setAlert, clearAlert];
};

export default useAlert;
