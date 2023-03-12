import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

type ImportedBookType = {
  asin: string;
  title: string;
  author: string;
  highlights: string[];
};

type Body = {
  user: {
    email: string;
  };
  book: ImportedBookType;
  importedFrom?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const body: Body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const book = body.book;

  res.setHeader(
    "Access-Control-Allow-Origin",
    `chrome-extension://${process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID}`,
  );

  if (!body.user.email) return res.status(500).json("no user found");

  const searchableTitle = book.title.replace(" ", "_");
  const googleBookDetails = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchableTitle}`,
  )
    .then((data) => data.json())
    .then((result) => {
      if (result.items) return result.items[0];
      else return result;
    });

  const categories: string[] = [];
  if (googleBookDetails.volumeInfo && googleBookDetails.volumeInfo.categories) {
    categories.push(...googleBookDetails.volumeInfo.categories);
  }

  const addedBook = await prisma.book.upsert({
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
      tags: {
        connectOrCreate: categories.map((category) => ({
          where: { name: category },
          create: { name: category },
        })),
      },
    },
    create: {
      user: body.user.email,
      asin: book.asin,
      title: book.title,
      author: book.author,
      importedFrom: body.importedFrom,
      highlights: {
        createMany: {
          skipDuplicates: true,
          data: book.highlights.map((highlight) => ({
            content: highlight,
          })),
        },
      },
      tags: {
        connectOrCreate: categories.map((category) => ({
          where: { name: category },
          create: { name: category },
        })),
      },
    },
  });

  return res.status(200).json(addedBook.title);
};

export default handler;
