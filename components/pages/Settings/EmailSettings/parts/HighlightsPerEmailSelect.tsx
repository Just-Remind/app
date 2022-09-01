import { useEffect } from "react";

import { useEditHighlightsPerEmail } from "services/cronjobs";
import type { ToastConfig } from "utils/hooks";

type Props = {
  cronId: number;
  highlightsPerEmail: number;
  setToast: (config: ToastConfig) => void;
  clearToast: () => void;
};

const HighlightsPerEmailSelect = (props: Props): JSX.Element => {
  // PROPS
  const { cronId, highlightsPerEmail, setToast, clearToast } = props;

  // RQ
  const { mutate: editHighlightsPerEmail, isSuccess, isError } = useEditHighlightsPerEmail();

  // HOOKS
  useEffect(() => {
    clearToast();

    if (isSuccess) {
      setToast({
        message: "Highlights per email updated!",
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
  const onChangeHighlightsPerEmail = (value: string): void => {
    editHighlightsPerEmail({ cronId, highlightsPerEmail: Number(value) });
  };

  // VARS
  const selectOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="items-center py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:pt-5">
      <dt className="text-sm font-medium text-gray-600">Highlights per email</dt>
      <div className="flex justify-end mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
        <select
          value={highlightsPerEmail}
          onChange={(e): void => onChangeHighlightsPerEmail(e.target.value)}
        >
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HighlightsPerEmailSelect;
