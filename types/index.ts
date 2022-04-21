export type User = {
  email: string;
  cronJobId: number;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  notes: { id: number; content: string }[];
};

export type Highlight = {
  id: number;
  content: string;
};
