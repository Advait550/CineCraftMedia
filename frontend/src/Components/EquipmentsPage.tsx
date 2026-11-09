import React, { useState } from 'react';
import { CinecraftMediaLogo, ArrowRightIcon } from './Icons';

interface EquipmentItem {
  id: string;
  title: string;
  category: 'Cameras' | 'Drones' | 'Lenses' | 'Lighting' | 'Audio' | 'Stabilization';
  categoryLabel: string;
  image: string;
  badge: string;
  specs: string[];
  description: string;
  whatsappMessage: string;
}

const EQUIPMENTS_DATA: EquipmentItem[] = [
  {
    id: 'cinema-cameras',
    title: 'RED & SONY CINEMA PACKAGES',
    category: 'Cameras',
    categoryLabel: 'Cinema Cameras',
    image: '/media/equipments/camera.webp',
    badge: '6K Full-Frame RAW',
    specs: [
      'Sony FX6 & FX3 Cinema Line',
      'RED V-Raptor / Komodo-X',
      'Dual Native ISO Low-Light',
      '4K 120fps / 16+ Stops DR',
      'Teradek Wireless Transmitters',
      'SmallHD High-Bright Monitors',
    ],
    description:
      'Turnkey production-ready cinema camera packages paired with custom V-mount power distribution, wireless video transmission, and follow-focus systems for high-end commercials and narrative films.',
    whatsappMessage:
      "Hello Cinecraft Media! I'm interested in inquiring about your Cinema Camera Packages for an upcoming shoot. Could you provide availability and rental rates?",
  },
  {
    id: 'drone-fleet',
    title: 'CINEMA DRONES & FPV LIFTERS',
    category: 'Drones',
    categoryLabel: 'Aerial Drones',
    image: '/media/equipments/drones.webp',
    badge: '8K ProRes RAW / DGCA Certified',
    specs: [
      'DJI Inspire 3 Full-Frame 8K',
      'DJI Mavic 3 Cine ProRes',
      'Custom 6S FPV Cinelifter Rigs',
      'Dual Master Wheels & Pilots',
      'RTK Centimeter GPS Precision',
      '15km O3 Pro Video Transmission',
    ],
    description:
      'High-altitude, licensed aerial cinematography fleet with dual-operator capabilities. Capable of high-speed automotive pursuit, tight fly-throughs, and majestic cinematic landscape coverage.',
    whatsappMessage:
      "Hello Cinecraft Media! I'd like to book / inquire about your Cinema Drone Fleet and licensed pilots for an upcoming aerial production.",
  },
  {
    id: 'anamorphic-primes',
    title: 'ANAMORPHIC & CINE PRIME LENSES',
    category: 'Lenses',
    categoryLabel: 'Optics & Lenses',
    image: '/media/equipments/lenses.jpg',
    badge: 'T1.5 Ultra-Fast / Anamorphic',
    specs: [
      'Cooke & Zeiss Cine Primes',
      '1.6x / 1.8x Full-Frame Anamorphic',
      'T1.5 - T2.0 Fast Apertures',
      'Uniform 95mm Front Diameter',
      'Organic Flare & Creamy Bokeh',
      'Standard 0.8 Mod Focus Gears',
    ],
    description:
      'Hand-selected cinema optics that impart character, signature horizontal anamorphic flares, and exquisite roll-off to give every production a timeless silver-screen look.',
    whatsappMessage:
      "Hello Cinecraft Media! I'm interested in inquiring about your Cine Prime & Anamorphic Lens packages for our upcoming production.",
  },
  {
    id: 'studio-lighting',
    title: 'HIGH-OUTPUT LED & STUDIO LIGHTING',
    category: 'Lighting',
    categoryLabel: 'Lighting & Grip',
    image: '/media/equipments/lighting.jpg',
    badge: '1200W Daylight & Full RGBWW',
    specs: [
      'Aputure 1200d Pro & 600c RGBWW',
      'Nanlite Pavotubes & Skypanels',
      'Light Dome 150 & Snapgrids',
      'Heavy-Duty C-Stands & Boom Arms',
      'Sidus Link Wireless DMX Control',
      'Flicker-Free High-Speed 1000fps',
    ],
    description:
      'High-CRI studio and location lighting kits designed for cinematic skin tones, daylight simulation, and dynamic RGB color effects on demanding commercial sets.',
    whatsappMessage:
      'Hello Cinecraft Media! I would like to inquire about your Cinema Lighting & Grip equipment packages.',
  },
  {
    id: 'field-audio',
    title: 'MULTI-TRACK FIELD AUDIO & MICS',
    category: 'Audio',
    categoryLabel: 'Sound & Audio',
    image: '/media/equipments/audio.jpg',
    badge: '32-Bit Float / Broadcast Sound',
    specs: [
      'Sound Devices Multi-Track Recorder',
      'Sennheiser D6000 & G4 Wireless Kits',
      'Sanken COS-11D Broadcast Lavaliers',
      'Sennheiser MKH416 Shotgun Mic',
      'Carbon Fiber Boom Pole & Windjammer',
      'Ambient Timecode Sync Boxes',
    ],
    description:
      'Zero-clipping location sound gear engineered for crystal-clear dialogue, ambient soundscapes, and flawless multi-camera timecode synchronization.',
    whatsappMessage:
      'Hello Cinecraft Media! I would like to inquire about your Professional Audio and Location Sound gear.',
  },
  {
    id: 'stabilizers-rigs',
    title: '3-AXIS GIMBALS & CAR PURSUIT RIGS',
    category: 'Stabilization',
    categoryLabel: 'Stabilization',
    image: '/media/DSC02230.webp',
    badge: '30 lbs Payload / Vehicle Mount',
    specs: [
      'DJI Ronin 2 Professional Gimbal',
      'DJI RS3 Pro Combo Kit',
      'Tilta Hydra Alien Car Mount',
      'Ready Rig GS Pro with ProArms',
      'Wireless Force Pro & Joystick',
      'Vibration Isolator & Speed Rail',
    ],
    description:
      'Heavy-payload motion stabilization for tracking shots, running operators, and high-speed car pursuit filming with zero camera shake.',
    whatsappMessage:
      "Hello Cinecraft Media! I'm reaching out regarding your Gimbal Stabilizers and Vehicle Mount rigs for our shoot.",
  },
];

const CATEGORIES = [
  'All',
  'Cameras',
  'Drones',
  'Lenses',
  'Lighting',
  'Audio',
  'Stabilization',
];

interface EquipmentsPageProps {
  onBackToHome: () => void;
}

export const EquipmentsPage: React.FC<EquipmentsPageProps> = ({ onBackToHome }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredEquipments =
    activeCategory === 'All'
      ? EQUIPMENTS_DATA
      : EQUIPMENTS_DATA.filter((item) => item.category === activeCategory);

  const openWhatsApp = (msg: string) => {
    const url = `https://wa.me/919370466245?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ backgroundColor: '#14100e', color: 'var(--swatch--light)', minHeight: '100vh' }}>
      {/* Top Floating Navigation Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(20, 16, 14, 0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(252, 242, 189, 0.08)',
          padding: '18px 48px',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo & Name */}
          <div
            onClick={onBackToHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
            }}
          >
            <CinecraftMediaLogo height={32} />
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '2px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '24px',
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
                  fontSize: '17px',
                  fontWeight: 700,
                  color: 'var(--swatch--light)',
                  letterSpacing: '0.3px',
                  textTransform: 'lowercase',
                }}
              >
                craft
              </span>
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={onBackToHome}
              style={{
                backgroundColor: 'transparent',
                color: 'var(--swatch--light)',
                border: '1px solid rgba(252, 242, 189, 0.18)',
                borderRadius: '9999px',
                padding: '10px 22px',
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(252, 242, 189, 0.08)';
                e.currentTarget.style.borderColor = 'var(--swatch--light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(252, 242, 189, 0.18)';
              }}
            >
              <span>← Back to Home</span>
            </button>

            <button
              onClick={() =>
                openWhatsApp(
                  'Hello Cinecraft Media! I would like to inquire about your production equipment rental and packages.'
                )
              }
              style={{
                backgroundColor: '#0d9488',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '10px 24px',
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(13, 148, 136, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#14b8a6';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0d9488';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Inquire Gear</span>
              <span style={{ fontSize: '15px' }}>↗</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Banner */}
      <section
        style={{
          padding: '80px 48px 40px',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <div style={{ maxWidth: '860px' }}>
          <div
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '34px',
              color: '#0d9488',
              marginBottom: '6px',
              display: 'inline-block',
              transform: 'rotate(-2deg)',
            }}
          >
            Production Gear &amp; Rental Fleet
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 700,
              color: 'var(--swatch--light)',
              lineHeight: 1.05,
              letterSpacing: '-1.5px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            CINEMA-GRADE EQUIPMENT.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.65,
              color: 'rgba(252, 242, 189, 0.75)',
              maxWidth: '680px',
            }}
          >
            Industry-standard cinema cameras, heavy-lift drones, anamorphic glass, professional field
            audio, and high-output lighting. Maintained to pristine condition, flight-ready for demanding
            commercials, festivals, and cinematic productions.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '44px',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(252, 242, 189, 0.08)',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  border: isSelected
                    ? '1px solid #0d9488'
                    : '1px solid rgba(252, 242, 189, 0.12)',
                  backgroundColor: isSelected
                    ? 'rgba(13, 148, 136, 0.18)'
                    : 'rgba(252, 242, 189, 0.03)',
                  color: isSelected ? '#5eead4' : 'rgba(252, 242, 189, 0.75)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.4px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(252, 242, 189, 0.06)';
                    e.currentTarget.style.color = 'var(--swatch--light)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(252, 242, 189, 0.03)';
                    e.currentTarget.style.color = 'rgba(252, 242, 189, 0.75)';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Equipment Cards Grid */}
      <section
        style={{
          padding: '20px 48px 100px',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '32px',
          }}
          className="equipments-grid"
        >
          {filteredEquipments.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#1d1715',
                border: '1px solid rgba(252, 242, 189, 0.1)',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow =
                  '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(13, 148, 136, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(13, 148, 136, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(252, 242, 189, 0.1)';
              }}
            >
              {/* Image Preview with Badge Overlay */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  backgroundColor: '#0f0c0a',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(29, 23, 21, 0.9) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(13, 148, 136, 0.88)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.6px',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    borderRadius: '9999px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {item.badge}
                </span>
              </div>

              {/* Card Content */}
              <div
                style={{
                  padding: '24px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#0d9488',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '6px',
                  }}
                >
                  {item.categoryLabel}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '19px',
                    fontWeight: 700,
                    color: 'var(--swatch--light)',
                    letterSpacing: '0.3px',
                    textTransform: 'uppercase',
                    lineHeight: 1.25,
                    marginBottom: '12px',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    lineHeight: 1.6,
                    color: 'rgba(252, 242, 189, 0.72)',
                    marginBottom: '20px',
                    flex: 1,
                  }}
                >
                  {item.description}
                </p>

                {/* Specs Pills List */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '24px',
                  }}
                >
                  {item.specs.map((sp, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '11px',
                        backgroundColor: 'rgba(252, 242, 189, 0.05)',
                        border: '1px solid rgba(252, 242, 189, 0.08)',
                        color: 'rgba(252, 242, 189, 0.85)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {sp}
                    </span>
                  ))}
                </div>

                {/* Inquire on WhatsApp CTA */}
                <button
                  onClick={() => openWhatsApp(item.whatsappMessage)}
                  style={{
                    width: '100%',
                    padding: '13px 20px',
                    backgroundColor: 'rgba(37, 211, 102, 0.14)',
                    color: '#25D366',
                    border: '1px solid rgba(37, 211, 102, 0.4)',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#25D366';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(37, 211, 102, 0.14)';
                    e.currentTarget.style.color = '#25D366';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>Inquire Gear on WhatsApp</span>
                  <span style={{ fontSize: '15px' }}>↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Production Consultation Banner */}
      <section
        style={{
          backgroundColor: '#191311',
          borderTop: '1px solid rgba(252, 242, 189, 0.08)',
          padding: '80px 48px',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '32px',
              color: 'var(--swatch--brand)',
              marginBottom: '6px',
            }}
          >
            Custom Gear &amp; Crew Packages
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: 'var(--swatch--light)',
              lineHeight: 1.15,
              marginBottom: '18px',
            }}
          >
            NEED SPECIFIC PRODUCTION GEAR OR COMPLETE CREW?
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'rgba(252, 242, 189, 0.7)',
              maxWidth: '600px',
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}
          >
            We supply customized equipment kits with licensed operators, DPs, gaffers, and drone pilots
            tailored specifically to your production budget and schedule.
          </p>

          <button
            onClick={() =>
              openWhatsApp(
                'Hello Cinecraft Media! We would like to discuss a custom equipment package and crew rental for an upcoming shoot.'
              )
            }
            style={{
              padding: '16px 36px',
              backgroundColor: '#0d9488',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              fontFamily: 'var(--font-heading)',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 30px rgba(13, 148, 136, 0.4)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#14b8a6';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0d9488';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>Book Custom Equipment Package</span>
            <ArrowRightIcon size={16} />
          </button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer
        style={{
          padding: '28px 48px',
          borderTop: '1px solid rgba(252, 242, 189, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1440px',
          margin: '0 auto',
          fontSize: '13px',
          color: 'rgba(252, 242, 189, 0.5)',
        }}
      >
        <div>&copy; {new Date().getFullYear()} Cinecraft Media. All rights reserved.</div>
        <div onClick={onBackToHome} style={{ cursor: 'pointer', color: 'var(--swatch--light)' }}>
          ← Return to Cinecraft Home
        </div>
      </footer>

      <style>{`
        @media (max-width: 800px) {
          .equipments-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

