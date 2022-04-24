import Head from "next/head";

type Props = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: Props): JSX.Element => (
  <>
    <Head>
      <title>Just Remind</title>
      <meta name="description" content="Your kindle highlights served daily" />
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>
    {children}
  </>
);

export default AppWrapper;
