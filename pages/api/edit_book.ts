import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const result = await prisma.book.update({
    where: {
      id: Number(req.body.id),
    },
    data: {
      title: req.body.title,
      author: req.body.author,
    },
  });

  res.status(200).json(result);
};

export default handler;
