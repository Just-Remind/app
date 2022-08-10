import { useContext, useEffect, useState } from "react";

import { ITimezoneOption } from "react-timezone-select";

import { Button } from "components/ui";
import { UserContext } from "context";
import { useCreateCronJob } from "services/cronjobs";
import { useToast } from "utils/hooks";

import CronExpressionInput from "./parts/CronExpressionInput";
import TimezoneSelect from "./parts/TimezoneSelect";

const CreateCronJob = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // STATE
  const [selectedTimezone, setSelectedTimezone] = useState("America/New_York");
  const [selectedHour, setSelectedHour] = useState("8");
  const [selectedMinutes, setSelectedMinutes] = useState("00");

  // RQ
  const {
    mutate: createCronJob,
    isLoading,
    isSuccess,
    isError,
  } = useCreateCronJob();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  useEffect(() => {
    clearToast();
    if (isSuccess) {
      setToast({
        message: "Email service successfully created!",
      });
    }
  }, [isSuccess, clearToast, setToast]);

  useEffect(() => {
    clearToast();
    if (isError) {
      setToast({
        type: "error",
        message: "Something went wrong.",
      });
    }
  }, [isError, clearToast, setToast]);

  // METHODS
  const onChangeTimezone = (timezone: ITimezoneOption): void =>
    setSelectedTimezone(timezone.value);

  const handleUpdateDeliveryTime = (deliveryTime: string): void => {
    const [hours, minutes] = deliveryTime.split(":");
    setSelectedHour(hours);
    setSelectedMinutes(minutes);
  };

  const handleCreateCronJob = (): void => {
    createCronJob({
      email: user.email,
      hour: selectedHour,
      minutes: selectedMinutes,
      timezone: selectedTimezone,
    });
  };

  return (
    <>
      {toast}

      <CronExpressionInput
        cronExpression={`${selectedMinutes} ${selectedHour} * * * *`}
        onChange={(e: React.FocusEvent<HTMLInputElement, Element>): void =>
          handleUpdateDeliveryTime(e.target.value)
        }
      />
      <TimezoneSelect value={selectedTimezone} onChange={onChangeTimezone} />
      <div className="pt-5">
        <Button onClick={handleCreateCronJob} loading={isLoading}>
          Create
        </Button>
      </div>
    </>
  );
};

export default CreateCronJob;
