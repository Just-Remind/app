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

type EditUniqueBooksOnly = {
  id: number;
  uniqueBooksOnly: boolean;
};

type EditHighlightsPerEmail = {
  cronId: number;
  highlightsPerEmail: number;
};

type EditHighlightsQualityFilter = {
  cronId: number;
  highlightsQualityFilter: boolean;
};

type EditCycleMode = {
  cronId: number;
  cycleMode: boolean;
};

type EditBonusHighlightEnabled = {
  cronId: number;
  enabled: boolean;
};

type EditBonusHighlightNumber = {
  cronId: number;
  number: number;
};

// ========= CREATE CRON JOB =========
const createCronJob = (payload: CreateCronJobPayload): Promise<void> =>
  axios.post("/api/create_cron_job", payload);

// eslint-disable-next-line prettier/prettier
const useCreateCronJob = (): UseMutationResult<void, unknown, CreateCronJobPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: CreateCronJobPayload) => createCronJob(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("cronJob");
    },
  });
};

// ========= GET CRON JOB =========
const useGetCronJob = (user: string): UseQueryResult<CronJob, Error> =>
  useQuery("cronJob", async () => {
    const { data } = await axios.post("/api/get_cron_job", { user });
    return data;
  });

// ========= EDIT CRON JOB =========
const useEditCronJob = (payload: EditCronJobPayload): UseQueryResult<CronJob, Error> =>
  useQuery(
    "cronJob",
    async () => {
      const { data } = await axios.post("/api/edit_cron_job", { payload });
      return data;
    },
    { retry: 1 },
  );

// ========= EDIT CRON JOB TIMEZONE =========
const editCronJobTimezone = (payload: EditTimezonetPayload): Promise<void> =>
  axios.post("/api/edit_cron_timezone", payload);

// eslint-disable-next-line prettier/prettier
const useEditCronJobTimezone = (): UseMutationResult<void, unknown, EditTimezonetPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: EditTimezonetPayload) => editCronJobTimezone(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("cronJob");
    },
  });
};

// ========= EDIT CRON JOB DELIVERY TIME =========
const editCronJobDeliveryTime = (payload: EditDeliveryTimetPayload): Promise<void> =>
  axios.post("/api/edit_cron_delivery_time", payload);

// eslint-disable-next-line prettier/prettier
const useEditCronJobDeliveryTime = (): UseMutationResult<void, unknown, EditDeliveryTimetPayload, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: EditDeliveryTimetPayload) => editCronJobDeliveryTime(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("cronJob");
    },
  });
};

// ========= EDIT CRON JOB UNIQUE BOOKS ONLY =========
const editUniqueBooksOnly = (payload: EditUniqueBooksOnly): Promise<void> =>
  axios.post("/api/edit_cron_unique_books_only", payload);

// eslint-disable-next-line prettier/prettier
const useEditUniqueBooksOnly = (): UseMutationResult<void, unknown, EditUniqueBooksOnly, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: EditUniqueBooksOnly) => editUniqueBooksOnly(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("cronJob");
    },
  });
};

// ========= EDIT CRON JOB HIGHLIGHTS PER EMAIL =========
const editHighlightsPerEmail = (payload: EditHighlightsPerEmail): Promise<void> =>
  axios.post("/api/edit_highlights_per_email", payload);

// eslint-disable-next-line prettier/prettier
const useEditHighlightsPerEmail = (): UseMutationResult<void, unknown, EditHighlightsPerEmail, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: EditHighlightsPerEmail) => editHighlightsPerEmail(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("cronJob");
    },
  });
};

// ========= EDIT CRON JOB HIGHLIGHTS QUALITY FILTER =========
const editHighlightsQualityFilter = (payload: EditHighlightsQualityFilter): Promise<void> =>
  axios.post("/api/edit_cron_highlights_quality_filter", payload);

// eslint-disable-next-line prettier/prettier
const useEditHighlightsQualityFilter = (): UseMutationResult<void, unknown, EditHighlightsQualityFilter, unknown> => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: EditHighlightsQualityFilter) => editHighlightsQualityFilter(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cronJob");
      },
    },
  );
};

// ========= EDIT CRON JOB CYCLE MODE =========
const editCycleMode = (payload: EditCycleMode): Promise<void> =>
  axios.post("/api/edit_cron_cycle_mode", payload);

// eslint-disable-next-line prettier/prettier
const useEditCycleMode = (): UseMutationResult<void, unknown, EditCycleMode, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: EditCycleMode) => editCycleMode(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("cronJob");
    },
  });
};

// ========= EDIT BONUS HIGHLIGHT ENABLED =========
const editBonusHighlightEnabled = (payload: EditBonusHighlightEnabled): Promise<void> =>
  axios.post("/api/edit_cron_bonus_highlight_enabled", payload);

// eslint-disable-next-line prettier/prettier
const useEditBonusHighlightEnabled = (): UseMutationResult<void, unknown, EditBonusHighlightEnabled, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: EditBonusHighlightEnabled) => editBonusHighlightEnabled(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("cronJob");
    },
  });
};

// ========= EDIT BONUS HIGHLIGHT NUMBER =========
const editBonusHighlightNumber = (payload: EditBonusHighlightNumber): Promise<void> => {
  console.log("payload", payload);
  return axios.post("/api/edit_cron_bonus_highlight_number", payload);
};

// eslint-disable-next-line prettier/prettier
const useEditBonusHighlightNumber = (): UseMutationResult<void, unknown, EditBonusHighlightNumber, unknown> => {
  const queryClient = useQueryClient();
  return useMutation((payload: EditBonusHighlightNumber) => editBonusHighlightNumber(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("cronJob");
    },
  });
};

export {
  useCreateCronJob,
  useGetCronJob,
  useEditCronJob,
  useEditCronJobTimezone,
  useEditCronJobDeliveryTime,
  useEditUniqueBooksOnly,
  useEditHighlightsPerEmail,
  useEditHighlightsQualityFilter,
  useEditCycleMode,
  useEditBonusHighlightEnabled,
  useEditBonusHighlightNumber,
};
