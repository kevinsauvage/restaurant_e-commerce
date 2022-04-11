import { useCallback, useEffect, useState } from 'react';

const useScrollDirection = () => {
  const [y, setY] = useState();

  useEffect(() => setY(document?.scrollingElement.scrollHeight), []);

  const [scrollDirection, setScrollDirection] = useState('');

  const handleNavigation = useCallback(() => {
    if (y > window.scrollY) setScrollDirection('up');
    else if (y < window.scrollY) setScrollDirection('down');
    setY(window.scrollY);
  }, [y]);

  useEffect(() => {
    window.addEventListener('scroll', handleNavigation);

    return () => window.removeEventListener('scroll', handleNavigation);
  }, [handleNavigation]);

  return scrollDirection;
};

export default useScrollDirection;
