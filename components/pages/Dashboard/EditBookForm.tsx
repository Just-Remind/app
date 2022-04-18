import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { Input, Button } from "components/ui";
import { useEditBook } from "services/books";
import { Book } from "types";

type Props = {
  book: Book;
  handleCloseModal: () => void;
};

type EditBookFormType = {
  title: string;
  author: string;
};

const EditBookForm = ({ book, handleCloseModal }: Props): JSX.Element => {
  // RHF
  const { register, handleSubmit } = useForm<EditBookFormType>({
    defaultValues: {
      title: book.title,
      author: book.author,
    },
  });

  // RQ
  const { mutate: editBook, isSuccess: isBookUpdated } = useEditBook();

  // HOOKS
  useEffect(() => {
    if (isBookUpdated) handleCloseModal();
  }, [isBookUpdated, handleCloseModal]);

  // METHODS
  const handleEditBook = ({ title, author }: EditBookFormType): void => {
    editBook({ id: book.id, title, author });
  };

  return (
    <div>
      <p className="mb-4 text-xl font-medium">Edit this book</p>
      <form onSubmit={handleSubmit(handleEditBook)} className="space-y-4">
        <Input {...register("title")} required label="Title" />
        <Input {...register("author")} required label="Author" />
        <Button type="submit">Edit</Button>
      </form>
    </div>
  );
};

export default EditBookForm;
