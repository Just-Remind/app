import Head from "next/head";

import { Header } from "components/ui";

type Props = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: Props): JSX.Element => (
  <>
    <Head>
      <title>Remind</title>
      <meta name="description" content="Daily re-inspiration" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <main className="p-6">{children}</main>
  </>
);

export default AppWrapper;
