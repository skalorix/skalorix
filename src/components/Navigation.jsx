import { useState, useEffect, useCallback } from 'react';
import { NAV_ITEMS } from '../utils/constants';
import { useCursor } from '../contexts/CursorContext';
import SkalorixLogo from './ui/SkalorixLogo';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} id="navigation">
      <div className="nav__inner">
        <a href="#" className="nav__logo">
          <SkalorixLogo size="md" />
        </a>

        {/* Desktop links */}
        <ul className="nav__links">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="nav__link"
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="nav__cta"
              onClick={(e) => handleNavClick(e, '#contact')}
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              Start a Project
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className={`nav__toggle ${mobileOpen ? 'nav__toggle--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="nav__toggle-line" />
          <span className="nav__toggle-line" />
          <span className="nav__toggle-line" />
        </button>

        {/* Mobile menu */}
        <div className={`nav__mobile-menu ${mobileOpen ? 'nav__mobile-menu--open' : ''}`}>
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className="nav__mobile-link"
              onClick={(e) => handleNavClick(e, item.href)}
              style={{ transitionDelay: mobileOpen ? `${0.1 + i * 0.08}s` : '0s' }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav__mobile-cta"
            onClick={(e) => handleNavClick(e, '#contact')}
            style={{ transitionDelay: mobileOpen ? `${0.1 + NAV_ITEMS.length * 0.08}s` : '0s' }}
          >
            Start a Project
          </a>
        </div>
      </div>
    </nav>
  );
}
