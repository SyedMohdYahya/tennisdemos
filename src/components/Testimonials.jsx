import React, { useEffect, useRef, useState } from 'react';
import DemoOne from '@/components/ui/demo';

const Testimonials = ({ isMobile }) => {
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !('IntersectionObserver' in window)) {
      setIsActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        rootMargin: '280px 0px',
        threshold: 0.01,
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className={`section-padding testimonials-section${isActive ? ' is-visible' : ''}`}
    >
      <div className="container testimonials-container">
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '28px' : '34px' }}>
          <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
            WHAT <span style={{ color: 'var(--tennis-green)' }}>FIGHTERS</span> SAY
          </h2>
          <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--tennis-green)', margin: '15px auto 0' }} />
        </div>

        <DemoOne />
      </div>
    </section>
  );
};

export default Testimonials;
