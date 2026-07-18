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
import LeadForm from "../components/LeadForm";
import LuxuryContactForm from "../components/LuxuryContactForm";
import LuxuryFooter from "../components/LuxuryFooter";
import LuxuryAboutSection from "../components/LuxuryAboutSection";
import { Check, PhoneCall } from "lucide-react";

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

  const contactSectionRef = useRef(null);
  const contactTextRef = useRef(null);
  const contactFormRef = useRef(null);

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
    const timer = setTimeout(() => setProgress(0), 0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1.67;
      });
    }, 100);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [currentSlide]);

  // 3. Trigger slide advancement on progress completion
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        nextSlide();
        setProgress(0);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [progress, nextSlide]);

  // 4. Contact Section GSAP Animation
  useEffect(() => {
    if (contactSectionRef.current) {
      gsap.fromTo(
        contactTextRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactSectionRef.current,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(
        contactFormRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: contactSectionRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

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

        {/* Slide Content Overlay with Split Layout */}
        <div className="absolute inset-0 flex items-center z-10 pt-28 lg:pt-36 pb-12">
          <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full">

            {/* Left Side: Animated Text */}
            <div className="lg:col-span-7 flex flex-col justify-center h-full md:pb-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.8 }}
                  className="flex flex-col select-none"
                >
                  <span className="text-xs uppercase tracking-[0.35em] text-gold font-bold mb-4 block">
                    {slides[currentSlide].category}
                  </span>

                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white max-w-4xl leading-[1.05] mb-6 drop-shadow-xl">
                    {slides[currentSlide].title}
                  </h1>

                  <p className="text-sm md:text-lg text-zinc-300 max-w-lg font-light leading-relaxed mb-8 drop-shadow-md">
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

            {/* Right Side: Lead Form */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-end h-full md:pb-20">
              <motion.div
                initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="w-full max-w-[450px]"
              >
                <LeadForm />
              </motion.div>
            </div>

          </div>
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
      <LuxuryAboutSection />

      {/* Cinematic Scroll Image Sequence Showcase */}
      <div className="relative z-10">
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
      </div>

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

      {/* ULTRA LUXURY Lead Generation Section */}
      <section id="contact" className="py-24 md:py-32 relative bg-[#090909] overflow-hidden">

        {/* Subtly Animated Particles / Background Layers */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Architectural Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Radial Gradients & Vignette */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-black/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)]" />
        </div>

        <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* LEFT SIDE (Luxury Content) */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-[#D4AF37]/60" />
                <span className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37] font-semibold">
                  EXPERIENCE LUXURY
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-[1.1] mb-8 font-light tracking-tight">
                Schedule Your <br className="hidden md:block" /> Private Tour.
              </h2>

              <p className="text-base md:text-lg text-[#B7B7B7] font-light leading-relaxed mb-12 max-w-xl">
                Discover a world where architectural grandeur meets timeless elegance. Leave your details below and our exclusive relationship manager will orchestrate a personalized viewing experience tailored entirely to your lifestyle.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-14 max-w-lg">
                {[
                  "Ready to Move",
                  "Premium Amenities",
                  "RERA Approved",
                  "Exclusive Inventory"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#D4AF37]" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-zinc-300 font-light">{item}</span>
                  </div>
                ))}
              </div>

              {/* Floating Contact Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="inline-flex items-center gap-6 p-6 rounded-2xl bg-[#121212]/80 border border-white/5 backdrop-blur-md shadow-2xl"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#A68A27] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                  <PhoneCall className="w-6 h-6 text-black" fill="currentColor" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Direct Line</p>
                  <p className="text-xl font-serif text-white tracking-wide">+91 98765 43210</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT SIDE (Glassmorphism Form) */}
          <div className="lg:col-span-5 h-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
            <LuxuryContactForm />
          </div>

        </div>
      </section>

      {/* Premium Luxury Footer */}
      <LuxuryFooter />
    </div>
  );
}
