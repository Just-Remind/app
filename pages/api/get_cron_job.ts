import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const result = await prisma.cronJob.findUnique({
    where: {
      user: req.body.user,
    },
  });

  res.status(200).json(result);
};

export default handler;
