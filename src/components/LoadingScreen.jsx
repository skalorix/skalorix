import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { SwirlO } from './ui/SkalorixLogo';

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const taglineRef = useRef(null);
  const lineRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        setTimeout(() => onComplete?.(), 100);
      },
    });

    // Letter-by-letter reveal with blur + vertical + opacity
    tl.to(lettersRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.3,
    });

    // Subtle letter spacing expansion
    tl.to(containerRef.current?.querySelector('.loading-screen__wordmark'), {
      letterSpacing: '0.2em',
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.3');

    // Tagline fade in
    tl.to(taglineRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.3');

    // Soft Ochre line sweep
    tl.to(lineRef.current, {
      width: '100%',
      duration: 1,
      ease: 'power2.inOut',
    }, '-=0.4');

    // Hold briefly
    tl.to({}, { duration: 0.3 });

    // Fade out everything
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
    });

    return () => tl.kill();
  }, [onComplete]);

  // Split SKALORIX into individual characters, but replace index 4 (the O) with the swirl SVG
  const letterData = [
    { char: 'S', isSwirl: false },
    { char: 'K', isSwirl: false },
    { char: 'A', isSwirl: false },
    { char: 'L', isSwirl: false },
    { char: 'O', isSwirl: true },   // Swirl replaces O
    { char: 'R', isSwirl: false },
    { char: 'I', isSwirl: false },
    { char: 'X', isSwirl: false, accent: true },
  ];

  return (
    <div
      ref={containerRef}
      className="loading-screen"
      style={{
        pointerEvents: isComplete ? 'none' : 'all',
      }}
    >
      <div className="loading-screen__wordmark">
        {letterData.map((item, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="loading-screen__letter"
            style={item.accent ? { color: 'var(--soft-ochre)' } : undefined}
          >
            {item.isSwirl ? (
              <SwirlO size="0.9em" />
            ) : (
              item.char
            )}
          </span>
        ))}
      </div>
      <div ref={taglineRef} className="loading-screen__tagline">
        Scale Beyond Limits.
      </div>
      <div ref={lineRef} className="loading-screen__line" />
    </div>
  );
}
