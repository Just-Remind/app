import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const easycron = await axios.get(
    `https://www.easycron.com/rest/enable?token=${process.env.EASY_CRON_API_KEY}&id=${req.body.easycronId}`
  );

  console.log("easycron", easycron);

  if (easycron.data.status === "error")
    return res.status(500).json("Unable to update easycron job");

  const result = await prisma.cronJob.update({
    where: {
      id: req.body.id,
    },
    data: {
      enabled: req.body.enabled,
    },
  });

  res.status(200).json(result);
};

export default handler;
