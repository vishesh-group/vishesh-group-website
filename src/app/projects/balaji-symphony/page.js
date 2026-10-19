"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Header from "@/components/Header";
import LuxuryFooter from "@/components/LuxuryFooter";
import LeadForm from "@/components/LeadForm";
import WhatsAppButton from "@/components/WhatsAppButton";

// Verified project asset paths
const ASSETS = {
  hero: "/projects/balaji-symphony/images/Front_eve_view_F.jpg",
  closeUp: "/projects/balaji-symphony/images/Close_Up_View_FF.jpg",
  elevation: "/projects/balaji-symphony/images/Close_View_FFF.jpg",
  evening: "/projects/balaji-symphony/images/Final_EVE_ROD_SIDE_VIEW_001.jpg",
};

// Official project documentation
const OFFICIAL_DOCUMENTS = [
  {
    id: "doc-pnl",
    title: "Project Document — Vinay S. Agarwal",
    category: "Financial & Schedule Documentation",
    date: "June 2026 Reference",
    description:
      "Official certified project documentation and schedule prepared by Vinay S. Agarwal for Balaji Symphony, Panvel.",
    viewPath:
      "/projects/balaji-symphony/documents/Vinay_S_Agarwal_Balaji_Symphony_PNL_June_2026.pdf",
    downloadName: "Balaji-Symphony-Project-Document-Vinay-S-Agarwal.pdf",
    size: "7.3 MB",
    verified: true,
  },
  {
    id: "doc-form-v",
    title: "Online Submitted Form V (2025–26)",
    category: "Regulatory Compliance",
    date: "Annual Return 2025–26",
    description:
      "Officially submitted Form V compliance filing for Balaji Symphony for the regulatory review year 2025–26.",
    viewPath:
      "/projects/balaji-symphony/documents/Online_Submitted_Balaji_Symphony_Form-V_2025-26.pdf",
    downloadName: "Balaji-Symphony-Form-V-2025-26.pdf",
    size: "109 KB",
    verified: true,
  },
  {
    id: "doc-ec",
    title: "Environmental Clearance (SEIAA)",
    category: "Statutory Approval",
    date: "Issued 04 May 2018",
    description:
      "Official Environmental Clearance issued by SEIAA on 4 May 2018. Note: Historical document reflecting environmental clearance parameters as of its date of issue.",
    viewPath:
      "/projects/balaji-symphony/documents/Environmental_Clearance_04_05_2018.pdf",
    downloadName: "Balaji-Symphony-Environmental-Clearance-2018.pdf",
    size: "399 KB",
    verified: true,
  },
];

// Gallery images with descriptions
const GALLERY_ITEMS = [
  {
    src: ASSETS.hero,
    title: "Front Evening Exterior View",
    subtitle: "Monolithic high-rise towers illuminated against the dusk horizon",
    tag: "Main Elevation",
  },
  {
    src: ASSETS.closeUp,
    title: "Architectural Close-Up Detail",
    subtitle: "Precision engineering, private balconies, and refined facade articulation",
    tag: "Facade Detail",
  },
  {
    src: ASSETS.elevation,
    title: "Tower Elevation Perspective",
    subtitle: "Vertical grandeur rising G+30 to 33 storeys high above New Panvel",
    tag: "Tower Architecture",
  },
  {
    src: ASSETS.evening,
    title: "Roadside Approach at Dusk",
    subtitle: "Grand 10-acre township roadside frontage with secure gated perimeter",
    tag: "Perimeter View",
  },
];

// Section heading helper with responsive sizing
function SectionHeading({ eyebrow, title, subtitle, light = false, center = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={center ? "text-center mx-auto max-w-3xl" : "max-w-2xl"}
    >
      {eyebrow && (
        <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-2 sm:mb-3 text-gold">
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-4 tracking-tight ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm sm:text-base md:text-lg leading-relaxed ${
            light ? "text-zinc-300" : "text-slategray"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// Lightbox modal with mobile touch gestures and full image visibility
function ImageLightbox({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 active:bg-white/30 transition-colors"
        aria-label="Close full image view"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        className="relative max-w-6xl max-h-[88vh] w-full flex flex-col items-center my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[52vh] sm:h-[65vh] md:h-[72vh]">
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 90vw"
            unoptimized
          />
        </div>
        <div className="mt-3 sm:mt-4 text-center px-4">
          <span className="text-gold text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
            {item.tag}
          </span>
          <h3 className="text-white font-serif text-lg sm:text-xl mt-0.5">{item.title}</h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 max-w-lg mx-auto">{item.subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BalajiSymphonyPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const enquirySectionRef = useRef(null);

  const scrollToEnquiry = (e) => {
    if (e) e.preventDefault();
    if (enquirySectionRef.current) {
      enquirySectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToDocuments = (e) => {
    if (e) e.preventDefault();
    const docEl = document.getElementById("documents");
    if (docEl) {
      docEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-charcoal font-sans antialiased selection:bg-gold selection:text-white">
      {/* Header Navigation */}
      <Header />

      <main id="main-content">
        {/* ================= HERO SECTION ================= */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden pt-36 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-28"
          aria-label="Balaji Symphony Hero"
        >
          {/* Real Photo Background */}
          <div className="absolute inset-0">
            <Image
              src={ASSETS.hero}
              alt="Balaji Symphony front evening exterior view - 10-acre luxury residential township in New Panvel"
              fill
              priority
              className="object-cover object-center scale-105"
              sizes="100vw"
              unoptimized
            />
            {/* Multi-layered cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/85 to-zinc-950/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/70" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1400px] w-full px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Hero Left: Project Information */}
              <div className="lg:col-span-7 flex flex-col justify-center text-white">
                {/* Breadcrumb with generous clearance from header */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-wrap items-center gap-2 pt-2 sm:pt-4 mb-4 sm:mb-5 text-[11px] sm:text-xs uppercase tracking-widest text-zinc-400"
                >
                  <Link href="/" className="hover:text-gold transition-colors">
                    Home
                  </Link>
                  <span className="text-zinc-600">/</span>
                  <Link href="/#projects" className="hover:text-gold transition-colors">
                    Projects
                  </Link>
                  <span className="text-zinc-600">/</span>
                  <span className="text-gold font-semibold">Balaji Symphony</span>
                </motion.div>

                {/* Sub-badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 self-start px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-4 sm:mb-5 max-w-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
                  <span className="truncate">10-Acre Master Township · G+30 to 33 Storeys</span>
                </motion.div>

                {/* Project Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight mb-4 sm:mb-6"
                >
                  Balaji <span className="text-gold italic font-light">Symphony</span>
                </motion.h1>

                {/* Tagline / Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-sm sm:text-base md:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mb-6 sm:mb-8"
                >
                  Navi Mumbai’s grandest landmark township. Offering expansive, ultra-luxurious{" "}
                  <strong className="text-white font-medium">2 BHK & 2.5 BHK Sky Homes</strong> in 
                  New Panvel. Starting from{" "}
                  <strong className="text-gold font-medium">₹88 Lakhs+ for 2 BHK</strong> and{" "}
                  <strong className="text-gold font-medium">₹1 Crore+ for 2.5 BHK*</strong>.
                </motion.p>

                {/* Quick Highlights Counters */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 py-4 sm:py-6 border-y border-white/10 mb-6 sm:mb-8"
                >
                  <div className="p-2.5 sm:p-0 rounded-xl bg-white/5 sm:bg-transparent">
                    <span className="block font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-white">10 Acres</span>
                    <span className="text-[10px] sm:text-xs text-zinc-400 tracking-wider uppercase">Township Scale</span>
                  </div>
                  <div className="p-2.5 sm:p-0 rounded-xl bg-white/5 sm:bg-transparent">
                    <span className="block font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-white">G+33</span>
                    <span className="text-[10px] sm:text-xs text-zinc-400 tracking-wider uppercase">Storeys Elevation</span>
                  </div>
                  <div className="p-2.5 sm:p-0 rounded-xl bg-white/5 sm:bg-transparent">
                    <span className="block font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-gold">₹88 Lacs+</span>
                    <span className="text-[10px] sm:text-xs text-zinc-400 tracking-wider uppercase">2 BHK Starting*</span>
                  </div>
                  <div className="p-2.5 sm:p-0 rounded-xl bg-white/5 sm:bg-transparent">
                    <span className="block font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-gold">₹1.00 Cr+</span>
                    <span className="text-[10px] sm:text-xs text-zinc-400 tracking-wider uppercase">2.5 BHK Starting*</span>
                  </div>
                </motion.div>

                {/* Action CTA Buttons (Stacked & Full-Width on Mobile for Easy Tapping) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
                >
                  <button
                    onClick={scrollToEnquiry}
                    className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-gold text-zinc-950 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-charcoal active:scale-[0.98] transition-all duration-300 shadow-lg shadow-gold/20 flex items-center justify-center min-h-[48px]"
                  >
                    Enquire Now
                  </button>
                  <a
                    href="#documents"
                    onClick={scrollToDocuments}
                    className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full border border-white/30 text-white font-semibold text-xs uppercase tracking-widest hover:border-gold hover:text-gold active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group min-h-[48px]"
                  >
                    <svg className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Documents
                  </a>
                </motion.div>
              </div>

              {/* Hero Right: Integrated LeadForm */}
              <div
                ref={enquirySectionRef}
                id="enquiry-form"
                className="lg:col-span-5 scroll-mt-20 sm:scroll-mt-28 w-full"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="relative rounded-2xl sm:rounded-3xl bg-zinc-900/90 border border-white/10 p-4 sm:p-7 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden max-w-md mx-auto lg:max-w-none"
                >
                  {/* Subtle top gold accent light */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                  
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-gold">
                        Direct Builder Access
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider font-semibold bg-white/5 px-2 py-0.5 rounded">
                        2 BHK ₹88L+ | 2.5 BHK ₹1Cr+
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mt-1">
                      Schedule a Private Site Visit
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Register your details for instant access to verified unit layouts, tower phase availability, and developer payment schedules.
                    </p>
                  </div>

                  {/* Reused Existing LeadForm Component */}
                  <LeadForm />

                  {/* Form Submission Transparency Note */}
                  <div className="mt-4 pt-3.5 border-t border-white/5 text-[11px] text-zinc-500 leading-normal flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Direct developer transmission. Your enquiry is forwarded to Vishesh Group’s official advisory team.
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= LUXURY PRICING HIGHLIGHT STRIP ================= */}
        <section className="bg-charcoal text-white py-6 sm:py-8 border-y border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
              
              {/* Price Point 1 */}
              <div className="p-4 sm:p-5 md:px-6 rounded-2xl bg-zinc-900/60 md:bg-transparent border border-white/5 md:border-0">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold font-bold block mb-1">
                  2 BHK Luxury Homes
                </span>
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    ₹88 Lacs+
                  </span>
                  <span className="text-xs text-zinc-400 font-light">*Onwards</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">Spacious family residences with hill views</p>
              </div>

              {/* Price Point 2 */}
              <div className="p-4 sm:p-5 md:px-6 rounded-2xl bg-zinc-900/60 md:bg-transparent border border-white/5 md:border-0">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold font-bold block mb-1">
                  2.5 BHK Signature Suites
                </span>
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gold tracking-tight">
                    ₹1.00 Cr+
                  </span>
                  <span className="text-xs text-zinc-400 font-light">*Onwards</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">2 Bed + 0.5 dedicated office/study room</p>
              </div>

              {/* Additional Transparency */}
              <div className="p-4 sm:p-5 md:px-6 rounded-2xl bg-zinc-900/60 md:bg-transparent border border-white/5 md:border-0 flex flex-col justify-center">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold block mb-1">
                  Township Assurances
                </span>
                <p className="font-serif text-base sm:text-lg font-medium text-white">
                  10-Acre Master Township · RERA Compliant
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                  <button
                    onClick={scrollToEnquiry}
                    className="text-xs font-bold text-gold uppercase tracking-wider hover:underline flex items-center gap-1 min-h-[36px]"
                  >
                    Request Cost Breakup →
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= OVERVIEW SECTION ================= */}
        <section id="overview" className="py-16 md:py-24 lg:py-32 bg-white" aria-label="Project Overview">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Real Project Image with Mobile Touch Indicator */}
              <div className="lg:col-span-6">
                <div
                  onClick={() => setSelectedImage(GALLERY_ITEMS[2])}
                  className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl group cursor-pointer border border-zinc-100"
                >
                  <Image
                    src={ASSETS.elevation}
                    alt="Balaji Symphony G+30 to 33 storeys elevation perspective in Panvel"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Floating click indicator */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold font-semibold">
                        Township Scale
                      </span>
                      <p className="text-base sm:text-lg font-serif">11 Monolithic Towers (G+30 to 33 Storeys)</p>
                    </div>
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold group-hover:text-black transition-colors flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Description & Specs */}
              <div className="lg:col-span-6">
                <SectionHeading
                  eyebrow="The Township Masterpiece"
                  title="A Grand 10-Acre Enclave of Elevated Living"
                  subtitle="Developed by Vishesh Group, Balaji Symphony is an iconic 10-acre integrated township comprising 11 monolithic high-rise towers soaring G+30 to 33 storeys with over 1,900 to 2,000+ luxury residences."
                />

                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-slategray leading-relaxed text-sm sm:text-base">
                  <p>
                    Rising proudly over Sukhapur in New Panvel, <strong className="text-charcoal font-semibold">Balaji Symphony</strong> is 
                    one of Navi Mumbai’s most celebrated residential landmarks. Spanning an expansive 10-acre layout, 
                    the project harmoniously combines monumental scale with the serene natural backdrop of Matheran foothills.
                  </p>
                  <p>
                    Balaji Symphony offers thoughtfully planned, spacious{" "}
                    <strong className="text-charcoal font-semibold">2 BHK & 2.5 BHK apartments</strong> starting at{" "}
                    <strong className="text-gold font-semibold">₹88 Lakhs+ for 2 BHK</strong> and{" "}
                    <strong className="text-gold font-semibold">₹1 Crore+ for 2.5 BHK</strong>. Every home is 
                    master-planned for maximum usable carpet space, natural cross-ventilation, and commanding panoramic vistas, 
                    with rapid connectivity to Panvel Junction, Old Mumbai-Pune Highway, Atal Setu (MTHL), and the upcoming NMIA Airport.
                  </p>
                </div>

                {/* Key Spec Grid */}
                <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-2.5 sm:gap-4">
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-100">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold font-bold">Township Scale</span>
                    <p className="text-xs sm:text-sm font-semibold text-charcoal mt-1">10-Acre Township</p>
                    <p className="text-[11px] sm:text-xs text-slategray mt-0.5">1,900 to 2,000+ units</p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-100">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold font-bold">High-Rise Scale</span>
                    <p className="text-xs sm:text-sm font-semibold text-charcoal mt-1">11 Monolithic Towers</p>
                    <p className="text-[11px] sm:text-xs text-slategray mt-0.5">G+30 to 33 Storeys</p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-100">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold font-bold">2 BHK Starting</span>
                    <p className="text-xs sm:text-sm font-semibold text-charcoal mt-1">₹88 Lakhs+*</p>
                    <p className="text-[11px] sm:text-xs text-slategray mt-0.5">Spacious family plans</p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-100">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold font-bold">2.5 BHK Starting</span>
                    <p className="text-xs sm:text-sm font-semibold text-charcoal mt-1">₹1.00 Crore+*</p>
                    <p className="text-[11px] sm:text-xs text-slategray mt-0.5">Includes study room</p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={scrollToEnquiry}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-charcoal text-white text-xs uppercase font-bold tracking-widest hover:bg-gold hover:text-black active:scale-[0.98] transition-all duration-300 text-center min-h-[46px]"
                  >
                    Enquire for Availability
                  </button>
                  <a
                    href="#configurations"
                    className="w-full sm:w-auto text-xs uppercase font-bold tracking-widest text-charcoal hover:text-gold transition-colors flex items-center justify-center gap-2 py-3 min-h-[46px]"
                  >
                    Explore Configurations
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ================= RESIDENTIAL CONFIGURATIONS (2 BHK ₹88L+ & 2.5 BHK ₹1Cr+) ================= */}
        <section id="configurations" className="py-16 md:py-24 lg:py-32 bg-zinc-50" aria-label="Apartment Configurations">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12">
            <SectionHeading
              eyebrow="Exclusive Configurations & Verified Pricing"
              title="Spacious 2 BHK & 2.5 BHK Luxury Residences"
              subtitle="Optimized layouts engineered for modern families. Choose between the versatile 2 BHK residence starting at ₹88 Lacs+ or the upgraded 2.5 BHK suite with dedicated study room at ₹1 Cr+."
              center
            />

            <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* 2 BHK */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-gold/40 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                      Signature Family
                    </span>
                    <span className="text-xs text-charcoal font-bold bg-zinc-100 px-2.5 py-1 rounded-full">
                      ₹88 Lakhs+*
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">2 BHK Luxury</h3>
                  <p className="text-xs sm:text-sm text-slategray mt-2 leading-relaxed">
                    Designed for modern families seeking a balanced layout with generous master suite and picturesque horizon views.
                  </p>
                  <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3 text-xs text-charcoal/90 border-t border-zinc-100 pt-5 sm:pt-6">
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> Grand Living & Dining Lounge
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> Master Suite with Attached Bathroom
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> Dedicated Guest / Children Bedroom
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> Kitchen with Separate Utility Area
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> Expansive Sit-out Balcony with Hill Views
                    </li>
                  </ul>
                </div>
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-zinc-100">
                  <div className="mb-4">
                    <span className="text-[11px] text-slategray uppercase tracking-wider block">Official Pricing</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-charcoal">₹88 Lakhs+*</span>
                    <span className="text-[10px] text-slategray block mt-0.5">Base price onwards (excluding taxes & floor rise)</span>
                  </div>
                  <button
                    onClick={scrollToEnquiry}
                    className="w-full py-3.5 rounded-xl border border-charcoal text-charcoal text-xs font-semibold tracking-widest uppercase hover:bg-charcoal hover:text-white active:scale-[0.98] transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-black min-h-[46px]"
                  >
                    Request 2 BHK Cost Sheet
                  </button>
                </div>
              </div>

              {/* 2.5 BHK (Featured) */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border-2 border-gold shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group">
                <span className="absolute -top-3.5 right-4 sm:right-6 px-3 py-1 rounded-full bg-gold text-black text-[9px] sm:text-[10px] font-bold tracking-widest uppercase shadow-sm">
                  Most Popular · Extra Study
                </span>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                      Versatile Upgrade
                    </span>
                    <span className="text-xs text-white font-bold bg-charcoal px-2.5 py-1 rounded-full">
                      ₹1.00 Crore+*
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">2.5 BHK Suite</h3>
                  <p className="text-xs sm:text-sm text-slategray mt-2 leading-relaxed">
                    Includes a dedicated multi-purpose half-room — perfect for work-from-home office, children’s study room, or guest bedroom.
                  </p>
                  <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3 text-xs text-charcoal/90 border-t border-zinc-100 pt-5 sm:pt-6">
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> Expansive Living-Dining Room
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> 2 Full Bedrooms + Dedicated 0.5 Study Room
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> 2 Designer Bathrooms with Premium CP
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> Ergonomic Modular Kitchen Platform
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> Panoramic Dual Balconies
                    </li>
                  </ul>
                </div>
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-zinc-100">
                  <div className="mb-4">
                    <span className="text-[11px] text-slategray uppercase tracking-wider block">Official Pricing</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-gold">₹1.00 Crore+*</span>
                    <span className="text-[10px] text-slategray block mt-0.5">Base price onwards (excluding taxes & floor rise)</span>
                  </div>
                  <button
                    onClick={scrollToEnquiry}
                    className="w-full py-3.5 rounded-xl bg-gold text-black text-xs font-bold tracking-widest uppercase hover:bg-charcoal hover:text-white active:scale-[0.98] transition-all shadow-md shadow-gold/20 min-h-[46px]"
                  >
                    Request 2.5 BHK Cost Sheet
                  </button>
                </div>
              </div>

              {/* 3 BHK / Sky Villa Option */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-gold/40 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                      Grand Sky Villa
                    </span>
                    <span className="text-xs text-slategray font-semibold">Limited Inventory</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">3 BHK Grand Suite</h3>
                  <p className="text-xs sm:text-sm text-slategray mt-2 leading-relaxed">
                    Top-tier sky residences offering expansive multi-generational living with uninterrupted 360-degree hill views.
                  </p>
                  <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3 text-xs text-charcoal/90 border-t border-zinc-100 pt-5 sm:pt-6">
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> Palatial Living & Formal Dining Hall
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> 3 Grand Bedrooms + 3 Bathrooms
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> Master Suite with Walk-In Wardrobe Area
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> Multiple Deep Horizon View Terraces
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✓</span> Premium Designer Sanitary & Flooring
                    </li>
                  </ul>
                </div>
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-zinc-100">
                  <div className="mb-4">
                    <span className="text-[11px] text-slategray uppercase tracking-wider block">Pricing Option</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-charcoal">Price On Request</span>
                    <span className="text-[10px] text-slategray block mt-0.5">Exclusive units available upon enquiry</span>
                  </div>
                  <button
                    onClick={scrollToEnquiry}
                    className="w-full py-3.5 rounded-xl border border-charcoal text-charcoal text-xs font-semibold tracking-widest uppercase hover:bg-charcoal hover:text-white active:scale-[0.98] transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-black min-h-[46px]"
                  >
                    Enquire for 3 BHK
                  </button>
                </div>
              </div>

            </div>

            {/* Pricing Disclaimer Note */}
            <div className="mt-8 sm:mt-12 text-center text-[11px] sm:text-xs text-slategray max-w-2xl mx-auto px-4">
              *Prices indicate starting base cost (₹88 Lakhs+ for 2 BHK and ₹1 Crore+ for 2.5 BHK). Final pricing depends on tower phase, floor rise, layout selection, and applicable taxes. Contact the Vishesh Group sales desk for an itemized cost estimate.
            </div>
          </div>
        </section>

        {/* ================= AMENITIES SECTION ================= */}
        <section id="amenities" className="py-16 md:py-24 lg:py-32 bg-white" aria-label="Lifestyle Amenities">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              <div className="lg:col-span-6">
                <SectionHeading
                  eyebrow="World-Class Amenities"
                  title="Curated Lifestyle for Mind, Body & Soul"
                  subtitle="Over 33+ bespoke indoor and sky-level amenities across the 10-acre township offer a resort-like retreat within your private residential enclave."
                />

                <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-2.5 sm:gap-4">
                  {[
                    { icon: "🏊", name: "Swimming Pool", desc: "Resort-style adult & kids pool" },
                    { icon: "🏋️", name: "Fully Equipped Gym", desc: "Modern cardio & strength machines" },
                    { icon: "🏸", name: "Badminton Court", desc: "Dedicated indoor sports arena" },
                    { icon: "♨️", name: "Steam & Sauna", desc: "Rejuvenating wellness spa" },
                    { icon: "🌿", name: "Landscaped Gardens", desc: "Manicured green recreation areas" },
                    { icon: "🛝", name: "Kids' Adventure Park", desc: "Safe, cushioned children's play area" },
                    { icon: "🎮", name: "Indoor Games Lounge", desc: "Billiards, table tennis & chess" },
                    { icon: "🔭", name: "Sky Recreation Deck", desc: "Rooftop observation & leisure deck" },
                    { icon: "🧘", name: "Yoga & Meditation Zone", desc: "Peaceful morning wellness deck" },
                    { icon: "🛡️", name: "Multi-Tier Security", desc: "24x7 CCTV & controlled boom gates" },
                  ].map((amenity, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-gold/40 hover:bg-white hover:shadow-md transition-all duration-200"
                    >
                      <span className="text-xl sm:text-2xl mb-1 block" role="img" aria-label={amenity.name}>
                        {amenity.icon}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-charcoal">{amenity.name}</h4>
                      <p className="text-[11px] sm:text-xs text-slategray mt-0.5 line-clamp-1">{amenity.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real Project Close-Up Image */}
              <div className="lg:col-span-6">
                <div
                  onClick={() => setSelectedImage(GALLERY_ITEMS[1])}
                  className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl group cursor-pointer border border-zinc-100"
                >
                  <Image
                    src={ASSETS.closeUp}
                    alt="Balaji Symphony close-up architectural facade detail"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold font-semibold">
                        Facade Architecture
                      </span>
                      <p className="text-base sm:text-lg font-serif">Meticulous Craftsmanship & Sky Terraces</p>
                    </div>
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold group-hover:text-black transition-colors flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= OFFICIAL DOCUMENTS SECTION ================= */}
        <section id="documents" className="py-16 md:py-24 lg:py-32 bg-zinc-950 text-white scroll-mt-20 sm:scroll-mt-24" aria-label="Official Documents">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12">
            <SectionHeading
              eyebrow="Statutory Transparency"
              title="Official Project Documents & Approvals"
              subtitle="Inspect certified regulatory submissions, project schedules, and environmental clearances for complete peace of mind."
              light
              center
            />

            <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {OFFICIAL_DOCUMENTS.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-2xl sm:rounded-3xl bg-zinc-900 border border-white/10 p-5 sm:p-7 md:p-8 flex flex-col justify-between hover:border-gold/40 hover:bg-zinc-900/80 transition-all duration-300"
                >
                  <div>
                    {/* Header with PDF badge */}
                    <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/10 text-white">
                          {doc.size}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-zinc-400 mt-1">{doc.date}</span>
                      </div>
                    </div>

                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gold font-semibold">
                      {doc.category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-white mt-1 mb-2 sm:mb-3">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  {/* Document Actions (Full-width Touch targets on Mobile) */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex gap-2.5 sm:gap-3">
                    <a
                      href={doc.viewPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-3 rounded-xl border border-white/20 text-white text-[11px] sm:text-xs uppercase font-semibold tracking-wider hover:border-gold hover:text-gold active:bg-white/10 transition-colors flex items-center justify-center min-h-[44px]"
                      aria-label={`View ${doc.title} PDF in a new tab`}
                    >
                      View PDF
                    </a>
                    <a
                      href={doc.viewPath}
                      download={doc.downloadName}
                      className="flex-1 text-center py-3 rounded-xl bg-gold text-zinc-950 text-[11px] sm:text-xs uppercase font-bold tracking-wider hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center min-h-[44px]"
                      aria-label={`Download ${doc.title} PDF`}
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Regulatory Scope Clarity Notice */}
            <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-white/5 max-w-4xl mx-auto text-center text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
              <p>
                <strong className="text-zinc-300">Statutory Notice:</strong> Official clearance documents 
                reflect project compliance parameters at their respective dates of issue. Prospective purchasers 
                are invited to inspect complete updated certifications, project registers, and Form-V disclosures 
                at our on-site sales lounge.
              </p>
            </div>
          </div>
        </section>

        {/* ================= PROJECT GALLERY SECTION ================= */}
        <section id="gallery" className="py-16 md:py-24 lg:py-32 bg-white" aria-label="Project Visual Gallery">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12">
            <SectionHeading
              eyebrow="Genuine Project Visuals"
              title="Craftsmanship in Every Angle"
              subtitle="Explore authentic photography of Balaji Symphony, showcasing the high-rise architecture, dramatic evening silhouettes, and township approach."
              center
            />

            <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {GALLERY_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(item)}
                  className="group relative aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg cursor-pointer border border-zinc-100"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-gold border border-gold/30">
                      {item.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between text-white gap-3">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-medium">{item.title}</h3>
                      <p className="text-[11px] sm:text-xs text-zinc-300 mt-0.5 sm:mt-1 max-w-md line-clamp-1 sm:line-clamp-none">{item.subtitle}</p>
                    </div>
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold group-hover:text-black transition-colors flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= LOCATION & CONNECTIVITY ================= */}
        <section id="location" className="py-16 md:py-24 lg:py-32 bg-zinc-50" aria-label="Location and Connectivity">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              <div className="lg:col-span-6">
                <SectionHeading
                  eyebrow="Strategic Location"
                  title="At the Epicenter of Navi Mumbai's Growth"
                  subtitle="Located in Sukhapur, New Panvel, Balaji Symphony connects seamlessly to Mumbai, Pune, Thane, and the upcoming international airport."
                />

                <div className="mt-8 sm:mt-10 space-y-2.5 sm:space-y-4">
                  {[
                    { title: "Panvel Railway Junction", time: "5 Minutes", desc: "Central rail hub connecting Central, Western, and Konkan railway routes." },
                    { title: "Navi Mumbai International Airport (NMIA)", time: "15 Minutes", desc: "Upcoming global aviation hub accelerating regional commerce and property value." },
                    { title: "Atal Setu (MTHL)", time: "20 Minutes", desc: "India's longest sea bridge providing a swift 20-minute drive to South Mumbai." },
                    { title: "Old Mumbai-Pune Highway & NH 48", time: "3 Minutes", desc: "Direct arterial access for effortless weekend getaways to Lonavala and Pune." },
                    { title: "Renowned Educational Hubs", time: "5–10 Minutes", desc: "GGIS Atha Preschool, DAV Public School, Delhi Public School, and Pillai College." },
                    { title: "Premier Healthcare & Retail", time: "8–12 Minutes", desc: "MGM Hospital, Lifeline Multispeciality, Orion Mall, and D-Mart." },
                  ].map((loc, i) => (
                    <div key={i} className="flex items-start justify-between gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-zinc-200/70 shadow-sm">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-charcoal">{loc.title}</h4>
                        <p className="text-[11px] sm:text-xs text-slategray mt-0.5 line-clamp-1 sm:line-clamp-none">{loc.desc}</p>
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-gold uppercase tracking-wider bg-gold/10 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                        {loc.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Embedded Interactive Map */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200 shadow-xl bg-white p-2.5 sm:p-3">
                  <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.302528399127!2d73.12595827599042!3d18.995383982191986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e85c2c776cf5%3A0xe54d3e7535b43ad8!2sBalaji%20Symphony!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Balaji Symphony Location Map in Sukhapur, New Panvel"
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="font-semibold text-charcoal">Balaji Symphony, Survey No. 45/4</p>
                      <p className="text-slategray text-[11px] sm:text-xs">Sukhapur, New Panvel, Navi Mumbai - 410206</p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Balaji+Symphony+Panvel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold font-bold hover:underline flex items-center gap-1 min-h-[36px]"
                    >
                      Get Directions
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= FINAL LUXURY CTA BANNER ================= */}
        <section className="py-14 sm:py-20 bg-zinc-950 text-white relative overflow-hidden" aria-label="Site Tour Call to Action">
          <div className="absolute inset-0 opacity-15">
            <Image
              src={ASSETS.evening}
              alt="Balaji Symphony evening view"
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12 text-center">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold mb-2 sm:mb-3 inline-block">
              Exclusive Developer Invitation
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal max-w-3xl mx-auto leading-tight mb-4 sm:mb-6">
              Step Into Your Future at <span className="text-gold italic">Balaji Symphony</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-light max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Book a private walkthrough with our senior real estate consultants to experience sample show homes, 
              panoramic tower views, and tailored payment schemes across 2 BHK (₹88L+) & 2.5 BHK (₹1Cr+) residences.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto sm:max-w-none">
              <button
                onClick={scrollToEnquiry}
                className="w-full sm:w-auto px-9 py-3.5 sm:py-4 rounded-full bg-gold text-zinc-950 font-bold text-xs uppercase tracking-widest hover:bg-white active:scale-[0.98] transition-all duration-300 shadow-xl shadow-gold/20 flex items-center justify-center min-h-[48px]"
              >
                Enquire Now
              </button>
              <a
                href="tel:+919322122555"
                className="w-full sm:w-auto px-9 py-3.5 sm:py-4 rounded-full border border-white/30 text-white font-semibold text-xs uppercase tracking-widest hover:border-gold hover:text-gold active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
              >
                <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 93221 22555
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageLightbox
            item={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Shared Luxury Footer */}
      <LuxuryFooter />
    </div>
  );
}
