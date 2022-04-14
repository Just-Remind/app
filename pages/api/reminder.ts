// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sgMail from "@sendgrid/mail";
// import schedule from 'node-schedule';
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
  const result = await prisma.note.findMany({
    select: {
      content: true,
      book: {
        select: {
          title: true,
        },
      },
    },
  });
  const indices = [];

  while (indices.length < 5) {
    const random = Math.floor(Math.random() * result.length);
    indices.push(random);
  }

  const notes: Note[] = [];
  indices.forEach((index) => notes.push(result[index]));

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  const msg = {
    to: "loic.boset@gmail.com", // Change to your recipient
    from: "loic.boset@gmail.com", // Change to your verified sender
    subject: "Remind 📚",
    text: notes.map((note) => note.content).join("\n "),
    html: `<h3>Remind</h3>

      <h4>${notes[0].book.title}</h4>
      <p>${notes[0].content}</p>

      <h4>${notes[1].book.title}</h4>
      <p>${notes[1].content}</p>

      <h4>${notes[2].book.title}</h4>
      <p>${notes[2].content}</p>

      <h4>${notes[3].book.title}</h4>
      <p>${notes[3].content}</p>

      <h4>${notes[4].book.title}</h4>
      <p>${notes[4].content}</p>

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
