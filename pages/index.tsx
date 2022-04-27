import { ReactElement, useEffect, useState } from "react";

import { withSSRContext } from "aws-amplify";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Application from "components/Application";
import { UserContextProvider } from "context";
import prisma from "lib/prisma";
import { User } from "types";

type Props = {
  user: User;
};

type CognitoAttributes = {
  email: string;
};

const App = ({ user }: Props): null | ReactElement => {
  console.log("user", user);
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
    router.push("/landing");
    return null;
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

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      cronJobId: true,
    },
  });

  return {
    props: {
      user,
    },
  };
};
