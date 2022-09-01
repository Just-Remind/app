import sgMail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

import { getEmail } from "../_utils";
import { getSettings, Highlight } from "./_utils";
import {
  getHighlights,
  getRandomHighlights,
  incrementCronJobCurrentCycle,
  incrementHighlightsCycle,
} from "./_utils";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // 1. RETRIEVE USER EMAIL
  const userEmail = req.query.email as string;
  if (!userEmail) return res.status(500).json("No email provided");

  // 2. FETCH USER SETTINGS
  const settings = await getSettings(userEmail);
  if (!settings) return res.status(500).json("No user settings found");

  const { currentCycle, highlightsQualityFilter, highlightsPerEmail } = settings;

  // 3. FETCH CURRENT CYCLE HIGHLIGHTS
  const highlights = await getHighlights(userEmail, currentCycle - 1, highlightsQualityFilter);

  let selectedHighlights: Highlight[] = [];

  if (highlights.length < highlightsPerEmail) {
    // 4.1 FETCH NEXT CYCLE HIGHLIGHTS IF NOT ENOUGH IN CURRENT CYCLE
    const nextHighlights = await getHighlights(userEmail, currentCycle, highlightsQualityFilter);

    // 4.2 RETURN ERROR IF NO HIGHLIGHTS FOUND
    if ([...highlights, ...nextHighlights].length === 0) {
      return res.status(500).json("No highlights found.");
    }

    // 4.3 SELECT RANDOM NEXT CYCLE HIGHLIGHTS
    const count = highlightsPerEmail - highlights.length;
    const randomNextHighlights = getRandomHighlights(nextHighlights, count, settings);

    // 4.4 COMPLETE SELECTED HIGHLIGHTS
    selectedHighlights = [...highlights, ...randomNextHighlights];

    // 4.5 INCREMENT CRONJOB CURRENT CYCLE
    try {
      incrementCronJobCurrentCycle(userEmail, settings.currentCycle + 1);
    } catch {
      return res.status(500).json("Failed to increment cron job current cycle");
    }
  } else {
    // 4. GATHER RANDOM CURRENT CYCLE HIGHLIGHTS
    selectedHighlights = getRandomHighlights(highlights, settings.highlightsPerEmail, settings);
  }

  // 5. INCREMENT HIGHLIGTS CYCLE
  incrementHighlightsCycle(selectedHighlights);

  // 6. GENERATE EMAIL
  const email = getEmail(selectedHighlights);

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
