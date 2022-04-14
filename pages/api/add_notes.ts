// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

// type ExtendedNextApiRequest = {
//   query: {
//     userId: string;
//     title: string;
//     notes: string[];
//   };
// } & NextApiRequest;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const book = await prisma.book.findFirst({
    where: {
      userId: Number(req.body.userId),
      title: req.body.title,
    },
  });

  if (book) {
    const formatedNotes = req.body.notes.map((note: string) => ({
      bookId: book.id,
      content: note,
    }));
    const result = await prisma.note.createMany({
      data: formatedNotes,
    });

    res.status(200).json(result);
  } else {
    const formatedNotes = req.body.notes.map((note: string) => ({
      content: note,
    }));

    const result = await prisma.book.create({
      data: {
        userId: Number(req.body.userId),
        title: req.body.title,
        notes: {
          create: formatedNotes,
        },
      },
    });

    res.status(200).json(result);
  }
};

export default handler;
