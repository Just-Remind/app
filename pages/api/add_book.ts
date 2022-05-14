import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

type ImportedBookType = {
  title: string;
  author: string;
  highlights: string[];
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const body = JSON.parse(req.body);
  const importedBooks: ImportedBookType[] = body.books;

  const user = await prisma.user.findUnique({
    where: {
      email: body.user.email,
    },
    select: {
      id: true,
      books: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (!user) return res.status(500).json("user not found");

  await prisma.user.update({
    where: {
      email: body.user.email,
    },
    data: {
      books: {
        upsert: importedBooks.map((book) => ({
          where: {
            userId_title: {
              userId: user.id,
              title: book.title,
            },
          },
          update: {
            notes: {
              createMany: {
                skipDuplicates: true,
                data: book.highlights.map((highlight) => ({
                  content: highlight,
                })),
              },
            },
          },
          create: {
            title: book.title,
            author: book.author,
            notes: {
              createMany: {
                skipDuplicates: true,
                data: book.highlights.map((highlight) => ({
                  content: highlight,
                })),
              },
            },
          },
        })),
      },
    },
  });

  return res.status(200).json("SUCCESS");
};

export default handler;
