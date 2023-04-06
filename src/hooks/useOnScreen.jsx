import { useEffect, useState } from 'react';

const useOnScreen = (reference, rootMargin = '0px', threshold = 0) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    if (reference.current) observer.observe(reference.current);

    return () => observer.disconnect(reference);
  }, [reference, rootMargin, threshold]);

  return isIntersecting;
};

export default useOnScreen;
