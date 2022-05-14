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

  // return res.status(200).json(user);

  const promises: Promise<number | void>[] = [];
  const existingBooks = [];

  importedBooks.map((importedBook) => {
    const promise = prisma.book
      .findFirst({
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
      })
      .then((response) => existingBooks.push(response))
      .catch((error) => res.status(500).json(error));

    promises.push(promise);
  });

  await Promise.all(promises)
    .then(() => {
      console.log("BOOKS", existingBooks.length);
      res.status(200).json("success");
    })
    .catch((error) => res.status(500).json(error));

  // console.log("USER BOOKS v2", user.books.length);

  // const createdHighlights: string[] = [];
  // const createdBooks: string[] = [];

  // console.log("START");
  // await Promise.all(
  //   importedBooks.map(
  //     async (importedBook) =>
  //       prisma.book.findFirst({
  //         where: {
  //           userId: user.id,
  //           title: importedBook.title,
  //         },
  //         select: {
  //           id: true,
  //           title: true,
  //           notes: {
  //             select: {
  //               content: true,
  //             },
  //           },
  //         },
  //       })

  //     // existingBooks.push(existingBook);
  //   )
  // )
  //   .then((response) => {
  //     console.log("RESPONSE", response);
  //     res.status(200);
  //   })
  //   .catch(() => res.status(500));

  // console.log("existingBooks", existingBooks.length);

  // try {
  //   console.log("HOLLA?");
  //   importedBooks.map(async (importedBook) => {
  //     const existingBook = await prisma.book.findFirst({
  //       where: {
  //         userId: user.id,
  //         title: importedBook.title,
  //       },
  //       select: {
  //         id: true,
  //         title: true,
  //         notes: {
  //           select: {
  //             content: true,
  //           },
  //         },
  //       },
  //     });
  //     console.log("HELLO?", existingBook ? existingBook.title : "no book");
  //     if (existingBook) {
  //       const bookHighlights = existingBook.notes.map((note) => note.content);

  //       importedBook.highlights.map(async (highlight) => {
  //         if (!bookHighlights.includes(highlight)) {
  //           await prisma.note.create({
  //             data: {
  //               content: highlight,
  //               bookId: existingBook.id,
  //             },
  //           });

  //           createdHighlights.push(highlight);
  //         }
  //       });
  //     } else {
  //       const formatedNotes = importedBook.highlights.map((highlight) => ({
  //         content: highlight,
  //       }));
  //       await prisma.book.create({
  //         data: {
  //           userId: user.id,
  //           title: importedBook.title,
  //           author: importedBook.author,
  //           notes: {
  //             createMany: {
  //               data: formatedNotes,
  //             },
  //           },
  //         },
  //       });

  //       createdBooks.push(importedBook.title);
  //     }
  //   });
  //   console.log("SUCCESS", importedBooks.length);
  //   res.status(200).json({ createdBooks, createdHighlights });
  // } catch (error) {
  //   console.log("ERROR", error);
  //   res.status(500).json(error);
  // }
};

export default handler;
