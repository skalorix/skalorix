import { useRef, useEffect, useState } from 'react';
import { useCursor } from '../contexts/CursorContext';
import { useIsTouchDevice } from '../hooks/useMediaQuery';

export default function CustomCursor() {
  const pointRef = useRef(null);
  const reticleRef = useRef(null);
  
  const { cursorType, cursorLabel } = useCursor();
  const isTouch = useIsTouchDevice();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [autoInteractive, setAutoInteractive] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const reticlePos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instant zero-latency tracking for the center diamond pip
      if (pointRef.current) {
        pointRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Automatically detect interactive clickable targets under cursor
      const target = e.target;
      if (target && target.closest) {
        const isClickable = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"], .btn-pill, .interactive, summary, [tabindex="0"]');
        setAutoInteractive(Boolean(isClickable));
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouch, isVisible]);

  useEffect(() => {
    if (isTouch) return;

    const animate = () => {
      // Fluid physics lerp for architectural follower reticle
      const lerp = 0.16;
      const dx = mousePos.current.x - reticlePos.current.x;
      const dy = mousePos.current.y - reticlePos.current.y;

      reticlePos.current.x += dx * lerp;
      reticlePos.current.y += dy * lerp;

      // Dynamic tilt based on horizontal drag velocity
      const tilt = Math.min(Math.max(dx * 0.12, -15), 15);

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${reticlePos.current.x}px, ${reticlePos.current.y}px, 0) rotate(${tilt}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const isExpanded = cursorType === 'expanded' || autoInteractive;
  const isLabeled = cursorType === 'labeled' || Boolean(cursorLabel);

  const containerClasses = [
    'sk-cursor-root',
    isVisible && 'sk-cursor--visible',
    isExpanded && 'sk-cursor--expanded',
    isLabeled && 'sk-cursor--labeled',
    isMouseDown && 'sk-cursor--pressed',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} aria-hidden="true">
      {/* Zero-latency precision diamond star pip */}
      <div ref={pointRef} className="sk-cursor__pip">
        <div className="sk-cursor__pip-diamond" />
      </div>

      {/* Smooth trailing architectural reticle */}
      <div ref={reticleRef} className="sk-cursor__reticle">
        {/* Ambient 45-degree diamond orbit ring */}
        <div className="sk-cursor__diamond-orbit" />

        {/* 4 Architectural Corner Brackets (Unique Non-Round Framing) */}
        <span className="sk-bracket sk-bracket--tl" />
        <span className="sk-bracket sk-bracket--tr" />
        <span className="sk-bracket sk-bracket--bl" />
        <span className="sk-bracket sk-bracket--br" />

        {/* Precision Crosshair Ticks */}
        <span className="sk-tick sk-tick--top" />
        <span className="sk-tick sk-tick--bottom" />
        <span className="sk-tick sk-tick--left" />
        <span className="sk-tick sk-tick--right" />

        {/* Labeled Editorial Beveled Pill Badge */}
        {cursorLabel && (
          <div className="sk-cursor__label-badge">
            <span className="sk-cursor__label-text">{cursorLabel}</span>
            <span className="sk-cursor__label-arrow">→</span>
          </div>
        )}
      </div>
    </div>
  );
}
