import React, { useState, useEffect, useRef } from 'react';
import { CinecraftMediaLogo } from './Icons';

interface NavbarProps {
  onNavigateSection?: (sectionId: string) => void;
}

type NavKey = 'work' | 'services' | 'studios' | 'about' | 'contact';

// 8 distinct hand-drawn SVG doodle underline paths
const DOODLE_PATHS = [
  // 1. Loop doodle with underside flourish curl (Screenshot 1 style)
  'M 2,7 C 28,5 62,6 88,7 C 94,7.5 97,10 94,12.5 C 90,15.5 76,15.8 55,14.5 C 38,13.2 24,13.5 12,14.2',

  // 2. Smooth hand-drawn wave / wiggle (Screenshot 2 style)
  'M 2,9 C 16,3.5 32,15.5 48,8.5 C 64,2.5 78,14.5 96,8',

  // 3. Fluid undulating curve (Screenshot 3 style)
  'M 2,9 C 24,13.5 48,3.5 70,10 C 82,13.5 90,5.5 98,7.5',

  // 4. Double ripple / rhythmic doodle (Screenshot 4 style)
  'M 2,8 C 10,2.5 18,14.5 32,7.5 C 44,2 54,14.5 68,7 C 78,2 88,14.5 98,7.5',

  // 5. Smiling curved upward arch (Screenshot 5 style)
  'M 2,5 C 25,14.5 75,14.5 98,5.5',

  // 6. Loop-de-loop knot in the center
  'M 2,10 C 24,8.5 38,8.5 46,5.5 C 51,2.5 54,11 49,13 C 44,15 41,7 50,6 C 62,5 78,10.5 98,9.5',

  // 7. Dynamic swoosh with subtle upward flick
  'M 2,12 C 28,6 54,14 78,11 C 88,10 94,6.5 98,3.5',

  // 8. Layered return scribble / double trace
  'M 2,7 C 32,5 68,5 98,7 C 88,10.5 72,13.5 52,13.5 C 36,13.5 18,14.5 5,14',
];

interface AnimatedUnderlineProps {
  navKey: NavKey;
  variantIndex: number;
  renderKey: number;
  isStudiosTheme: boolean;
}

const AnimatedUnderline: React.FC<AnimatedUnderlineProps> = ({
  navKey,
  variantIndex,
  renderKey,
  isStudiosTheme,
}) => {
  const pathData = DOODLE_PATHS[variantIndex % DOODLE_PATHS.length];
  const strokeColor = navKey === 'studios' || isStudiosTheme ? '#055dff' : '#ff5121';

  return (
    <svg
      key={`${navKey}-${variantIndex}-${renderKey}`}
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      fill="none"
      style={{
        position: 'absolute',
        left: '-6%',
        right: '-6%',
        bottom: '-7px',
        width: '112%',
        height: '13px',
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <path
        d={pathData}
        pathLength={100}
        stroke={strokeColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="nav-underline-path"
      />
    </svg>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState<NavKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesAccordionOpen, setServicesAccordionOpen] = useState(false);
  const leaveTimeoutRef = useRef<number | null>(null);

  // Maintain separate variant index and render count for each nav item
  const [underlineVariants, setUnderlineVariants] = useState<Record<NavKey, number>>({
    work: 0,
    services: 1,
    studios: 2,
    about: 3,
    contact: 4,
  });

  const [underlineKeys, setUnderlineKeys] = useState<Record<NavKey, number>>({
    work: 0,
    services: 0,
    studios: 0,
    about: 0,
    contact: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveHover(null);
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // When hovering, cycle to a DIFFERENT doodle underline every single time
  const handleNavMouseEnter = (key: NavKey) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    // Pick a new variant different from current
    setUnderlineVariants((prev) => {
      const current = prev[key];
      let next = (current + 1 + Math.floor(Math.random() * (DOODLE_PATHS.length - 1))) % DOODLE_PATHS.length;
      if (next === current) {
        next = (current + 1) % DOODLE_PATHS.length;
      }
      return { ...prev, [key]: next };
    });

    // Increment renderKey to re-trigger the CSS draw-in animation
    setUnderlineKeys((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));

    setActiveHover(key);
  };

  const handleContainerMouseLeave = () => {
    leaveTimeoutRef.current = window.setTimeout(() => {
      setActiveHover(null);
    }, 160);
  };

  const handleContainerMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  };

  const isDropdownOpen = activeHover === 'work' || activeHover === 'services' || activeHover === 'studios';
  const isStudiosTheme = activeHover === 'studios';

  const getLinkColor = (key: NavKey) => {
    if (isStudiosTheme) {
      return activeHover === key ? '#0d1522' : '#5b6978';
    }
    if (activeHover) {
      return activeHover === key ? '#ffffff' : 'rgba(252, 242, 189, 0.45)';
    }
    return 'var(--swatch--light)';
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: '20px 36px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        {/* Left Brand Logo (fades in on scroll) */}
        <div
          style={{
            pointerEvents: 'auto',
            paddingTop: '8px',
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <a
            href="#hero"
            onClick={(e) => handleLinkClick('hero', e)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <CinecraftMediaLogo height={30} />
            {/* "CineCraft" styled text: cursive "Cine" + bold "craft" */}
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '1px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '22px',
                  fontWeight: 400,
                  color: '#ff5121',
                  lineHeight: 1,
                  letterSpacing: '-0.5px',
                }}
              >
                Cine
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--swatch--light)',
                  letterSpacing: '0.3px',
                  textTransform: 'lowercase',
                }}
              >
                craft
              </span>
            </span>
          </a>
        </div>

        {/* Right Desktop Nav Card Container */}
        <div
          className="desktop-nav-card"
          onMouseEnter={handleContainerMouseEnter}
          onMouseLeave={handleContainerMouseLeave}
          style={{
            pointerEvents: 'auto',
            width: '430px',
            maxWidth: 'calc(100vw - 72px)',
            maxHeight: isDropdownOpen ? 'calc(100vh - 40px)' : 'none',
            overflowY: isDropdownOpen ? 'auto' : 'visible',
            borderRadius: '24px',
            backgroundColor: isStudiosTheme
              ? '#e1effa'
              : isDropdownOpen
                ? '#211c19'
                : scrolled
                  ? 'rgba(33, 28, 25, 0.85)'
                  : 'transparent',
            backdropFilter: !isDropdownOpen && scrolled ? 'blur(16px)' : 'none',
            border: isStudiosTheme
              ? '1px solid rgba(5, 93, 255, 0.18)'
              : isDropdownOpen
                ? '1px solid rgba(252, 242, 189, 0.12)'
                : scrolled
                  ? '1px solid rgba(252, 242, 189, 0.08)'
                  : '1px solid transparent',
            boxShadow: isStudiosTheme
              ? '0 24px 60px rgba(0, 0, 0, 0.35)'
              : isDropdownOpen
                ? '0 24px 60px rgba(0, 0, 0, 0.7)'
                : 'none',
            padding: isDropdownOpen ? '18px 22px 22px 22px' : '12px 18px',
            transition:
              'background-color 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.28s ease, box-shadow 0.28s ease, padding 0.28s ease',
          }}
        >
          {/* Top Nav Links Row (Work, Services, LxL Studios, About, Contact) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              userSelect: 'none',
            }}
          >
            {/* 1. Work */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => handleNavMouseEnter('work')}
            >
              <button
                onClick={(e) => handleLinkClick('featured-projects', e)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '0.4px',
                  color: getLinkColor('work'),
                  padding: '6px 2px',
                  transition: 'color 0.2s ease',
                  outline: 'none',
                }}
              >
                Work
              </button>
              {activeHover === 'work' && (
                <AnimatedUnderline
                  navKey="work"
                  variantIndex={underlineVariants.work}
                  renderKey={underlineKeys.work}
                  isStudiosTheme={isStudiosTheme}
                />
              )}
            </div>

            {/* 2. Services */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => handleNavMouseEnter('services')}
            >
              <button
                onClick={(e) => handleLinkClick('services-stack', e)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '0.4px',
                  color: getLinkColor('services'),
                  padding: '6px 2px',
                  transition: 'color 0.2s ease',
                  outline: 'none',
                }}
              >
                Services
              </button>
              {activeHover === 'services' && (
                <AnimatedUnderline
                  navKey="services"
                  variantIndex={underlineVariants.services}
                  renderKey={underlineKeys.services}
                  isStudiosTheme={isStudiosTheme}
                />
              )}
            </div>

            {/* 3. LxL Studios */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => handleNavMouseEnter('studios')}
            >
              <button
                onClick={(e) => handleLinkClick('studios', e)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '0.4px',
                  color: getLinkColor('studios'),
                  padding: '6px 2px',
                  transition: 'color 0.2s ease',
                  outline: 'none',
                }}
              >
                CCM Studios
              </button>
              {activeHover === 'studios' && (
                <AnimatedUnderline
                  navKey="studios"
                  variantIndex={underlineVariants.studios}
                  renderKey={underlineKeys.studios}
                  isStudiosTheme={isStudiosTheme}
                />
              )}
            </div>

            {/* 4. About */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => handleNavMouseEnter('about')}
            >
              <button
                onClick={(e) => handleLinkClick('why-lxl', e)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '0.4px',
                  color: getLinkColor('about'),
                  padding: '6px 2px',
                  transition: 'color 0.2s ease',
                  outline: 'none',
                }}
              >
                About
              </button>
              {activeHover === 'about' && (
                <AnimatedUnderline
                  navKey="about"
                  variantIndex={underlineVariants.about}
                  renderKey={underlineKeys.about}
                  isStudiosTheme={isStudiosTheme}
                />
              )}
            </div>

            {/* 5. Contact */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => handleNavMouseEnter('contact')}
            >
              <button
                onClick={(e) => handleLinkClick('footer', e)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '0.4px',
                  color: getLinkColor('contact'),
                  padding: '6px 2px',
                  transition: 'color 0.2s ease',
                  outline: 'none',
                }}
              >
                Contact
              </button>
              {activeHover === 'contact' && (
                <AnimatedUnderline
                  navKey="contact"
                  variantIndex={underlineVariants.contact}
                  renderKey={underlineKeys.contact}
                  isStudiosTheme={isStudiosTheme}
                />
              )}
            </div>
          </div>

          {/* Dropdown Content Body */}
          {isDropdownOpen && (
            <div
              key={activeHover}
              className="nav-dropdown-enter"
              style={{
                marginTop: '18px',
                paddingTop: '16px',
                borderTop: isStudiosTheme
                  ? '1px solid rgba(5, 93, 255, 0.12)'
                  : '1px solid rgba(252, 242, 189, 0.08)',
              }}
            >
              {/* Dropdown Panel 1: WORK (Screenshot 1) */}
              {activeHover === 'work' && (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                    {[
                      {
                        title: 'THE VALLEY RUN',
                        type: 'Automotive, Drones & Trackside',
                        img: '/media/work/Valley.webp',
                      },
                      {
                        title: 'SUNBURN KOLHAPUR',
                        type: 'Music Festival & Aerial Production',
                        img: '/media/work/Sunburn.webp',
                      },
                      {
                        title: 'LOLLAPALOOZA 2K25',
                        type: 'Live Festival Cinematography',
                        img: '/media/work/Lollapalooza_2k25.webp',
                      },
                    ].map((p, i) => (
                      <div
                        key={i}
                        onClick={(e) => handleLinkClick('featured-projects', e)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          padding: '6px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s ease, transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(252, 242, 189, 0.04)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <img
                          src={p.img}
                          alt={p.title}
                          style={{
                            width: '68px',
                            height: '68px',
                            objectFit: 'cover',
                            borderRadius: '12px',
                            flexShrink: 0,
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '14px',
                              fontWeight: 700,
                              color: 'var(--swatch--light)',
                              letterSpacing: '0.6px',
                              textTransform: 'uppercase',
                            }}
                          >
                            {p.title}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '12px',
                              color: 'rgba(252, 242, 189, 0.65)',
                              marginTop: '4px',
                              lineHeight: 1.35,
                            }}
                          >
                            {p.type}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* All work button */}
                  <button
                    onClick={(e) => handleLinkClick('featured-projects', e)}
                    style={{
                      width: '100%',
                      padding: '13px 20px',
                      backgroundColor: '#ff4d25',
                      color: '#ffffff',
                      borderRadius: '9999px',
                      border: 'none',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'background-color 0.2s ease, transform 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ff603a')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ff4d25')}
                  >
                    <span>All work</span>
                    <span style={{ fontSize: '15px' }}>→</span>
                  </button>
                </div>
              )}

              {/* Dropdown Panel 2: SERVICES (Screenshot 2) */}
              {activeHover === 'services' && (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
                    {[
                      { name: 'CINEMATOGRAPHY', target: 'services-stack', isEquipment: false },
                      { name: 'PHOTOGRAPHY', target: 'services-stack', isEquipment: false },
                      { name: 'VIDEOGRAPHY', target: 'services-stack', isEquipment: false },
                      { name: 'EDITING', target: 'services-stack', isEquipment: false },
                      { name: 'EVENT MANAGEMENT', target: 'services-stack', isEquipment: false },
                      { name: 'PRODUCTION', target: 'services-stack', isEquipment: false },
                      { name: 'EQUIPMENTS ↗', target: 'equipments', isEquipment: true },
                    ].map((s, idx, arr) => (
                      <div
                        key={idx}
                        onClick={(e) => handleLinkClick(s.target, e)}
                        style={{
                          padding: '10px 4px',
                          borderBottom:
                            idx !== arr.length - 1
                              ? '1px solid rgba(252, 242, 189, 0.08)'
                              : 'none',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '13px',
                          fontWeight: 700,
                          letterSpacing: '0.8px',
                          color: s.isEquipment ? '#2dd4bf' : 'var(--swatch--light)',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'color 0.2s ease, transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = s.isEquipment ? '#5eead4' : '#ff5121';
                          e.currentTarget.style.transform = 'translateX(6px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = s.isEquipment ? '#2dd4bf' : 'var(--swatch--light)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <span>{s.name}</span>
                        {s.isEquipment && (
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 800,
                              letterSpacing: '0.5px',
                              padding: '2px 8px',
                              borderRadius: '999px',
                              backgroundColor: 'rgba(45, 212, 191, 0.15)',
                              border: '1px solid rgba(45, 212, 191, 0.35)',
                              color: '#2dd4bf',
                            }}
                          >
                            GEAR
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* All services button */}
                  <button
                    onClick={(e) => handleLinkClick('services-stack', e)}
                    style={{
                      width: '100%',
                      padding: '13px 20px',
                      backgroundColor: '#c84822',
                      color: 'var(--swatch--light)',
                      borderRadius: '9999px',
                      border: 'none',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'background-color 0.2s ease, transform 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d8522a')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c84822')}
                  >
                    <span>All services</span>
                    <span style={{ fontSize: '15px' }}>→</span>
                  </button>
                </div>
              )}

              {/* Dropdown Panel 3: Cinecraft Studios */}
              {activeHover === 'studios' && (
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <CinecraftMediaLogo height={28} />
                    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '1px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-script)',
                          fontSize: '22px',
                          fontWeight: 400,
                          color: '#ff5121',
                          lineHeight: 1,
                          letterSpacing: '-0.5px',
                        }}
                      >
                        Cine
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '16px',
                          fontWeight: 700,
                          color: '#0d1522',
                          letterSpacing: '0.3px',
                          textTransform: 'lowercase',
                        }}
                      >
                        craft
                      </span>
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      lineHeight: '1.55',
                      color: '#28323e',
                      marginBottom: '16px',
                    }}
                  >
                    There’s another side to what we do. Through Cinecraft Studios, we bring the same creative craft and production expertise to brands, music and commercial campaigns.
                  </p>

                  <div
                    style={{
                      width: '100%',
                      height: '350px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      marginBottom: '16px',
                      boxShadow: '0 10px 28px rgba(5, 93, 255, 0.15)',
                      backgroundColor: '#0a101d',
                    }}
                  >
                    <img
                      src="/media/VHP07150%20(1).webp"
                      alt="Cinecraft Studios campaign"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                      }}
                    />
                  </div>

                  <button
                    onClick={(e) => handleLinkClick('studios', e)}
                    style={{
                      width: '100%',
                      padding: '13px 20px',
                      backgroundColor: '#055dff',
                      color: '#ffffff',
                      borderRadius: '9999px',
                      border: 'none',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'background-color 0.2s ease, transform 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#004ee0')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#055dff')}
                  >
                    <span>Explore Studios</span>
                    <span style={{ fontSize: '15px' }}>→</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          className="mobile-toggle"
          style={{
            pointerEvents: 'auto',
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '6px',
            width: '40px',
            height: '40px',
            padding: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              width: '100%',
              height: '2px',
              backgroundColor: 'var(--swatch--light)',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none',
            }}
          />
          <span
            style={{
              width: '100%',
              height: '2px',
              backgroundColor: 'var(--swatch--light)',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: '#1e1816',
            padding: '90px 28px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <button
              onClick={() => handleLinkClick('featured-projects')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                fontWeight: 700,
                textAlign: 'left',
                color: 'var(--swatch--light)',
                cursor: 'pointer',
              }}
            >
              Work
            </button>

            <div>
              <button
                onClick={() => setServicesAccordionOpen(!servicesAccordionOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '28px',
                  fontWeight: 700,
                  textAlign: 'left',
                  color: 'var(--swatch--light)',
                  cursor: 'pointer',
                }}
              >
                <span>Services</span>
                <span
                  style={{
                    transform: servicesAccordionOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                    fontSize: '20px',
                  }}
                >
                  ▼
                </span>
              </button>
              {servicesAccordionOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', paddingLeft: '12px' }}>
                  {[
                    { name: 'Cinematography', target: 'services-stack', isEquipment: false },
                    { name: 'Photography', target: 'services-stack', isEquipment: false },
                    { name: 'Videography', target: 'services-stack', isEquipment: false },
                    { name: 'Editing', target: 'services-stack', isEquipment: false },
                    { name: 'Event Management', target: 'services-stack', isEquipment: false },
                    { name: 'Production', target: 'services-stack', isEquipment: false },
                    { name: 'Equipments ↗', target: 'equipments', isEquipment: true },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleLinkClick(s.target)}
                      style={{
                        fontSize: '18px',
                        color: s.isEquipment ? '#2dd4bf' : 'var(--swatch--light-o80)',
                        fontWeight: s.isEquipment ? 700 : 500,
                        cursor: 'pointer',
                      }}
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleLinkClick('studios')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                fontWeight: 700,
                textAlign: 'left',
                color: '#055dff',
                cursor: 'pointer',
              }}
            >
              Cinecraft Studios
            </button>

            <button
              onClick={() => handleLinkClick('why-lxl')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                fontWeight: 700,
                textAlign: 'left',
                color: 'var(--swatch--light)',
                cursor: 'pointer',
              }}
            >
              About
            </button>

            <button
              onClick={() => handleLinkClick('footer')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                fontWeight: 700,
                textAlign: 'left',
                color: 'var(--swatch--light)',
                cursor: 'pointer',
              }}
            >
              Contact
            </button>
          </div>

          <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(252, 242, 189, 0.1)' }}>
            <div style={{ color: 'var(--swatch--light-o60)', fontSize: '13px', lineHeight: 1.6 }}>
              360° creative agency for TV &amp; entertainment.
              <br />
              London &bull; Soho &bull; Worldwide
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Smooth draw-in animation for hand-drawn SVG doodle underline */
        .nav-underline-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawUnderlineStroke 0.38s cubic-bezier(0.25, 1, 0.45, 1) forwards;
        }

        @keyframes drawUnderlineStroke {
          0% {
            stroke-dashoffset: 100;
            opacity: 0.15;
          }
          20% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        .nav-dropdown-enter {
          animation: navDropdownFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes navDropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 868px) {
          .desktop-nav-card {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
