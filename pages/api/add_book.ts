// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const book = await prisma.book.findFirst({
    where: {
      user: {
        email: req.body.user.email,
      },
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
        user: {
          connect: {
            email: req.body.user.email,
          },
        },
        title: req.body.title,
        author: req.body.author,
        notes: {
          create: formatedNotes,
        },
      },
    });

    res.status(200).json(result);
  }
};

export default handler;
