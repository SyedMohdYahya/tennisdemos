import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ImageSequence = ({ sequences, containerRef, endProgress = 0.6, onProgress, onLoadComplete }) => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Combine all sequence URLs into one flat array
  const allUrls = useMemo(() => {
    let urls = [];
    sequences.forEach(seq => {
      const { start, end, baseUrl, extension = '.png' } = seq;
      for (let i = start; i <= end; i++) {
        const frameNumber = i.toString().padStart(4, '0');
        urls.push(`${baseUrl}${frameNumber}${extension}`);
      }
    });
    return urls;
  }, [sequences]);

  const totalLogicalFrames = allUrls.length;

  // Framer Motion Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, endProgress], [0, totalLogicalFrames - 1], { clamp: true });

  // Preload All Images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];
    setIsLoading(true);

    const loadImage = (url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedImages[index] = img;
        loadedCount++;
        const progress = Math.floor((loadedCount / totalLogicalFrames) * 100);
        if (onProgress) onProgress(progress);
        
        if (loadedCount === totalLogicalFrames) {
          setImages(loadedImages);
          setIsLoading(false);
          if (onLoadComplete) onLoadComplete();
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
        loadedCount++;
        if (loadedCount === totalLogicalFrames) {
          setImages(loadedImages);
          setIsLoading(false);
          if (onLoadComplete) onLoadComplete();
        }
      };
    };

    allUrls.forEach((url, index) => loadImage(url, index));
  }, [allUrls, totalLogicalFrames, onProgress, onLoadComplete]);

  // Draw to Canvas
  const renderFrame = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext('2d');
    const currentIndex = Math.max(0, Math.min(Math.round(frameIndex.get()), images.length - 1));
    const img = images[currentIndex];

    if (img) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  }, [images, frameIndex]);

  useEffect(() => {
    const unsubscribe = frameIndex.on("change", renderFrame);
    if (!isLoading) renderFrame();
    return () => unsubscribe();
  }, [renderFrame, frameIndex, isLoading]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        renderFrame(); // Redraw immediately after resize (prevents flickering/disappearing on mobile)
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', maxWidth: '1200px', objectFit: 'contain', filter: 'drop-shadow(0px 30px 60px rgba(0, 0, 0, 0.15))' }} role="img" aria-label="Tennis Gear Evolution Sequence" />
    </div>
  );
};

export default ImageSequence;
