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

      <div className="pb-4 mb-4 space-y-1 border-b">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Account Settings</h3>
        <p className="max-w-2xl text-sm text-gray-500">Manage your account.</p>
      </div>

      <Button color="red" onClick={handleDeleteAccount} loading={isDeletingUser}>
        Delete account
      </Button>
    </>
  );
};

export default AccountSettings;
