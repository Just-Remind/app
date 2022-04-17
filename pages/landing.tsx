import { useState, useEffect } from "react";

import { Auth } from "aws-amplify";
import { parse } from "query-string";

import { SigninForm, SignupModal } from "components/parts";
import { DropdownMenu, Modal } from "components/ui";
import { useToast } from "utils/hooks";

const Landing = (): JSX.Element => {
  // STATE
  const [openModal, setOpenModal] = useState(false);

  // METHODS
  const openSignUpModal = (): void => {
    setOpenModal(true);
  };

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  useEffect(() => {
    const parsed = parse(location.search) as { code: string; email: string };
    const { code, email } = parsed;
    if (code && email) {
      clearToast();

      Auth.confirmSignUp(email, code)
        .then(() => setToast({ message: "Account confirmed successfuly!" }))
        .catch((error) => setToast({ type: "error", message: error.message }));
    }
  }, [setToast, clearToast]);

  return (
    <div className="w-5/6 mx-auto">
      {toast}
      <header className="bg-white border-gray-100">
        <div className="flex items-center justify-between px-6 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <h1 className="text-3xl">Remind 📚</h1>
          </div>
          <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
            <DropdownMenu open={!openModal} button="Sign in">
              <SigninForm openSignUpModal={openSignUpModal} />
            </DropdownMenu>
          </div>
        </div>
      </header>

      <section className="text-center">
        <Modal open={openModal} setOpen={setOpenModal}>
          <SignupModal />
        </Modal>
        <h2 className="pt-8 pb-2 pl-8 pr-8 text-5xl font-bold">
          Your daily dose of <span className="text-red-500">re</span>
          <span className="text-green-500">inspiration</span>
        </h2>
        <p className="text-xl">
          Get your Kindle highlights delivered by email everyday, for free! 👌
        </p>
      </section>
    </div>
  );
};

export default Landing;
