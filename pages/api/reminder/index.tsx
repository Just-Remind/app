import sgMail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

import { getEmail } from "../_utils";
import { getSettings, Highlight } from "./_utils";
import {
  getHighlights,
  getRandomHighlights,
  updateLastSentOn,
  setNewCycleStartDate,
} from "./_utils";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // 1. RETRIEVE USER EMAIL
  const userEmail = req.query.email as string;
  if (!userEmail) return res.status(500).json("No email provided");

  // 2. FETCH USER SETTINGS
  const settings = await getSettings(userEmail);
  if (!settings) return res.status(500).json("No user settings found");

  const cronExpression = settings.cronExpression.split(" ");
  const hour = Number(cronExpression[1]);
  let greeting = "Hello";
  if (hour > 4) greeting = "Good morning";
  if (hour > 12) greeting = "Good afternoon";
  if (hour > 17) greeting = "Good evening";

  const { cycleStartDate, highlightsQualityFilter, highlightsPerEmail } = settings;
  let isNewCycleStartDateNeeded = false;

  if (!cycleStartDate) setNewCycleStartDate(userEmail);

  const highlights = await getHighlights(userEmail, cycleStartDate, highlightsQualityFilter);

  let selectedHighlights: Highlight[] = [];

  if (highlights.length >= highlightsPerEmail) {
    selectedHighlights = getRandomHighlights(highlights, highlightsPerEmail, settings);
  } else {
    const nextCyclehighlights = await getHighlights(
      userEmail,
      new Date(),
      highlightsQualityFilter,
      highlights,
    );
    const shortCount = highlightsPerEmail - highlights.length;
    const randomRestHighlights = getRandomHighlights(nextCyclehighlights, shortCount, settings);
    selectedHighlights = [...highlights, ...randomRestHighlights];

    isNewCycleStartDateNeeded = true;
  }

  // 6. GENERATE EMAIL
  const email = getEmail(selectedHighlights, userEmail, greeting);

  // 7. SGMAIL SETTINGS
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  const msg = {
    to: userEmail,
    from: {
      name: "Just Remind",
      email: "hello@justremind.app",
    },
    subject: "Just Remind 📚",
    text: selectedHighlights.map((highlight) => highlight.content).join("\n "),
    html: email,
  };

  // 8. SEND EMAIL
  sgMail.send(msg).then(
    async () => {
      await updateLastSentOn(selectedHighlights);
      if (isNewCycleStartDateNeeded) setNewCycleStartDate(userEmail);
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
