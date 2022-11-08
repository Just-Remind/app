import { Auth } from "aws-amplify";
import Link from "next/link";
import { parse } from "query-string";
import { useForm } from "react-hook-form";

import { Input, Button } from "components/ui";
import { PASSWORD_REGEX } from "utils/constants";
import { useToast } from "utils/hooks";

type ResetPasswordFormType = {
  password: string;
  repeatPassword: string;
};

const ResetPassword = (): JSX.Element => {
  // RHF
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormType>();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  // METHODS
  const handleResetPassword = ({ password }: ResetPasswordFormType): Promise<boolean | void> => {
    clearToast();

    const { code, email } = parse(location.search) as {
      code: string;
      email: string;
    };

    return Auth.forgotPasswordSubmit(email, code, password)
      .then(() => setToast({ message: "Your password has been reset!" }))
      .catch((error) => setToast({ type: "error", message: error.message }));
  };

  return (
    <>
      {toast}
      <div className="flex flex-col justify-center m-8 sm:mx-auto sm:w-full sm:max-w-md">
        {toast}
        <Link href="/">
          <a className="mb-6 text-5xl text-center">📚</a>
        </Link>
        <span className="mb-10 text-2xl text-center">Reset your password</span>
        <form className="space-y-6 " onSubmit={handleSubmit(handleResetPassword)}>
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
          <div className="text-center">
            <Link href="/sign_in">
              <a className="text-sm font-medium text-center text-blue-700 hover:text-blue-900">
                Sign in
              </a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
