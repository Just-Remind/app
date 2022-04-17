import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";

import { Input, Button } from "components/ui";
import { EMAIL_REGEX, PASSWORD_REGEX } from "utils/constants";
import { useAlert } from "utils/hooks";

type SignUpForm = {
  email: string;
  password: string;
  repeatPassword: string;
};

const SignupForm = (): JSX.Element => {
  // RHF
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>();

  // HOOKS
  const [alert, setAlert, clearAlert] = useAlert();

  // METHODS
  const handleSignUp = ({ email, password }: SignUpForm): Promise<void> => {
    clearAlert();

    return Auth.signUp({
      username: email,
      password,
    })
      .then(() => {
        setAlert({ message: "Check you mailbox to confirm your account" });
      })
      .catch((error) => setAlert({ type: "error", message: error.message }));
  };

  return (
    <>
      {alert && <div className="mb-2">{alert}</div>}
      <h2 className="mb-4 text-xl">Create your account</h2>
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
              message:
                "Requires at least one capital, one digit or one symbol.",
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
              repeatPassword === watch("password") ||
              "The passwords don't match",
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
          label="Repeat Password"
          type="password"
          error={errors.repeatPassword?.message}
        />

        <div className="flex flex-col items-center justify-between space-y-4">
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Sign up
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
