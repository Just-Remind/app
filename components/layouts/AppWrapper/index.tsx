import Head from "next/head";

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
    {children}
  </>
);

export default AppWrapper;