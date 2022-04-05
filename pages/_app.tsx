/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Header } from 'components/Navigation';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // NEXT ROUTER
  const router = useRouter();

  // STATE
  const [isMounted, setIsMounted] = useState(false);

  // HOOKS
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!localStorage.getItem('userId')) {
    router.push('/login');
    return null;
  }
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
