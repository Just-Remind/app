import React, { createContext } from "react";

import { User } from "types";

type Props = {
  user: User;
  children: React.ReactNode;
};

const UserContext = createContext({} as User);

const UserContextProvider = ({ user, children }: Props): JSX.Element => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

export { UserContext, UserContextProvider };
