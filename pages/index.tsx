import { ReactElement, useEffect, useState } from "react";

import { withSSRContext } from "aws-amplify";
import type { GetServerSideProps } from "next";

import Application from "components/Application";
import { UserContextProvider } from "context";
import { User } from "types";

import Landing from "./landing";

type Props = {
  user: User;
};

type CognitoAttributes = {
  email: string;
};

const App = ({ user }: Props): null | ReactElement => {
  // STATE
  const [isMounted, setIsMounted] = useState(false);

  // hooks
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  if (user.email) {
    return (
      <UserContextProvider user={user}>
        <Application />
      </UserContextProvider>
    );
  } else {
    return <Landing />;
  }
};

export default App;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { Auth: AuthSSR } = withSSRContext(ctx);

  let email = "";
  await AuthSSR.currentUserInfo()
    .then((res: { attributes: CognitoAttributes }) => {
      if (!res) return;
      email = res.attributes.email;
    })
    .catch(() => null);

  return {
    props: {
      user: {
        email,
      },
    },
  };
};
