export type User = {
  email: string;
};

export type Highlight = {
  id: number;
  content: string;
  enabled: boolean;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  enabled: boolean;
  asin?: string;
  isbn?: string;
  tags?: string[];
  highlights: Highlight[];
};

export type CronJob = {
  id: number;
  jobId: number;
  enabled: boolean;
  timezone: string;
  cronExpression: string;
  uniqueBooksOnly: boolean;
  highlightsPerEmail: number;
  highlightsQualityFilter: boolean;
  cycleMode: boolean;
  bonusHighlightEnabled: boolean;
  bonusHighlightsPerEmail: number;
};

export type StarterHighlight = {
  id: number;
  title: string;
  author: string;
  content: string;
};
