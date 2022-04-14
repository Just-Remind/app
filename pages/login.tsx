import { useEffect } from "react";

import { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import { parse } from "query-string";
import { useForm } from "react-hook-form";

import { Button, Input } from "components/ui";
import { EMAIL_REGEX, PASSWORD_REGEX } from "utils/constants";

type LoginForm = {
  email: string;
  password: string;
};

const Login = (): JSX.Element => {
  // NEXT ROUTER
  const router = useRouter();

  // RF
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  // HOOKS
  useEffect(() => {
    const parsed = parse(location.search) as { code: string; email: string };
    const { code, email } = parsed;
    if (code && email) {
      Auth.confirmSignUp(email, code)
        .then(() => alert("Account confirmed successfuly!"))
        .catch((err) => alert(err));
    }
  }, []);

  // METHODS
  const handleLogin = ({ email, password }: LoginForm): void => {
    Auth.signIn(email, password)
      .then(() => router.push("/"))
      .catch((err) => alert(err));
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
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

      <div className="flex items-center justify-between">
        <Link href="/signup">
          <a className="text-sm font-medium text-green-600 hover:text-green-500">
            Register
          </a>
        </Link>

        <Link href="/forgot-password">
          <a className="text-sm font-medium text-green-600 hover:text-green-500">
            Forgot your password?
          </a>
        </Link>
      </div>

      <Button title="register" submit size="wide" loading={isSubmitting}>
        Login
      </Button>
    </form>
  );
};

export default Login;
