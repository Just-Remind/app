import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";

import { Input, Button } from "components/ui";
import { EMAIL_REGEX } from "utils/constants";
import { AlertConfig } from "utils/hooks";

type ForgotPasswordFormType = {
  email: string;
};

type Props = {
  setAlert: (config: AlertConfig) => void;
  clearAlert: () => void;
};

const ForgotPasswordForm = ({ setAlert, clearAlert }: Props): JSX.Element => {
  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormType>();

  // METHODS
  const handleSignIn = ({
    email,
  }: ForgotPasswordFormType): Promise<boolean | void> => {
    clearAlert();

    return Auth.forgotPassword(email)
      .then(() =>
        setAlert({ message: "An email has been sent to reset your password." })
      )
      .catch((error) => setAlert({ type: "error", message: error.message }));
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
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
          Reset password
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
