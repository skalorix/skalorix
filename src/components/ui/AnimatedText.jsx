import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({
  children,
  as: Tag = 'div',
  animation = 'fadeUp', // fadeUp, splitLines, fadeIn
  delay = 0,
  duration = 1,
  scrollTrigger = true,
  className = '',
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    let tween;

    const triggerConfig = scrollTrigger ? {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    } : {};

    switch (animation) {
      case 'fadeUp':
        tween = gsap.from(el, {
          y: 40,
          opacity: 0,
          duration,
          delay,
          ease: 'power3.out',
          ...triggerConfig,
        });
        break;

      case 'fadeIn':
        tween = gsap.from(el, {
          opacity: 0,
          duration,
          delay,
          ease: 'power2.out',
          ...triggerConfig,
        });
        break;

      case 'splitLines': {
        const lines = el.querySelectorAll('.anim-line');
        if (lines.length) {
          tween = gsap.from(lines, {
            y: '100%',
            opacity: 0,
            duration,
            delay,
            stagger: 0.15,
            ease: 'power3.out',
            ...triggerConfig,
          });
        } else {
          tween = gsap.from(el, {
            y: 40,
            opacity: 0,
            duration,
            delay,
            ease: 'power3.out',
            ...triggerConfig,
          });
        }
        break;
      }

      default:
        break;
    }

    return () => {
      if (tween) tween.kill();
    };
  }, [animation, delay, duration, scrollTrigger]);

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}
