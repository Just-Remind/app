import { useState } from "react";

import Link from "next/link";

import ResendCodeForm from "./_parts/ResendCodeForm";
import SignUpForm from "./_parts/SignUpForm";

const SignUp = (): JSX.Element => {
  // STATE
  const [resendCodeForm, setResendCodeForm] = useState(false);

  // METHODS
  const toggleForms = (): void => {
    setResendCodeForm(!resendCodeForm);
  };

  return (
    <div className="flex flex-col justify-center m-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Link href="/">
        <a className="mb-10 text-3xl text-center">📚 Just Remind</a>
      </Link>
      <h2 className="mb-4 text-xl">
        {resendCodeForm ? "Resend confirmation email" : "Create your account"}
      </h2>
      {resendCodeForm ? <ResendCodeForm /> : <SignUpForm />}
      <button className="w-full mt-2 font-medium text-center text-gray-700" onClick={toggleForms}>
        {resendCodeForm ? "Sign up" : "Resend confirmation email"}
      </button>
    </div>
  );
};

export default SignUp;
