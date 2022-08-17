export type User = {
  email: string;
};

export type Highlight = {
  id: number;
  content: string;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  enabled: boolean;
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
};