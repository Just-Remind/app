import { Auth } from "aws-amplify";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Input, Button } from "components/ui";
import { EMAIL_REGEX } from "utils/constants";

type ResendCodeForm = {
  email: string;
};

const ResendCode = (): JSX.Element => {
  // HOOKS
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResendCodeForm>();

  // METHODS
  const resendConfirmationCode = ({ email }: ResendCodeForm): void => {
    Auth.resendSignUp(email)
      .then(() => alert("Code resent successfully!"))
      .catch((err) => console.log("error resending code: ", err));
  };

  return (
    <form
      onSubmit={handleSubmit(resendConfirmationCode)}
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

      <div className="flex items-center justify-between">
        <Link href="/login">
          <a className="text-sm font-medium text-green-600 hover:text-green-500">
            Sign in
          </a>
        </Link>

        <Link href="/signup">
          <a className="text-sm font-medium text-green-600 hover:text-green-500">
            Sign up
          </a>
        </Link>
      </div>

      <Button title="register" submit size="wide" loading={isSubmitting}>
        Resend code
      </Button>
    </form>
  );
};

export default ResendCode;
