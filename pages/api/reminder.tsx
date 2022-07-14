import sgMail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";
import { getEmail } from "./_utils";

export type Note = {
  content: string;
  book: {
    title: string;
    author: string | null;
  };
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const userEmail = req.query.email as string;

  if (!userEmail) return res.status(500).json("No email provided");

  const settings = await prisma.cronJob.findUnique({
    where: {
      user: userEmail,
    },
    select: {
      uniqueBooksOnly: true,
      highlightsPerEmail: true,
    },
  });

  const books = await prisma.book.findMany({
    where: {
      user: userEmail,
      enabled: true,
    },
    select: {
      highlights: {
        select: {
          content: true,
          book: {
            select: {
              title: true,
              author: true,
            },
          },
        },
      },
    },
  });

  const selectedBooks: string[] = [];

  const highlights = books.flatMap((book) => book.highlights);
  if (highlights.length === 0) {
    return res.status(500).json("No highlights found.");
  }

  const indices: number[] = [];

  while (indices.length < (settings?.highlightsPerEmail || 5)) {
    const random = Math.floor(Math.random() * highlights.length);
    const bookTitle = highlights[random].book.title;
    const isBookAlreadyIncluded = selectedBooks.includes(bookTitle);
    if (settings?.uniqueBooksOnly && isBookAlreadyIncluded) continue;

    selectedBooks.push(bookTitle);
    if (indices.includes(random)) continue;
    indices.push(random);
  }

  const selectedNotes: Note[] = [];
  indices.forEach((index) => selectedNotes.push(highlights[index]));

  const email = getEmail(selectedNotes);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  const msg = {
    to: userEmail,
    from: {
      name: "Just Remind",
      email: "hello@justremind.app",
    },
    subject: "Just Remind 📚",
    text: selectedNotes.map((note) => note.content).join("\n "),
    html: email,
  };

  sgMail.send(msg).then(
    () => {
      res.status(200).json("success");
    },
    (error) => {
      if (error.response.body) {
        res.status(500).json(`error: ${error.response.body}`);
      } else {
        res.status(500).json(`error: ${error}`);
      }
    }
  );
};

export default handler;
