import { useContext, useEffect } from "react";

import axios from "axios";
import { ITimezoneOption } from "react-timezone-select";

import { Switch } from "components/ui";
import { UserContext } from "context";
import { useBookCount } from "services/books";
import {
  useEditCronJobDeliveryTime,
  useEditCronJobTimezone,
  useEditUniqueBooksOnly,
} from "services/cronjobs";
import { CronJob } from "types";
import { useToast } from "utils/hooks";

import CronExpressionInput from "./CronExpressionInput";
import HighlightsPerEmailSelect from "./HighlightsPerEmailSelect";
import TimezoneSelect from "./TimezoneSelect";

type Props = {
  cronJob: CronJob;
};

const Settings = ({ cronJob }: Props): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // RQ
  const { data: bookCount = 0 } = useBookCount(user.email);

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
  const {
    mutate: editUniqueBooksOnly,
    isSuccess: isSuccessUniqueBooksOnly,
    isError: isErrorUniqueBooksOnly,
  } = useEditUniqueBooksOnly();

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

  useEffect(() => {
    clearToast();

    if (isSuccessUniqueBooksOnly) {
      setToast({
        message: "Settings updated!",
      });
    }

    if (isErrorUniqueBooksOnly) {
      setToast({
        type: "error",
        message: "Please try again or contact support",
      });
    }
  }, [isSuccessUniqueBooksOnly, isErrorUniqueBooksOnly, setToast, clearToast]);

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

  const handleToggleUniqueBooksOnly = (checked: boolean): void => {
    editUniqueBooksOnly({
      id: cronJob.id,
      uniqueBooksOnly: checked,
    });
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

      <Switch
        label="Service enabled"
        checked={cronJob.enabled}
        onChange={handleToggleService}
      />
      <Switch
        label="Unique books only"
        description="You will receive highlights from 5 different books"
        checked={cronJob.uniqueBooksOnly}
        onChange={handleToggleUniqueBooksOnly}
        disabled={bookCount < 5}
      />
      <HighlightsPerEmailSelect
        cronId={cronJob.id}
        highlightsPerEmail={cronJob.highlightsPerEmail}
        setToast={setToast}
        clearToast={clearToast}
      />
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
