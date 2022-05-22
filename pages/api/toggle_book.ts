import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const result = await prisma.book.update({
      where: {
        id: Number(req.body.id),
      },
      data: {
        enabled: req.body.enabled,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
