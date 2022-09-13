import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { Input, Button } from "components/ui";
import { EMAIL_REGEX, PASSWORD_REGEX } from "utils/constants";
import { AlertConfig } from "utils/hooks";

type LoginForm = {
  email: string;
  password: string;
};

type Props = {
  setAlert: (config: AlertConfig) => void;
  clearAlert: () => void;
};

const SigninForm = ({ setAlert, clearAlert }: Props): JSX.Element => {
  // NEXT ROUTER
  const router = useRouter();

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  // METHODS
  const handleSignIn = ({ email, password }: LoginForm): Promise<boolean | void> => {
    clearAlert();
    return Auth.signIn(email, password)
      .then(() => router.push("/"))
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

      <div className="flex flex-col items-center justify-between space-y-4">
        <Button type="submit" className="w-full" loading={isSubmitting}>
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default SigninForm;
