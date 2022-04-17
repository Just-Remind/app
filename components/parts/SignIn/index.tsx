import { useState } from "react";

import { useAlert } from "utils/hooks";

import ForgotPasswordForm from "./ForgotPasswordForm";
import SigninForm from "./SigninForm";

type Props = {
  openSignUpModal: () => void;
};

const SignIn = ({ openSignUpModal }: Props): JSX.Element => {
  // STATE
  const [isFogotPasswordForm, setIsForgotPasswordForm] = useState(false);

  // HOOKS
  const [alert, setAlert, clearAlert] = useAlert();

  // METHODS
  const toggleForms = (): void => setIsForgotPasswordForm(!isFogotPasswordForm);

  return (
    <>
      {alert && <div className="mb-4">{alert}</div>}
      <div className="flex flex-col justify-center w-64 mt-2">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {isFogotPasswordForm ? (
            <ForgotPasswordForm setAlert={setAlert} clearAlert={clearAlert} />
          ) : (
            <SigninForm setAlert={setAlert} clearAlert={clearAlert} />
          )}

          <div className="mt-2">
            <button
              type="button"
              onClick={toggleForms}
              className="w-full px-8 text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isFogotPasswordForm ? "Sign in" : "Forgot your password?"}
            </button>
          </div>

          <div className="mt-2">
            <button
              type="button"
              onClick={openSignUpModal}
              className="w-full text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
