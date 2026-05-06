import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const frameCount = 79;

  // Preload images
  useEffect(() => {
    const loadedImages = new Array(frameCount);
    
    const loadImage = (index) => {
      if (loadedImages[index]) return Promise.resolve();
      return new Promise((resolve) => {
        const img = new Image();
        const paddedIndex = index.toString().padStart(4, '0');
        if (index === 12) img.fetchPriority = 'high';
        img.src = `/images/sequence/frame_${paddedIndex}.png`;
        img.onload = async () => {
          try {
            // Force browser to decode the image off the main thread before using it.
            // This eliminates the notorious "first scroll stutter" caused by lazy decoding.
            if (img.decode) await img.decode();
          } catch (e) {
            console.warn("Decoding failed for frame", index);
          }
          loadedImages[index] = img;
          // Batch updates to reduce re-renders
          if (index === 12 || index % 5 === 0 || index === frameCount - 1) {
            setImages([...loadedImages]);
          }
          resolve();
        };
        img.onerror = resolve; // Continue on error
      });
    };

    // Phase 1: Load first frame immediately
    loadImage(12).then(() => {
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

  // To achieve a "3D smooth" feel on discrete mouse wheels, we MUST interpolate the scroll.
  // We use a very low mass and high stiffness so it tracks instantly (no lag) but fills in the missing frames.
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.1,
    restDelta: 0.001
  });

  // Map interpolated scroll progress (0 to 0.9) to frame index
  const frameIndex = useTransform(smoothScroll, [0, 0.9], [12, frameCount - 1], { clamp: true });

  // Handle Mobile Responsiveness via state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lastDrawnIndex = useRef(-1);

  // Render Frame
  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      if (images.length === 0 || !canvasRef.current) return;

      const index = Math.min(Math.floor(latest), frameCount - 1);
      
      // Prevent redundant draws of the exact same frame
      if (index === lastDrawnIndex.current) return;
      lastDrawnIndex.current = index;

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d', { alpha: true }); // optimize context
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

  // Draw first frame (index 12)
  useEffect(() => {
    if (images.length > 12 && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const image = images[12];
      if (!image) return;
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--tennis-green)',
        padding: isMobile ? '80px 20px' : '0'
      }}>
        {/* Messy Graffiti Background Text Layer */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(2.8) rotate(-8deg)',
          fontFamily: "'Sedgwick Ave Display', cursive",
          fontSize: '18vw',
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
        <div style={{
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
        <div style={{
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

        {/* Centered Image Sequence (Foreground) */}
        <div style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          <canvas
            ref={canvasRef}
            width={1080}
            height={1080}
            style={{
              width: 'auto',
              height: isMobile ? '60%' : '90%',
              objectFit: 'contain',
              filter: 'drop-shadow(0px 30px 40px rgba(0, 0, 0, 0.25))'
            }}
          />
        </div>



      </div>
    </section>
  );
};

export default Hero;
