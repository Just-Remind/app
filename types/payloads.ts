export type CreateStarterHighlightPayload = {
  title: string;
  author: string;
  content: string;
};

export type EditStarterHighlightPayload = {
  id: number;
  title: string;
  author: string;
  content: string;
};
