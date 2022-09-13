import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";

import { Input, Button } from "components/ui";
import { PASSWORD_REGEX } from "utils/constants";
import { useAlert } from "utils/hooks";

type ResetPasswordFormType = {
  password: string;
  repeatPassword: string;
};

type Props = {
  resetPasswordData: {
    email: string;
    code: string;
  };
};

const ResetPassword = ({ resetPasswordData }: Props): JSX.Element => {
  // RHF
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormType>();

  // HOOKS
  const [alert, setAlert, clearAlert] = useAlert();

  // METHODS
  const handleResetPassword = ({ password }: ResetPasswordFormType): Promise<boolean | void> => {
    clearAlert();

    const { email, code } = resetPasswordData;

    return Auth.forgotPasswordSubmit(email, code, password)
      .then(() => setAlert({ message: "Your password has been reset!" }))
      .catch((error) => setAlert({ type: "error", message: error.message }));
  };

  return (
    <>
      {alert && <div className="mb-2">{alert}</div>}
      <h2 className="mb-4 text-xl">Reset your password</h2>
      <form className="space-y-6" onSubmit={handleSubmit(handleResetPassword)}>
        <Input
          {...register("password", {
            minLength: {
              value: 8,
              message: "Minimum 8 characters.",
            },
            pattern: {
              value: PASSWORD_REGEX,
              message: "Requires at least one capital, one digit or one symbol.",
            },
          })}
          required
          label="Password"
          type="password"
          error={errors.password?.message}
        />
        <Input
          {...register("repeatPassword", {
            validate: (repeatPassword) =>
              repeatPassword === watch("password") || "The passwords don't match",
            minLength: {
              value: 8,
              message: "Minimum 8 characters.",
            },
            pattern: {
              value: PASSWORD_REGEX,
              message: "Requires at least one capital, one digit or one symbol.",
            },
          })}
          required
          label="Repeat Password"
          type="password"
          error={errors.repeatPassword?.message}
        />

        <div className="flex flex-col items-center justify-between space-y-4">
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Reset password
          </Button>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
