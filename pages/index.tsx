/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
import { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import axios from 'axios';
import prisma from '../lib/prisma';
import { Button, TwoColCard } from 'components/ui';

type Book = {
  id: number;
  title: string;
}

type Props = {
  booksFromDB: Book[];
}

type AnalysedBook = {
  title: string;
  author: string;
  notes: string[];
}

const Home: NextPage<Props> = (props: Props) => {
  // PROPS
  const { booksFromDB: books = [] } = props;

  // STATE
  const [anaylisedBook, setAnalysedBook] = useState<AnalysedBook | null>(null);

  // 1. import book -> analyse
  // 2. save to db

  // METHODS
  const handleImportNotes = (event: any): void => {
    event.preventDefault();
    const file = event.target[0].files[0];
    if (!file) return;

    const notes: string[] = [];
    let title = '';
    let author = '';

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (!e.target) return;
      const text = e.target.result;

      if (typeof text !== 'string') return;
      const htmlObject = document.createElement('div');
      htmlObject.innerHTML = text;

      const titleElement = htmlObject.querySelector('.bookTitle');
      if (titleElement && titleElement.textContent) {
        title = titleElement.textContent.trim() || '';
      }

      const authorElement = htmlObject.querySelector('.authors');
      if (authorElement && authorElement.textContent) {
        author = authorElement?.textContent;
      }

      const noteTextnodes = htmlObject.querySelectorAll('.noteText');
      noteTextnodes.forEach((note) => {
        if (note.firstChild && note.firstChild.nodeValue) {
          notes.push(note.firstChild.nodeValue.trim());
        }
      });
      setAnalysedBook({ title, notes, author })
    };

    fileReader.readAsText(file);
  };

  const handleSaveNotesToDB = (event: any): void => {
    event.preventDefault();
    if (!anaylisedBook) return alert('No book analysed');

    axios.post('/api/add_notes', {
      userId: localStorage.getItem('userId'),
      title: anaylisedBook.title,
      author: anaylisedBook.author,
      notes: anaylisedBook.notes,
    })
      .then((res) => {
        console.log('res', res);
        alert('Book & notes successfully saved! 👌')
      })
      .catch((error) => alert(error));
  };
  return (
    <div>
      <Head>
        <title>Remind</title>
        <meta name="description" content="Daily reminder of your reads" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={anaylisedBook ? handleSaveNotesToDB : handleImportNotes} className='pb-6 mb-6 border-b border-gray-300'>
          <label htmlFor="import-notes">
            Notes
          </label>
          <input id="import-notes" name="import-notes" type="file" />
          <Button submit>
            {anaylisedBook ? 'Save' : 'Analyse'}
          </Button>
        </form>

        <section>
          <h2 className='text-xl'>Your books</h2>
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {books.length > 0 && books.map((book: Book) => (
                <TwoColCard
                  href={`/books/${book.id}`}
                  key={book.id}
                  leftTitle={book.title}
                  leftSubtitle={`By ...`}
                  rightTitle={`Notes: xx`}
                  rightSubtitle={`Added on ...`}
                />
              ))}
            </ul>
          </div>
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
