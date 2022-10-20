import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const result = await prisma.highlight.findUnique({
    where: {
      id: Number(req.query.id),
    },
  });

  if (!result) res.status(200).json(undefined);
  else res.status(200).json(result);
};

export default handler;
