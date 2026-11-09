export interface PageTransitionProps {
  active: boolean;
  phase: 'idle' | 'enter' | 'exit';
  color: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  active,
  phase,
  color,
}) => {
  if (!active && phase === 'idle') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: active ? 'all' : 'none',
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1062 1000"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        <path
          d="M20.002 787.914C41.7003 820.073 100.527 881.496 162.246 869.918C239.396 855.447 258.683 763.796 203.232 669.732C147.781 575.669 65.8095 404.425 162.246 361.011C258.683 317.597 292.436 397.189 294.847 553.962C297.258 710.734 444.324 739.677 463.611 640.789C482.898 541.902 249.039 414.072 323.778 283.831C398.516 153.589 675.772 218.71 656.484 464.722C637.197 710.734 579.335 925.392 745.688 922.98C912.042 920.568 928.918 797.562 875.878 686.615C822.838 575.669 731.223 500.9 890.343 430.955C1049.46 361.011 1080.81 262.124 996.424 194.591C912.042 127.058 733.634 346.54 656.484 225.945C579.335 105.351 400.927 35.4064 224.93 180.119"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1000}
          className={phase === 'enter' ? 'transition-draw-enter' : 'transition-draw-exit'}
        />
      </svg>

      <style>{`
        /* Slow, cinematic pen/brush drawing across the screen */
        .transition-draw-enter {
          stroke-dasharray: 1000;
          animation: drawOnScreen 0.92s cubic-bezier(0.35, 0, 0.25, 1) forwards;
        }

        .transition-draw-exit {
          stroke-dasharray: 1000;
          animation: drawOffScreen 0.75s cubic-bezier(0.35, 0, 0.25, 1) forwards;
        }

        @keyframes drawOnScreen {
          0% {
            stroke-dashoffset: 1000;
            stroke-width: 160;
            opacity: 0.95;
          }
          60% {
            stroke-dashoffset: 160;
            stroke-width: 320;
            opacity: 1;
          }
          85% {
            stroke-dashoffset: 0;
            stroke-width: 680;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-width: 950;
            opacity: 1;
          }
        }

        @keyframes drawOffScreen {
          0% {
            stroke-dashoffset: 0;
            stroke-width: 950;
            opacity: 1;
          }
          30% {
            stroke-dashoffset: -120;
            stroke-width: 580;
            opacity: 1;
          }
          75% {
            stroke-dashoffset: -650;
            stroke-width: 220;
            opacity: 0.95;
          }
          100% {
            stroke-dashoffset: -1000;
            stroke-width: 0;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
