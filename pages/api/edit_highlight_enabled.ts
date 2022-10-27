import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.body.user) {
    const highlight = await prisma.highlight.findFirst({
      where: {
        id: req.body.id,
        book: {
          user: req.body.user,
        },
      },
    });
    if (!highlight) return res.status(500).json("We could not match highlight with user.");
  }

  const result = await prisma.highlight.update({
    where: {
      id: Number(req.body.id),
    },
    data: {
      enabled: req.body.enabled,
    },
  });

  res.status(200).json(result);
};

export default handler;
