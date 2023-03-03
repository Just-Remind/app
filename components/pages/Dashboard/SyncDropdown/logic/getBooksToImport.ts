import { BookToImport } from "types";

// create array of arrays
// example input: [a, b, c, d]
// example output: [ [a, b], [c, d] ]
// const nestedArraysBuilder = <T>(array: T[], perArray: number): T[][] =>
//   new Array(Math.ceil(array.length / perArray))
//     .fill("")
//     .map((_, i) => array.slice(i * perArray, (i + 1) * perArray));

const splitTitleAndAuthor = (string: string): [title: string, author: string] => {
  if (string.at(-1) !== ")") return [string, ""];

  const authorParts = [];
  let title = "";

  let isAuthorNotFound = true;
  const breakerPoint = string.length;
  let i = -1;
  while (isAuthorNotFound) {
    if (string.at(i) === "(" || -i === breakerPoint) isAuthorNotFound = false;
    authorParts.push(string.at(i));
    i--;
  }

  const author = authorParts.reverse().join("");
  title = string.split(author)[0].trimEnd().replace("\n", "");
  const formattedAuthor = author.slice(1, -1).split(", ").reverse().join(" ");
  return [title, formattedAuthor];
};

const getBooksToImport = async (e: React.ChangeEvent<HTMLInputElement>): Promise<BookToImport[]> =>
  new Promise((resolve, reject) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    const booksToImport: BookToImport[] = [];

    reader.onload = (evt): void => {
      if (!evt.target || !evt.target.result || typeof evt.target.result !== "string") return;

      if (!evt.target.result.includes("==========")) {
        reject("It doesn't look like a clippings file.");
      }

      const clippings = evt.target.result.split("==========\r");
      clippings.forEach((clipping) => {
        const [titleAndAuhor, , , highlight] = clipping.split("\r\n");
        if (!highlight) return;

        const [title, author] = splitTitleAndAuthor(titleAndAuhor);

        const importedBook = booksToImport.find((book) => book.title === title);
        if (importedBook) {
          importedBook.highlights.push(highlight);
        } else {
          booksToImport.push({
            title,
            author,
            highlights: [highlight],
          });
        }
      });

      if (booksToImport.length === 0) reject("No books were found.");

      resolve(booksToImport);
    };
    reader.readAsText(file);
  });

export default getBooksToImport;
