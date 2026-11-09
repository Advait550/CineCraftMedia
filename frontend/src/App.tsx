import { useState, useEffect } from 'react';
import './App.css';
import { Navbar } from './Components/Navbar';
import { HeroSection } from './Components/HeroSection';
import { VideoScrollSection } from './Components/VideoScrollSection';
import { CardStackSection } from './Components/CardStackSection';
import { FeaturedProjects } from './Components/FeaturedProjects';
import { WhyLxL } from './Components/WhyLxL';
import { StudiosBanner } from './Components/StudiosBanner';
import { Footer } from './Components/Footer';
import { PageTransition } from './Components/PageTransition';
import { WhatsAppButton } from './Components/WhatsAppButton';
import { EquipmentsPage } from './Components/EquipmentsPage';

// Color themes for each nav destination's organic stroke transition
const SECTION_TRANSITION_COLORS: Record<string, string> = {
  'services-stack': '#670b22', // Deep Wine / Burgundy Red
  'featured-projects': '#ff5121', // LxL Signature Electric Orange
  'studios': '#055dff', // Electric Royal Blue
  'why-lxl': '#b84c1b', // Terracotta Ochre Amber
  'footer': '#163f2b', // Deep Forest Emerald
  'hero': '#ff5121',
  'home': '#ff5121',
  'equipments': '#0d9488', // Deep Cinema Teal / Cyan transition for Equipments
};

function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'equipments'>(() => {
    return typeof window !== 'undefined' && window.location.pathname.startsWith('/equipments')
      ? 'equipments'
      : 'home';
  });

  const [transitionState, setTransitionState] = useState<{
    active: boolean;
    phase: 'idle' | 'enter' | 'exit';
    color: string;
  }>({
    active: false,
    phase: 'idle',
    color: '#670b22',
  });

  // Listen to browser forward/back buttons
  useEffect(() => {
    const handlePopState = () => {
      const isEquipments = window.location.pathname.startsWith('/equipments');
      setCurrentRoute(isEquipments ? 'equipments' : 'home');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const transitionColor = SECTION_TRANSITION_COLORS[sectionId] || '#0d9488';

    // Phase 1: Slow, cinematic drawing of the organic fluid stroke on screen (0.92s)
    setTransitionState({
      active: true,
      phase: 'enter',
      color: transitionColor,
    });

    // At full coverage (920ms): jump to target section / route behind the color curtain
    setTimeout(() => {
      const isNavigatingToEquipments = sectionId === 'equipments';

      if (isNavigatingToEquipments) {
        setCurrentRoute('equipments');
        if (window.location.pathname !== '/equipments') {
          window.history.pushState({}, '', '/equipments');
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        const wasEquipments = currentRoute === 'equipments';
        if (wasEquipments) {
          setCurrentRoute('home');
          if (window.location.pathname !== '/') {
            window.history.pushState({}, '', '/');
          }
        }

        if (sectionId === 'home' || sectionId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
          // If we were on equipments, wait 60ms for home DOM to mount before scrolling
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: 'instant' });
            } else {
              window.scrollTo({ top: 0, behavior: 'instant' });
            }
          }, wasEquipments ? 60 : 0);
        }
      }

      // Phase 2: Drawing off screen to reveal the new section (0.75s)
      setTransitionState((prev) => ({
        ...prev,
        phase: 'exit',
      }));

      // Phase 3: Transition complete
      setTimeout(() => {
        setTransitionState({
          active: false,
          phase: 'idle',
          color: transitionColor,
        });
      }, 750);
    }, 920);
  };

  return (
    <div className="lxl-app-root">
      {/* Full-Screen Organic SVG Page Transition with slow hand-drawn brush stroke */}
      <PageTransition
        active={transitionState.active}
        phase={transitionState.phase}
        color={transitionState.color}
      />

      {currentRoute === 'equipments' ? (
        <>
          {/* Standalone Equipments Page (/equipments) */}
          <EquipmentsPage onBackToHome={() => handleNavigate('home')} />

          {/* Floating Interactive WhatsApp Inquiry Button */}
          <WhatsAppButton />
        </>
      ) : (
        <>
          {/* Main Navigation with Mega Dropdowns & Custom Underlines */}
          <Navbar onNavigateSection={handleNavigate} />

          {/* Hero Section */}
          <HeroSection />

          {/* Video Zoom & Display Statement Section */}
          <VideoScrollSection />

          {/* Services Card Stacking Deck */}
          <CardStackSection onNavigateEquipments={() => handleNavigate('equipments')} />

          {/* Featured Entertainment Projects Showcase */}
          <FeaturedProjects />

          {/* About & Ethos Section */}
          <WhyLxL />

          {/* Cinecraft Studios Commercial Extension */}
          <StudiosBanner />

          {/* Agency Footer */}
          <Footer />

          {/* Floating Interactive WhatsApp Inquiry Button */}
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}

export default App;
