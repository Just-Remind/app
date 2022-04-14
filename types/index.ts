export type User = {
  email: string;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  notes: { content: string }[];
};
