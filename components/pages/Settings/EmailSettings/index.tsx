import { useEffect } from "react";

import { Spinner } from "components/ui";
import { useGetCronJob } from "services/cronjobs";
import { useToast } from "utils/hooks";

import CreateCronJob from "./CreateCronJob";
import Settings from "./Settings";

type Props = {
  userEmail: string;
};

const EmailSettings = ({ userEmail }: Props): JSX.Element => {
  // RQ
  const { data: cronJob, isLoading } = useGetCronJob(userEmail);

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  useEffect(() => {
    clearToast();

    if (!isLoading && !cronJob) {
      setToast({
        type: "warning",
        message: (
          <span>
            Choose a <span className="font-bold">delivery time</span> and a{" "}
            <span className="font-bold">timezone</span> and click on{" "}
            <span className="font-bold">Create</span> to receive your daily email.
          </span>
        ),
      });
    }
  }, [isLoading, cronJob, setToast, clearToast]);

  return (
    <>
      {toast}

      <div className={`${isLoading ? "" : "divide-y divide-gray-200"} `}>
        <div className="mb-4 space-y-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Email Settings</h3>
          <p className="max-w-2xl text-sm text-gray-500">
            Manage the delivery of your daily reminder email.
          </p>
        </div>
        {isLoading ? <Spinner /> : cronJob ? <Settings cronJob={cronJob} /> : <CreateCronJob />}
      </div>
    </>
  );
};

export default EmailSettings;
