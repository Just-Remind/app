// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

type ExtendedNextApiRequest = {
  query: {
    email: string;
    password: string;
  };
} & NextApiRequest;

const handler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const result = await prisma.book.findMany({
    where: {
      user: {
        email: req.body.user.email,
      },
    },
    select: {
      id: true,
      title: true,
      author: true,
    },
  });

  res.status(200).json(result);
};

export default handler;
