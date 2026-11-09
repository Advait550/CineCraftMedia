import React, { useState, useEffect, useRef } from 'react';

export const VideoScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pinState, setPinState] = useState<'before' | 'pinned' | 'after'>('before');
  const [isMuted, setIsMuted] = useState(true);

  // Track scroll progress and pin state accurately
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalScroll = containerRef.current.offsetHeight - windowHeight;

            if (totalScroll > 0) {
              const currentScroll = -rect.top;
              const p = Math.max(0, Math.min(1, currentScroll / totalScroll));
              setScrollProgress(p);

              // Rock-solid viewport pinning states:
              // - before: Container has not reached top of viewport yet
              // - pinned: Container is currently active across the viewport (video is 100% fixed)
              // - after: User has fully scrolled past the container (unpins to next section)
              if (rect.top > 0) {
                setPinState('before');
              } else if (rect.bottom <= windowHeight) {
                setPinState('after');
              } else {
                setPinState('pinned');
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Ensure video autoplay works properly
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented by browser policy, resumes on interaction
        });
      }
    }
  }, [isMuted]);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  /**
   * Scroll Timeline (from progress = 0 to 1):
   * 1. 0.00 -> 0.32: Video is LOCKED in the viewport; it NEVER scrolls up out of screen.
   *                  It strictly scales up from center (scale 0.65 -> 1.0, radius 28px -> 0px) to fit the whole screen.
   * 2. 0.32 -> 0.42: Video is fixed full-screen (scale: 1.0, radius: 0px).
   * 3. 0.42 -> 0.70: Text slides up smoothly from bottom over the fixed video (translateY 110vh -> 0).
   * 4. 0.70 -> 0.84: Text stays centered over the video for reading and sound toggling.
   * 5. 0.84 -> 1.00: Text slides up past the top of the video (translateY 0 -> -115vh).
   *                  Once cleared, the page continues scrolling to the next section!
   */

  // 1. Symmetrical in-place scale (No vertical shift)
  let videoScale = 1;
  let videoRadius = 0;

  if (scrollProgress <= 0.32) {
    const scaleFactor = Math.min(1, Math.max(0, scrollProgress / 0.32));
    const easeScale = Math.sin((scaleFactor * Math.PI) / 2);
    videoScale = 0.65 + 0.35 * easeScale;
    videoRadius = Math.round(28 * (1 - easeScale));
  } else {
    videoScale = 1;
    videoRadius = 0;
  }

  // 2. Translucent contrast overlay behind text
  let overlayOpacity = 0;
  if (scrollProgress < 0.36) {
    overlayOpacity = 0;
  } else if (scrollProgress >= 0.36 && scrollProgress <= 0.54) {
    overlayOpacity = ((scrollProgress - 0.36) / 0.18) * 0.72;
  } else if (scrollProgress > 0.54 && scrollProgress < 0.84) {
    overlayOpacity = 0.72;
  } else {
    overlayOpacity = Math.max(0, 0.72 * (1 - (scrollProgress - 0.84) / 0.16));
  }

  // 3. Text slide-up & slide-off-top
  let textTranslateY = 120; // in vh
  let textOpacity = 0;

  if (scrollProgress < 0.38) {
    textTranslateY = 120;
    textOpacity = 0;
  } else if (scrollProgress >= 0.38 && scrollProgress <= 0.68) {
    const t = (scrollProgress - 0.38) / 0.30;
    const ease = 1 - Math.pow(1 - t, 2.5);
    textTranslateY = (1 - ease) * 110;
    textOpacity = Math.min(1, t * 1.5);
  } else if (scrollProgress > 0.68 && scrollProgress <= 0.84) {
    textTranslateY = 0;
    textOpacity = 1;
  } else {
    const exitT = (scrollProgress - 0.84) / 0.16;
    const easeExit = Math.pow(exitT, 1.8);
    textTranslateY = -easeExit * 115;
    textOpacity = Math.max(0, 1 - exitT * 1.2);
  }

  return (
    <section
      ref={containerRef}
      id="showreel"
      style={{
        position: 'relative',
        height: '350vh', // Pinned scroll track
        backgroundColor: 'var(--swatch--dark)',
      }}
    >
      {/*
        Active Viewport Container:
        - When 'pinned': Uses position: fixed; top: 0; left: 0; 100vw x 100vh.
          It is physically impossible for the video to scroll out of screen during scaling!
        - When 'before': Anchored at top of container.
        - When 'after': Anchored at bottom of container, scrolling away naturally.
      */}
      <div
        style={{
          position: pinState === 'pinned' ? 'fixed' : 'absolute',
          top: pinState === 'pinned' ? 0 : pinState === 'after' ? 'auto' : 0,
          bottom: pinState === 'after' ? 0 : 'auto',
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: pinState === 'pinned' ? 40 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#1b1614',
          pointerEvents: pinState === 'pinned' ? 'auto' : 'none',
        }}
      >
        {/*
          Scalable Video Container:
          Positioned dead-center via absolute + translate(-50%, -50%).
          Width and height are ALWAYS 100vw and 100vh.
          It stays centered in the viewport and ONLY scales up symmetrically!
        */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '100vh',
            transform: `translate(-50%, -50%) scale(${videoScale})`,
            transformOrigin: 'center center',
            borderRadius: `${videoRadius}px`,
            overflow: 'hidden',
            boxShadow:
              videoScale < 0.98
                ? '0 30px 80px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(252, 242, 189, 0.12)'
                : 'none',
            willChange: 'transform, border-radius',
          }}
        >
          {/* Showreel Video */}
          <video
            ref={videoRef}
            src="/videos/intro.webm"
            poster="https://cdn.prod.website-files.com/69e88d0efafb70caf79fbd65/6a20614be7191d93e8cfd0cf_Screenshot%202026-06-03%20at%2017.40.47.avif"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Translucent Backdrop Blur Overlay for Text Readability */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(30, 24, 21, 0.72)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              opacity: overlayOpacity,
              pointerEvents: 'none',
              transition: 'opacity 0.1s ease-out',
            }}
          />
        </div>

        {/* Statement Text Container (slides up from bottom, holds center, slides up off top) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px',
            transform: `translate3d(0, ${textTranslateY}vh, 0)`,
            opacity: textOpacity,
            pointerEvents: scrollProgress >= 0.45 && scrollProgress <= 0.85 ? 'auto' : 'none',
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              maxWidth: '1080px',
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(24px, 3.8vw, 50px)',
                fontWeight: 700,
                color: 'var(--swatch--light)',
                lineHeight: 1.28,
                textTransform: 'uppercase',
                letterSpacing: '-0.5px',
                textShadow: '0 4px 24px rgba(0, 0, 0, 0.85)',
                margin: 0,
              }}
            >
              CINECRAFT MEDIA PRODUCES 360° CREATIVE CAMPAIGNS FOR SOME OF THE{' '}
              <span
                style={{
                  fontFamily: 'var(--font-script)',
                  textTransform: 'none',
                  color: 'var(--swatch--brand)',
                  fontSize: '1.25em',
                  fontWeight: 400,
                  display: 'inline-block',
                  transform: 'rotate(-2deg)',
                  margin: '0 6px',
                  verticalAlign: 'baseline',
                  textShadow: '0 0 35px rgba(255, 81, 33, 0.45)',
                }}
              >
                biggest
              </span>{' '}
              NAMES IN ENTERTAINMENT. FROM KEY ART TO SOCIAL ASSETS, UNIT PHOTOGRAPHY TO EPKS, WE MAKE SURE EVERY
              ASSET IS PERFECTLY ALIGNED, CONSISTENTLY{' '}
              <span
                style={{
                  fontFamily: 'var(--font-script)',
                  textTransform: 'none',
                  color: 'var(--swatch--brand)',
                  fontSize: '1.25em',
                  fontWeight: 400,
                  display: 'inline-block',
                  transform: 'rotate(-1deg)',
                  margin: '0 6px',
                  verticalAlign: 'baseline',
                  textShadow: '0 0 35px rgba(255, 81, 33, 0.45)',
                }}
              >
                brilliant
              </span>{' '}
              AND DELIVERED WITHOUT FUSS.
            </h2>

            {/* Sound Toggle Button */}
            <div style={{ marginTop: '36px' }}>
              <button
                type="button"
                onClick={toggleSound}
                aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  backgroundColor: 'rgba(39, 32, 29, 0.88)',
                  border: '1px solid rgba(252, 242, 189, 0.28)',
                  borderRadius: '9999px',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.65)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, transform 0.15s ease',
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--swatch--brand)';
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(252, 242, 189, 0.28)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    color: 'var(--swatch--light)',
                  }}
                >
                  Sound
                </span>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    width: '34px',
                    height: '20px',
                    borderRadius: '10px',
                    backgroundColor: !isMuted ? 'var(--swatch--brand)' : 'rgba(252, 242, 189, 0.25)',
                    padding: '2px',
                    transition: 'background-color 0.25s ease',
                  }}
                >
                  <span
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      transform: !isMuted ? 'translateX(14px)' : 'translateX(0)',
                      transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
