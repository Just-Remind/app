import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import prisma from "../../lib/prisma";

type Props = {
  book: {
    title: string;
    notes: { content: string }[];
  };
};

const Book: NextPage<Props> = (props: Props) => {
  const { book } = props;

  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <Head>
        <title>Remind</title>
        <meta name="description" content="Daily reminder of your reads" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className="pb-6 mb-6 text-xl border-b border-gray-300">
          {book.title}
        </h2>

        <ul className="space-y-2">
          {book.notes.map((note, index) => (
            <li key={index}>{note.content}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Book;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = 1;
  const book = await prisma.book.findFirst({
    where: {
      user: { id: userId },
      id: Number(context.query.id),
    },
    select: {
      title: true,
      notes: {
        select: {
          content: true,
        },
      },
    },
  });

  return { props: { book } };
};
