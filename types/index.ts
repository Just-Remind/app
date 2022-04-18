export type User = {
  email: string;
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
