import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { Input, Button } from "components/ui";
import { useEditHighlight } from "services/highlights";
import { Highlight } from "types";

type Props = {
  highlight: Highlight;
  handleCloseModal: () => void;
};

type EditHighlightFormType = {
  content: string;
};

const EditHighlightForm = (props: Props): JSX.Element => {
  // PROPS
  const { highlight, handleCloseModal } = props;

  // RHF
  const { register, handleSubmit } = useForm<EditHighlightFormType>({
    defaultValues: {
      content: highlight.content,
    },
  });

  // RQ
  const { mutate: editHighlight, isSuccess: isHighlightUpdated } =
    useEditHighlight();

  // HOOKS
  useEffect(() => {
    if (isHighlightUpdated) handleCloseModal();
  }, [isHighlightUpdated, handleCloseModal]);

  // METHODS
  const handleEditHighlight = ({ content }: EditHighlightFormType): void => {
    editHighlight({ id: highlight.id, content });
  };

  return (
    <div>
      <p className="mb-4 text-xl font-medium">Edit this highlight</p>
      <form onSubmit={handleSubmit(handleEditHighlight)} className="space-y-4">
        <Input
          {...register("content")}
          required
          label="Content"
          type="textarea"
          rows={5}
          value={highlight.content}
        />
        <Button type="submit">Edit</Button>
      </form>
    </div>
  );
};

export default EditHighlightForm;
