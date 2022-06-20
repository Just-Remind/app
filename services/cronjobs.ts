import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";

import { CronJob } from "types";

type CreateCronJobPayload = {
  email: string;
  hour: string;
  minutes: string;
  timezone: string;
};

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

// ========= CREATE CRON JOB =========
const createCronJob = (payload: CreateCronJobPayload): Promise<void> =>
  axios.post("/api/create_cron_job", payload);

// eslint-disable-next-line prettier/prettier
const useCreateCronJob = (): UseMutationResult<void, unknown, CreateCronJobPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: CreateCronJobPayload) => createCronJob(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cronJob");
      },
    }
  );
};

// ========= GET CRON JOB =========
const useGetCronJob = (user: string): UseQueryResult<CronJob, Error> =>
  useQuery("cronJob", async () => {
    const { data } = await axios.post("/api/get_cron_job", { user });
    return data;
  });

// ========= EDIT CRON JOB =========
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

// ========= EDIT CRON JOB TIMEZONE =========
const editCronJobTimezone = (payload: EditTimezonetPayload): Promise<void> =>
  axios.post("/api/edit_cron_timezone", payload);

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

// ========= EDIT CRON JOB DELIVERY TIME =========
const editCronJobDeliveryTime = (
  payload: EditDeliveryTimetPayload
): Promise<void> => axios.post("/api/edit_cron_delivery_time", payload);

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
  useCreateCronJob,
  useGetCronJob,
  useEditCronJob,
  useEditCronJobTimezone,
  useEditCronJobDeliveryTime,
};
