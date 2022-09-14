import { Prisma } from "@prisma/client";

import prisma from "lib/prisma";
import { CronJob } from "types";

export type Highlight = {
  id: number;
  content: string;
  currentCycle: number;
  book: {
    title: string;
    author: string | null;
  };
};

type Settings = {
  uniqueBooksOnly: boolean;
  highlightsPerEmail: number;
  highlightsQualityFilter: boolean;
  currentCycle: number;
  cycleMode: boolean;
};

export const getHighlights = async (
  userEmail: string,
  currentCycle: number,
  highlightsQualityFilter: boolean,
): Promise<Highlight[]> => {
  let result = await prisma.highlight.findMany({
    where: {
      book: {
        user: userEmail,
        enabled: true,
      },
      currentCycle: {
        equals: currentCycle,
      },
    },
    select: {
      id: true,
      content: true,
      currentCycle: true,
      book: {
        select: {
          title: true,
          author: true,
        },
      },
    },
  });

  if (highlightsQualityFilter) {
    result = result.filter((highlight) => highlight.content.length > 25);
  }

  return result;
};

export const getSettings = async (userEmail: string): Promise<Settings | null> =>
  prisma.cronJob.findUnique({
    where: {
      user: userEmail,
    },
    select: {
      uniqueBooksOnly: true,
      highlightsPerEmail: true,
      highlightsQualityFilter: true,
      currentCycle: true,
      cycleMode: true,
    },
  });

export const getRandomHighlights = (
  highlights: Highlight[],
  count: number,
  settings: Settings,
): Highlight[] => {
  const randomHighlights: Highlight[] = [];

  let index = 0;
  while (randomHighlights.length < count) {
    index++;

    const random = Math.floor(Math.random() * highlights.length);
    const randomHighlight = highlights[random];
    const bookTitle = randomHighlight.book.title;
    const isBookAlreadyIncluded = !!randomHighlights.find(
      (highlight) => highlight.book.title === bookTitle,
    );
    const highlightAlreadyIncluded = !!randomHighlights.find(
      (highlight) => highlight.content === randomHighlight.content,
    );

    if (settings.uniqueBooksOnly && isBookAlreadyIncluded && index < highlights.length) continue;

    if (highlightAlreadyIncluded) continue;

    randomHighlights.push(randomHighlight);
  }

  return randomHighlights;
};

export const incrementCronJobCurrentCycle = async (
  userEmail: string,
  incrementedCyclce: number,
): Promise<CronJob> => {
  const result = await prisma.cronJob.update({
    where: {
      user: userEmail,
    },
    data: {
      currentCycle: incrementedCyclce,
    },
  });
  return result;
};

export const incrementHighlightsCycle = async (
  highlights: Highlight[],
): Promise<Prisma.BatchPayload> => {
  const highlightIDs = highlights.map((highlight) => highlight.id);

  const result = await prisma.highlight.updateMany({
    where: {
      id: { in: highlightIDs },
    },
    data: {
      currentCycle: {
        increment: 1,
      },
    },
  });

  return result;
};
