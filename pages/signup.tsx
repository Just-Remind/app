import { Auth } from "aws-amplify";
import { NextPage } from "next";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { Input, Button } from "components/ui";
import { EMAIL_REGEX, PASSWORD_REGEX } from "utils/constants";

type SignUpForm = {
  email: string;
  password: string;
  repeatPassword: string;
};

const Signup: NextPage = () => {
  // NEXT ROUTER
  // const router = useRouter();

  // HOOKS
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>();

  // METHODS
  const handleSignup = ({ email, password }: SignUpForm): void => {
    Auth.signUp({
      username: email,
      password,
    })
      .then((res) => {
        console.log("res", res);
        alert("Sign up successful! Check you mailbox to confirm your account");
      })
      .catch((error) => {
        console.log("error signing up:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="w-1/2 mx-auto space-y-6"
    >
      <Input
        {...register("email", {
          required: "This field is required",
          setValueAs: (value) => value.toLowerCase(),
          pattern: {
            value: EMAIL_REGEX,
            message: "Entered value does not match email format",
          },
        })}
        label="Email address"
        placeholder="john.doe@example.com"
        name="email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
      />

      <Input
        {...register("password", {
          required: "This field is required",
          minLength: {
            value: 8,
            message: "Minimum length is 8 characters",
          },
          pattern: {
            value: PASSWORD_REGEX,
            message: "Requires at least capital, number, lowercase",
          },
        })}
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
      />

      <Input
        {...register("repeatPassword", {
          required: "This field is required",
          minLength: {
            value: 8,
            message: "Minimum length is 8 characters",
          },
          pattern: {
            value: PASSWORD_REGEX,
            message: "Requires at least capital, number, lowercase",
          },
          validate: (value) =>
            value === watch("password") || "The passwords do not match",
        })}
        label="Repeat password"
        name="repeatPassword"
        type="password"
        error={errors.repeatPassword?.message}
      />

      <div className="flex items-center justify-between">
        <Link href="/login">
          <a className="text-sm font-medium text-green-600 hover:text-green-500">
            Sign in
          </a>
        </Link>

        <Link href="/resend-code">
          <a className="text-sm font-medium text-green-600 hover:text-green-500">
            Resend verication code
          </a>
        </Link>
      </div>

      <Button title="register" submit size="wide" loading={isSubmitting}>
        Register
      </Button>
    </form>
  );
};

export default Signup;
