import React, { useState } from 'react';

interface Project {
  id: string;
  title: string;
  stencilTitle: string;
  category: string;
  image: string;
  client: string;
  services: string[];
  description?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'the-valley-run',
    title: 'THE VALLEY RUN',
    stencilTitle: 'THE VALLEY RUN',
    category: 'Automotive, Drones & High-Speed Coverage',
    image: '/media/work/Valley.webp',
    client: 'The Valley Run Drag Racing',
    services: ['Drones', 'Cameras', 'Automotive', 'Social Campaigns'],
    description:
      'High-octane drag racing and automotive festival coverage featuring high-speed FPV drone tracking, precision trackside cinema cameras, and viral cinematic aftermovies.',
  },
  {
    id: 'sunburn-kolhapur',
    title: 'SUNBURN KOLHAPUR',
    stencilTitle: 'SUNBURN',
    category: 'Live Music Festival & Commercial Production',
    image: '/media/work/Sunburn.webp',
    client: 'Sunburn Festival',
    services: ['Drones', 'Cameras', 'Live Events', 'Aftermovies'],
    description:
      "Electrifying festival production capture, sweeping crowd aerials, and high-energy stage visuals for Asia's premier electronic music festival experience.",
  },
  {
    id: 'lollapalooza-2k25',
    title: 'LOLLAPALOOZA 2K25',
    stencilTitle: 'LOLLAPALOOZA',
    category: 'Festival Cinematography & Live Production',
    image: '/media/work/Lollapalooza_2k25.webp',
    client: 'Lollapalooza India',
    services: ['Cameras', 'Live Events', 'Drones', 'Aftermovies'],
    description:
      'Iconic multi-stage global music festival coverage in Mumbai with full cinema camera packages, dynamic artist tracking, and high-voltage aftermovie reels.',
  },
];

const CATEGORIES = [
  'All',
  'Drones',
  'Cameras',
  'Live Events',
  'Automotive',
  'Aftermovies',
];

export const FeaturedProjects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filtered =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.services.some((s) => s.toLowerCase() === filter.toLowerCase()));

  return (
    <section
      id="featured-projects"
      style={{
        backgroundColor: '#1e1816',
        padding: '100px 48px 140px',
        position: 'relative',
        borderTop: '1px solid rgba(252, 242, 189, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Split Layout: Left Sticky Header & Filter + Right Vertical Showcase Stack (Matching Image 1) */}
        <div className="work-split-layout">
          {/* Left Column: Sticky Title & Category Navigation */}
          <div className="work-left-sidebar">
            {/* Brand Title: Cursive 'Our' + Bold 'WORK' */}
            <div style={{ marginBottom: '40px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '56px',
                  color: 'var(--swatch--brand)',
                  lineHeight: '0.8',
                  transform: 'rotate(-4deg)',
                  marginLeft: '4px',
                  display: 'inline-block',
                }}
              >
                Our
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(40px, 4vw, 54px)',
                  fontWeight: 700,
                  color: 'var(--swatch--light)',
                  letterSpacing: '-1.5px',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                WORK
              </h2>
            </div>

            {/* Vertical Category Filter List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CATEGORIES.map((cat) => {
                const isSelected = filter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    style={{
                      background: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '7px 18px',
                      width: 'fit-content',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14.5px',
                      fontWeight: isSelected ? 600 : 500,
                      color: isSelected ? '#ffffff' : 'rgba(252, 242, 189, 0.65)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.color = 'rgba(252, 242, 189, 0.65)';
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Giant Project Cards Vertical Stack (Matching Image 1) */}
          <div className="work-cards-stack">
            {filtered.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="work-project-card"
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  backgroundColor: '#1b1614',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55)',
                  cursor: 'pointer',
                  border: '1px solid rgba(252, 242, 189, 0.08)',
                  transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 81, 33, 0.4)';
                  e.currentTarget.style.boxShadow = '0 30px 70px rgba(0, 0, 0, 0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(252, 242, 189, 0.08)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.55)';
                }}
              >
                {/* Full Bleed Campaign Visual */}
                <div style={{ position: 'relative', width: '100%', height: '540px', overflow: 'hidden' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Gradient Dark Overlay on Bottom for Stencil Typography Contrast */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(16, 13, 11, 0.94) 0%, rgba(16, 13, 11, 0.45) 45%, transparent 75%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Typography Content Matching Image 1 */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      padding: '36px 44px',
                      display: 'flex',
                      flexDirection: 'column',
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Giant Gold Stencil Title (e.g. 'STEAL') */}
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(54px, 8.5vw, 105px)',
                        fontWeight: 700,
                        color: '#f5b82e',
                        letterSpacing: '-2px',
                        lineHeight: 0.88,
                        textTransform: 'uppercase',
                        textShadow: '0 6px 35px rgba(0, 0, 0, 0.9)',
                      }}
                    >
                      {project.stencilTitle}
                    </div>

                    {/* Secondary Title & Subtitle */}
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '19px',
                        fontWeight: 700,
                        color: 'var(--swatch--light)',
                        marginTop: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                      }}
                    >
                      {project.title}
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13.5px',
                        color: 'rgba(252, 242, 189, 0.75)',
                        marginTop: '4px',
                      }}
                    >
                      {project.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(20, 16, 14, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#201a18',
              borderRadius: '24px',
              maxWidth: '850px',
              width: '100%',
              overflow: 'hidden',
              border: '1px solid rgba(252, 242, 189, 0.15)',
              boxShadow: '0 40px 100px rgba(0, 0, 0, 0.8)',
            }}
          >
            <img
              src={activeProject.image}
              alt={activeProject.title}
              style={{
                width: '100%',
                height: '380px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div style={{ padding: '36px 40px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: 'var(--swatch--light)',
                  marginBottom: '10px',
                }}
              >
                {activeProject.title}
              </div>
              <div
                style={{
                  color: 'var(--swatch--brand)',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}
              >
                {activeProject.category} &bull; {activeProject.client}
              </div>
              <p
                style={{
                  color: 'var(--swatch--light-o80)',
                  lineHeight: 1.6,
                  fontSize: '15px',
                  marginBottom: '28px',
                }}
              >
                {activeProject.description}
              </p>
              <button
                onClick={() => setActiveProject(null)}
                style={{
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--swatch--brand)',
                  color: '#ffffff',
                  border: 'none',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Close Project
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .work-split-layout {
          display: flex;
          gap: 64px;
          align-items: flex-start;
        }

        .work-left-sidebar {
          width: 300px;
          flex-shrink: 0;
          position: sticky;
          top: 120px;
        }

        .work-cards-stack {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        @media (max-width: 960px) {
          .work-split-layout {
            flex-direction: column;
            gap: 36px;
          }

          .work-left-sidebar {
            width: 100%;
            position: relative;
            top: 0;
          }
        }
      `}</style>
    </section>
  );
};
