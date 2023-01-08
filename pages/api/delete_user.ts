import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const cronJob = await prisma.cronJob.delete({
      where: {
        user: req.body.email,
      },
    });

    await axios.post(
      `https://www.easycron.com/rest/delete?token=${process.env.EASY_CRON_API_KEY}&id=${cronJob.jobId}`,
    );

    res.status(200).json("success");
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
