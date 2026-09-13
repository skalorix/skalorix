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
      setScrolled(window.scrollY > 40);
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
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled scrolled' : ''}`} id="navigation">
        <div className="nav__inner">
          <a href="#home" className="nav__logo" onClick={(e) => handleNavClick(e, '#home')}>
            <SkalorixLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav__links">
            <li>
              <a
                href="#home"
                className="nav__link"
                onClick={(e) => handleNavClick(e, '#home')}
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
              >
                Home
              </a>
            </li>
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
          </ul>

          {/* Editorial Pill CTAs */}
          <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="#work"
              className="btn-pill btn-outline nav-cta-desktop"
              onClick={(e) => handleNavClick(e, '#work')}
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              Explore Work
            </a>
            <a
              href="#contact"
              className={`btn-pill btn-primary nav-cta-talk ${mobileOpen ? 'nav-cta-talk--hidden' : ''}`}
              onClick={(e) => handleNavClick(e, '#contact')}
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              Let's Talk <span>→</span>
            </a>

            {/* Mobile hamburger button */}
            <button
              className={`hamburger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer with Editorial Numbering */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} id="mobileMenu">
        <a href="#home" className="mobile-menu__link" onClick={(e) => handleNavClick(e, '#home')}>
          Home <small>01</small>
        </a>
        <a href="#services" className="mobile-menu__link" onClick={(e) => handleNavClick(e, '#services')}>
          Services <small>02</small>
        </a>
        <a href="#about" className="mobile-menu__link" onClick={(e) => handleNavClick(e, '#about')}>
          About <small>03</small>
        </a>
        <a href="#work" className="mobile-menu__link" onClick={(e) => handleNavClick(e, '#work')}>
          Work <small>04</small>
        </a>
        <a href="#process" className="mobile-menu__link" onClick={(e) => handleNavClick(e, '#process')}>
          Process <small>05</small>
        </a>
        <a href="#why" className="mobile-menu__link" onClick={(e) => handleNavClick(e, '#why')}>
          Why Us <small>06</small>
        </a>
        <a href="#contact" className="mobile-menu__link" onClick={(e) => handleNavClick(e, '#contact')}>
          Contact <small>08</small>
        </a>

        <div className="mobile-menu__footer">
          <a
            href="#contact"
            className="mobile-menu__cta-btn"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Start a Project <span>→</span>
          </a>
        </div>
      </div>
    </>
  );
}

