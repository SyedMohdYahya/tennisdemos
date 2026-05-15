import React, { useCallback, useEffect, useMemo, useRef } from 'react';

const MAX_DECODE_JOBS = 5;
const MAX_CANVAS_DPR = 1.5;
const FRAME_EASE = 0.28;
const FRAME_SETTLE_DELTA = 0.04;

const decodedFrameCache = new Map();

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const buildFrameUrls = (sequences) => {
  const urls = [];

  sequences.forEach((sequence) => {
    const { start, end, baseUrl, extension = '.png', pad = 4 } = sequence;

    for (let index = start; index <= end; index += 1) {
      urls.push(`${baseUrl}${index.toString().padStart(pad, '0')}${extension}`);
    }
  });

  return urls;
};

const decodeBlobWithImage = (blob) =>
  new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(blob);
    const image = new Image();
    image.decoding = 'async';

    image.onload = async () => {
      try {
        if (image.decode) {
          await image.decode();
        }
      } catch {
        // The frame is already loaded; draw it even if decode() reports late.
      }

      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    };

    image.src = objectUrl;
  });

const loadDecodedFrame = (url) => {
  if (decodedFrameCache.has(url)) {
    return decodedFrameCache.get(url);
  }

  const promise = fetch(url, { cache: 'force-cache' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load frame ${url}`);
      }

      return response.blob();
    })
    .then(async (blob) => {
      if ('createImageBitmap' in window) {
        try {
          return await createImageBitmap(blob);
        } catch {
          return decodeBlobWithImage(blob);
        }
      }

      return decodeBlobWithImage(blob);
    })
    .catch((error) => {
      console.warn(error);
      return null;
    });

  decodedFrameCache.set(url, promise);
  return promise;
};

const getFrameDimensions = (frame) => ({
  width: frame?.naturalWidth || frame?.width || 1,
  height: frame?.naturalHeight || frame?.height || 1,
});

const ImageSequence = ({ sequences, containerRef, endProgress = 0.9, onProgress, onLoadComplete }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const framesRef = useRef([]);
  const loadedCountRef = useRef(0);
  const lastProgressRef = useRef(-1);
  const lastDrawnFrameRef = useRef(-1);
  const drawBoxRef = useRef(null);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const metricsRef = useRef({ start: 0, animationEnd: 1 });
  const rafRef = useRef(0);
  const onProgressRef = useRef(onProgress);
  const onLoadCompleteRef = useRef(onLoadComplete);

  const allUrls = useMemo(() => buildFrameUrls(sequences), [sequences]);
  const totalFrames = allUrls.length;

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    onLoadCompleteRef.current = onLoadComplete;
  }, [onLoadComplete]);

  const getContext = useCallback(() => {
    if (contextRef.current) {
      return contextRef.current;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }

    contextRef.current = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });

    if (contextRef.current) {
      contextRef.current.imageSmoothingEnabled = true;
      contextRef.current.imageSmoothingQuality = 'high';
    }

    return contextRef.current;
  }, []);

  const getNearestLoadedFrame = useCallback((index) => {
    const frames = framesRef.current;
    if (!frames.length) {
      return null;
    }

    for (let distance = 0; distance < frames.length; distance += 1) {
      const before = index - distance;
      const after = index + distance;

      if (before >= 0 && frames[before]) {
        return frames[before];
      }

      if (after < frames.length && frames[after]) {
        return frames[after];
      }
    }

    return null;
  }, []);

  const getDrawBox = useCallback((frame) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }

    const { width: sourceWidth, height: sourceHeight } = getFrameDimensions(frame);
    const cached = drawBoxRef.current;

    if (
      cached &&
      cached.canvasWidth === canvas.width &&
      cached.canvasHeight === canvas.height &&
      cached.sourceWidth === sourceWidth &&
      cached.sourceHeight === sourceHeight
    ) {
      return cached;
    }

    const canvasAspect = canvas.width / canvas.height;
    const sourceAspect = sourceWidth / sourceHeight;
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > sourceAspect) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * sourceAspect;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / sourceAspect;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    const nextBox = {
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      sourceWidth,
      sourceHeight,
      offsetX,
      offsetY,
      drawWidth,
      drawHeight,
    };

    drawBoxRef.current = nextBox;
    return nextBox;
  }, []);

  const drawFrame = useCallback(
    (rawIndex, force = false) => {
      const canvas = canvasRef.current;
      const context = getContext();

      if (!canvas || !context || totalFrames === 0) {
        return;
      }

      const index = clamp(Math.round(rawIndex), 0, totalFrames - 1);

      if (!force && lastDrawnFrameRef.current === index) {
        return;
      }

      const frame = framesRef.current[index] || getNearestLoadedFrame(index);
      if (!frame) {
        return;
      }

      const box = getDrawBox(frame);
      if (!box) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(frame, box.offsetX, box.offsetY, box.drawWidth, box.drawHeight);
      lastDrawnFrameRef.current = index;
    },
    [getContext, getDrawBox, getNearestLoadedFrame, totalFrames],
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_CANVAS_DPR);
    const nextWidth = Math.max(1, Math.round(rect.width * dpr));
    const nextHeight = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      drawBoxRef.current = null;
      lastDrawnFrameRef.current = -1;
    }

    drawFrame(currentFrameRef.current, true);
  }, [drawFrame]);

  useEffect(() => {
    let disposed = false;
    let nextIndex = 1;

    framesRef.current = new Array(totalFrames);
    loadedCountRef.current = 0;
    lastProgressRef.current = -1;
    lastDrawnFrameRef.current = -1;
    currentFrameRef.current = 0;
    targetFrameRef.current = 0;
    onProgressRef.current?.(0);

    const publishProgress = () => {
      const progress = totalFrames === 0 ? 100 : Math.round((loadedCountRef.current / totalFrames) * 100);

      if (progress !== lastProgressRef.current) {
        lastProgressRef.current = progress;
        onProgressRef.current?.(progress);
      }

      if (loadedCountRef.current >= totalFrames) {
        drawFrame(currentFrameRef.current, true);
        onLoadCompleteRef.current?.();
      }
    };

    const loadAt = async (url, index) => {
      const frame = await loadDecodedFrame(url);

      if (disposed) {
        return;
      }

      framesRef.current[index] = frame;
      loadedCountRef.current += 1;

      if (index === 0 && frame) {
        resizeCanvas();
        drawFrame(0, true);
      }

      publishProgress();
    };

    const runQueue = async () => {
      if (totalFrames === 0) {
        publishProgress();
        return;
      }

      await loadAt(allUrls[0], 0);

      const workers = Array.from({ length: Math.min(MAX_DECODE_JOBS, Math.max(1, totalFrames - 1)) }, async () => {
        while (!disposed && nextIndex < totalFrames) {
          const index = nextIndex;
          nextIndex += 1;
          await loadAt(allUrls[index], index);
        }
      });

      await Promise.all(workers);
    };

    runQueue();

    return () => {
      disposed = true;
    };
  }, [allUrls, drawFrame, resizeCanvas, totalFrames]);

  useEffect(() => {
    if (totalFrames === 0) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMetrics = () => {
      const container = containerRef?.current;
      if (!container) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const start = rect.top + scrollTop;
      const scrollDistance = Math.max(1, rect.height - window.innerHeight);

      metricsRef.current = {
        start,
        animationEnd: start + scrollDistance * clamp(endProgress, 0.1, 1),
      };
    };

    const startLoop = () => {
      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    const updateTarget = () => {
      const { start, animationEnd } = metricsRef.current;
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const progress = clamp((scrollTop - start) / Math.max(1, animationEnd - start), 0, 1);
      targetFrameRef.current = progress * (totalFrames - 1);

      if (mediaQuery.matches) {
        currentFrameRef.current = targetFrameRef.current;
        drawFrame(targetFrameRef.current);
        return;
      }

      startLoop();
    };

    function tick() {
      rafRef.current = 0;

      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const delta = target - current;
      const ease = mediaQuery.matches ? 1 : FRAME_EASE;
      const next = Math.abs(delta) < FRAME_SETTLE_DELTA ? target : current + delta * ease;

      currentFrameRef.current = next;
      drawFrame(next);

      if (Math.abs(target - next) >= FRAME_SETTLE_DELTA) {
        startLoop();
      }
    }

    const handleResize = () => {
      updateMetrics();
      resizeCanvas();
      updateTarget();
    };

    updateMetrics();
    resizeCanvas();
    updateTarget();

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let resizeObserver;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(handleResize);

      if (containerRef?.current) {
        resizeObserver.observe(containerRef.current);
      }

      if (canvasRef.current) {
        resizeObserver.observe(canvasRef.current);
      }
    }

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [containerRef, drawFrame, endProgress, resizeCanvas, totalFrames]);

  return (
    <div className="image-sequence-root">
      <div className="image-sequence-shadow" aria-hidden="true" />
      <canvas ref={canvasRef} className="image-sequence-canvas" role="img" aria-label="Fighters Tennis shirt rotation" />
    </div>
  );
};

export default React.memo(ImageSequence);
