import { useContext, useEffect, useState } from "react";

import { Auth } from "aws-amplify";
import axios from "axios";
import { useRouter } from "next/router";

import { Button, Spinner, Toggle } from "components/ui";
import { UserContext } from "context";
import { useGetCronJob } from "services/cronjobs";
import { useToast } from "utils/hooks";

const Service = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // STATE
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // NEXT ROUTER
  const router = useRouter();

  // RQ
  const { data: cronJob, isLoading } = useGetCronJob(user.email);

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

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

  const handleDeleteAccount = (): void => {
    setIsDeletingUser(true);
    clearToast();

    Auth.deleteUser()
      .then(() => axios.post("/api/delete_user", { email: user.email }))
      .then(() => router.push("/landing"))
      .catch((error) => {
        console.log("error", error);
        setToast({
          type: "error",
          message:
            "Something went wrong. Please contact support at hello@justremind.app",
        });
      })
      .finally(() => setIsDeletingUser(false));
  };

  return (
    <div>
      {toast}
      <div className="mb-4">
        <p className="mb-2 text-lg font-medium text-gray-700">Email Service</p>
        {isLoading ? (
          <Spinner size="md" />
        ) : cronJob ? (
          <Toggle
            label="Activate service"
            value={cronJob.enabled}
            onChange={handleToggleService}
          />
        ) : (
          <span className="text-sm text-gray-700">
            Something went wrong while retrieving your service information.
            Please try later or{" "}
            <a
              className="text-blue-700"
              href="mailto:hello@justremind.app?subject='Something went wrong'"
            >
              contact support
            </a>
            .
          </span>
        )}
      </div>
      <div>
        <p className="mb-2 text-lg font-medium text-gray-700">Account</p>
        <Button
          color="red"
          onClick={handleDeleteAccount}
          loading={isDeletingUser}
        >
          Delete account
        </Button>
      </div>
    </div>
  );
};

export default Service;
