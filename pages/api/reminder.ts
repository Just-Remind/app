/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next';
// import schedule from 'node-schedule';
import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await prisma.note.findMany();
  const indices = [];

  while (indices.length < 5) {
    const random = Math.floor(Math.random() * result.length);
    indices.push(random);
  }

  const notes: string[] = [];
  indices.forEach((index) => notes.push(result[index].content));

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  const msg = {
    to: 'loic.boset@gmail.com', // Change to your recipient
    from: 'loic.boset@gmail.com', // Change to your verified sender
    subject: 'Remind 📚',
    text: notes.join('\n '),
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json('success');
    }, (error) => {
      console.error(error);
      res.status(500).json('error');

      if (error.response) {
        console.error(error.response.body);
      }
    });
}
