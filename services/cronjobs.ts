import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

import { CronJob } from "types";

type EditCronJobPayload = {
  enabled?: boolean;
};

const useGetCronJob = (id: number): UseQueryResult<CronJob, Error> =>
  useQuery("cronJob", async () => {
    const { data } = await axios.post("/api/get_cron_job", { id });
    return data;
  });

const useEditCronJob = (
  payload: EditCronJobPayload
): UseQueryResult<CronJob, Error> =>
  useQuery("cronJob", async () => {
    const { data } = await axios.post("/api/edit_cron_job", { payload });
    return data;
  });

export { useGetCronJob, useEditCronJob };
