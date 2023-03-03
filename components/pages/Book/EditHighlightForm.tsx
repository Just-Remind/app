import { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";

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
  const { register, handleSubmit, control } = useForm<EditHighlightFormType>({
    defaultValues: {
      content: highlight.content,
    },
  });

  // RQ
  const { mutate: editHighlight, isSuccess: isHighlightUpdated } = useEditHighlight();

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
      <form onSubmit={handleSubmit(handleEditHighlight)} className="space-y-4">
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, value } }): JSX.Element => (
            <Input
              {...register("content")}
              required
              label="Highlight"
              type="textarea"
              rows={5}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Button type="submit">Edit</Button>
      </form>
    </div>
  );
};

export default EditHighlightForm;
