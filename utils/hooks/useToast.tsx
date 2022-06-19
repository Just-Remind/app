import { useCallback, useState } from "react";

import { Toast } from "components/ui";

export type ToastConfig = {
  type?: "success" | "error";
  message: string;
};

type UseToastReturn = [
  toast: JSX.Element | null,
  setToast: (config: ToastConfig) => void,
  clearToast: () => void
];

const useToast = (): UseToastReturn => {
  // STATE
  const [show, setShow] = useState(false);
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);

  const setToast = useCallback((config: ToastConfig): void => {
    setToastConfig(config);
    setShow(true);
  }, []);

  const clearToast = useCallback((): void => {
    setShow(false);
    setToastConfig(null);
  }, []);

  const toast = toastConfig && (
    <Toast {...toastConfig} show={show} setShow={setShow} />
  );

  return [toast, setToast, clearToast];
};

export default useToast;
