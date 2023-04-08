function goBackOrHome(router) {
  // Check if previous page is from the same origin
  const isPreviousPageFromSameOrigin =
    typeof document !== 'undefined' && document.referrer.startsWith(window.location.origin);

  // If previous page is from same origin, go back
  if (isPreviousPageFromSameOrigin) {
    router.back();
  } else {
    // Otherwise, go to home page
    router.push('/');
  }
}

export default goBackOrHome;
