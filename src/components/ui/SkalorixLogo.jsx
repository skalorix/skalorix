import swirlOImg from '../../assets/skalorix-o-512.png';

/**
 * SkalorixLogo — Renders "SKALORIX" with the custom swirl element replacing the "O".
 * Uses the authentic brand emblem with intertwining Deep Forest green and Soft Ochre gold arcs.
 * 
 * Props:
 *   - size: 'sm' | 'md' | 'lg' | 'xl' — controls the overall text size
 *   - color: CSS color for the text (default: currentColor)
 *   - accentX: color for the "X" letter (default: false)
 *   - className: additional CSS class
 */
export default function SkalorixLogo({ size = 'md', color, accentX = false, className = '' }) {
  const sizeMap = {
    sm: { fontSize: '0.95rem', swirlSize: '0.86em' },
    md: { fontSize: '1.25rem', swirlSize: '0.88em' },
    lg: { fontSize: 'clamp(2rem, 5vw, 4rem)', swirlSize: '0.88em' },
    xl: { fontSize: 'clamp(3rem, 6vw, 5rem)', swirlSize: '0.88em' },
  };

  const { fontSize, swirlSize } = sizeMap[size] || sizeMap.md;

  return (
    <span
      className={`skalorix-logo ${className}`}
      style={{
        fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: color || 'currentColor',
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 1,
        verticalAlign: 'middle',
      }}
    >
      <span className="skalorix-logo__prefix">SKAL</span>
      <SwirlO size={swirlSize} />
      <span className="skalorix-logo__suffix">
        RI{accentX ? (
          <span style={{ color: 'var(--soft-ochre, #D4B483)' }}>X</span>
        ) : (
          'X'
        )}
      </span>
    </span>
  );
}

/**
 * SwirlO — Authentic brand swirl element that replaces the "O" in SKALORIX.
 */
export function SwirlO({ size = '0.88em', className = '', style = {} }) {
  const dim = typeof size === 'number' ? `${size}px` : size;
  return (
    <span
      className={`skalorix-swirl-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        verticalAlign: 'middle',
        margin: '0 0.04em',
        flexShrink: 0,
        position: 'relative',
        ...style,
      }}
      aria-hidden="true"
    >
      <img
        src={swirlOImg}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </span>
  );
}

