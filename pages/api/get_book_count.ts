import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const result = await prisma.book.count({
    where: {
      user: req.body.email,
    },
  });

  return res.status(200).json(result);
};

export default handler;
