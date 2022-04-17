import { useRouter } from 'next/router';
import { useEffect } from 'react';
import wrapper from '../store/store';
import '../styles/globals.scss';

function App({ Component, pageProps }) {
  const router = useRouter();

  function storePathValues() {
    const storage = window?.sessionStorage;
    if (!storage) return;

    const prevPath = storage.getItem('currentPath');

    storage.setItem('prevPath', prevPath);
    storage.setItem('currentPath', window.location.pathname);
  }

  useEffect(() => storePathValues(), [router.asPath]);

  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
