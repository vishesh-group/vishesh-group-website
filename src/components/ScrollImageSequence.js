"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register plugin on the client side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable Scroll Sequence Animation Component.
 * Plays a sequence of preloaded image frames centered in a pinned viewport section.
 * Includes synchronized storytelling text blocks that fade in/out on the left and right,
 * and a dark contrast overlay to ensure readability.
 */
export default function ScrollImageSequence({
  folder = "Motion1",
  frameCount = 240,
  extension = "jpg",
  startFrame = 12,
  prefix = "ezgif-frame-",
  digits = 3,
  scrollContainerHeight = "300vh",
  objectFit = "cover",
  backgroundColor = "bg-zinc-950",
}) {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const canvasRef = useRef(null);

  // Track current frame globally within ref to avoid rendering overhead
  const currentFrameRef = useRef(startFrame);

  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Preload image frames inside useEffect (runs client-side only)
  useEffect(() => {
    let active = true;
    const loadedImages = [];
    let loaded = 0;
    const framesToLoad = frameCount - startFrame + 1;

    // Create loading elements
    for (let i = startFrame; i <= frameCount; i++) {
      const frameNum = String(i).padStart(digits, "0");
      const src = `/${folder}/${prefix}${frameNum}.${extension}`;
      const img = new Image();
      img.src = src;

      img.onload = () => {
        if (!active) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === framesToLoad) {
          setIsLoading(false);
        }
      };

      img.onerror = () => {
        if (!active) return;
        console.error(`Failed to load frame image: ${src}`);
        loaded++;
        setLoadedCount(loaded);
        if (loaded === framesToLoad) {
          setIsLoading(false);
        }
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      active = false;
    };
  }, [folder, frameCount, extension, startFrame, prefix, digits]);

  // 2. Setup GSAP ScrollTrigger timeline when loading is completed
  useEffect(() => {
    if (isLoading || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Helper to draw a single frame to the canvas
    const drawFrame = (frameIndex) => {
      const imgIndex = frameIndex - startFrame;
      const img = images[imgIndex];
      if (!img || !canvas || !context) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      if (!imgWidth || !imgHeight) return;

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      // Math for centering and maintaining aspect ratio
      const scale = objectFit === "cover"
        ? Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight)
        : Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);

      const x = (canvasWidth - imgWidth * scale) / 2;
      const y = (canvasHeight - imgHeight * scale) / 2;

      context.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    };

    // Resize handler to match screen dimensions and screen resolution (pixel ratio)
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);

      // Immediately draw the active frame on resize
      drawFrame(currentFrameRef.current);
    };

    // Helper to toggle header visibility using React custom events
    const toggleHeaderVisibility = (show) => {
      if (typeof window !== "undefined") {
        if (!show) {
          window.dispatchEvent(new Event("hide-header"));
        } else {
          window.dispatchEvent(new Event("show-header"));
        }
      }
    };

    // Bind resize listeners
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render the initial starting frame
    drawFrame(startFrame);

    // Setup scrubbing, pinning, and text animations with a GSAP timeline
    const animObj = { frame: startFrame };
    const timelineDuration = 10; // Dummy duration mapping for ScrollTrigger timeline scrub

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15, // Butter-smooth scrolling delay
        pin: pinRef.current,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          toggleHeaderVisibility(!self.isActive);
        },
        onUpdate: (self) => {
          const roundedFrame = Math.round(animObj.frame);
          if (roundedFrame !== currentFrameRef.current) {
            currentFrameRef.current = roundedFrame;
            drawFrame(roundedFrame);
          }
          // Enforce header hide status on every scroll update to bypass React updates
          toggleHeaderVisibility(!self.isActive);
        },
      },
    });

    // 1. Animate image frame index linearly across the timeline
    tl.to(animObj, {
      frame: frameCount,
      ease: "none",
      duration: timelineDuration,
    }, 0);

    // 2. Animate side storytelling texts staggered on the left and right
    // First Text Block (Left Side) - appears around 10% - 35% scroll
    tl.fromTo(
      ".scroll-text-1",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      0.8
    );
    tl.to(
      ".scroll-text-1",
      { opacity: 0, y: -40, duration: 1.0, ease: "power2.in" },
      2.8
    );

    // Second Text Block (Right Side) - appears around 40% - 65% scroll
    tl.fromTo(
      ".scroll-text-2",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      4.0
    );
    tl.to(
      ".scroll-text-2",
      { opacity: 0, y: -40, duration: 1.0, ease: "power2.in" },
      6.0
    );

    // Third Text Block (Left Side) - appears around 70% - 95% scroll
    tl.fromTo(
      ".scroll-text-3",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      7.2
    );
    tl.to(
      ".scroll-text-3",
      { opacity: 0, y: -40, duration: 1.0, ease: "power2.in" },
      9.2
    );

    // 3. Cinematic 1-second entrance animation on the sequence canvas itself
    gsap.fromTo(
      canvasRef.current,
      { scale: 1.15, filter: "blur(12px)", opacity: 0 },
      {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%", // Triggers instantly as you scroll into the section
          toggleActions: "play none none reverse"
        }
      }
    );

    // Ensure ScrollTrigger updates its calculations
    ScrollTrigger.refresh();

    // Clean up animation, triggers, and events
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      toggleHeaderVisibility(true); // Safety cleanup
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [isLoading, images, startFrame, frameCount, objectFit]);

  // Loading progress percentage calculation
  const progressPercent = Math.min(100, Math.round((loadedCount / frameCount) * 100));

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-visible ${backgroundColor}`}
      style={{ height: scrollContainerHeight }}
    >
      <div
        ref={pinRef}
        className="w-full h-screen relative overflow-hidden flex items-center justify-center"
      >
        {/* HTML5 Canvas for high-performance sequential frame rendering */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block max-w-full max-h-full animate-premium-pulse"
        />

        {/* Dark overlay for rich contrast, ensuring text visibility on light frames */}
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

        {/* Cinematic Staggered Text Overlays (Left and Right, skipping Center) */}
        {!isLoading && (
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center">
            <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12 relative h-full flex items-center">

              {/* Text 1: Left Side */}
              <div className="scroll-text-1 absolute left-6 md:left-12 max-w-[380px] text-left opacity-0 pointer-events-none">
                <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold mb-2.5 block">
                  01 / ARCHITECTURE
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 leading-tight font-medium">
                  Iconic Structural Design
                </h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Rising 30 stories, Balaji Symphony stands as a signature skyline landmark in Panvel, matching advanced steel engineering with natural biological energy loops.
                </p>
              </div>

              {/* Text 2: Right Side */}
              <div className="scroll-text-2 absolute right-6 md:right-12 max-w-[380px] text-left opacity-0 pointer-events-none">
                <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold mb-2.5 block">
                  02 / EXPERIENCE
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 leading-tight font-medium">
                  Elevated Sky Life
                </h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Float above Navi Mumbai in our unique rooftop sky garden. Indulge in hospitality-level recreation with viewing galleries suspended 300 feet above the ground.
                </p>
              </div>

              {/* Text 3: Left Side */}
              <div className="scroll-text-3 absolute left-6 md:left-12 max-w-[380px] text-left opacity-0 pointer-events-none">
                <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold mb-2.5 block">
                  03 / LIVING
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 leading-tight font-medium">
                  Crafting A Sustainable Legacy
                </h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Vishesh Group merges luxurious residential design with green features like biological waste recycling, setting new benchmarks in quality and craftsmanship.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Loading overlay for buttery loading transition */}
        {isLoading && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50 text-white transition-opacity duration-500">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-zinc-800 border-t-gold rounded-full animate-spin" />
              <div className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold">
                Loading Sequences {progressPercent}%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
