import React, { useState } from 'react';

const VALUES = [
  {
    id: 'why',
    title: 'Why Cinecraft',
    subtitle: 'From a single deliverable to 360°',
    description:
      'Whether we’re handling a single part of your campaign or the full 360°, we bring the expertise to make it work as one coherent whole. No friction between departments, no mismatched aesthetics—just unified creative execution.',
  },
  {
    id: 'collaborative',
    title: 'We’re collaborative',
    subtitle: 'Championing talent everywhere',
    description:
      'We invest in people. We back the teams and creatives we work with, championing talent wherever we find it and embracing ideas, no matter how wild. We believe the best work happens when everyone in the room has a voice.',
  },
  {
    id: 'honest',
    title: 'We’re upfront & honest',
    subtitle: 'Clear, transparent communication',
    description:
      'Having sat on the client side, we understand the value of transparency. Expect honest quotes, straightforward conversations, and an uncompromising focus on delivering actual value in everything we create.',
  },
  {
    id: 'passion',
    title: 'We love what we do',
    subtitle: 'Energy counts on every shoot',
    description:
      'Energy counts. We bring a positive and enthusiastic presence to every shoot, taking pride in the safe, creative, and inspiring environments we create for cast, directors, and crew alike.',
  },
];

export const WhyLxL: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="why-lxl"
      style={{
        backgroundColor: '#27201d',
        padding: '120px 48px',
        position: 'relative',
        borderTop: '1px solid rgba(252, 242, 189, 0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 540px) 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
        className="why-lxl-grid"
      >
        {/* Left Interactive Accordion */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '32px',
              color: 'var(--swatch--brand)',
              marginBottom: '4px',
            }}
          >
            About our ethos
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(34px, 4.5vw, 56px)',
              fontWeight: 700,
              color: 'var(--swatch--light)',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              marginBottom: '20px',
            }}
          >
            Real craft. Real people.
          </h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: 'var(--swatch--light-o60)',
              marginBottom: '40px',
              maxWidth: '480px',
            }}
          >
            From humble beginnings to a full-service creative powerhouse, Cinecraft Media is a nimble 360° agency with the ability to work across the whole campaign, or to focus on specific deliverables.
          </p>

          {/* Accordion Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {VALUES.map((val, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={val.id}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    backgroundColor: isActive ? 'rgba(252, 242, 189, 0.08)' : 'rgba(252, 242, 189, 0.02)',
                    border: isActive
                      ? '1px solid var(--swatch--brand)'
                      : '1px solid rgba(252, 242, 189, 0.08)',
                    borderRadius: '16px',
                    padding: '24px 28px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: isActive ? 'var(--swatch--brand)' : 'var(--swatch--light)',
                      }}
                    >
                      {val.title}
                    </h3>
                    <span
                      style={{
                        color: isActive ? 'var(--swatch--brand)' : 'var(--swatch--light-o40)',
                        fontSize: '22px',
                        transform: isActive ? 'rotate(45deg)' : 'none',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      +
                    </span>
                  </div>

                  {isActive && (
                    <div style={{ marginTop: '14px', animation: 'fadeIn 0.2s ease-out' }}>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--swatch--light)',
                          marginBottom: '6px',
                        }}
                      >
                        {val.subtitle}
                      </div>
                      <p
                        style={{
                          fontSize: '14px',
                          lineHeight: 1.6,
                          color: 'var(--swatch--light-o80)',
                        }}
                      >
                        {val.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Photo Presentation Card */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(252, 242, 189, 0.1)',
            }}
          >
            <img
              src="/media/Group.webp"
              alt="Cinecraft Media Team"
              style={{
                width: '100%',
                height: '560px',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Subtle Overlay Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                padding: '20px',
                backgroundColor: 'rgba(39, 32, 29, 0.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: '12px',
                border: '1px solid rgba(252, 242, 189, 0.15)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--swatch--brand)',
                  letterSpacing: '0.5px',
                  marginBottom: '4px',
                }}
              >
                ONE TEAM. FROM DAY ONE.
              </div>
              <div style={{ fontSize: '13px', color: 'var(--swatch--light-o80)', lineHeight: 1.5 }}>
                Embedded alongside directors, producers, and showrunners on the world’s biggest titles.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-lxl-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};
