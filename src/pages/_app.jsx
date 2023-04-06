import { useEffect } from 'react';
import { useRouter } from 'next/router';

import wrapper from '../store/store';

import '../styles/globals.scss';

const storePathValues = () => {
  const storage = window?.sessionStorage;
  if (!storage) return;

  const previousPath = storage.getItem('currentPath');

  storage.setItem('prevPath', previousPath);
  storage.setItem('currentPath', window.location.pathname);
};

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => storePathValues(), [router.asPath]);
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(App);
