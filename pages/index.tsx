/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import axios from 'axios';
import prisma from '../lib/prisma';

type Book = {
  id: number;
  title: string;
}

type Props = {
  booksFromDB: Book[];
}

const Home: NextPage<Props> = (props: Props) => {
  // PROPS
  const { booksFromDB } = props;

  // NEXT ROUTER
  const router = useRouter();

  // STATE
  const [isMounted, setIsMounted] = useState(false);
  const [books] = useState<Book[]>(booksFromDB || []);

  // HOOKS
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!localStorage.getItem('userId')) {
    router.push('/login');
    return null;
  }

  // METHODS
  const handleImportNotes = (event: any): void => {
    event.preventDefault();
    const file = event.target[0].files[0];
    if (!file) return;

    const notes: string[] = [];
    let bookTitle = '';

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (!e.target) return;
      const text = e.target.result;

      if (typeof text !== 'string') return;
      const htmlObject = document.createElement('div');
      htmlObject.innerHTML = text;
      const bookTitleElement = htmlObject.querySelector('.bookTitle');
      if (bookTitleElement && bookTitleElement.textContent) {
        bookTitle = bookTitleElement.textContent.trim() || '';
      }

      const noteTextnodes = htmlObject.querySelectorAll('.noteText');
      noteTextnodes.forEach((note) => {
        if (note.firstChild && note.firstChild.nodeValue) {
          notes.push(note.firstChild.nodeValue.trim());
        }
      });

      axios.post('/api/add_notes', {
        userId: localStorage.getItem('userId'),
        title: bookTitle,
        notes,
      })
        .then((res) => {
          console.log('res', res);
        })
        .catch((error) => alert(error));
    };

    fileReader.readAsText(file);
  };

  return (
    <div>
      <Head>
        <title>Remind</title>
        <meta name="description" content="Daily reminder of your reads" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Remind
        </h1>

        <form onSubmit={handleImportNotes}>
          <label htmlFor="import-notes">
            Notes
            <input id="import-notes" name="import-notes" type="file" />
          </label>
          <button type="submit">Import</button>
        </form>

        <section>
          <h2>Your books</h2>
          <ul>
            {books.map((book: Book) => (
              <Link href={`/books/${book.id}`} key={book.id}>
                <li>{book.title}</li>
              </Link>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const userId = 1;
  const books = await prisma.book.findMany({
    where: {
      user: { id: userId },
    },
    select: {
      id: true,
      title: true,
    },
  });

  return { props: { booksFromDB: books } };
};
