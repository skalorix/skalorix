import { useRef, useEffect } from 'react';
import { useCursor } from '../contexts/CursorContext';
import { useIsTouchDevice } from '../hooks/useMediaQuery';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const { cursorType, cursorLabel } = useCursor();
  const isTouch = useIsTouchDevice();
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;

    const animate = () => {
      const lerp = 0.15;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const className = [
    'custom-cursor',
    cursorType === 'expanded' && 'custom-cursor--expanded',
    cursorType === 'labeled' && 'custom-cursor--labeled',
  ].filter(Boolean).join(' ');

  return (
    <div ref={cursorRef} className={className}>
      <div className="custom-cursor__dot" />
      <div className="custom-cursor__ring">
        {cursorLabel && (
          <span className="custom-cursor__label">{cursorLabel}</span>
        )}
      </div>
    </div>
  );
}
