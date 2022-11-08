import { Auth } from "aws-amplify";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Input, Button } from "components/ui";
import { EMAIL_REGEX, PASSWORD_REGEX } from "utils/constants";
import { useToast } from "utils/hooks";

type SignupFormType = {
  email: string;
  password: string;
  repeatPassword: string;
};

const SignUp = (): JSX.Element => {
  // RHF
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormType>();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  // METHODS
  const handleSignUp = ({ email, password }: SignupFormType): Promise<void> => {
    clearToast();

    return Auth.signUp({
      username: email,
      password,
    })
      .then(() => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone) {
          axios.post("/api/create_cron_job", {
            email,
            timezone: timezone,
          });
        }
      })
      .then(() => {
        reset();
        setToast({ message: "Check you mailbox to confirm your account" });
      })
      .catch((error) => setToast({ type: "error", message: error.message }));
  };

  return (
    <>
      {toast}
      <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)}>
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
            Sign up
          </Button>
        </div>

        <div className="flex justify-center p-4 mt-4 space-x-2 text-center">
          <p className="font-medium text-gray-700  hover:text-gray-900">Already have an account?</p>
          <Link href="/sign_in">
            <a className="font-medium text-blue-700  hover:text-blue-900">Sign in.</a>
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignUp;
