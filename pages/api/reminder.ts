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
  if (!req.query.email) return res.status(500).json("No email provided");

  const user = await prisma.user.findUnique({
    where: {
      email: req.query.email as string,
    },
    select: {
      books: {
        select: {
          notes: {
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
      },
    },
  });

  if (!user) return res.status(500).json("No user found");

  const notes = user.books.flatMap((book) => book.notes);
  if (notes.length === 0) return res.status(500).json("No highlights found.");

  const indices = [];

  while (indices.length < 5) {
    const random = Math.floor(Math.random() * notes.length);
    indices.push(random);
  }

  const selectedNotes: Note[] = [];
  indices.forEach((index) => selectedNotes.push(notes[index]));

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
