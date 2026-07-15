"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Lenis from "lenis";
import Header from "../../components/Header";

export default function About() {
  
  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.15,
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

  const coreValues = [
    {
      title: "Excellence",
      description: "Setting new benchmarks in architectural aesthetics and premium construction.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: "Eco-Innovation",
      description: "Pioneering eco-friendly features and green spaces to sustain micro-climates.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Integrity",
      description: "Honest transaction values, strict RERA compliance, and transparent contracts.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Design Scale",
      description: "Crafting master-planned townships and dynamic collaborative office layouts.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden text-charcoal">
      {/* Absolute floating Navigation Header */}
      <Header />

      {/* Cinematic Hero Section */}
      <section className="relative h-[65vh] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
        {/* Background Render */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/Images/Front eve view F.jpg.jpeg"
            alt="Vishesh Group Architectural Scale"
            fill
            priority
            className="object-cover opacity-45 scale-102"
            sizes="100vw"
          />
        </div>
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-zinc-950 z-10"></div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1400px] w-full px-6 md:px-12 text-center mt-12">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.35em] text-gold font-bold mb-4 block"
          >
            Vishesh Legacy
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tight text-white leading-tight max-w-4xl mx-auto"
          >
            Crafting Landmarks that Stand the Test of Time.
          </motion.h1>
        </div>
      </section>

      {/* Legacy and Craftsmanship Story */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Frame Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Fine border decoration behind image */}
            <div className="absolute -top-3 -left-3 w-full h-full border border-gold/30 rounded-2xl -z-10 translate-x-1 translate-y-1"></div>
            <div className="relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-100">
              <Image
                src="/Images/Final EVE ROD SIDE VIEW_001.jpg.jpeg"
                alt="Vishesh Landmark Architecture"
                fill
                className="object-cover opacity-85 hover:scale-103 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 450px"
              />
            </div>
          </motion.div>

          {/* Right Side: Text description */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
              Our Legacy of 25 Years
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-charcoal leading-[1.2]">
              Delivering Premium Developments in Navi Mumbai and Beyond.
            </h2>
            <p className="text-zinc-600 font-light leading-relaxed">
              For over a quarter of a century, Vishesh Group has conceptualized and delivered high-end structures across Panvel, Akurli, and Taloja. Under the stewardship of visionary design directors, we prioritize eco-centric layouts, durable engineering, and refined styling to build residential communities that support sustainable micro-climates.
            </p>
            <p className="text-zinc-600 font-light leading-relaxed">
              Our flagship 10-acre project, **Balaji Symphony in Panvel**, stands as a testament to our commitment: integrating modern residential spaces with biological waste treatment, solar grid setups, and open green ecosystems. Every brick laid is a reflection of our dedication to craftsmanship, aspirational living, and compliance.
            </p>
            <div className="flex gap-10 mt-4 border-t border-zinc-100 pt-6">
              <div>
                <span className="text-3xl font-light text-gold">25+</span>
                <span className="text-xs uppercase tracking-wider text-slategray block mt-1">Years Legacy</span>
              </div>
              <div>
                <span className="text-3xl font-light text-gold">2M+</span>
                <span className="text-xs uppercase tracking-wider text-slategray block mt-1">Sq. Ft. Delivered</span>
              </div>
              <div>
                <span className="text-3xl font-light text-gold">1.2M+</span>
                <span className="text-xs uppercase tracking-wider text-slategray block mt-1">Under Construction</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Division Details Section (Real Estate & Coworking) */}
      <section className="py-24 bg-zinc-50 border-t border-b border-zinc-100">
        <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold mb-3 block">Our Verticals</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-charcoal">Shaping the Future of Spaces</h2>
            <p className="text-sm text-slategray mt-3 font-light">From iconic residential complexes to vibrant flex offices, we design spaces that inspire success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Division 1: Real Estate */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-lg group"
            >
              <div className="relative h-64 w-full">
                <Image
                  src="/Images/Close_View_FFF.jpg.jpeg"
                  alt="Luxury Residential Real Estate"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-4 left-6 text-xs uppercase tracking-widest text-gold font-bold">Luxury Real Estate</span>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-charcoal mb-3">Residential Ecosystems</h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed mb-6">
                  We construct master-planned residential towers equipped with structural rain harvesting, solar grids, and biological filter loops. Each project is engineered to build a lifestyle statement of aspiration and premium community living.
                </p>
                <Link href="/#real-estate" className="text-xs font-bold text-charcoal hover:text-gold transition-colors inline-flex items-center gap-1">
                  Explore Portfolios
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Division 2: Coworking */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-lg group"
            >
              <div className="relative h-64 w-full">
                <Image
                  src="/Images/Close_Up_View_FFF.jpg.jpeg"
                  alt="Premium Coworking Hubs"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-4 left-6 text-xs uppercase tracking-widest text-gold font-bold">Premium Coworking</span>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-charcoal mb-3">Collaborative Workspaces</h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed mb-6">
                  Vishesh Group develops state-of-the-art coworking spaces equipped with double-skin glazing facades for soundproofing, biological energy loops, high-speed connectivity, and hospitality-grade business lounges.
                </p>
                <Link href="/#coworking" className="text-xs font-bold text-charcoal hover:text-gold transition-colors inline-flex items-center gap-1">
                  Explore Workspaces
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold mb-3 block">Corporate Values</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-charcoal">The Pillars of Vishesh Group</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 180, damping: 24, delay: idx * 0.08 }}
                className="group flex flex-col p-6 rounded-2xl border border-zinc-100 hover:border-gold/30 hover:bg-zinc-50/50 transition-all duration-300 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-50 text-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-sm">
                  {value.icon}
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-2">{value.title}</h3>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Luxury Footer */}
      <footer className="bg-charcoal text-white/50 py-12 border-t border-zinc-800">
        <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Image
              src="/Images/vishesh_logo.png"
              alt="Vishesh Group Logo"
              width={75}
              height={52}
              className="object-contain invert brightness-0 h-9 w-auto opacity-70"
            />
            <p className="text-[11px] text-zinc-400 font-light tracking-wide text-center md:text-left mt-1">
              Refined spaces, timeless architecture, sustainable innovation.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3 text-xs">
            <div className="flex gap-6 text-[11px] tracking-wide text-zinc-300">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <Link href="/about" className="hover:text-gold transition-colors">About</Link>
              <Link href="/#businesses" className="hover:text-gold transition-colors">Businesses</Link>
              <Link href="/#projects" className="hover:text-gold transition-colors">Projects</Link>
              <Link href="/#careers" className="hover:text-gold transition-colors">Careers</Link>
              <Link href="/#contact" className="hover:text-gold transition-colors">Contact</Link>
            </div>
            <span className="text-[10px] text-zinc-500 mt-2">© {new Date().getFullYear()} Vishesh Group. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
