import { useContext } from "react";

import { UserContext } from "context";

import AccountSettings from "./parts/AccountSettings";
import EmailSettings from "./parts/EmailSettings";

const Settings = (): JSX.Element => {
  // CONTEXT
  const user = useContext(UserContext);

  return (
    <div className="space-y-10">
      <EmailSettings userEmail={user.email} />
      <AccountSettings />
    </div>
  );
};

export default Settings;
