import { useContext, useEffect } from "react";

import axios from "axios";

import { Spinner, Toggle } from "components/ui";
import { UserContext } from "context";
import { useGetCronJob } from "services/cronjobs";
import { useToast } from "utils/hooks";

const Service = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // RQ
  const { data: cronJob, isLoading, isError } = useGetCronJob(user.email);

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  useEffect(() => {
    clearToast();
    if (isError) {
      setToast({
        type: "error",
        message: "Something went wrong. Please try later.",
      });
    }
  }, [isError, setToast, clearToast]);

  // METHODS
  const handleToggleService = (enabled: boolean): void => {
    clearToast();

    axios
      .post("/api/toggle_cron_job", {
        id: cronJob?.id,
        enabled,
        easycronId: cronJob?.jobId,
      })
      .then(() => {
        const message = enabled ? "Service activated!" : "Service deactivated.";
        setToast({ message });
      })
      .catch(() =>
        setToast({
          type: "error",
          message: "Something went wrong. Please try later.",
        })
      );
  };

  if (isLoading) return <Spinner size="lg" />;

  return (
    <div>
      {toast}
      <div>
        {cronJob && (
          <Toggle
            label="Activate service"
            defaultValue={cronJob.enabled}
            onChange={handleToggleService}
          />
        )}
      </div>
    </div>
  );
};

export default Service;
