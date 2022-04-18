// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const result = await prisma.book.findMany({
    orderBy: [{ createdAt: "asc" }],
    where: {
      user: {
        email: req.body.user.email,
      },
    },
    select: {
      id: true,
      title: true,
      author: true,
      notes: {
        select: {
          content: true,
        },
      },
    },
  });

  res.status(200).json(result);
};

export default handler;
