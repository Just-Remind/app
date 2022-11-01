import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";

import { Input, Button } from "components/ui";
import { EMAIL_REGEX } from "utils/constants";
import { useToast } from "utils/hooks";

type ResendCodeFormType = {
  email: string;
};

const ResendCodeForm = (): JSX.Element => {
  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResendCodeFormType>();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  // METHODS
  const handleResendCode = ({ email }: ResendCodeFormType): Promise<void> => {
    clearToast();

    return Auth.resendSignUp(email)
      .then(() => {
        setToast({ message: "Confirmation link sent to your email address." });
      })
      .catch((error) => setToast({ type: "error", message: error.message }));
  };

  return (
    <>
      {toast}
      <form className="space-y-6" onSubmit={handleSubmit(handleResendCode)}>
        <Input
          {...register("email", {
            pattern: {
              value: EMAIL_REGEX,
              message: "Please enter a valid email.",
            },
          })}
          label="Email address"
          placeholder="john.doe@example.com"
          required
          type="email"
          error={errors.email?.message}
        />
        <div className="flex flex-col items-center justify-between space-y-4">
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Resend confirmation
          </Button>
        </div>
      </form>
    </>
  );
};

export default ResendCodeForm;
