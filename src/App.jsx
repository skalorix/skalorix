import { useState, useCallback, useEffect } from 'react';
import { CursorProvider } from './contexts/CursorContext';
import { useLenis } from './hooks/useLenis';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import GrainOverlay from './components/ui/GrainOverlay';
import WhatWeDo from './components/sections/WhatWeDo';
import AboutPartner from './components/sections/AboutPartner';
import SelectedWork from './components/sections/SelectedWork';
import OurApproach from './components/sections/OurApproach';
import WhySkalorix from './components/sections/WhySkalorix';
import DigitalExperience from './components/sections/DigitalExperience';
import Testimonials from './components/sections/Testimonials';
import CTASection from './components/sections/CTASection';
import Footer from './components/sections/Footer';
import ServicesPage from './components/pages/ServicesPage';

import './styles/index.css';
import './styles/components.css';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Initialize Lenis smooth scrolling
  const lenisRef = useLenis();

  const navigate = useCallback((targetUrl) => {
    if (!targetUrl) return;

    const url = new URL(targetUrl, window.location.origin);
    const path = url.pathname;
    const hash = url.hash;

    window.history.pushState(null, '', targetUrl);
    setCurrentPath(path);

    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (lenisRef?.current) {
            lenisRef.current.scrollTo(el, { duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lenisRef]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    const handleCustomNavigate = (e) => {
      if (e.detail) {
        navigate(e.detail);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('navigate', handleCustomNavigate);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('navigate', handleCustomNavigate);
    };
  }, [navigate]);

  useEffect(() => {
    // If URL already had a hash on initial page load, clean it up
    if (window.location.hash) {
      const initialTarget = document.querySelector(window.location.hash);
      if (initialTarget) {
        setTimeout(() => {
          if (lenisRef?.current) {
            lenisRef.current.scrollTo(initialTarget, { duration: 1.2 });
          } else {
            initialTarget.scrollIntoView({ behavior: 'smooth' });
          }
        }, 200);
      }
      window.history.replaceState(null, '', window.location.pathname);
    }

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      e.preventDefault();

      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        if (lenisRef?.current) {
          lenisRef.current.scrollTo(target, { duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }

      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });
    return () => document.removeEventListener('click', handleAnchorClick, { capture: true });
  }, [lenisRef]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const isServicesPage = currentPath === '/services' || currentPath === '/service';

  return (
    <CursorProvider>
      <CustomCursor />
      <GrainOverlay />
      
      {!isLoaded && !isServicesPage && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <Navigation currentPath={currentPath} onNavigate={navigate} />
      
      {isServicesPage ? (
        <ServicesPage onNavigate={navigate} />
      ) : (
        <main>
          <Hero isLoaded={isLoaded} />
          <WhatWeDo />
          <AboutPartner />
          <SelectedWork />
          <OurApproach />
          <WhySkalorix />
          <DigitalExperience />
          <Testimonials />
          <CTASection />
        </main>
      )}
      
      <Footer onNavigate={navigate} />
    </CursorProvider>
  );
}

