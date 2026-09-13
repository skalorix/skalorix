import { NAV_ITEMS, SOCIALS } from '../../utils/constants';
import { useCursor } from '../../contexts/CursorContext';
import SkalorixLogo from '../ui/SkalorixLogo';

export default function Footer() {
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <SkalorixLogo size="md" color="var(--parchment)" />
            </div>
            <div className="footer__tagline">Ideas Into Impact.</div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(248,244,234,0.5)', lineHeight: 1.6 }}>
              We combine marketing, creativity, design and technology to help businesses grow.
            </p>
          </div>

          <div>
            <div className="footer__heading">Navigation</div>
            <ul className="footer__links">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="footer__link"
                    onMouseEnter={onMouseEnterInteractive}
                    onMouseLeave={onMouseLeaveInteractive}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer__heading">Social</div>
            <ul className="footer__links">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="footer__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={onMouseEnterInteractive}
                    onMouseLeave={onMouseLeaveInteractive}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer__heading">Contact</div>
            <ul className="footer__links">
              <li>
                <a
                  href="mailto:skalorix.work@gmail.com"
                  className="footer__link"
                  onMouseEnter={onMouseEnterInteractive}
                  onMouseLeave={onMouseLeaveInteractive}
                >
                  skalorix.work@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919409424528"
                  className="footer__link"
                  onMouseEnter={onMouseEnterInteractive}
                  onMouseLeave={onMouseLeaveInteractive}
                >
                  +91 94094 24528
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            © {new Date().getFullYear()}&nbsp;<SkalorixLogo size="sm" color="inherit" />.&nbsp;All rights reserved.
          </span>
          <span style={{ letterSpacing: '0.15em', fontSize: '0.65rem', textTransform: 'uppercase' }}>
            Ideas × Technology × Design × Growth
          </span>
        </div>
      </div>
    </footer>
  );
}
