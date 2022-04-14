import { ReactElement, useEffect, useState } from "react";

import { withSSRContext } from "aws-amplify";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Application from "components/Application";
import { UserContextProvider } from "context";

type Props = {
  user: {
    email: string;
  };
};

type CognitoAttributes = {
  email: string;
};

const App = ({ user }: Props): null | ReactElement => {
  // STATE
  const [isMounted, setIsMounted] = useState(false);

  // next router
  const router = useRouter();

  // hooks
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (user) {
    return (
      <UserContextProvider user={user}>
        <Application />
      </UserContextProvider>
    );
  } else {
    router.push("/login");
    return null;
  }
};

export default App;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { Auth: AuthSSR } = withSSRContext(ctx);

  let user = null;
  await AuthSSR.currentUserInfo()
    .then((res: { attributes: CognitoAttributes }) => {
      if (!res) return;
      const { attributes } = res;
      user = {
        email: attributes.email,
      };
    })
    .catch(() => null);

  return {
    props: {
      user,
    },
  };
};
