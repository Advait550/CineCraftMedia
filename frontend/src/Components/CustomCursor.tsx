import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cardHover, setCardHover] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on devices that support hover (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, .clickable');
        setIsHovering(!!interactive);

        const card = target.closest('[data-cursor-label]') as HTMLElement | null;
        if (card && card.dataset.cursorLabel) {
          setCardHover(card.dataset.cursorLabel);
        } else {
          setCardHover(null);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [pos]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
        }}
      />
      <div
        className={`custom-cursor-follower ${isHovering ? 'is-hovering' : ''} ${
          cardHover ? 'is-card' : ''
        }`}
        style={{
          transform: `translate3d(${trailingPos.x - (cardHover ? 38 : isHovering ? 30 : 18)}px, ${
            trailingPos.y - (cardHover ? 38 : isHovering ? 30 : 18)
          }px, 0)`,
        }}
      >
        {cardHover && <span style={{ fontSize: '10px', fontWeight: 800 }}>{cardHover}</span>}
      </div>
    </>
  );
};
