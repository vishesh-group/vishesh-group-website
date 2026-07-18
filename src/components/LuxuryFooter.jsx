"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

// Inline SVG social icons (lucide-react removed brand icons)
const InstagramIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const FacebookIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const LinkedinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const YoutubeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>
  </svg>
);

// Floating Particles Component
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map(() => ({
      top: `${10 + Math.random() * 80}%`,
      left: `${Math.random() * 100}%`,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 4,
    }));
    setTimeout(() => setParticles(generated), 0);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
          style={{
            top: p.top,
            left: p.left,
            opacity: 0,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function LuxuryFooter() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Cursor-reactive glow
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    const el = sectionRef.current;
    if (el) el.addEventListener("mousemove", handleMouse);
    return () => { if (el) el.removeEventListener("mousemove", handleMouse); };
  }, []);

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Amenities", href: "#amenities" },
    { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
    { label: "Contact", href: "#contact" },
  ];

  const projects = [
    "Balaji Symphony",
    "Upcoming Projects",
    "Commercial Spaces",
    "Luxury Residences",
    "Investment Opportunities",
  ];

  const socials = [
    { icon: InstagramIcon, label: "Instagram", href: "#" },
    { icon: FacebookIcon, label: "Facebook", href: "#" },
    { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
    { icon: YoutubeIcon, label: "YouTube", href: "#" },
    { icon: MessageCircle, label: "WhatsApp", href: "#" },
  ];

  const stagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <footer
      ref={sectionRef}
      className="relative bg-[#0A0A0A] text-white overflow-hidden"
    >
      {/* ── BACKGROUND LAYERS ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Architectural blueprint lines */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

        {/* Radial gold glow behind CTA */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[180px]" />

        {/* Secondary glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/3 rounded-full blur-[120px]" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0A0A0A_100%)]" />

        {/* Geometric patterns */}
        <div className="absolute top-20 right-20 w-60 h-60 border border-white/[0.02] rotate-45 rounded-3xl hidden lg:block" />
        <div className="absolute bottom-40 left-16 w-40 h-40 border border-white/[0.02] rotate-12 rounded-2xl hidden lg:block" />
      </div>

      <FloatingParticles />

      {/* Cursor glow (relative to footer) */}
      <div
        className="absolute w-[350px] h-[350px] bg-[#D4AF37]/8 rounded-full blur-[120px] pointer-events-none z-0 transition-transform duration-[2s] ease-out hidden md:block"
        style={{
          left: mousePos.x - 175,
          top: mousePos.y - 175,
        }}
      />

      {/* ═══════════════════════════════════════ */}
      {/* 1. TOP CTA SECTION                      */}
      {/* ═══════════════════════════════════════ */}
      <div className="relative z-10 pt-28 md:pt-40 pb-24 md:pb-32 border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <div className="h-px w-10 bg-[#D4AF37]/40" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
              Start Your Journey
            </span>
            <div className="h-px w-10 bg-[#D4AF37]/40" />
          </motion.div>

          {/* Heading */}
          <div className="overflow-hidden mb-8">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.1] tracking-tight"
            >
              Build Your Dream.
              <br />
              Live Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F4D76B] italic">
                Legacy.
              </span>
            </motion.h2>
          </div>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-[#B8B8B8] font-light leading-relaxed max-w-2xl mx-auto mb-14"
          >
            Experience thoughtfully designed homes that combine luxury, comfort,
            and timeless architecture. Let us help you discover the perfect
            address for your future.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            {/* Primary Button */}
            <motion.div variants={fadeUp}>
              <Link
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-10 py-4.5 bg-gradient-to-r from-[#B5913B] via-[#D4AF37] to-[#F4D76B] text-black rounded-full font-semibold text-xs tracking-[0.15em] uppercase overflow-hidden shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.7)] hover:scale-[1.04] hover:-translate-y-0.5 transition-all duration-500"
              >
                <span className="relative z-10">Book a Private Tour</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-500" />
                {/* Sweep highlight */}
                <div className="absolute inset-0 bg-white/25 transform -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
              </Link>
            </motion.div>

            {/* Secondary Button */}
            <motion.div variants={fadeUp}>
              <Link
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-10 py-4.5 bg-transparent text-white rounded-full font-semibold text-xs tracking-[0.15em] uppercase border border-white/15 backdrop-blur-md hover:bg-white hover:text-[#0A0A0A] hover:border-white transition-all duration-500"
              >
                View Our Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* 2. MAIN FOOTER GRID                     */}
      {/* ═══════════════════════════════════════ */}
      <div className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-10"
          >
            {/* Column 1: Brand */}
            <motion.div variants={fadeUp} className="lg:pr-8">
              <Link href="#home" className="inline-block mb-6">
                <span className="text-2xl font-serif tracking-wider text-white">
                  Vishesh
                  <span className="text-[#D4AF37]"> Group</span>
                </span>
              </Link>
              <p className="text-sm text-[#B8B8B8] font-light leading-relaxed mb-8 max-w-xs">
                Creating iconic spaces that redefine modern living. Premium real
                estate across Navi Mumbai, Panvel, and beyond.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="group relative w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-md flex items-center justify-center text-[#B8B8B8] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:scale-110 transition-all duration-500"
                  >
                    <social.icon className="w-4 h-4" strokeWidth={1.5} />
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div variants={fadeUp}>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-7">
                Quick Links
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-[#B8B8B8] hover:text-white transition-colors duration-300"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]/0 group-hover:text-[#D4AF37] -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Projects */}
            <motion.div variants={fadeUp}>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-7">
                Projects
              </h4>
              <ul className="space-y-4">
                {projects.map((project, idx) => (
                  <li key={idx}>
                    <Link
                      href="#projects"
                      className="group flex items-center gap-3 text-sm text-[#B8B8B8] hover:text-white transition-colors duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] group-hover:scale-125 transition-all duration-300 flex-shrink-0" />
                      <span className="relative">
                        {project}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4: Contact */}
            <motion.div variants={fadeUp}>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-7">
                Get In Touch
              </h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 text-[#D4AF37] mt-1 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm text-[#B8B8B8] font-light leading-relaxed">
                    Balaji Symphony, Panvel,
                    <br />
                    Navi Mumbai, Maharashtra
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone
                    className="w-4 h-4 text-[#D4AF37] flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <a
                    href="tel:+919876543210"
                    className="text-sm text-[#B8B8B8] font-light hover:text-white transition-colors duration-300"
                  >
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail
                    className="w-4 h-4 text-[#D4AF37] flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <a
                    href="mailto:info@visheshgroup.com"
                    className="text-sm text-[#B8B8B8] font-light hover:text-white transition-colors duration-300"
                  >
                    info@visheshgroup.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock
                    className="w-4 h-4 text-[#D4AF37] flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm text-[#B8B8B8] font-light">
                    Mon – Sat: 10 AM – 7 PM
                  </span>
                </li>

                {/* Google Maps CTA */}
                <li className="pt-2">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-xs text-[#B8B8B8] font-medium tracking-wide uppercase hover:text-[#D4AF37] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all duration-500"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View on Google Maps
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* 3. BOTTOM BAR                            */}
      {/* ═══════════════════════════════════════ */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[12px] text-[#666666] font-light">
            {/* Left */}
            <div>
              © {new Date().getFullYear()} Vishesh Group. All Rights Reserved.
            </div>

            {/* Center */}
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms & Conditions", "Cookies"].map(
                (item, idx) => (
                  <Link
                    key={idx}
                    href="#"
                    className="relative hover:text-[#B8B8B8] transition-colors duration-300 group"
                  >
                    {item}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D4AF37]/40 group-hover:w-full transition-all duration-500" />
                  </Link>
                )
              )}
            </div>

            {/* Right */}
            <div className="text-[#555555]">
              Designed with{" "}
              <span className="text-[#D4AF37]">Excellence</span>.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
