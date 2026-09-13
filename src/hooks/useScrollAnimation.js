import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(callback, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ref.current) {
        callback(ref.current, gsap, ScrollTrigger);
      }
    }, ref);

    return () => ctx.revert();
  }, deps);

  return ref;
}
