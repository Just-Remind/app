import { useState } from "react";

import { useAlert } from "utils/hooks";

import ResendCodeForm from "./ResendCodeForm";
import SignupForm from "./SignupForm";

const SignupModal = (): JSX.Element => {
  // STATE
  const [resendCodeForm, setResendCodeForm] = useState(false);

  // HOOKS
  const [alert, setAlert, clearAlert] = useAlert();

  // METHODS
  const toggleForms = (): void => {
    clearAlert();
    setResendCodeForm(!resendCodeForm);
  };

  return (
    <>
      {alert && <div className="mb-2">{alert}</div>}
      <h2 className="mb-4 text-xl">
        {resendCodeForm ? "Resend confirmation email" : "Create your account"}
      </h2>
      {resendCodeForm ? (
        <ResendCodeForm setAlert={setAlert} clearAlert={clearAlert} />
      ) : (
        <SignupForm setAlert={setAlert} clearAlert={clearAlert} />
      )}
      <button className="w-full mt-4 text-center text-gray-700" onClick={toggleForms}>
        {resendCodeForm ? "Sign up" : "Resend confirmation email"}
      </button>
    </>
  );
};

export default SignupModal;
