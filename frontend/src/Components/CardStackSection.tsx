import React, { useState, useEffect, useRef } from 'react';
import { SquiggleSvg, ArrowRightIcon } from './Icons';

interface ServiceItem {
  id: string;
  title: string;
  image: string;
  description: string;
  deliverables: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'cinematography',
    title: 'CINEMATOGRAPHY',
    image: '/media/services/cinematography.jpg',
    description:
      'Full-spectrum cinema direction, master framing, and dramatic camera movement crafted to bring high-impact visual stories, music videos, and commercial narratives to life.',
    deliverables: [
      'High-End Feature & Commercial Shoots',
      'Anamorphic & Prime Lens Mastery',
      'Lighting Design & Mood Realization',
      'Directorial Vision & Storyboards',
    ],
  },
  {
    id: 'photography',
    title: 'PHOTOGRAPHY',
    image: '/media/services/photography.jpg',
    description:
      'Capturing defining moments with precision, creative composition, and vivid color fidelity across high-fashion editorials, live concerts, and brand campaigns.',
    deliverables: [
      'Fashion & Editorial Stills',
      'Live Concert & Festival Coverage',
      'Brand & Commercial Product Shoots',
      'High-Res Retouched Masters',
    ],
  },
  {
    id: 'videography',
    title: 'VIDEOGRAPHY',
    image: '/media/services/videography.jpg',
    description:
      'Dynamic, agile video production for live events, digital campaigns, aftermovies, and brand commercials with seamless handheld and gimbal stabilization.',
    deliverables: [
      'Commercial & Aftermovie Coverage',
      'Multi-Cam Concert Captures',
      'Gimbal & Motion Tracking',
      '4K High Bitrate Broadcast Masters',
    ],
  },
  {
    id: 'editing',
    title: 'EDITING',
    image: '/media/services/editing.jpg',
    description:
      'Fast-paced storytelling, cinematic pacing, advanced color grading, sound design, and motion graphics that transform raw footage into captivating visual masterpieces.',
    deliverables: [
      'DaVinci Resolve Color Grading',
      'Dynamic Sound Design & Mixing',
      'Fast Turnaround Social Cuts',
      '4K Delivery in Any Format',
    ],
  },
  {
    id: 'event-management',
    title: 'EVENT MANAGEMENT',
    image: '/media/services/event_management.jpg',
    description:
      'End-to-end concert, festival, and corporate event management from technical stage execution, lighting and sound coordination to complete media coverage.',
    deliverables: [
      'Concert & Festival Operations',
      'Stage Lighting & AV Coordination',
      'Artist & Crew Media Management',
      'Live Broadcast & Stream Ops',
    ],
  },
  {
    id: 'production',
    title: 'PRODUCTION',
    image: '/media/services/production.jpg',
    description:
      'Comprehensive film and commercial production handling every phase from script development and scouting to full crew deployment and set supervision.',
    deliverables: [
      'Full-Scale Shoot Logistics',
      'Location Scouting & Permits',
      'Casting & Talent Coordination',
      'Turnkey Production Supervision',
    ],
  },
];

interface CardStackSectionProps {
  onNavigateEquipments?: () => void;
}

export const CardStackSection: React.FC<CardStackSectionProps> = ({ onNavigateEquipments }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position through the section to advance card index
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      const newIdx = Math.min(Math.floor(progress * SERVICES_DATA.length), SERVICES_DATA.length - 1);
      setActiveCardIndex(newIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % SERVICES_DATA.length);
  };

  return (
    <section
      ref={containerRef}
      id="services-stack"
      style={{
        position: 'relative',
        height: '220vh',
        backgroundColor: 'var(--swatch--dark)',
      }}
    >
      {/* Sticky Viewport Container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '0 48px',
        }}
      >
        {/* Floating Orange Squiggle Path (Matching Screenshot 4) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '-40px',
            transform: 'translateY(-50%)',
            width: '460px',
            height: 'auto',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <SquiggleSvg />
        </div>

        {/* 2-Column Grid */}
        <div
          style={{
            maxWidth: '1440px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 400px) 1fr',
            gap: '60px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
          className="card-stack-grid"
        >
          {/* Left Column (Matching Screenshot 4) */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(56px, 6.5vw, 84px)',
                  color: 'var(--swatch--brand)',
                  fontWeight: 400,
                  lineHeight: 0.9,
                  transform: 'rotate(-4deg)',
                  display: 'inline-block',
                  textShadow: '0 0 35px rgba(255, 81, 33, 0.4)',
                }}
              >
                Our
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(38px, 5vw, 64px)',
                  fontWeight: 700,
                  color: 'var(--swatch--light)',
                  lineHeight: 1,
                  letterSpacing: '-1px',
                  textTransform: 'uppercase',
                  margin: '4px 0 0 0',
                }}
              >
                SERVICES
              </h2>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                lineHeight: 1.65,
                color: 'var(--swatch--light-o80)',
                maxWidth: '400px',
                marginBottom: '36px',
              }}
            >
              From concept through to delivery, we create and produce campaigns that are thoughtful, collaborative, and
              built to land across every touchpoint.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedService(SERVICES_DATA[activeCardIndex])}
                className="btn-pill"
                data-cursor-label="VIEW"
              >
                <span>All services</span>
                <ArrowRightIcon size={18} />
              </button>

              {onNavigateEquipments && (
                <button
                  onClick={onNavigateEquipments}
                  className="btn-outline"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderColor: 'rgba(45, 212, 191, 0.4)',
                    color: '#2dd4bf',
                  }}
                >
                  <span>Equipments</span>
                  <span style={{ fontSize: '15px' }}>↗</span>
                </button>
              )}
            </div>

            {/* Pagination Line Indicators */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginTop: '40px',
              }}
            >
              {SERVICES_DATA.map((srv, idx) => (
                <button
                  key={srv.id}
                  onClick={() => setActiveCardIndex(idx)}
                  style={{
                    height: '4px',
                    width: activeCardIndex === idx ? '36px' : '16px',
                    borderRadius: '2px',
                    backgroundColor:
                      activeCardIndex === idx ? 'var(--swatch--brand)' : 'rgba(252, 242, 189, 0.25)',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={`Select ${srv.title}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Card Deck Stack (Wide aspect to cover full images) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '740px',
              height: '460px',
              margin: '0 auto',
            }}
            className="cards-deck-container"
          >
            {SERVICES_DATA.map((service, index) => {
              const isPassed = index < activeCardIndex;
              const isCurrent = index === activeCardIndex;
              const offsetFromActive = index - activeCardIndex;

              // Tilt top card ~3.5deg like Screenshot 4
              const baseRotation = (index % 2 === 0 ? 3 : -2) + offsetFromActive * 2;
              const translateY = offsetFromActive * 24;
              const scale = 1 - Math.max(offsetFromActive * 0.05, 0);

              return (
                <div
                  key={service.id}
                  data-cursor-label="DRAG"
                  onClick={handleNextCard}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    right: '16px',
                    bottom: '16px',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    backgroundColor: '#1f1917',
                    boxShadow: isCurrent
                      ? '0 30px 70px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(252, 242, 189, 0.12)'
                      : '0 15px 35px rgba(0, 0, 0, 0.4)',
                    cursor: 'pointer',
                    transform: isCurrent
                      ? `translateY(0px) rotate(${baseRotation}deg) scale(1)`
                      : isPassed
                      ? `translateY(-90px) rotate(${baseRotation - 6}deg) scale(0.92)`
                      : `translateY(${translateY}px) rotate(${baseRotation}deg) scale(${scale})`,
                    opacity: isPassed ? 0 : 1,
                    pointerEvents: isCurrent ? 'auto' : 'none',
                    zIndex: SERVICES_DATA.length - index + (isCurrent ? 10 : 0),
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
                  }}
                  className="service-card-item"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: isCurrent ? 'none' : 'brightness(0.75)',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (isCurrent) e.currentTarget.style.transform = 'scale(1.04)';
                    }}
                    onMouseLeave={(e) => {
                      if (isCurrent) e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />

                  {/* Dark bottom gradient */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(20, 16, 14, 0.9) 0%, rgba(20, 16, 14, 0.25) 45%, transparent 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Bottom Text and Arrow (Screenshot 4) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '24px',
                      left: '24px',
                      right: '24px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      zIndex: 3,
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(20px, 2.5vw, 28px)',
                          fontWeight: 700,
                          color: '#ffffff',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                          textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                          margin: 0,
                        }}
                      >
                        {service.title}
                      </h3>
                      <div
                        style={{
                          fontSize: '12px',
                          color: 'var(--swatch--light-o80)',
                          marginTop: '4px',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        Click to advance &bull; View details
                      </div>
                    </div>

                    {/* Orange Arrow Icon (Screenshot 4) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(service);
                      }}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 81, 33, 0.18)',
                        border: '1px solid rgba(255, 81, 33, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--swatch--brand)',
                        cursor: 'pointer',
                        transition: 'transform 0.25s ease, background-color 0.25s ease',
                      }}
                      className="card-arrow-circle"
                      aria-label="View service details"
                    >
                      <ArrowRightIcon size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          onClick={() => setSelectedService(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(20, 16, 14, 0.88)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#27201d',
              border: '1px solid rgba(252, 242, 189, 0.18)',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              padding: '36px',
              position: 'relative',
              boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
            }}
          >
            <button
              onClick={() => setSelectedService(null)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                fontSize: '26px',
                color: 'var(--swatch--light)',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>

            <div
              style={{
                fontFamily: 'var(--font-script)',
                color: 'var(--swatch--brand)',
                fontSize: '28px',
                marginBottom: '4px',
              }}
            >
              Cinecraft Media Service
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--swatch--light)',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              {selectedService.title}
            </h2>

            <img
              src={selectedService.image}
              alt={selectedService.title}
              style={{
                width: '100%',
                height: '240px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '20px',
              }}
            />

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'var(--swatch--light-o80)',
                marginBottom: '24px',
              }}
            >
              {selectedService.description}
            </p>

            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--swatch--brand)',
                  letterSpacing: '0.8px',
                  marginBottom: '12px',
                }}
              >
                Key Deliverables:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {selectedService.deliverables.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: 'var(--swatch--light)',
                      backgroundColor: 'rgba(252, 242, 189, 0.04)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(252, 242, 189, 0.08)',
                    }}
                  >
                    <span style={{ color: 'var(--swatch--brand)' }}>&bull;</span>
                    {d}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={() => setSelectedService(null)} className="btn-outline">
                Back to overview
              </button>
              <a
                href={`https://wa.me/919370466245?text=${encodeURIComponent(
                  `Hello Cinecraft Media! I would like to start a project regarding ${selectedService.title}. Let's discuss details!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedService(null)}
                className="btn-pill"
              >
                <span>Start a project</span>
                <ArrowRightIcon size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .card-stack-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .cards-deck-container {
            height: 440px !important;
          }
        }
      `}</style>
    </section>
  );
};
