import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const body = JSON.parse(req.body);

  const book = await prisma.book.findFirst({
    where: {
      user: {
        email: body.user.email,
      },
      title: body.title,
    },
  });

  if (book) {
    const formatedNotes = body.notes.map((note: string) => ({
      bookId: book.id,
      content: note,
    }));
    const result = await prisma.note.createMany({
      data: formatedNotes,
    });

    res.status(200).json(result);
  } else {
    const formatedNotes = body.notes.map((note: string) => ({
      content: note,
    }));

    const result = await prisma.book.create({
      data: {
        user: {
          connect: {
            email: body.user.email,
          },
        },
        title: body.title,
        author: body.author,
        notes: {
          create: formatedNotes,
        },
      },
    });

    res.status(200).json(result);
  }
};

export default handler;
