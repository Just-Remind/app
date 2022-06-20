import { useEffect } from "react";

import { Switch } from "@headlessui/react";
import axios from "axios";
import { ITimezoneOption } from "react-timezone-select";

import {
  useEditCronJobDeliveryTime,
  useEditCronJobTimezone,
} from "services/cronjobs";
import { CronJob } from "types";
import { classNames } from "utils";
import { useToast } from "utils/hooks";

import CronExpressionInput from "./CronExpressionInput";
import TimezoneSelect from "./TimezoneSelect";

type Props = {
  cronJob: CronJob;
};

const Settings = ({ cronJob }: Props): JSX.Element => {
  // RQ
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

  return (
    <>
      {toast}

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
              // eslint-disable-next-line max-len
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
      <CronExpressionInput
        cronExpression={cronJob.cronExpression}
        onChange={(e: React.FocusEvent<HTMLInputElement, Element>): void =>
          handleUpdateDeliveryTime(e.target.value)
        }
      />
      <TimezoneSelect
        value={cronJob.timezone}
        onChange={handleUpdateTimezone}
      />
    </>
  );
};

export default Settings;
