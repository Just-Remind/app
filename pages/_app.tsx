import "../styles/globals.css";
import { useState, useEffect } from "react";

import Amplify from "aws-amplify";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { AppWrapper } from "components/layouts";
import awsconfig from "src/aws-exports";

Amplify.configure({
  ...awsconfig,
  ssr: true,
});
const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element | null => {
  // STATE
  const [isMounted, setIsMounted] = useState(false);

  // HOOKS
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </QueryClientProvider>
  );
};

export default MyApp;
