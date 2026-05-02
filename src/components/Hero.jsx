import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const frameCount = 51;

  // Preload images
  useEffect(() => {
    const loadedImages = new Array(frameCount);
    
    const loadImage = (index) => {
      if (loadedImages[index]) return Promise.resolve();
      return new Promise((resolve) => {
        const img = new Image();
        const paddedIndex = index.toString().padStart(3, '0');
        if (index === 5) img.fetchPriority = 'high';
        img.src = `/images/sequence/teeanimfav no bg_${paddedIndex}.png`;
        img.onload = () => {
          loadedImages[index] = img;
          // Batch updates to reduce re-renders
          if (index === 5 || index % 5 === 0 || index === frameCount - 1) {
            setImages([...loadedImages]);
          }
          resolve();
        };
        img.onerror = resolve; // Continue on error
      });
    };

    // Phase 1: Load first frame immediately
    loadImage(5).then(() => {
      // Phase 2: Load essential frames (every 5th) for quick preview
      const essentialFrames = [];
      for (let i = 0; i < frameCount; i += 5) {
        essentialFrames.push(loadImage(i));
      }
      
      Promise.all(essentialFrames).then(() => {
        // Phase 3: Load all remaining frames
        const remainingFrames = [];
        for (let i = 0; i < frameCount; i++) {
          remainingFrames.push(loadImage(i));
        }
        Promise.all(remainingFrames).then(() => {
          setImages([...loadedImages]);
        });
      });
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress (0 to 0.7) to frame index (starting from index 5)
  // This leaves 30% of the scroll space as a 'pause' on the last frame
  const frameIndex = useTransform(smoothScroll, [0, 0.7], [5, frameCount - 1], { clamp: true });

  // Handle Mobile Responsiveness via state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render Frame
  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      if (images.length === 0 || !canvasRef.current) return;

      const index = Math.min(Math.floor(latest), frameCount - 1);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const image = images[index];

      if (!image) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      
      const scale = Math.min(canvas.width / image.width, canvas.height / image.height) * 0.9;
      const x = (canvas.width / 2) - (image.width / 2) * scale;
      const y = (canvas.height / 2) - (image.height / 2) * scale;

      context.drawImage(image, x, y, image.width * scale, image.height * scale);
    });

    return () => unsubscribe();
  }, [images, frameIndex]);

  // Draw first frame (index 5)
  useEffect(() => {
    if (images.length > 5 && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const image = images[5];
      context.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.min(canvas.width / image.width, canvas.height / image.height) * 0.9;
      const x = (canvas.width / 2) - (image.width / 2) * scale;
      const y = (canvas.height / 2) - (image.height / 2) * scale;
      context.drawImage(image, x, y, image.width * scale, image.height * scale);
    }
  }, [images]);

  return (
    <section ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        alignItems: 'center',
        backgroundColor: 'transparent', // Let global white/lines show through
        padding: isMobile ? '80px 20px' : '0'
      }}>
        {/* Left Side: Academy Info */}
        <div className="container" style={{
          paddingLeft: isMobile ? '0' : '10%',
          zIndex: 10,
          textAlign: isMobile ? 'center' : 'left',
          order: isMobile ? 2 : 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span style={{ 
              color: 'var(--gold)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.4em', 
              fontSize: '0.7rem',
              fontWeight: 800 
            }}>
              Elite Academy • Riyadh
            </span>
            <h1 style={{
              fontSize: isMobile ? '3rem' : 'clamp(3rem, 6vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1,
              color: 'var(--deep-black)',
              marginTop: '15px',
              marginBottom: '20px'
            }}>
              FIGHTERS<br />
              <span style={{ color: 'var(--tennis-green)', WebkitTextStroke: '1px black' }}>TENNIS</span>
            </h1>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              lineHeight: 1.6,
              color: '#555',
              maxWidth: '500px',
              margin: isMobile ? '0 auto 30px' : '0 0 40px'
            }}>
              Join the Kingdom's most exclusive tennis community. World-class facilities and expert coaching in the heart of Riyadh.
            </p>
            <button style={{
              backgroundColor: 'var(--deep-black)',
              color: 'white',
              padding: isMobile ? '15px 35px' : '20px 50px',
              borderRadius: '100px',
              fontSize: '0.9rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Join Now
            </button>
          </motion.div>
        </div>

        {/* Right Side: Image Sequence */}
        <div style={{
          height: isMobile ? '40vh' : '100%',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          order: isMobile ? 1 : 2
        }}>
          <canvas
            ref={canvasRef}
            width={1080}
            height={1080}
            style={{
              width: '100%',
              height: isMobile ? '100%' : '90%',
              objectFit: 'contain',
              zIndex: 1,
              position: 'relative'
            }}
          />
        </div>

        {/* Tennis Ball Outline - Bottom Left Corner */}
        {!isMobile && (
          <motion.div 
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '60px',
              width: '180px',
              height: '180px',
              zIndex: 5,
              opacity: 0.3,
              pointerEvents: 'none'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" fill="none" stroke="var(--tennis-green)" strokeWidth="0.5">
              <circle cx="50" cy="50" r="48" />
              <path d="M15,30 Q50,50 85,30" />
              <path d="M15,70 Q50,50 85,70" />
            </svg>
          </motion.div>
        )}

        {/* Decorative Street Style Green Lines (Hero Specific) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.15
        }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
              d="M-10,20 L30,40 L10,80 L110,60" 
              stroke="var(--tennis-green)" 
              strokeWidth="0.5" 
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />
            <motion.path 
              d="M110,10 L70,30 L90,70 L-10,90" 
              stroke="var(--tennis-green)" 
              strokeWidth="0.3" 
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
