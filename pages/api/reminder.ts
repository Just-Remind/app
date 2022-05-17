// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sgMail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

type Note = {
  content: string;
  book: {
    title: string;
  };
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const userEmail = req.query.email as string;

  if (!userEmail) return res.status(500).json("No email provided");

  const books = await prisma.book.findMany({
    where: {
      user: userEmail,
    },
    select: {
      highlights: {
        select: {
          content: true,
          book: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  const highlights = books.flatMap((book) => book.highlights);
  if (highlights.length === 0) {
    return res.status(500).json("No highlights found.");
  }

  const indices = [];

  while (indices.length < 5) {
    const random = Math.floor(Math.random() * highlights.length);
    indices.push(random);
  }

  const selectedNotes: Note[] = [];
  indices.forEach((index) => selectedNotes.push(highlights[index]));

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  const msg = {
    to: req.query.email as string,
    from: {
      name: "Just Remind",
      email: "hello@justremind.app",
    },
    subject: "Remind 📚",
    text: selectedNotes.map((note) => note.content).join("\n "),
    html: `<h3>Remind</h3>

      <h4>${selectedNotes[0].book.title}</h4>
      <p>${selectedNotes[0].content}</p>

      <h4>${selectedNotes[1].book.title}</h4>
      <p>${selectedNotes[1].content}</p>

      <h4>${selectedNotes[2].book.title}</h4>
      <p>${selectedNotes[2].content}</p>

      <h4>${selectedNotes[3].book.title}</h4>
      <p>${selectedNotes[3].content}</p>

      <h4>${selectedNotes[4].book.title}</h4>
      <p>${selectedNotes[4].content}</p>

      <p>Stay curious!</p> `,
  };

  sgMail.send(msg).then(
    () => {
      res.status(200).json("success");
    },
    (error) => {
      console.error(error);
      res.status(500).json("error");

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

export default handler;
