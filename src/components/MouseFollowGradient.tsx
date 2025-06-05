import { useEffect, useRef } from 'react';

interface MouseFollowGradientProps {
  variant?: 'light' | 'dark';
  opacity?: number;
  size?: number;
}

export default function MouseFollowGradient({ 
  variant = 'dark',
  opacity = 0.7,
  size = 800
}: MouseFollowGradientProps) {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = gradientRef.current;
    if (!element) return;

    const parent = element.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      element.style.setProperty('--mouse-x', `${x}px`);
      element.style.setProperty('--mouse-y', `${y}px`);
    };

    parent.addEventListener('mousemove', handleMouseMove);
    return () => parent.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const gradientColor = variant === 'light' 
    ? 'rgba(0, 136, 204, 0.06)' // Brand blue with low opacity for light backgrounds
    : 'rgba(255, 255, 255, 0.06)'; // White with low opacity for dark backgrounds

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      <div 
        ref={gradientRef}
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(
              ${size}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
              ${gradientColor},
              transparent 40%
            )
          `
        }}
      />
    </div>
  );
} 