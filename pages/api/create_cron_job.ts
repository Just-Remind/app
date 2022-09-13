import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  axios
    .post(
      `https://www.easycron.com/rest/add?token=${process.env.EASY_CRON_API_KEY}
       &url=https://justremind.app/api/reminder?email=${req.body.email}
       &cron_expression=0 8 * * * *
       &timezone_from=2
       &timezone=${req.body.timezone}
     `,
    )
    .then((response) =>
      prisma.cronJob.create({
        data: {
          jobId: Number(response.data.cron_job_id),
          cronExpression: "0 8 * * * *",
          enabled: true,
          timezone: req.body.timezone,
          user: req.body.email,
        },
      }),
    )
    .then(() => res.status(200).json("success"))
    .catch((error) => res.status(200).json(error));
};

export default handler;
