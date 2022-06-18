/* eslint-disable max-len */
import { useEffect } from "react";

import { Switch } from "@headlessui/react";
import axios from "axios";
import TimezoneSelect, { ITimezoneOption } from "react-timezone-select";

import { Spinner } from "components/ui";
import {
  useEditCronJobDeliveryTime,
  useEditCronJobTimezone,
  useGetCronJob,
} from "services/cronjobs";
import { classNames } from "utils";
import { useToast } from "utils/hooks";

type Props = {
  userEmail: string;
};

const EmailService = ({ userEmail }: Props): JSX.Element => {
  // RQ
  const { data: cronJob, isLoading } = useGetCronJob(userEmail);
  const {
    mutate: editTimezone,
    isSuccess: isSuccessTimezone,
    isError: isErrorTimezone,
  } = useEditCronJobTimezone();
  const {
    mutate: editDeliveryTime,
    isSuccess: isSuccessDeliveryTime,
    isError: isErrorDeliveryTime,
  } = useEditCronJobDeliveryTime();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  useEffect(() => {
    clearToast();

    if (isSuccessTimezone) {
      setToast({
        message: "Timezone updated!",
      });
    }

    if (isErrorTimezone) {
      setToast({
        type: "error",
        message: "Please try again or contact support",
      });
    }
  }, [isSuccessTimezone, isErrorTimezone, setToast, clearToast]);

  useEffect(() => {
    clearToast();

    if (isSuccessDeliveryTime) {
      setToast({
        message: "Delivery time updated!",
      });
    }

    if (isErrorDeliveryTime) {
      setToast({
        type: "error",
        message: "Please try again or contact support",
      });
    }
  }, [isSuccessDeliveryTime, isErrorDeliveryTime, setToast, clearToast]);

  if (isLoading) return <Spinner />;
  if (!cronJob)
    return (
      <span className="text-sm text-gray-700">
        Something went wrong while retrieving your service information. Please
        try later or{" "}
        <a
          className="text-blue-700"
          href="mailto:hello@justremind.app?subject='Something went wrong'"
        >
          contact support
        </a>
        .
      </span>
    );

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

  const handleUpdateTimezone = (timezone: ITimezoneOption): void => {
    editTimezone({
      cronId: cronJob.id,
      easyCronId: cronJob.jobId,
      timezone: timezone.value,
    });
  };

  const handleUpdateDeliveryTime = (deliveryTime: string): void => {
    const [hours, minutes] = deliveryTime.split(":");

    editDeliveryTime({
      cronId: cronJob.id,
      easyCronId: cronJob.jobId,
      minutes,
      hours,
    });
  };

  // VARS
  const [deliveryMinute, deliveryHour] = cronJob.cronExpression.split(" ");

  return (
    <>
      {toast}
      <div className="mt-10 divide-y divide-gray-200">
        <div className="mb-4 space-y-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Email Service
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            Manage the delivery of your daily reminder email.
          </p>
        </div>
        <Switch.Group
          as="div"
          className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
        >
          <Switch.Label
            as="dt"
            className="text-sm font-medium text-gray-500"
            passive
          >
            Service enabled
          </Switch.Label>
          <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <Switch
              checked={cronJob.enabled}
              onChange={handleToggleService}
              className={classNames(
                cronJob.enabled ? "bg-purple-600" : "bg-gray-200",
                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  cronJob.enabled ? "translate-x-5" : "translate-x-0",
                  "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                )}
              />
            </Switch>
          </dd>
        </Switch.Group>

        <div className="items-center py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
          <dt className="text-sm font-medium text-gray-500">Delivery time</dt>
          <div className="flex justify-end mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <input
              type="time"
              // onBlur={(e): void => console.log("blur", e.target.value)}
              onBlur={(e): void => handleUpdateDeliveryTime(e.target.value)}
              defaultValue={`${deliveryHour.padStart(
                2,
                "0"
              )}:${deliveryMinute.padStart(2, "0")}`}
            />
          </div>
        </div>

        <div className="items-center py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
          <dt className="text-sm font-medium text-gray-500">Timezone</dt>
          <div className="flex justify-end mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <TimezoneSelect
              value={cronJob.timezone}
              onChange={handleUpdateTimezone}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailService;
