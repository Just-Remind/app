/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    email: string;
    password: string;
  };
}

export default async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const result = await prisma.user.findFirst({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  });

  res.status(200).json(result);
};
