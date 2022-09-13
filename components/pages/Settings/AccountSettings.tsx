import { useContext, useState } from "react";

import { Auth } from "aws-amplify";
import axios from "axios";
import { useRouter } from "next/router";

import { Button } from "components/ui";
import { UserContext } from "context";
import { useToast } from "utils/hooks";

const AccountSettings = (): JSX.Element => {
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
      .catch(() => {
        setToast({
          type: "error",
          message: "Something went wrong. Please contact support at hello@justremind.app",
        });
      })
      .finally(() => setIsDeletingUser(false));
  };

  return (
    <>
      {toast}

      <div>
        <p className="mb-2 text-lg font-medium text-gray-700">Account Settings</p>
        <Button color="red" onClick={handleDeleteAccount} loading={isDeletingUser}>
          Delete account
        </Button>
      </div>
    </>
  );
};

export default AccountSettings;
