"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(false);
  const [activeBizIndex, setActiveBizIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleHide = () => setIsHidden(true);
    const handleShow = () => setIsHidden(false);
    window.addEventListener("hide-header", handleHide);
    window.addEventListener("show-header", handleShow);
    return () => {
      window.removeEventListener("hide-header", handleHide);
      window.removeEventListener("show-header", handleShow);
    };
  }, []);

  // Track hover state for main nav links to slide the custom gold line
  const [hoveredNav, setHoveredNav] = useState(null);

  // Track open state for desktop mega menu on hover
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  // Track open state for desktop projects menu on hover
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  const headerRef = useRef(null);
  const logoRef = useRef(null);

  // GSAP load-in animations and scroll triggers
  useEffect(() => {
    // 1. Entrance animation sequence
    const ctx = gsap.context(() => {
      // Header slide down
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );

      // Nav items stagger lift
      gsap.fromTo(
        ".nav-item",
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.4 }
      );

      // Logo reveal
      gsap.fromTo(
        logoRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
      );

      // CTA scale in
      gsap.fromTo(
        ".header-cta",
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.75)", delay: 0.9 }
      );
    });

    // 2. ScrollTrigger mapping (replaces simple state listeners)
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "+=60",
      onUpdate: (self) => {
        if (self.scroll() > 20) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    });

    return () => {
      ctx.revert();
      trigger.kill();
    };
  }, []);

  // Prevent background scrolling when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Businesses", href: "/#businesses", hasMegaMenu: true },
    { name: "Projects", href: "/#projects", hasProjectsMenu: true },
    { name: "Careers", href: "/#careers" },
    { name: "Contact", href: "/#contact" },
  ];

  const businesses = [
    {
      name: "Real Estate",
      description: "Luxury residential developments and signature architectural landmarks.",
      href: "#real-estate",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      name: "Coworking",
      description: "Premium collaborative workspaces for visionaries and growth.",
      href: "#coworking",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      name: "Education",
      description: "GGIS Atha preschool & daycare across Pune, PCMC & Panvel.",
      href: "#education",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    {
      name: "Horticulture",
      description: "Curated plant nursery, garden café & landscaping at My Baagaan.",
      href: "#horticulture",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const megaMenuPreviews = [
    {
      label: "Flagship Residential · Sukhapur, Panvel",
      title: "Balaji Symphony",
      description: "10-acre township featuring 11 high-rise towers (G+30 to 33 storeys) offering 2, 2.5 & 3 BHK residences with sky-amenities.",
      image: "/Images/Final EVE ROD SIDE VIEW_001.jpg.jpeg",
      href: "#real-estate"
    },
    {
      label: "Premium Coworking · Mahape, Navi Mumbai",
      title: "Nextgen Coworking Space",
      description: "Modern collaborative workspaces and private offices designed for productivity — strategically located in Mahape, Navi Mumbai.",
      image: "/Images/OfficeSpace.jpg",
      href: "#coworking"
    },
    {
      label: "Early Childhood & Daycare · Pune, PCMC & Panvel",
      title: "GGIS ATHA Pre School",
      description: "Leading preschool in Pune and PCMC offering complete early childhood education, preschool learning, and after-school daycare across Pimpri, Bavdhan, Tathawade, Rahatni, Pimple Saudagar, Gangadham, and Panvel.",
      image: "/Images/Ggisatha.jpg",
      href: "#education"
    },
    {
      label: "Curated Plant Nursery & Café",
      title: "My Baagaan",
      description: "Escape the everyday at My Baagaan, where the aroma of fresh coffee mingles with the lush greenery of our curated nursery. Discover a tranquil oasis brimming with indoor and outdoor plants, from vibrant blooms to verdant foliage, stands, pots, and landscaping essentials.",
      image: "/Images/mybaagaan.jpeg",
      href: "#horticulture"
    }
  ];


  // Mobile Menu Stagger Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 25 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 220, damping: 25 } }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out opacity-0 ${isHidden ? "!-translate-y-full !opacity-0 !pointer-events-none" : ""
          } ${scrolled
            ? "bg-white/80 backdrop-blur-lg h-20 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border-b border-zinc-200/40"
            : "bg-transparent h-24 border-b border-white/10"
          }`}
      >
        <div className="mx-auto max-w-[1400px] w-full h-full px-6 md:px-12 flex items-center justify-between relative">

          {/* Logo Section */}
          <div ref={logoRef} className="flex-shrink-0 opacity-0">
            <Link href="#home" className="block relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
              <Image
                src="/Images/vishesh_logo.png"
                alt="Vishesh Group Logo"
                width={120}
                height={84}
                className={`object-contain transition-all duration-500 ease-in-out ${scrolled ? "h-14" : "h-18"
                  } w-auto hover:scale-102 ${scrolled || mobileMenuOpen ? "" : "brightness-0 invert"}`}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 h-full">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="h-full flex items-center relative nav-item opacity-0"
                onMouseEnter={() => {
                  setHoveredNav(item.name);
                  if (item.hasMegaMenu) setMegaMenuOpen(true);
                  if (item.hasProjectsMenu) setProjectsMenuOpen(true);
                }}
                onMouseLeave={() => {
                  setHoveredNav(null);
                  if (item.hasMegaMenu) setMegaMenuOpen(false);
                  if (item.hasProjectsMenu) setProjectsMenuOpen(false);
                }}
              >
                {item.hasMegaMenu ? (
                  <div className="relative h-full flex items-center cursor-pointer">
                    <button className={`flex items-center gap-1.5 font-medium text-[15px] tracking-wide transition-colors duration-300 relative py-1.5 ${scrolled ? "text-charcoal hover:text-gold" : "text-white/95 hover:text-gold"
                      }`}>
                      {item.name}
                      <svg
                        className={`w-3.5 h-3.5 mt-0.5 transition-transform duration-300 ${megaMenuOpen
                          ? "rotate-180 text-gold"
                          : scrolled ? "text-slategray" : "text-white/60"
                          }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Framer Motion Businesses Mega Menu Dropdown */}
                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 280, damping: 25 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[750px] bg-white border-t-2 border-t-gold border-x border-b border-zinc-100 shadow-[0_25px_60px_rgba(0,0,0,0.06)] rounded-b-2xl overflow-hidden p-8 grid grid-cols-12 gap-8 z-50 cursor-default pointer-events-auto text-charcoal"
                        >
                          {/* Left: Businesses List */}
                          <div className="col-span-6 flex flex-col gap-5">
                            <div className="border-b border-zinc-100 pb-3">
                              <p className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                                Corporate Divisions
                              </p>
                            </div>
                            <div className="flex flex-col gap-3 relative">
                              {businesses.map((biz, index) => (
                                <Link
                                  key={biz.name}
                                  href={biz.href}
                                  onMouseEnter={() => setActiveBizIndex(index)}
                                  className="relative flex gap-4 p-3.5 rounded-xl z-10 transition-colors duration-200"
                                >
                                  {/* Framer Motion dynamic sliding backdrop pill */}
                                  {activeBizIndex === index && (
                                    <motion.div
                                      layoutId="activeBizPill"
                                      className="absolute inset-0 bg-zinc-50 rounded-xl -z-10 border border-zinc-100/50"
                                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                                    />
                                  )}

                                  <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${activeBizIndex === index
                                    ? "bg-gold text-white shadow-md shadow-gold/20"
                                    : "bg-zinc-100 text-charcoal"
                                    }`}>
                                    {biz.icon}
                                  </div>
                                  <div>
                                    <h4 className={`text-sm font-semibold transition-colors duration-200 ${activeBizIndex === index ? "text-gold" : "text-charcoal"
                                      }`}>
                                      {biz.name}
                                    </h4>
                                    <p className="text-xs text-slategray mt-1 leading-relaxed font-light">
                                      {biz.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Right: Featured Preview Panel */}
                          <div className="col-span-6 relative bg-zinc-950 rounded-xl overflow-hidden min-h-[220px] flex flex-col justify-end p-5 group/image shadow-sm text-white">
                            <div className="absolute inset-0 transition-all duration-500 ease-in-out">
                              <Image
                                src={megaMenuPreviews[activeBizIndex].image}
                                alt={megaMenuPreviews[activeBizIndex].title}
                                fill
                                className="object-cover opacity-60 group-hover/image:scale-103 transition-transform duration-700"
                                sizes="(max-width: 850px) 100vw, 300px"
                                key={activeBizIndex}
                              />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                            <div className="relative z-10">
                              <span className="inline-block text-[10px] uppercase tracking-widest text-gold font-bold mb-1">
                                {megaMenuPreviews[activeBizIndex].label}
                              </span>
                              <h4 className="text-sm font-semibold text-white tracking-wide">
                                {megaMenuPreviews[activeBizIndex].title}
                              </h4>
                              <p className="text-xs text-zinc-300 mt-1 leading-relaxed font-light">
                                {megaMenuPreviews[activeBizIndex].description}
                              </p>
                              <Link
                                href={megaMenuPreviews[activeBizIndex].href}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-white group-hover/image:text-gold transition-colors duration-300 mt-3 border-b border-white/30 hover:border-gold pb-0.5"
                              >
                                Explore Vertical
                                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/image:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </div>

                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.hasProjectsMenu ? (
                  <div className="relative h-full flex items-center cursor-pointer">
                    <Link
                      href="/#projects"
                      className={`flex items-center gap-1.5 font-medium text-[15px] tracking-wide transition-colors duration-300 relative py-1.5 ${
                        scrolled ? "text-charcoal hover:text-gold" : "text-white/95 hover:text-gold"
                      }`}
                    >
                      {item.name}
                      <svg
                        className={`w-3.5 h-3.5 mt-0.5 transition-transform duration-300 ${
                          projectsMenuOpen
                            ? "rotate-180 text-gold"
                            : scrolled ? "text-slategray" : "text-white/60"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Link>

                    {/* Framer Motion Projects Dropdown */}
                    <AnimatePresence>
                      {projectsMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 280, damping: 25 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] bg-white border-t-2 border-t-gold border-x border-b border-zinc-100 shadow-[0_25px_60px_rgba(0,0,0,0.08)] rounded-b-2xl overflow-hidden p-4 z-50 cursor-default pointer-events-auto text-charcoal"
                        >
                          <div className="border-b border-zinc-100 pb-2.5 mb-2.5 flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
                              Flagship Developments
                            </span>
                            <span className="text-[10px] text-slategray font-medium">Navi Mumbai</span>
                          </div>

                          <Link
                            href="/projects/balaji-symphony"
                            className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-zinc-50 transition-colors group"
                          >
                            <div className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0 bg-zinc-950 border border-gold/30">
                              <Image
                                src="/projects/balaji-symphony/images/Front_eve_view_F.jpg"
                                alt="Balaji Symphony"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="48px"
                                unoptimized
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-charcoal group-hover:text-gold transition-colors">
                                  Balaji Symphony
                                </h4>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-gold bg-gold/15 px-2 py-0.5 rounded-full">
                                  Panvel
                                </span>
                              </div>
                              <p className="text-xs text-slategray mt-0.5 line-clamp-1 font-light">
                                10-Acre Township · 2 BHK (₹88L+) & 2.5 BHK (₹1Cr+)
                              </p>
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold mt-1">
                                View Project
                                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                          </Link>

                          <div className="pt-2.5 mt-2 border-t border-zinc-100">
                            <Link
                              href="/#projects"
                              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-charcoal hover:text-gold transition-colors rounded-xl hover:bg-zinc-50"
                            >
                              <span>Explore All Projects</span>
                              <svg className="w-3.5 h-3.5 text-slategray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-medium text-[15px] tracking-wide transition-colors duration-300 relative py-1.5 ${scrolled ? "text-charcoal hover:text-gold" : "text-white/95 hover:text-gold"
                      }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Framer Motion sliding gold underline line */}
                {hoveredNav === item.name && (
                  <motion.div
                    layoutId="headerNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center header-cta opacity-0">
            <Link
              href="#contact"
              className={`px-6 py-2.5 rounded-full border text-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 animate-premium-shine ${scrolled
                ? "border-charcoal text-charcoal bg-white hover:bg-charcoal hover:text-white focus-visible:outline-charcoal animate-premium-pulse"
                : "border-white/50 text-white bg-transparent hover:bg-white hover:text-charcoal focus-visible:outline-white"
                }`}
            >
              Schedule Visit
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`relative w-10 h-10 flex items-center justify-center focus:outline-none rounded-lg transition-colors duration-300 ${(scrolled || mobileMenuOpen) ? "text-charcoal" : "text-white"
                }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {/* Custom SVG hamburger animated lines by Framer Motion */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <motion.line
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{
                    x1: mobileMenuOpen ? 5 : 4,
                    y1: mobileMenuOpen ? 5 : 6,
                    x2: mobileMenuOpen ? 19 : 20,
                    y2: mobileMenuOpen ? 19 : 6
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.line
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{
                    x1: 4,
                    y1: 12,
                    x2: 20,
                    y2: 12,
                    opacity: mobileMenuOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
                <motion.line
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{
                    x1: mobileMenuOpen ? 5 : 4,
                    y1: mobileMenuOpen ? 19 : 18,
                    x2: mobileMenuOpen ? 19 : 20,
                    y2: mobileMenuOpen ? 5 : 18
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay Drawer (Framer Motion) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="fixed inset-0 z-40 bg-white lg:hidden flex flex-col justify-between pt-28 pb-8 px-8"
          >
            {/* Navigation Items list */}
            <div className="flex flex-col overflow-y-auto no-scrollbar max-h-[70vh]">
              <motion.nav
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-1"
              >
                {navigationItems.map((item) => (
                  <motion.div
                    variants={itemVariants}
                    key={item.name}
                    className="border-b border-zinc-100 py-3"
                  >
                    {item.hasMegaMenu ? (
                      <div>
                        <button
                          onClick={() => setMobileAccordionOpen(!mobileAccordionOpen)}
                          className="w-full flex items-center justify-between text-xl font-medium tracking-wide text-charcoal hover:text-gold transition-colors duration-200"
                        >
                          <span>{item.name}</span>
                          <svg
                            className={`w-5 h-5 text-slategray transition-transform duration-300 ${mobileAccordionOpen ? "rotate-180 text-gold" : ""
                              }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Expandable Accordion Menu with Framer Motion Height Transition */}
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: mobileAccordionOpen ? "auto" : 0,
                            opacity: mobileAccordionOpen ? 1 : 0
                          }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden mt-2"
                        >
                          <div className="flex flex-col gap-4 pl-4 border-l-2 border-zinc-100 py-2">
                            {businesses.map((biz) => (
                              <Link
                                key={biz.name}
                                href={biz.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="group flex flex-col py-1"
                              >
                                <span className="text-[15px] font-semibold text-charcoal group-hover:text-gold transition-colors duration-200 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                                  {biz.name}
                                </span>
                                <span className="text-xs text-slategray mt-0.5 pl-3.5">
                                  {biz.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    ) : item.hasProjectsMenu ? (
                      <div>
                        <button
                          onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                          className="w-full flex items-center justify-between text-xl font-medium tracking-wide text-charcoal hover:text-gold transition-colors duration-200"
                        >
                          <span>{item.name}</span>
                          <svg
                            className={`w-5 h-5 text-slategray transition-transform duration-300 ${
                              mobileProjectsOpen ? "rotate-180 text-gold" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: mobileProjectsOpen ? "auto" : 0,
                            opacity: mobileProjectsOpen ? 1 : 0
                          }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden mt-2"
                        >
                          <div className="flex flex-col gap-3 pl-4 border-l-2 border-zinc-100 py-2">
                            <Link
                              href="/projects/balaji-symphony"
                              onClick={() => setMobileMenuOpen(false)}
                              className="group flex flex-col py-1"
                            >
                              <span className="text-[15px] font-semibold text-charcoal group-hover:text-gold transition-colors duration-200 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                                Balaji Symphony
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/15 px-2 py-0.5 rounded-full">
                                  Panvel
                                </span>
                              </span>
                              <span className="text-xs text-slategray mt-0.5 pl-3.5">
                                10-Acre Township · 2 BHK (₹88L+) & 2.5 BHK (₹1Cr+)
                              </span>
                            </Link>

                            <Link
                              href="/#projects"
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-xs text-charcoal hover:text-gold font-semibold pl-3.5 py-1 flex items-center gap-1"
                            >
                              Explore All Projects →
                            </Link>
                          </div>
                        </motion.div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xl font-medium tracking-wide text-charcoal hover:text-gold transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.nav>
            </div>

            {/* Mobile Menu Footer Details */}
            <div className="flex flex-col gap-6 mt-auto">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-full border border-charcoal text-charcoal font-semibold text-xs tracking-widest uppercase bg-white hover:bg-charcoal hover:text-white transition-all duration-300 flex items-center justify-center gap-1 shadow-sm animate-premium-shine animate-premium-pulse"
              >
                Schedule Visit
              </Link>
              <div className="flex justify-between items-center text-xs text-slategray border-t border-zinc-100 pt-4">
                <span>© {new Date().getFullYear()} Vishesh Group</span>
                <div className="flex gap-4">
                  <a href="#ln" className="hover:text-gold transition-colors">LinkedIn</a>
                  <a href="#ig" className="hover:text-gold transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
