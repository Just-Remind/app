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
    <div className="w-full min-h-screen bg-dark-blue lg:grid lg:grid-cols-2">
      {toast}
      <div>
        <header className="p-4 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Just Remind 📚</h1>
            <DropdownMenu button="Sign in">
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
          <h2 className="px-8 my-8 text-4xl md:text-5xl md:px-12 md:my-20">
            Your Kindle highlights served daily
          </h2>
          <p className="px-8 my-8 text-xl md:text-2xl md:px-12 md:my-20">
            Just Remind re-inspires you with a daily email containing random
            highlights from your books 👌
          </p>
          <div className="lg:hidden">
            <Image
              src={landingImage}
              alt="email with random books highlights"
              width={window.innerWidth}
              height={window.innerHeight * 0.36}
              objectFit="cover"
            />
          </div>
          <div className="p-8 mt-8 md:px-12 md:mt-20">
            <Button
              className="w-full px-4 font-bold uppercase md:text-2xl"
              size="xxl"
              color="orange"
              onClick={openSignUpModal}
            >
              Get started for free
            </Button>
          </div>
        </section>
      </div>
      <div className="hidden lg:block lg:relative">
        <Image
          src={landingImage}
          alt="email with random books highlights"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Landing;
