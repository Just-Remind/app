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

  res.setHeader(
    "Access-Control-Allow-Origin",
    `chrome-extension://${process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID}`
  );

  if (!body.user.email) return res.status(500).json("no user found");

  await prisma.$transaction(
    importedBooks.map((book) =>
      prisma.book.upsert({
        where: {
          user_title: {
            user: body.user.email,
            title: book.title,
          },
        },
        update: {
          highlights: {
            createMany: {
              skipDuplicates: true,
              data: book.highlights.map((highlight) => ({
                content: highlight,
              })),
            },
          },
        },
        create: {
          user: body.user.email,
          title: book.title,
          author: book.author,
          highlights: {
            createMany: {
              skipDuplicates: true,
              data: book.highlights.map((highlight) => ({
                content: highlight,
              })),
            },
          },
        },
      })
    )
  );

  return res.status(200).json("SUCCESS");
};

export default handler;
