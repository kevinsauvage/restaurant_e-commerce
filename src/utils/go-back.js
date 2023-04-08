function goBackOrHome(router) {
  const isPreviousPageFromSameOrigin =
    typeof window !== 'undefined' &&
    window.history.length > 2 &&
    window.history.state &&
    window.history.state.key !== 'initial';

  if (isPreviousPageFromSameOrigin) router.back();
  else router.push('/');
}

export default goBackOrHome;
