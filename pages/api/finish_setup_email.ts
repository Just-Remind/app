import sgMail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

import { getFinishSetupEmail } from "./_utils";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const userEmail = req.body.email as string;

  const msg = {
    to: userEmail,
    from: {
      name: "Just Remind",
      email: "hello@justremind.app",
    },
    subject: "Sync your books on Just Remind 📚",
    text: `
      Hi there!

      Welcome on Just Remind! Click on this link to sync your Kindle books and start enjoying your daily email:

      https://justremind.app/

      Note that you will need to be on a computer with Google Chrome.

      In case you have any question, just reply to this email and I'll be happy to help you!

      — Loïc, creator of Just Remind
    `,
    html: getFinishSetupEmail(),
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
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
    },
  );
};

export default handler;
