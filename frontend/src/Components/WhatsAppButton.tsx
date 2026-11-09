import React, { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = '919370466245'; // +91 93704 66245

interface InquiryOption {
  id: string;
  title: string;
  desc: string;
  message: string;
}

const INQUIRY_OPTIONS: InquiryOption[] = [
  {
    id: 'drones',
    title: 'Drone & Aerial Cinematography',
    desc: 'FPV tracking, licensed DGCA pilots & 4K/ProRes aerials',
    message:
      "Hello Cinecraft Media! I'm reaching out to inquire about your Drone & Aerial Cinematography services for an upcoming project. Could you share package details and pilot availability?",
  },
  {
    id: 'cameras',
    title: 'Cinema Cameras & Equipment',
    desc: 'Cinema camera packages, prime glass & specialized rigs',
    message:
      "Hello Cinecraft Media! I'd like to inquire about your Cinema Camera packages and production gear for our upcoming shoot. Please share equipment specs and pricing.",
  },
  {
    id: 'production',
    title: 'Commercial & Video Production',
    desc: 'Full-scale creative commercial & brand campaigns',
    message:
      "Hello Cinecraft Media! We're planning a video production / commercial shoot and would love to collaborate with your team. Let's discuss details!",
  },
  {
    id: 'key-art',
    title: 'Key Art & Creative Campaigns',
    desc: 'Poster design, visual identity & marketing key art',
    message:
      "Hello Cinecraft Media! I'm looking for Key Art poster design and visual campaign creative for our upcoming release.",
  },
  {
    id: 'unit',
    title: 'Unit Photography & BTS',
    desc: 'On-set episodic stills & documentary BTS coverage',
    message:
      "Hello Cinecraft Media! We need on-set unit photography and behind-the-scenes coverage for our upcoming production schedule.",
  },
  {
    id: 'general',
    title: 'General Inquiry / Consultation',
    desc: 'Discuss a custom production or partnership',
    message:
      "Hello Cinecraft Media! I have an inquiry regarding your creative media services and would like to connect.",
  },
];

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  // Disappear when user scrolls to footer so Instagram & LinkedIn links are not obstructed
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer');
      if (!footer) return;

      const rect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When the top of footer is within 250px of the viewport bottom, fade out WhatsApp icon
      if (rect.top <= windowHeight - 80) {
        setIsNearFooter(true);
        setIsOpen(false); // close popup as well
      } else {
        setIsNearFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectAndRedirect = (message: string) => {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button & Popup Container */}
      <div
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          pointerEvents: isNearFooter ? 'none' : 'auto',
          opacity: isNearFooter ? 0 : 1,
          transform: isNearFooter ? 'translateY(20px) scale(0.92)' : 'translateY(0) scale(1)',
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Inquiry Type Selection Popup */}
        {isOpen && (
          <div
            className="whatsapp-popup-enter"
            style={{
              position: 'absolute',
              bottom: '74px',
              right: '0',
              width: '360px',
              maxWidth: 'calc(100vw - 36px)',
              backgroundColor: '#1d1715',
              border: '1px solid rgba(252, 242, 189, 0.14)',
              borderRadius: '20px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(37, 211, 102, 0.25)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10000,
            }}
          >
            {/* Header with Green to Dark Green Gradient */}
            <div
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <WhatsAppIcon size={20} color="#ffffff" />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.2,
                      letterSpacing: '0.2px',
                    }}
                  >
                    Cinecraft Media
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      marginTop: '2px',
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        display: 'inline-block',
                      }}
                    />
                    Select inquiry to connect on WhatsApp
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '22px',
                  cursor: 'pointer',
                  padding: '4px',
                  lineHeight: 1,
                  opacity: 0.85,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
              >
                &times;
              </button>
            </div>

            {/* List of Inquiries (Instant 1-Click Redirect) */}
            <div style={{ padding: '16px', maxHeight: '440px', overflowY: 'auto' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'rgba(252, 242, 189, 0.6)',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  paddingLeft: '4px',
                }}
              >
                Choose inquiry type:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {INQUIRY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectAndRedirect(opt.message)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid rgba(252, 242, 189, 0.08)',
                      backgroundColor: 'rgba(252, 242, 189, 0.03)',
                      color: 'var(--swatch--light)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(37, 211, 102, 0.12)';
                      e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.45)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(252, 242, 189, 0.03)';
                      e.currentTarget.style.borderColor = 'rgba(252, 242, 189, 0.08)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--swatch--light)',
                          letterSpacing: '0.2px',
                          marginBottom: '2px',
                        }}
                      >
                        {opt.title}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          color: 'rgba(252, 242, 189, 0.6)',
                          lineHeight: 1.35,
                        }}
                      >
                        {opt.desc}
                      </div>
                    </div>
                    <span
                      style={{
                        color: '#25D366',
                        fontSize: '16px',
                        fontWeight: 700,
                        opacity: 0.85,
                      }}
                    >
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Floating Trigger Button with Green to Dark-Green Gradient */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Inquire on WhatsApp"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 28px rgba(18, 140, 126, 0.5), 0 4px 12px rgba(0, 0, 0, 0.45)',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow =
              '0 14px 34px rgba(18, 140, 126, 0.65), 0 6px 16px rgba(0, 0, 0, 0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow =
              '0 10px 28px rgba(18, 140, 126, 0.5), 0 4px 12px rgba(0, 0, 0, 0.45)';
          }}
        >
          {isOpen ? (
            <span style={{ fontSize: '24px', lineHeight: 1, fontWeight: 700 }}>&times;</span>
          ) : (
            <WhatsAppIcon size={30} color="#ffffff" />
          )}
        </button>
      </div>

      <style>{`
        .whatsapp-popup-enter {
          animation: waPopupIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes waPopupIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

const WhatsAppIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.031 2C6.51 2 2.019 6.49 2.019 12.011c0 1.99.585 3.847 1.6 5.409L2 22l4.734-1.572c1.498.924 3.253 1.455 5.143 1.455 5.522 0 10.013-4.49 10.013-10.011C21.89 6.49 17.553 2 12.031 2zm0 18.258c-1.637 0-3.167-.47-4.475-1.282l-.321-.2-.321-.2-3.13.821.835-3.048-.209-.333a8.196 8.196 0 01-1.258-4.346c0-4.555 3.708-8.263 8.263-8.263 4.555 0 8.263 3.708 8.263 8.263 0 4.555-3.708 8.263-8.263 8.263zm4.529-6.175c-.248-.124-1.467-.723-1.695-.806-.228-.083-.394-.124-.56.124-.166.248-.642.806-.787.972-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.994-1.231-.737-.657-1.235-1.469-1.38-1.717-.145-.248-.015-.382.109-.505.112-.111.248-.29.373-.435.124-.145.166-.248.248-.414.083-.166.041-.311-.021-.435-.062-.124-.56-1.349-.766-1.848-.2-.486-.404-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.311-.228.248-.871.851-.871 2.075 0 1.224.891 2.407 1.016 2.573.124.166 1.753 2.677 4.247 3.754.593.256 1.056.409 1.418.524.596.19 1.138.163 1.567.099.479-.071 1.467-.6 1.674-1.18.207-.58.207-1.077.145-1.18-.062-.104-.228-.166-.477-.29z" />
  </svg>
);
