import { useEffect } from "react";

import { useForm, Controller } from "react-hook-form";

import { Button, Input } from "components/ui";
import { StarterHighlight } from "types";
import { useAlert } from "utils/hooks";

import useCreateEditHighlights from "./useCreateEditHighlights";

type FormValues = {
  title: string;
  author: string;
  content: string;
};

type Props = {
  formMode?: string;
  handleSetFormMode: (value?: string) => void;
  selectedHighlight?: StarterHighlight;
  handletSelectedHighlight: (value?: StarterHighlight) => void;
};

const StarterHighlightForm = (props: Props): JSX.Element => {
  // PROPS
  const { formMode, handleSetFormMode, selectedHighlight, handletSelectedHighlight } = props;

  // RHF
  const defaultValues = { ...selectedHighlight };
  const { register, handleSubmit, control } = useForm<FormValues>({ defaultValues });

  // HOOKS
  const [createHighlight, editHighlight, isLoading, isSuccess, isError] = useCreateEditHighlights();
  const [alert, setAlert, clearAlert] = useAlert();

  useEffect(() => {
    clearAlert();

    if (isSuccess) {
      handleSetFormMode();
    } else if (isError) {
      setAlert({ type: "error", message: "Highlight not created" });
    }
  }, [isError, isSuccess, handleSetFormMode, setAlert, clearAlert]);

  // METHODS
  const handleSubmitStarterHighlight = (formValues: FormValues): void => {
    if (formMode === "edit" && selectedHighlight?.id) {
      editHighlight({ id: selectedHighlight?.id, ...formValues });
    } else if (formMode === "new") {
      createHighlight(formValues);
    }
  };

  const handleCloseForm = (): void => {
    handleSetFormMode(undefined);
    handletSelectedHighlight(undefined);
  };

  return (
    <>
      {alert && <div className="mb-4">{alert}</div>}
      <form onSubmit={handleSubmit(handleSubmitStarterHighlight)} className="space-y-4">
        <div className="flex items-end space-x-4">
          <Input {...register("title", { required: true })} label="Title" className="flex-1" />
          <Input {...register("author", { required: true })} label="Author" className="flex-1" />
        </div>
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, value } }): JSX.Element => (
            <Input onChange={onChange} value={value} label="Highlight" type="textarea" />
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button color="white" onClick={handleCloseForm}>
            Close
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default StarterHighlightForm;
