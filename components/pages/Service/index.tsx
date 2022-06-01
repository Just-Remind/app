/* eslint-disable max-len */
import { useContext, useState } from "react";

import { Auth } from "aws-amplify";
import axios from "axios";
import { useRouter } from "next/router";

import { Button } from "components/ui";
import { UserContext } from "context";
import { useToast } from "utils/hooks";

import EmailService from "./helpers/EmailService";

const Service = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  // STATE
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // NEXT ROUTER
  const router = useRouter();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  // METHODS
  const handleDeleteAccount = (): void => {
    setIsDeletingUser(true);
    clearToast();

    Auth.deleteUser()
      .then(() => axios.post("/api/delete_user", { email: user.email }))
      .then(() => router.push("/landing"))
      .catch((error) => {
        console.log("error", error);
        setToast({
          type: "error",
          message:
            "Something went wrong. Please contact support at hello@justremind.app",
        });
      })
      .finally(() => setIsDeletingUser(false));
  };

  return (
    <div>
      {toast}
      <EmailService userEmail={user.email} />
      <div>
        <p className="mb-2 text-lg font-medium text-gray-700">Account</p>
        <Button
          color="red"
          onClick={handleDeleteAccount}
          loading={isDeletingUser}
        >
          Delete account
        </Button>
      </div>
    </div>
  );
};

export default Service;
