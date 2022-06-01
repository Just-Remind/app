import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { cronId, easyCronId, minutes, hours } = req.body;

    const cronJob = await prisma.cronJob.update({
      where: {
        id: cronId,
      },
      data: {
        cronExpression: `${minutes} ${hours} * * * *`,
      },
    });

    if (!cronJob) {
      return res.status(500).json("Error");
    }

    const easyCron = await axios.post(`
      https://www.easycron.com/rest/edit?token=${process.env.EASY_CRON_API_KEY}&id=${easyCronId}&cron_expression=${minutes} ${hours} * * * *
    `);

    if (easyCron.data.status === "error") {
      return res.status(500).json("Error");
    }
    return res.status(200).json("Success");
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default handler;
