/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    userId: string;
    title: string;
    notes: string[];
  };
}

export default async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const book = await prisma.book.findFirst({
    where: {
      userId: Number(req.body.userId),
      title: req.body.title,
    },
  });

  if (book) {
    const formatedNotes = req.body.notes.map((note: string) => ({ bookId: book.id, content: note }));
    const result = await prisma.note.createMany({
      data: formatedNotes,
    });

    res.status(200).json(result);
  } else {
    const formatedNotes = req.body.notes.map((note: string) => ({ content: note }));

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
