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
  const result = await prisma.user.create({
    data: {
      email: req.body.email,
      password: req.body.password,
    },
  });

  res.status(200).json(result);
};

export default handler;
