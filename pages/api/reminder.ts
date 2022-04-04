// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next';
// import schedule from 'node-schedule';
import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  const msg = {
    to: 'loic.boset@gmail.com', // Change to your recipient
    from: 'loic.boset@gmail.com', // Change to your verified sender
    subject: 'Cheers to a new day!',
    text: 'Hope your day has been well!',
  };

  sgMail.send(msg);
  res.status(200).json('success');
}
