import { useState } from "react";

import { withSSRContext } from "aws-amplify";
import axios from "axios";
import { NextPage } from "next";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { Input, Button, TwoColCard } from "components/ui";

type ImportBookForm = {
  highlights: FileList;
};

type CognitoAttributes = {
  email: string;
};

type Book = {
  id: number;
  title: string;
};

type AnalysedBook = {
  title: string;
  author: string;
  notes: string[];
};

type Props = {
  books: Book[];
  user: {
    email: string;
  } | null;
};

const Home: NextPage<Props> = (props: Props) => {
  // NEXT ROUTER
  const router = useRouter();

  // PROPS
  const { books = [], user } = props;

  // STATE
  const [anaylisedBook, setAnalysedBook] = useState<AnalysedBook | null>(null);

  // HOOKS
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ImportBookForm>();

  // METHODS
  const handleImportNotes = (data: ImportBookForm): void => {
    const file = data.highlights["0"];
    if (!file) return;

    const notes: string[] = [];
    let title = "";
    let author = "";

    const fileReader = new FileReader();
    fileReader.onload = (e): void => {
      if (!e.target) return;
      const text = e.target.result;

      if (typeof text !== "string") return;
      const htmlObject = document.createElement("div");
      htmlObject.innerHTML = text;

      const titleElement = htmlObject.querySelector(".bookTitle");
      if (titleElement && titleElement.textContent) {
        title = titleElement.textContent.trim() || "";
      }

      const authorElement = htmlObject.querySelector(".authors");
      if (authorElement && authorElement.textContent) {
        author = authorElement?.textContent;
      }

      const noteTextnodes = htmlObject.querySelectorAll(".noteText");
      noteTextnodes.forEach((note) => {
        if (note.firstChild && note.firstChild.nodeValue) {
          notes.push(note.firstChild.nodeValue.trim());
        }
      });
      setAnalysedBook({ title, notes, author });
    };

    fileReader.readAsText(file);
  };

  const handleSaveNotesToDB = (): void => {
    if (!anaylisedBook) return alert("No book analysed");

    axios
      .post("/api/add_notes", {
        userId: localStorage.getItem("userId"),
        title: anaylisedBook.title,
        author: anaylisedBook.author,
        notes: anaylisedBook.notes,
      })
      .then((res) => {
        console.log("res", res);
        alert("Book & notes successfully saved! 👌");
      })
      .catch((error) => alert(error));
  };

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <Head>
        <title>Remind</title>
        <meta name="description" content="Daily re-inspiration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form
          onSubmit={
            anaylisedBook
              ? handleSubmit(handleSaveNotesToDB)
              : handleSubmit(handleImportNotes)
          }
          className="flex items-center pb-6 mb-6 space-x-4 border-b border-gray-300"
        >
          <Input
            {...register("highlights")}
            type="file"
            accept=".html"
            className="flex-1"
            error={errors.highlights?.message}
          />
          <Button submit>{anaylisedBook ? "Save" : "Analyse"}</Button>
        </form>

        <section>
          <h2 className="text-xl">Your books</h2>
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {books.length > 0 &&
                books.map((book: Book) => (
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { Auth: AuthSSR } = withSSRContext(ctx);

  let user = null;
  await AuthSSR.currentUserInfo()
    .then((res: { attributes: CognitoAttributes }) => {
      if (!res) return;
      const { attributes } = res;
      user = {
        email: attributes.email,
      };
    })
    .catch(() => null);

  // TODO: fetch user's books

  return {
    props: {
      user,
      books: [],
    },
  };
};
