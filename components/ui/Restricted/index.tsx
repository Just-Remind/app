import { useContext } from "react";

import { UserContext } from "context";

type Props = {
  children: JSX.Element;
  adminOnly?: boolean;
  privateRoute?: boolean;
};

const Restricted = ({ adminOnly, children, privateRoute }: Props): JSX.Element | null => {
  // CONTEXT
  const user = useContext(UserContext);

  // VARS
  const isAllowed = user.email === "loic.boset@gmail.com";

  if (!adminOnly || isAllowed) return children;

  if (privateRoute) {
    window.history.back();
    return null;
  }

  return null;
};

export default Restricted;
