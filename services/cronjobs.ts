import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";

import { CronJob } from "types";

type EditCronJobPayload = {
  enabled?: boolean;
};

type EditTimezonetPayload = {
  cronId: number;
  easyCronId: number;
  timezone: string;
};

type EditDeliveryTimetPayload = {
  cronId: number;
  easyCronId: number;
  minutes: string;
  hours: string;
};

const editCronJobTimezone = (payload: EditTimezonetPayload): Promise<void> =>
  axios.post("/api/edit_cron_timezone", payload);

const editCronJobDeliveryTime = (
  payload: EditDeliveryTimetPayload
): Promise<void> => axios.post("/api/edit_cron_delivery_time", payload);

const useGetCronJob = (user: string): UseQueryResult<CronJob, Error> =>
  useQuery("cronJob", async () => {
    const { data } = await axios.post("/api/get_cron_job", { user });
    return data;
  });

const useEditCronJob = (
  payload: EditCronJobPayload
): UseQueryResult<CronJob, Error> =>
  useQuery(
    "cronJob",
    async () => {
      const { data } = await axios.post("/api/edit_cron_job", { payload });
      return data;
    },
    { retry: 1 }
  );

// eslint-disable-next-line prettier/prettier
const useEditCronJobTimezone = (): UseMutationResult<void, unknown, EditTimezonetPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: EditTimezonetPayload) => editCronJobTimezone(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cronJob");
      },
    }
  );
};

// eslint-disable-next-line prettier/prettier
const useEditCronJobDeliveryTime = (): UseMutationResult<void, unknown, EditDeliveryTimetPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: EditDeliveryTimetPayload) => editCronJobDeliveryTime(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cronJob");
      },
    }
  );
};

export {
  useGetCronJob,
  useEditCronJob,
  useEditCronJobTimezone,
  useEditCronJobDeliveryTime,
};
