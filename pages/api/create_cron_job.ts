// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

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

  res.status(200).json(cronJob);
};

export default handler;
