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

  const createdHighlights: string[] = [];
  const createdBooks: string[] = [];
  try {
    importedBooks.forEach(async (importedBook) => {
      const existingBook = await prisma.book.findFirst({
        where: {
          userId: user.id,
          title: importedBook.title,
        },
        select: {
          id: true,
          title: true,
          notes: {
            select: {
              content: true,
            },
          },
        },
      });

      if (existingBook) {
        const bookHighlights = existingBook.notes.map((note) => note.content);

        importedBook.highlights.forEach(async (highlight) => {
          if (!bookHighlights.includes(highlight)) {
            await prisma.note.create({
              data: {
                content: highlight,
                bookId: existingBook.id,
              },
            });

            createdHighlights.push(highlight);
          }
        });
      } else {
        const formatedNotes = importedBook.highlights.map((highlight) => ({
          content: highlight,
        }));
        await prisma.book.create({
          data: {
            userId: user.id,
            title: importedBook.title,
            author: importedBook.author,
            notes: {
              createMany: {
                data: formatedNotes,
              },
            },
          },
        });

        createdBooks.push(importedBook.title);
      }
    });

    res.status(200).json({ createdBooks, createdHighlights });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
