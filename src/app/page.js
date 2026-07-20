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
import { Check, PhoneCall, ArrowUpRight, MapPin, Building2, Sparkles } from "lucide-react";

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

const LineReveal = ({ children, className = "", delay = 0 }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  </div>
);

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

      {/* ═══════════════════════════════════════════════ */}
      {/* RESIDENTIAL PROJECTS — Premium Showcase        */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="projects" className="py-20 md:py-36 bg-[#FAF8F4] text-[#111111] relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-[#C9A227]/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-[#E8D6A8]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />

        <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12 relative z-10">

          {/* Section Header */}
          <div className="text-center mb-20 md:mb-28 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px w-12 bg-[#C9A227]/50" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A227] font-semibold">
                Ongoing Projects in Navi Mumbai
              </span>
              <div className="h-px w-12 bg-[#C9A227]/50" />
            </motion.div>
            <div className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight text-[#111111] leading-[1.05]">
              <LineReveal delay={0.1}>Residential</LineReveal>
              <LineReveal delay={0.25}>
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#E8D6A8]">Projects</span>
              </LineReveal>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-base text-[#888888] font-light leading-relaxed max-w-lg mt-6"
            >
              Explore our signature developments redefining luxury living across Navi Mumbai&#39;s most coveted addresses.
            </motion.p>
          </div>

          {/* ── FEATURED PROJECT (First Card — Hero Layout) ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 lg:mb-10"
          >
            <Link href={ongoingProjects[0].href} className="group block">
              <div className="relative bg-white rounded-[2rem] overflow-hidden border border-[rgba(0,0,0,0.04)] shadow-[0_4px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_-15px_rgba(201,162,39,0.15)] transition-all duration-700 hover:-translate-y-1">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image Side */}
                  <div className="relative h-[320px] md:h-[420px] lg:h-[520px] overflow-hidden">
                    <Image
                      src={ongoingProjects[0].image}
                      alt={ongoingProjects[0].title}
                      fill
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 lg:bg-gradient-to-r lg:from-transparent lg:to-white/30" />
                    {/* Project Number */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="text-[80px] md:text-[100px] font-serif font-bold text-white/10 leading-none select-none">01</span>
                    </div>
                    {/* Location Pill */}
                    <div className="absolute bottom-6 left-6 z-10">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/10">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A227]" strokeWidth={2} />
                        <span className="text-[11px] uppercase tracking-[0.15em] text-white/90 font-medium">
                          {ongoingProjects[0].location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px w-8 bg-[#C9A227]/50" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A227] font-semibold">Featured Project</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#111111] font-light tracking-tight mb-5 leading-[1.1] group-hover:text-[#C9A227] transition-colors duration-500">
                      {ongoingProjects[0].title}
                    </h3>

                    <p className="text-[15px] text-[#777777] font-light leading-[1.9] mb-10 max-w-md">
                      {ongoingProjects[0].description}
                    </p>

                    {/* Mini Stats */}
                    <div className="flex items-center gap-8 mb-10">
                      {[
                        { val: "30", label: "Storeys" },
                        { val: "1-3", label: "BHK" },
                        { val: "Sky", label: "Amenities" },
                      ].map((stat, i) => (
                        <div key={i} className="text-center">
                          <p className="text-2xl font-serif text-[#C9A227] font-medium">{stat.val}</p>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#999999] mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#111111] text-white text-[11px] tracking-[0.2em] uppercase font-semibold group-hover:bg-[#C9A227] group-hover:text-black transition-all duration-500 w-fit shadow-lg">
                      Explore Project
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-400" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── REMAINING PROJECTS (2-Column Grid) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {ongoingProjects.slice(1).map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={project.href} className="group block">
                  <div className="relative bg-white rounded-[2rem] overflow-hidden border border-[rgba(0,0,0,0.04)] shadow-[0_4px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_-15px_rgba(201,162,39,0.15)] transition-all duration-700 hover:-translate-y-1">
                    {/* Image */}
                    <div className="relative h-[260px] md:h-[300px] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* Project Number */}
                      <div className="absolute top-5 left-6 z-10">
                        <span className="text-[70px] font-serif font-bold text-white/10 leading-none select-none">0{idx + 2}</span>
                      </div>

                      {/* Location Pill */}
                      <div className="absolute bottom-5 left-5 z-10">
                        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/10">
                          <MapPin className="w-3 h-3 text-[#C9A227]" strokeWidth={2} />
                          <span className="text-[10px] uppercase tracking-[0.15em] text-white/90 font-medium">
                            {project.location}
                          </span>
                        </div>
                      </div>

                      {/* Arrow Badge */}
                      <div className="absolute top-5 right-5 z-10">
                        <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#C9A227] group-hover:border-[#C9A227] transition-all duration-500">
                          <ArrowUpRight className="w-4.5 h-4.5 text-white group-hover:text-black transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-7 md:p-8">
                      <h3 className="text-2xl md:text-3xl font-serif text-[#111111] font-light tracking-tight mb-3 leading-tight group-hover:text-[#C9A227] transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#888888] font-light leading-[1.8] mb-7">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A227] font-semibold">
                          View Details
                        </span>
                        <div className="h-px flex-1 mx-6 bg-[rgba(0,0,0,0.04)]" />
                        <span className="text-[10px] uppercase tracking-[0.15em] text-[#BBBBBB] font-medium">
                          Premium
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center mt-20 md:mt-24"
          >
            <Link
              href="#projects"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#111111] text-white font-semibold text-[11px] tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(201,162,39,0.4)] hover:-translate-y-0.5"
            >
              <span className="relative z-10">Explore All Projects</span>
              <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" strokeWidth={2} />
              {/* Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227] to-[#E8D6A8] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="absolute inset-0 flex items-center justify-center gap-3 text-[#111111] font-semibold text-[11px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 z-20">
                Explore All Projects
                <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SCHEDULE YOUR PRIVATE TOUR — Premium CTA      */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="contact" className="py-28 md:py-44 relative bg-[#FAF8F4] overflow-hidden">

        {/* Background Layers */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-[#C9A227]/5 rounded-full blur-[200px]" />
          <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-[#E8D6A8]/6 rounded-full blur-[160px]" />
          {/* Geometric accents */}
          <div className="absolute top-40 right-24 w-80 h-80 border border-[#C9A227]/[0.03] rotate-45 rounded-[3rem] hidden lg:block" />
          <div className="absolute bottom-40 left-20 w-52 h-52 border border-[#C9A227]/[0.025] rotate-12 rounded-2xl hidden lg:block" />
        </div>

        <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12 relative z-10">

          {/* Top Section Badge — Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A227]/50 origin-right"
            />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C9A227]/8 border border-[#C9A227]/15 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A227] font-semibold">
                Experience Luxury
              </span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A227]/50 origin-left"
            />
          </motion.div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* LEFT SIDE — Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">

              {/* Heading */}
              <div className="text-4xl md:text-5xl lg:text-[4.5rem] font-serif text-[#111111] leading-[1.06] mb-8 font-light tracking-tight">
                <LineReveal delay={0.05}>Schedule Your</LineReveal>
                <LineReveal delay={0.2}>
                  Private <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#E8D6A8]">Tour.</span>
                </LineReveal>
              </div>

              {/* Decorative line under heading */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                className="h-px w-24 bg-gradient-to-r from-[#C9A227] to-transparent mb-8 origin-left"
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base md:text-[17px] text-[#777777] font-light leading-[1.9] mb-12 max-w-xl"
              >
                Discover a world where architectural grandeur meets timeless elegance. Leave your details below and our exclusive relationship manager will orchestrate a personalized viewing experience tailored entirely to your lifestyle.
              </motion.p>

              {/* Trust Indicators — Inline Horizontal Strip */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } }
                }}
                className="flex flex-wrap items-center gap-3 mb-12"
              >
                {[
                  { label: "Ready to Move", icon: Check },
                  { label: "Premium Amenities", icon: Building2 },
                  { label: "RERA Approved", icon: Check },
                  { label: "Exclusive Inventory", icon: Sparkles }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9, y: 10 },
                      show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/70 border border-[rgba(0,0,0,0.04)] backdrop-blur-sm hover:bg-white hover:shadow-[0_4px_20px_rgba(201,162,39,0.1)] hover:border-[#C9A227]/15 transition-all duration-500"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#C9A227]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A227]/20 transition-colors duration-400">
                      <item.icon className="w-2.5 h-2.5 text-[#C9A227]" strokeWidth={3} />
                    </div>
                    <span className="text-[11px] text-[#555555] font-medium tracking-wide">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Info Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
              >
                {/* Phone Card */}
                <motion.a
                  href="tel:+919876543210"
                  whileHover={{ y: -3 }}
                  className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-[rgba(0,0,0,0.04)] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(201,162,39,0.12)] transition-all duration-500"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A227]/12 to-[#E8D6A8]/8 border border-[#C9A227]/12 flex items-center justify-center">
                      <PhoneCall className="w-5 h-5 text-[#C9A227]" strokeWidth={1.5} />
                    </div>
                    {/* Pulsing ring */}
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 border border-[#C9A227]/20 rounded-xl"
                    />
                  </div>
                  <div>
                    <p className="text-[9px] text-[#AAAAAA] uppercase tracking-[0.2em] font-semibold mb-0.5">Direct Line</p>
                    <p className="text-lg font-serif text-[#111111] tracking-wide font-medium">+91 98765 43210</p>
                  </div>
                </motion.a>

                {/* Hours */}
                <div className="flex items-center gap-3 text-[#999999]">
                  <div className="w-1 h-1 rounded-full bg-[#C9A227]/40" />
                  <span className="text-[12px] font-light">Mon – Sat, 10 AM – 7 PM</span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE — Form */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex items-center justify-center lg:justify-end"
            >
              <LuxuryContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Premium Luxury Footer */}
      <LuxuryFooter />
    </div>
  );
}
