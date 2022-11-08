import { useEffect, useState } from "react";

import { Auth } from "aws-amplify";
import Link from "next/link";
import { parse } from "query-string";

import ForgotPasswordForm from "components/parts/SignIn/ForgotPasswordForm";
import SigninForm from "components/parts/SignIn/SigninForm";
import { useToast } from "utils/hooks";

const SignIn = (): JSX.Element => {
  // STATE
  const [isFogotPasswordForm, setIsForgotPasswordForm] = useState(false);

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  useEffect(() => {
    const parsed = parse(location.search) as {
      code: string;
      email: string;
      action: string;
    };
    const { code, email, action } = parsed;
    if (code && email) {
      clearToast();

      if (action === "confirmation") {
        Auth.confirmSignUp(email, code)
          .then(() => setToast({ message: "Account confirmed successfuly!" }))
          .catch((error) => setToast({ type: "error", message: error.message }));
      }
    }
  }, [setToast, clearToast]);

  // METHODS
  const toggleForms = (): void => setIsForgotPasswordForm(!isFogotPasswordForm);

  return (
    <>
      {toast}
      <div className="flex flex-col justify-center m-8">
        <Link href="/">
          <a className="mb-6 text-5xl text-center">📚</a>
        </Link>
        <span className="mb-10 text-2xl text-center">Sign in to Just Remind</span>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {isFogotPasswordForm ? (
            <ForgotPasswordForm setToast={setToast} clearToast={clearToast} />
          ) : (
            <SigninForm setToast={setToast} clearToast={clearToast} />
          )}

          <div className="mt-2">
            <button
              type="button"
              onClick={toggleForms}
              className="w-full px-8 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {isFogotPasswordForm ? "Sign in" : "Forgot your password?"}
            </button>
          </div>

          <div className="flex justify-center mt-2 space-x-2 text-center">
            <p className="text-sm font-medium text-gray-700 hover:text-gray-900">
              New to Just Remind?
            </p>
            <Link href="/sign_up">
              <a className="text-sm font-medium text-blue-700 hover:text-blue-900">
                Create an account.
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
