import { useState } from 'react';
import { NAV_ITEMS, SERVICES } from '../../utils/constants';
import { useCursor } from '../../contexts/CursorContext';
import SkalorixLogo from '../ui/SkalorixLogo';

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}


export default function Footer() {
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ text: 'Monthly insights. No spam.', color: 'var(--text-mute)' });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus({ text: 'Please enter a valid email address.', color: '#E05A47' });
      return;
    }
    setNewsletterStatus({ text: 'Thanks — you’re on the list. Check your inbox.', color: 'var(--forest)' });
    setNewsletterEmail('');
  };

  return (
    <footer className="footer-editorial" role="contentinfo">
      <div className="container">
        <div className="footer-top-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-brand-col">
            <div style={{ marginBottom: '18px' }}>
              <SkalorixLogo size="md" color="var(--forest)" />
            </div>
            <p>
              Skalorix — Scale Beyond Limits. We design, develop, and deliver bespoke digital solutions that help ambitious businesses grow with clarity and craft.
            </p>
            <div className="socials-list">
              <a
                href="https://www.instagram.com/skalorixofficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
              >
                <LinkedinIcon size={17} />
              </a>
              <a
                href="https://x.com/skalorix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
              >
                <TwitterIcon size={17} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links-col">
            <h5>Navigation</h5>
            <ul>
              <li><a href="#home" onMouseEnter={onMouseEnterInteractive} onMouseLeave={onMouseLeaveInteractive}>Home</a></li>
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onMouseEnter={onMouseEnterInteractive}
                    onMouseLeave={onMouseLeaveInteractive}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Disciplines */}
          <div className="footer-links-col">
            <h5>Services</h5>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.num}>
                  <a
                    href="#services"
                    onMouseEnter={onMouseEnterInteractive}
                    onMouseLeave={onMouseLeaveInteractive}
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="footer-contact-col">
            <h5>Contact & Newsletter</h5>
            
            <div className="footer-contact-cards">
              <div className="footer-contact-item">
                <span className="footer-contact-label">Direct Reach</span>
                <a href="mailto:skalorix.work@gmail.com" className="footer-contact-val">skalorix.work@gmail.com</a>
                <a href="tel:+919409424528" className="footer-contact-val">+91 94094 24528</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Presence</span>
                <span className="footer-contact-val">Remote • Global</span>
                <span className="footer-contact-sub">Bespoke Worldwide</span>
              </div>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="newsletter-submit-btn"
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
              >
                Join
              </button>
            </form>
            <p className="newsletter-status" style={{ color: newsletterStatus.color }}>
              {newsletterStatus.text}
            </p>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-bar__brand">
            <SkalorixLogo size="sm" color="var(--forest)" />
            <span className="footer-bottom-bar__sep">•</span>
            <span className="footer-bottom-bar__tagline">Scale Beyond Limits</span>
          </div>

          <div className="footer-bottom-bar__links">
            <a href="#" onMouseEnter={onMouseEnterInteractive} onMouseLeave={onMouseLeaveInteractive}>Privacy Policy</a>
            <span className="footer-bottom-bar__sep">•</span>
            <a href="#" onMouseEnter={onMouseEnterInteractive} onMouseLeave={onMouseLeaveInteractive}>Terms of Service</a>
            <span className="footer-bottom-bar__sep">•</span>
            <a href="#" onMouseEnter={onMouseEnterInteractive} onMouseLeave={onMouseLeaveInteractive}>Sitemap</a>
          </div>

          <div className="footer-bottom-bar__copy">
            © {new Date().getFullYear()} Skalorix. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

