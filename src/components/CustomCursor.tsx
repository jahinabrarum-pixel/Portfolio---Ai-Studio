import { useEffect, useState, useRef } from 'react';

interface CustomCursorProps {
  enabled: boolean;
}

export function CustomCursor({ enabled }: CustomCursorProps) {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, select, [role="button"], [tabindex="0"]');
        setIsPointer(!!interactive);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const loop = () => {
      // Smooth lerp for outer ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [enabled]);

  if (!enabled || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
      {/* Inner precise dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] transition-opacity duration-150"
      />
      {/* Outer futuristic reticle ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 rounded-full border border-[#00F0FF]/50 transition-all duration-100 ease-out flex items-center justify-center -ml-5 -mt-5 ${
          isPointer
            ? 'w-12 h-12 -ml-6 -mt-6 border-[#00F0FF] bg-[#00F0FF]/10 scale-110 shadow-[0_0_15px_rgba(0,240,255,0.35)]'
            : 'w-10 h-10 border-[#00F0FF]/40'
        }`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/30" />
      </div>
    </div>
  );
}
