export type Card = {
  title: string;
  description: string;
  btnText: string;
  onClick?: () => void;
  href?: string;
};

export type BookToImport = {
  title: string;
  author?: string;
  highlights: string[];
};
