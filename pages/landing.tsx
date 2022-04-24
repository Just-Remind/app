import { useState, useEffect } from "react";

import { Auth } from "aws-amplify";
import Image from "next/image";
import { parse } from "query-string";

import { SignIn, SignUp, ResetPassword } from "components/parts";
import { Button, DropdownMenu, Modal } from "components/ui";
import { useToast } from "utils/hooks";

import landingImage from "../public/landing_page_image.png";

type ResetPasswordType = {
  email: string;
  code: string;
};

const Landing = (): JSX.Element => {
  // STATE
  const [openModal, setOpenModal] = useState(false);
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordType>(
    { code: "", email: "" }
  );

  // METHODS
  const openSignUpModal = (): void => {
    setOpenModal(true);
  };

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
          .catch((error) =>
            setToast({ type: "error", message: error.message })
          );
      }

      if (action === "password") {
        setResetPasswordModal(true);
        setResetPasswordData({ code, email });
      }
    }
  }, [setToast, clearToast]);

  return (
    <div className="w-full min-h-screen bg-dark-blue">
      {toast}
      <header className="p-4 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Just Remind 📚</h1>
          <DropdownMenu open={!openModal} button="Sign in" buttonClassName="">
            <SignIn openSignUpModal={openSignUpModal} />
          </DropdownMenu>
        </div>
      </header>

      <section className="text-center text-white">
        <Modal open={openModal} setOpen={setOpenModal}>
          <SignUp />
        </Modal>
        <Modal open={resetPasswordModal} setOpen={setResetPasswordModal}>
          <ResetPassword resetPasswordData={resetPasswordData} />
        </Modal>
        <h2 className="px-8 my-8 text-4xl">
          Your Kindle highlights served daily
        </h2>
        <p className="px-8 my-8 text-xl">
          Just Remind (re)inspire you with a daily email containing random
          highlights from your books
        </p>
        <Image
          src={landingImage}
          alt=""
          width={window.innerWidth}
          height={window.innerHeight * 0.36}
          objectFit="cover"
        />
        <div className="p-8 mt-8">
          <Button
            className="w-full font-bold uppercase"
            size="xxl"
            color="orange"
          >
            Get started for free
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
