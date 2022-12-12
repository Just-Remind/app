import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const { cronId, enabled } = req.body;

    const cronJob = await prisma.cronJob.update({
      where: {
        id: cronId,
      },
      data: {
        bonusHighlightEnabled: enabled,
      },
    });

    if (!cronJob) {
      return res.status(500).json("Error");
    }

    return res.status(200).json("Success");
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default handler;
