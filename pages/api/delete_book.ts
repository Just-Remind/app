import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const deleteHighlights = prisma.highlight.deleteMany({
    where: {
      bookId: Number(req.body.id),
    },
  });

  const deleteBook = prisma.book.delete({
    where: {
      id: Number(req.body.id),
    },
  });

  const transaction = await prisma.$transaction([deleteHighlights, deleteBook]);

  res.status(200).json(transaction);
};

export default handler;
