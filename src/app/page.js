"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Header from "../components/Header";
import ScrollImageSequence from "../components/ScrollImageSequence";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AnimatedStat = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const numMatch = value.match(/[\d\.]+/);
  const num = numMatch ? parseFloat(numMatch[0]) : 0;
  const suffix = value.replace(/[\d\.]+/, '');
  const isFloat = value.includes('.');

  useEffect(() => {
    if (inView) {
      const controls = animate(0, num, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = (isFloat ? v.toFixed(1) : Math.round(v)) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, num, isFloat, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      image: "/Images/Final EVE ROD SIDE VIEW_001.jpg.jpeg",
      category: "LUXURY REAL ESTATE",
      title: "Shaping Landmark Legacies.",
      description: "Vishesh Group crafts signature residential ecosystems where architectural grandeur meets timeless design.",
      cta: "Explore Properties",
      href: "#real-estate"
    },
    {
      image: "/Images/Close_Up_View_FFF.jpg.jpeg",
      category: "PREMIUM COWORKING",
      title: "Workspace Reimagined.",
      description: "Aesthetically designed corporate hubs and collaborative flex spaces equipped with hospitality-level services.",
      cta: "Explore Workspaces",
      href: "#coworking"
    }
  ];

  const ongoingProjects = [
    {
      image: "/Images/Final EVE ROD SIDE VIEW_001.jpg.jpeg",
      location: "Panvel, Navi Mumbai",
      title: "Balaji Symphony",
      description: "30-Storey Iconic Towers offering ultra-luxurious 1, 1.5, 2 & 3 BHK Smart Homes equipped with sky-amenities.",
      href: "#projects"
    },
    {
      image: "/Images/Close_Up_View_FFF.jpg.jpeg",
      location: "Taloja, Navi Mumbai",
      title: "Balaji Evergreen",
      description: "A premium residential landmark with meticulously planned layouts, high-end design, and excellent connectivity.",
      href: "#projects"
    },
    {
      image: "/Images/Front eve view F.jpg.jpeg",
      location: "Akurli, Navi Mumbai",
      title: "Balaji Evara",
      description: "Contemporary, eco-friendly residences offering the perfect blend of modern comfort and lush green surroundings.",
      href: "#projects"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  // 1. Initialize Lenis Smooth momentum scrolling Y-scroll Y-axis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. Set up progress bar loader interval
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1.67;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [currentSlide]);

  // 3. Trigger slide advancement on progress completion
  useEffect(() => {
    if (progress >= 100) {
      nextSlide();
      setProgress(0);
    }
  }, [progress, nextSlide]);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Header component */}
      <Header />

      {/* Hero Carousel Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden bg-zinc-950">

        {/* Background Image Transitions (Cinematic Parallax) */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1.01 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                priority
                className="object-cover opacity-60"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/75 z-10"></div>

        {/* Slide Content Overlay (Spring staggered) */}
        <div className="absolute inset-0 flex items-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.8 }}
              className="mx-auto max-w-[1400px] w-full px-6 md:px-12 flex flex-col justify-end h-[75%] pb-20 select-none"
            >

              <span className="text-xs uppercase tracking-[0.35em] text-gold font-bold mb-4 block">
                {slides[currentSlide].category}
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tight text-white max-w-5xl leading-[1.05] mb-6">
                {slides[currentSlide].title}
              </h1>

              <p className="text-sm md:text-lg text-zinc-300 max-w-xl font-light leading-relaxed mb-8">
                {slides[currentSlide].description}
              </p>

              <div className="flex">
                <Link
                  href={slides[currentSlide].href}
                  className="px-8 py-3.5 rounded-full bg-white text-charcoal font-semibold text-xs tracking-widest uppercase hover:bg-gold hover:text-white hover:scale-[1.03] transition-all duration-300 shadow-xl"
                >
                  {slides[currentSlide].cta}
                </Link>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Slide Indicators (Luxury Progress Bars) */}
        <div className="absolute bottom-10 left-6 md:left-12 z-20 flex items-center gap-6 text-white select-none">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold">
            0{currentSlide + 1} <span className="text-white/40 font-light mx-1">/</span> 0{slides.length}
          </span>
          <div className="flex gap-2.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  setProgress(0);
                }}
                className="h-0.5 w-16 bg-white/20 relative overflow-hidden transition-all duration-300 cursor-pointer"
                aria-label={`Go to slide ${idx + 1}`}
              >
                {idx === currentSlide && (
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-gold transition-all ease-linear"
                    style={{ width: `${progress}%`, transitionDuration: "100ms" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Controls (Subtle Chevron Buttons) */}
        <div className="absolute bottom-8 right-6 md:right-12 z-20 flex items-center gap-4">
          <button
            onClick={() => {
              prevSlide();
              setProgress(0);
            }}
            className="w-10 h-10 rounded-full border border-white/20 hover:border-gold hover:bg-gold/10 text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => {
              nextSlide();
              setProgress(0);
            }}
            className="w-10 h-10 rounded-full border border-white/20 hover:border-gold hover:bg-gold/10 text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </section>

      {/* About Vishesh Group Section */}
      <section id="about" className="py-16 md:py-32 bg-white text-charcoal border-b border-zinc-100">
        <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12">

          {/* Top Half: Header and Description Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

            {/* Left Header Box */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">
                About Vishesh Group
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-charcoal leading-[1.15] max-w-md">
                Redefining Spaces with Trust, Quality, and Legacy.
              </h2>
            </motion.div>

            {/* Right Description Text */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="lg:col-span-7"
            >
              <p className="text-sm md:text-lg text-slategray font-light leading-relaxed">
                Vishesh Group is a prominent real estate developer specializing in premium residential projects, most notably the 10-acre Balaji Symphony in Panvel. With over 25 years of experience, we focus on innovative, eco-friendly designs and high-quality construction across Navi Mumbai, Panvel, Akurli, and Taloja. Our vision is to create iconic landmarks that redefine urban living and commercial excellence while setting new benchmarks in quality, design, and sustainability. At Vishesh Group, every project is more than just a development—it is a statement of trust, craftsmanship, and aspiration.
              </p>
            </motion.div>

          </div>

          {/* Bottom Half: Statistics Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.25
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-zinc-100 mt-20 divide-y md:divide-y-0 md:divide-x divide-zinc-100"
          >
            {[
              {
                value: "25",
                label: "Years of Legacy",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                value: "1.2M+",
                label: "Sq. Ft. Under Construction",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A2 2 0 013 15.485V6.757a2 2 0 011.056-1.765L9 2.228m0 17.772V2.228m0 17.772l5.447-2.724A2 2 0 0019 15.485V6.757a2 2 0 00-1.056-1.765L12 2.228m-3 1H3m3 3h3m-3 3h3m3-6h6m-6 3h6m-6 3h6" />
                  </svg>
                )
              },
              {
                value: "2M+",
                label: "Sq. Ft. Delivered",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )
              },
              {
                value: "500+",
                label: "Happy Families",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 180, damping: 24 } }
                }}
                className="group relative flex flex-col p-8 md:p-10 transition-all duration-500 hover:bg-zinc-50/50 cursor-default"
              >
                {/* SVG Icon Container with gold transition */}
                <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-sm group-hover:scale-105 group-hover:shadow-md group-hover:shadow-gold/10">
                  {stat.icon}
                </div>

                {/* Value count */}
                <span className="text-3xl md:text-5xl font-light tracking-tight text-charcoal mt-6 block group-hover:text-gold transition-colors duration-300">
                  <AnimatedStat value={stat.value} />
                </span>

                {/* Label */}
                <span className="text-xs uppercase tracking-[0.15em] text-slategray font-semibold mt-2 block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Cinematic Scroll Image Sequence Showcase */}
      <ScrollImageSequence
        folder="Motion1"
        frameCount={240}
        extension="jpg"
        startFrame={12}
        prefix="ezgif-frame-"
        digits={3}
        scrollContainerHeight="350vh"
        objectFit="cover"
        backgroundColor="bg-zinc-950"
      />

      {/* Ongoing Projects Section */}
      <section id="projects" className="py-16 md:py-32 bg-zinc-950 text-white relative overflow-hidden">
        {/* Subtle decorative elements, like soft gold glow circles */}
        <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12 relative z-10">

          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.35em] text-gold font-semibold mb-4 block">
              ONGOING REAL ESTATE PROJECTS IN NAVI MUMBAI
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white leading-tight">
              Residential Projects
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {ongoingProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
                className="group flex flex-col bg-zinc-900/40 rounded-2xl border border-zinc-800/60 overflow-hidden hover:border-gold/45 hover:bg-zinc-900/70 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5"
              >
                {/* Image Container with zoom & gradient fade */}
                <div className="relative h-[280px] md:h-[380px] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Subtle dark gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

                  {/* Location overlay at the bottom of the image */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-1">
                      {project.location}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif text-white font-medium">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Details Container */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <Link
                    href={project.href}
                    className="w-full py-3.5 rounded-lg border border-zinc-800/80 hover:border-gold text-center text-xs tracking-widest uppercase font-semibold text-gold hover:bg-gold hover:text-black transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Call-To-Action Button */}
          <div className="flex justify-center mt-16 md:mt-20">
            <Link
              href="#projects"
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-black font-semibold text-xs tracking-widest uppercase hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-gold/10"
            >
              View All Projects
              <svg
                className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
