import React, { useState, useEffect } from 'react';

const HERO_IMAGES = [
  {
    src: '/media/VHP07150.webp',
    alt: 'Cinecraft Media Behind The Scenes',
  },
  {
    src: '/media/IMG_8964.webp',
    alt: 'Cinecraft Media Cinematic Shoot',
  },
  {
    src: '/media/VHP07326.webp',
    alt: 'Cinecraft Media Cinematic Shoot',
  },
  {
    src: '/media/DJI_20241130130924_0004_D.webp',
    alt: 'Cinecraft Media Aerial Production',
  },
  {
    src: '/media/DSC02230.webp',
    alt: 'Cinecraft Media On-Set Photography',
  },
  {
    src: '/media/VHP07118.webp',
    alt: 'Cinecraft Media Production Stills',
  },
  {
    src: '/media/VHP07253.webp',
    alt: 'Cinecraft Media Unit Stills',
  },
];

export const HeroSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto cross-fade every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '680px',
        maxHeight: '1080px',
        backgroundColor: 'var(--swatch--dark)',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* 2-Column Split: Left Visual Card (50%), Right Content (50%) */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
        }}
        className="hero-layout"
      >
        {/* Left Column: Visual Photo Card with rounded corners */}
        <div
          style={{
            width: '48%',
            height: '100%',
            padding: '24px 16px 24px 24px',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
          className="hero-visual-wrap"
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              maxHeight: 'calc(100vh - 48px)',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#1b1614',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
            }}
          >
            {HERO_IMAGES.map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={img.alt}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: currentIdx === idx ? 1 : 0,
                  transform: currentIdx === idx ? 'scale(1)' : 'scale(1.04)',
                  transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            ))}

            {/* Slide Indicator Dots at bottom of card */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                zIndex: 3,
                backgroundColor: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: '20px',
              }}
            >
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  style={{
                    width: currentIdx === idx ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: currentIdx === idx ? 'var(--swatch--brand)' : 'rgba(255, 255, 255, 0.4)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Centered Headlines (Screenshot 1) */}
        <div
          style={{
            width: '52%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px 48px 120px 24px',
            position: 'relative',
            zIndex: 2,
          }}
          className="hero-content-wrap"
        >
          <div
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
              color: 'var(--swatch--light)',
              lineHeight: 1.1,
              letterSpacing: '-1px',
            }}
          >
            <h1 style={{ fontSize: 'clamp(24px, 3.2vw, 44px)', fontWeight: 700, margin: 0 }}>
              REAL CRAFT.
            </h1>
            <div
              style={{
                fontFamily: 'var(--font-script)',
                textTransform: 'none',
                color: 'var(--swatch--brand)',
                fontSize: 'clamp(34px, 4.4vw, 62px)',
                fontWeight: 400,
                lineHeight: 0.95,
                margin: '8px 0',
                display: 'inline-block',
                transform: 'rotate(-2deg)',
                textShadow: '0 0 35px rgba(255, 81, 33, 0.35)',
              }}
            >
              Real people.
            </div>
            <h1 style={{ fontSize: 'clamp(24px, 3.2vw, 44px)', fontWeight: 700, margin: 0 }}>
              REAL RESULTS.
            </h1>
          </div>
        </div>

        {/* Giant Bottom Brand Text — styled like the original LxL Creative layout */}
        <div
          style={{
            position: 'absolute',
            bottom: '1px',
            left: '30%',
            zIndex: 10,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'flex-start',
            whiteSpace: 'nowrap',
            gap: '10px',
          }}
          className="hero-bottom-logo"
        >
          {/* Cursive orange "Cine" — mirrors the hand-drawn orange "lxl" script, overlapping the image */}
          <span
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(120px, 16vw, 240px)',
              fontWeight: 400,
              color: '#ff5121',
              lineHeight: 1,
              letterSpacing: '-2px',
              textShadow: '0 0 60px rgba(255, 81, 33, 0.45)',
              filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.6))',
              display: 'inline-block',
              transform: 'translateY(8px)',
            }}
          >
            Cine
          </span>
          {/* Unbold cream "craft" — matched in optical size and on a single baseline */}
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(90px, 12vw, 185px)',
              fontWeight: 500,
              color: 'var(--swatch--light)',
              lineHeight: 1,
              letterSpacing: '-2px',
              textTransform: 'lowercase',
              filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.6))',
              display: 'inline-block',
            }}
          >
            craft
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-layout {
            flex-direction: column !important;
            height: auto !important;
            min-height: 100vh !important;
          }
          .hero-visual-wrap {
            width: 100% !important;
            height: 55vh !important;
            padding: 80px 20px 20px !important;
          }
          .hero-content-wrap {
            width: 100% !important;
            height: auto !important;
            padding: 20px 20px 140px !important;
          }
          .hero-bottom-logo {
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            justify-content: center !important;
            width: 100% !important;
            max-width: 100vw !important;
            bottom: 24px !important;
            padding: 0 16px !important;
            box-sizing: border-box !important;
          }
          .hero-bottom-logo span:first-child {
            font-size: clamp(52px, 14vw, 85px) !important;
            transform: translateY(4px) !important;
          }
          .hero-bottom-logo span:last-child {
            font-size: clamp(40px, 11vw, 65px) !important;
          }
        }
      `}</style>
    </section>
  );
};
