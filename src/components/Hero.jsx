import React, { useEffect, useMemo, useRef, useState } from 'react';
import ImageSequence from './ImageSequence';

const Hero = ({ onProgress, onLoadComplete }) => {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const containerRef = useRef(null);
  const sequences = useMemo(
    () => [
      {
        baseUrl: '/images/sequence/frame_',
        start: 1,
        end: 78
      }
    ],
    []
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (event) => setIsMobile(event.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-scroll-stage"
      style={{ '--hero-scroll-height': isMobile ? '580vh' : '450vh' }}
    >
      <div className="hero-sticky-panel" style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--tennis-green)',
        padding: isMobile ? '64px 16px' : '0'
      }}>
        {/* Messy Graffiti Background Text Layer */}
        <div className="hero-graffiti-layer" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(2.8) rotate(-8deg)',
          fontFamily: "'Sedgwick Ave Display', cursive",
          fontSize: isMobile ? '25vw' : '18vw',
          color: 'var(--deep-black)',
          lineHeight: 0.7,
          textAlign: 'center',
          opacity: 0.08,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          <div>Fighters</div>
          <div>Tennis</div>
          <div>Academy</div>
        </div>

        {/* Random Black Street Art Elements */}
        <div className="hero-graffiti-layer" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          <svg style={{ position: 'absolute', top: '20%', left: '12%', opacity: 0.5 }} width="50" height="50" viewBox="0 0 50 50">
            <path d="M25 0 L25 50 M0 25 L50 25" stroke="var(--deep-black)" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <svg style={{ position: 'absolute', bottom: '15%', right: '10%', opacity: 0.7, transform: 'rotate(25deg)' }} width="30" height="30" viewBox="0 0 50 50">
            <path d="M25 0 L25 50 M0 25 L50 25" stroke="var(--deep-black)" strokeWidth="8" strokeLinecap="round" />
          </svg>
          <svg style={{ position: 'absolute', top: '70%', left: '5%', opacity: 0.4 }} width="80" height="50" viewBox="0 0 80 50" fill="none">
            <path d="M0 25 L20 0 L40 50 L60 0 L80 25" stroke="var(--deep-black)" strokeWidth="5" strokeLinejoin="round" />
          </svg>
          {/* Splatter Dots */}
          <svg style={{ position: 'absolute', top: '10%', right: '20%', opacity: 0.9 }} width="40" height="40">
            <circle cx="15" cy="15" r="8" fill="var(--deep-black)" />
            <circle cx="30" cy="5" r="4" fill="var(--deep-black)" />
            <circle cx="5" cy="30" r="5" fill="var(--deep-black)" />
          </svg>
        </div>

        {/* Dense Main Graffiti Text */}
        <div className="hero-graffiti-layer" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 5
        }}>
          <div style={{
            fontFamily: "'Sedgwick Ave Display', cursive",
            fontSize: isMobile ? '24vw' : '18vw',
            color: 'var(--deep-black)',
            lineHeight: 0.65,
            textAlign: 'center',
            opacity: 0.95,
            transform: 'rotate(-6deg)'
          }}>
            <div style={{ transform: 'translateX(-8%) rotate(-3deg)' }}>Fighters</div>
            <div style={{ transform: 'translateX(5%) rotate(4deg)', position: 'relative', zIndex: 2 }}>Tennis</div>
            <div style={{ transform: 'translateX(-4%) rotate(-2deg)' }}>Academy</div>
          </div>
        </div>

        {/* Custom Canvas Image Sequence (Foreground) */}
        <div style={{
          height: isMobile ? '60%' : '90%',
          width: isMobile ? '92%' : '70%',
          maxWidth: isMobile ? '560px' : '1180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10,
          transform: 'translateZ(0)'
        }}>
          <ImageSequence 
            containerRef={containerRef} 
            endProgress={isMobile ? 0.88 : 0.92}
            onProgress={onProgress}
            onLoadComplete={onLoadComplete}
            sequences={sequences}
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
