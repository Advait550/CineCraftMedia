import React, { useState } from 'react';
import { CinecraftMediaLogo, ArrowRightIcon } from './Icons';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#1b1614',
        padding: '120px 48px 48px',
        borderTop: '1px solid rgba(252, 242, 189, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/*
          Signature Contact Hero Callout (Matching Images 2 & 3):
          - Crew visual thumbnail with play icon
          - 'GOT A PRODUCTION COMING UP? LET'S DO SOMETHING great TOGETHER.'
          - 'Get in touch ->' pill button
        */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '100px',
            paddingBottom: '80px',
            borderBottom: '1px solid rgba(252, 242, 189, 0.08)',
          }}
        >
          {/* Production Camera Crew Thumbnail with Play Overlay */}
          <div
            style={{
              position: 'relative',
              width: '180px',
              height: '110px',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '36px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(252, 242, 189, 0.1)',
            }}
          >
            <img
              src="/media/Group.webp"
              alt="Cinecraft Media Production Crew"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Play Button Indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'var(--swatch--brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
            >
              <span style={{ fontSize: '10px', marginLeft: '2px' }}>▶</span>
            </div>
          </div>

          {/* Big Statement Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 5.2vw, 68px)',
              fontWeight: 700,
              color: 'var(--swatch--light)',
              lineHeight: 1.15,
              textTransform: 'uppercase',
              letterSpacing: '-1.5px',
              maxWidth: '920px',
              margin: '0 auto 36px',
            }}
          >
            GOT A PRODUCTION COMING UP? LET’S DO SOMETHING{' '}
            <span
              style={{
                fontFamily: 'var(--font-script)',
                textTransform: 'none',
                color: 'var(--swatch--brand)',
                fontSize: '1.25em',
                fontWeight: 400,
                display: 'inline-block',
                transform: 'rotate(-3deg)',
                margin: '0 8px',
                verticalAlign: 'baseline',
                textShadow: '0 0 35px rgba(255, 81, 33, 0.45)',
              }}
            >
              great
            </span>{' '}
            TOGETHER.
          </h2>

          {/* 'Get in touch ->' Pill Button (Direct WhatsApp redirect with auto general typed message) */}
          <a
            href={`https://wa.me/919370466245?text=${encodeURIComponent(
              'Hello Cinecraft Media! I would like to get in touch and discuss an upcoming project with you.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              backgroundColor: 'var(--swatch--brand)',
              color: '#ffffff',
              borderRadius: '9999px',
              fontFamily: 'var(--font-heading)',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(255, 81, 33, 0.35)',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.backgroundColor = '#ff603a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = 'var(--swatch--brand)';
            }}
          >
            <span>Get in touch</span>
            <span style={{ fontSize: '15px' }}>→</span>
          </a>
        </div>

        {/* Agency Info & Nav Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '80px',
          }}
        >
          {/* Logo & Narrative */}
          <div style={{ gridColumn: 'span 2' }}>
            <CinecraftMediaLogo height={38} style={{ marginBottom: '18px' }} />
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(252, 242, 189, 0.65)',
                maxWidth: '380px',
                lineHeight: 1.6,
              }}
            >
              360° creative agency for TV &amp; entertainment. Key art, social campaigns, EPKs &amp; unit photography.
              One team, from day one.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--swatch--light)',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                marginBottom: '16px',
              }}
            >
              Explore
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Work & Portfolio', href: '#featured-projects' },
                { label: 'Services', href: '#services-stack' },
                { label: 'Why Cinecraft', href: '#why-lxl' },
                { label: 'Cinecraft Studios', href: '#studios' },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    style={{ fontSize: '14px', color: 'rgba(252, 242, 189, 0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--swatch--light)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(252, 242, 189, 0.65)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--swatch--brand)',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                marginBottom: '16px',
              }}
            >
              London Soho
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(252, 242, 189, 0.8)', lineHeight: 1.6, marginBottom: '12px' }}>
              Soho, London, UK
            </div>
            <a
              href="mailto:hello@cinecraftmedia.com"
              style={{ fontSize: '14px', color: 'rgba(252, 242, 189, 0.65)', textDecoration: 'none' }}
            >
              hello@cinecraftmedia.com
            </a>
          </div>

          {/* Newsletter Form */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--swatch--light)',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                marginBottom: '16px',
              }}
            >
              Stay In Touch
            </div>
            {submitted ? (
              <div style={{ color: 'var(--swatch--brand)', fontSize: '13px' }}>Thank you! We’ll be in touch.</div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(252, 242, 189, 0.05)',
                    border: '1px solid rgba(252, 242, 189, 0.15)',
                    borderRadius: '9999px',
                    padding: '10px 18px',
                    color: 'var(--swatch--light)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--swatch--brand)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '10px 18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowRightIcon size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright on left, Social Icons on right (Images 2 & 3) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(252, 242, 189, 0.08)',
            fontSize: '13px',
            color: 'rgba(252, 242, 189, 0.5)',
          }}
        >
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span>&copy; {new Date().getFullYear()}. All rights reserved</span>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
          </div>

          {/* Social Icons (Instagram & LinkedIn) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: 'rgba(252, 242, 189, 0.65)', textDecoration: 'none', display: 'flex', alignItems: 'center', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--swatch--brand)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(252, 242, 189, 0.65)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: 'rgba(252, 242, 189, 0.65)', textDecoration: 'none', display: 'flex', alignItems: 'center', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--swatch--brand)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(252, 242, 189, 0.65)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/*
        Bottom Left Hand-Drawn Squiggle Wave (Matching Images 2 & 3):
        Organic decorative curve anchored at the bottom-left corner
      */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20px',
          left: '-40px',
          width: '380px',
          height: '240px',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.9,
        }}
      >
        <svg
          viewBox="0 0 400 240"
          fill="none"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <path
            d="M -20,220 C 30,190 70,160 85,120 C 100,75 70,30 35,40 C 0,50 5,110 45,150 C 95,200 160,240 220,180 C 270,130 250,50 300,20 C 330,5 370,15 420,50"
            stroke="var(--swatch--brand)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </footer>
  );
};
