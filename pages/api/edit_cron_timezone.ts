import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { cronId, easyCronId, timezone } = req.body;

    const cronJob = await prisma.cronJob.update({
      where: {
        id: cronId,
      },
      data: {
        timezone: timezone,
      },
    });

    if (!cronJob) {
      return res.status(500).json("Error");
    }

    const easyCron = await axios.post(`
      https://www.easycron.com/rest/edit?token=${process.env.EASY_CRON_API_KEY}&id=${easyCronId}&timezone=${timezone}
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
