import prisma from "lib/prisma";

export type Highlight = {
  id: number;
  content: string;
  lastSentOn: Date | null;
  book: {
    title: string;
    author: string | null;
  };
};

type Settings = {
  uniqueBooksOnly: boolean;
  highlightsPerEmail: number;
  highlightsQualityFilter: boolean;
  cycleMode: boolean;
  cycleStartDate: Date | null;
};

export const getHighlights = async (
  userEmail: string,
  cycleStartDate: Date | null,
  highlightsQualityFilter: boolean,
  excludedHighlights?: Highlight[],
): Promise<Highlight[]> => {
  const exculdedIDs: number[] = [];
  if (excludedHighlights) excludedHighlights.map((highlight) => exculdedIDs.push(highlight.id));

  let result = await prisma.highlight.findMany({
    where: {
      enabled: true,
      book: {
        user: userEmail,
        enabled: true,
      },
      OR: [{ lastSentOn: { equals: null } }, { lastSentOn: { lt: cycleStartDate || undefined } }],
      NOT: {
        id: { in: exculdedIDs },
      },
    },
    select: {
      id: true,
      content: true,
      lastSentOn: true,
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
      cycleStartDate: true,
      cycleMode: true,
    },
  });

export const getRandomHighlights = (
  highlights: Highlight[],
  count: number,
  settings: Settings,
): Highlight[] => {
  const randomHighlights: Highlight[] = [];
  if (highlights.length === 0) return randomHighlights;

  let index = 0;
  while (randomHighlights.length < count) {
    index++;

    const random = Math.floor(Math.random() * highlights.length);
    const randomHighlight = highlights[random];

    const highlightAlreadyIncluded = !!randomHighlights.find(
      (highlight) => highlight.id === randomHighlight.id,
    );
    if (highlightAlreadyIncluded) continue;

    const bookTitle = randomHighlight.book.title;
    const isBookAlreadyIncluded = !!randomHighlights.find(
      (highlight) => highlight.book.title === bookTitle,
    );
    if (settings.uniqueBooksOnly && isBookAlreadyIncluded && index < highlights.length) continue;

    randomHighlights.push(randomHighlight);
  }

  return randomHighlights;
};

export const updateLastSentOn = async (highlights: Highlight[]): Promise<void> => {
  const highlightIDs = highlights.map((highlight) => highlight.id);
  await prisma.highlight.updateMany({
    where: {
      id: { in: highlightIDs },
    },
    data: {
      lastSentOn: new Date(),
    },
  });
};

export const setNewCycleStartDate = async (userEmail: string): Promise<void> => {
  await prisma.cronJob.update({
    where: {
      user: userEmail,
    },
    data: {
      cycleStartDate: new Date(),
    },
  });
};
