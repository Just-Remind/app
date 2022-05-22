// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const result = await prisma.book.findFirst({
    where: {
      id: Number(req.body.bookId),
      user: req.body.user.email,
    },
    select: {
      id: true,
      title: true,
      author: true,
      enabled: true,
      highlights: {
        orderBy: [{ createdAt: "asc" }],
        select: {
          id: true,
          content: true,
        },
      },
    },
  });

  res.status(200).json(result);
};

export default handler;
