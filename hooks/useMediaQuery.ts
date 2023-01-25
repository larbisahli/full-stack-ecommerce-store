import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string, value: number) => {
  const [mediaQueryMatches, setMediaQueryMatches] = useState<boolean>(false);

  useEffect(() => {
    setMediaQueryMatches(window.innerWidth <= value);
    let mql = window.matchMedia(`(${query}: ${value}px)`);
    mql.addEventListener('change', (e) => handler(e));
    const handler = (e) => {
      if (e.matches) setMediaQueryMatches(true);
      else setMediaQueryMatches(false);
    };
    return () => mql.removeEventListener('change', (e) => handler(e));
  }, [query, value]);

  return mediaQueryMatches;
};
