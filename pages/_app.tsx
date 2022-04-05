/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Header } from 'components/ui';

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
      <div className='p-6'>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
