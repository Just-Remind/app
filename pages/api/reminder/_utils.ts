import LanguageDetect from "languagedetect";

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
  cronExpression: string;
  bonusHighlightEnabled: boolean;
  bonusHighlightsPerEmail: number;
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
      cronExpression: true,
      bonusHighlightEnabled: true,
      bonusHighlightsPerEmail: true,
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

export const getBonusHighlights = async (
  userEmail: string,
  bonusHighlightNb: number,
): Promise<Highlight[] | null> => {
  const books = await prisma.book.findMany({
    where: {
      user: userEmail,
    },
    select: {
      title: true,
    },
  });
  if (!books || !books.length) return null;

  const bookTitles = books.map((book) => book.title);
  const lngDetector = new LanguageDetect();
  const highlightsCount = await prisma.highlight.count({
    where: {
      book: {
        NOT: {
          user: userEmail,
        },
      },
    },
  });
  console.log("highlightsCount", highlightsCount);
  if (highlightsCount < bonusHighlightNb) return null;

  const highlights: Highlight[] = [];

  while (highlights.length < bonusHighlightNb) {
    const skip = Math.floor(Math.random() * highlightsCount);
    const highlight = await prisma.highlight.findFirst({
      take: 1,
      skip: skip,
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

    if (!highlight) continue;

    const isLongEnough = highlight.content.length > 25;
    if (!isLongEnough) continue;

    const isNotTooLong = highlight.content.length <= 600;
    if (!isNotTooLong) continue;

    const regexSentence = new RegExp(/^([A-Z])(.*)([.?!])$/g);
    const isSentence = regexSentence.test(highlight.content);
    if (!isSentence) continue;

    const lang = lngDetector.detect(highlight.content);
    const isEnglish = lang[0][0] === "english";
    if (!isEnglish) continue;

    const hasBook = bookTitles.includes(highlight.book.title);
    if (!hasBook) highlights.push(highlight);
  }

  return highlights;
};

export const saveBooksTagsAndUniqueId = async (userEmail: string): Promise<void> => {
  const books = await prisma.book.findMany({
    take: 15,
    where: {
      user: userEmail,
      AND: {
        asin: null,
        isbn: null,
      },
    },
  });

  console.log("books", books.length);
  if (!books || books.length === 0) return;

  let index = 0;

  while (index < books.length) {
    console.log(index);
    const book = books[index];
    index++;

    const googleBookDetails = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${book.title}`,
    )
      .then((data) => data.json())
      .then((result) => {
        if (result.items) return result.items[0];
        else return result;
      })
      .catch((error) => console.log("error", error));

    const categories: string[] = googleBookDetails?.volumeInfo?.categories || [];
    const industryIdentifiers: { type: string; identifier: string }[] =
      googleBookDetails?.volumeInfo?.industryIdentifiers || [];

    if (categories.length && industryIdentifiers.length) {
      await prisma.book.update({
        where: {
          id: book.id,
        },
        data: {
          isbn: industryIdentifiers[0].identifier,
          tags: {
            connectOrCreate: categories.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
      });
    }
  }
};
