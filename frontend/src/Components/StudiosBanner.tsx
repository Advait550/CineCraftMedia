import React from 'react';
import { CinecraftMediaLogo, ArrowRightIcon } from './Icons';

export const StudiosBanner: React.FC = () => {
  return (
    <section
      id="studios"
      style={{
        backgroundColor: '#171822',
        padding: '120px 48px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(5, 93, 255, 0.2)',
      }}
    >
      {/* Subtle Blue Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          backgroundColor: 'rgba(5, 93, 255, 0.15)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr minmax(320px, 520px)',
          gap: '80px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
        className="studios-grid"
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <CinecraftMediaLogo height={38} />
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '2px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '28px',
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
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.3px',
                  textTransform: 'lowercase',
                }}
              >
                craft
              </span>
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 4.5vw, 54px)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '24px',
              letterSpacing: '-1px',
            }}
          >
            Campaigns, events and content for brands and creatives that want to shape culture.
          </h2>

          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.75)',
              marginBottom: '36px',
              maxWidth: '520px',
            }}
          >
            Through Cinecraft Studios, we bring the same relentless production craft and creative agility to commercial campaigns, music drops, and high-profile brand activations. Built around collaboration, executed by masters.
          </p>

          <a
            href="#studios"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#055dff',
              color: '#ffffff',
              padding: '14px 32px',
              borderRadius: '9999px',
              fontFamily: 'var(--font-heading)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              boxShadow: '0 8px 30px rgba(5, 93, 255, 0.4)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2673ff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#055dff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Explore Cinecraft Studios</span>
            <ArrowRightIcon size={18} />
          </a>
        </div>

        {/* Right Photo */}
        <div
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(5, 93, 255, 0.25)',
          }}
        >
          <img
            src="media/IMG_9917.JPG.webp"
            alt="Cinecraft Studios Commercial Project"
            style={{
              width: '100%',
              height: '460px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .studios-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};
