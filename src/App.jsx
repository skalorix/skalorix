import { useState, useCallback } from 'react';
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

import './styles/index.css';
import './styles/components.css';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Initialize Lenis smooth scrolling
  useLenis();

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <CursorProvider>
      <CustomCursor />
      <GrainOverlay />
      
      {!isLoaded && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <Navigation />
      
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
      
      <Footer />
    </CursorProvider>
  );
}

