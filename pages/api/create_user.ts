// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const cronJob = await axios
    .post(
      `https://www.easycron.com/rest/add?token=${process.env.EASY_CRON_API_KEY}
       &url=https://remind-next.vercel.app/api/reminder?email=${req.body.email}
       &cron_expression=0 8 * * * *
       &timezone_from=2
       &timezone=${req.body.timezone}
     `
    )
    .then((response) => response.data)
    .catch((error) => console.log("error", error));

  const result = await prisma.user.create({
    data: {
      email: req.body.email,
      cronJob: {
        create: {
          jobId: Number(cronJob.cron_job_id),
          timezone: req.body.timezone,
        },
      },
    },
  });

  res.status(200).json(result);
};

export default handler;
