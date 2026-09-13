import { useCursor } from '../../contexts/CursorContext';

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  href,
  onClick,
  arrow = false,
  className = '',
  ...props
}) {
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();

  const classes = [
    'btn',
    `btn--${variant}`,
    size === 'large' && 'btn--large',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {children}
      {arrow && <span className="btn__arrow">→</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onMouseEnter={onMouseEnterInteractive}
        onMouseLeave={onMouseLeaveInteractive}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      onMouseEnter={onMouseEnterInteractive}
      onMouseLeave={onMouseLeaveInteractive}
      {...props}
    >
      {content}
    </button>
  );
}
