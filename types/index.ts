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
  highlights: Highlight[];
};

export type CronJob = {
  id: number;
  jobId: number;
  enabled: boolean;
  timezone: string;
  cronExpression: string;
};
