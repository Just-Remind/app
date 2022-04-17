import { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { Input, Button } from "components/ui";
import { EMAIL_REGEX, PASSWORD_REGEX } from "utils/constants";

type LoginForm = {
  email: string;
  password: string;
};

type Props = {
  openSignUpModal: () => void;
};

const SigninForm = ({ openSignUpModal }: Props): JSX.Element => {
  // NEXT ROUTER
  const router = useRouter();

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  // METHODS
  const handleSignIn = ({
    email,
    password,
  }: LoginForm): Promise<boolean | void> =>
    Auth.signIn(email, password)
      .then(() => router.push("/"))
      .catch((err) => alert(err));

  return (
    <div className="flex flex-col justify-center mt-2">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
          <Input
            {...register("password", {
              minLength: {
                value: 8,
                message: "Minimum 8 characters.",
              },
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  "Requires at least one capital, one digit or one symbol.",
              },
            })}
            required
            label="Password"
            type="password"
            error={errors.password?.message}
          />

          <div className="flex flex-col items-center justify-between space-y-4">
            <Button type="submit" className="w-full" loading={isSubmitting}>
              Sign in
            </Button>

            <div className="text-sm">
              <Link href="/reset-password">
                <a className="px-6 font-medium text-indigo-600 hover:text-indigo-500 whitespace-nowrap">
                  Forgot your password?
                </a>
              </Link>
            </div>

            <div className="text-sm">
              <button
                type="button"
                onClick={openSignUpModal}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
