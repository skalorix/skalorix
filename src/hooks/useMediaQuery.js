import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}

export function useIsTablet() {
  return useMediaQuery('(max-width: 1024px)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1025px)');
}

export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    // A device is strictly touch-only if it cannot hover and only has a coarse pointer (e.g. mobile phones)
    const isTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    setIsTouch(isTouchOnly);
  }, []);

  return isTouch;
}
