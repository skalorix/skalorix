import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Standard reveal animation
export function animateReveal(elements, trigger, options = {}) {
  const defaults = {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    start: 'top 85%',
    ...options,
  };

  return gsap.from(elements, {
    y: defaults.y,
    opacity: defaults.opacity,
    duration: defaults.duration,
    stagger: defaults.stagger,
    ease: defaults.ease,
    scrollTrigger: {
      trigger,
      start: defaults.start,
      toggleActions: 'play none none none',
    },
  });
}

// Split text character animation
export function animateChars(element, options = {}) {
  const text = element.textContent;
  element.textContent = '';
  element.style.overflow = 'hidden';
  
  const chars = text.split('').map(char => {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(100%)';
    span.textContent = char === ' ' ? '\u00A0' : char;
    element.appendChild(span);
    return span;
  });

  return gsap.to(chars, {
    y: 0,
    opacity: 1,
    duration: options.duration || 0.8,
    stagger: options.stagger || 0.03,
    ease: options.ease || 'power3.out',
    delay: options.delay || 0,
    ...options,
  });
}

// Line reveal animation
export function animateLines(elements, trigger, options = {}) {
  return gsap.from(elements, {
    y: '100%',
    opacity: 0,
    duration: options.duration || 1.2,
    stagger: options.stagger || 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger,
      start: options.start || 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}

// Fade in animation
export function animateFadeIn(elements, trigger, options = {}) {
  return gsap.from(elements, {
    opacity: 0,
    duration: options.duration || 1.5,
    stagger: options.stagger || 0.1,
    ease: 'power2.out',
    delay: options.delay || 0,
    scrollTrigger: trigger ? {
      trigger,
      start: options.start || 'top 85%',
      toggleActions: 'play none none none',
    } : undefined,
  });
}

// Counter animation
export function animateCounter(element, target, options = {}) {
  return gsap.to(element, {
    textContent: target,
    duration: options.duration || 2,
    ease: 'power2.out',
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
    },
  });
}

// Parallax effect
export function createParallax(element, speed = 0.3) {
  return gsap.to(element, {
    y: () => speed * ScrollTrigger.maxScroll(window),
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
}

export { gsap, ScrollTrigger };
