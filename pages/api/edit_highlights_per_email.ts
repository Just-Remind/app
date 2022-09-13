import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const result = await prisma.cronJob.update({
    where: {
      id: Number(req.body.cronId),
    },
    data: {
      highlightsPerEmail: req.body.highlightsPerEmail,
    },
  });

  res.status(200).json(result);
};

export default handler;
