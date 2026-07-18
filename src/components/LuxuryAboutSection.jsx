"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Building2, Map, Home, Users, ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────
   Animated Counter — counts up when in view
   ────────────────────────────────────────────── */
const AnimatedCounter = ({ value, duration = 2.5 }) => {
  const [count, setCount] = useState("0");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseFloat(value.replace(/[^0-9.]/g, ""));
    const isFloat = value.includes(".");
    const suffix = value.replace(/[0-9.]/g, "");

    const timer = setInterval(() => {
      start += end / (duration * 60);
      if (start >= end) {
        setCount(isFloat ? end.toFixed(1) + suffix : Math.round(end) + suffix);
        clearInterval(timer);
      } else {
        setCount(isFloat ? start.toFixed(1) + suffix : Math.round(start) + suffix);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

/* ──────────────────────────────────────────────
   Line-by-Line Text Reveal
   ────────────────────────────────────────────── */
const LineReveal = ({ children, className, delay = 0 }) => (
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

/* ──────────────────────────────────────────────
   3D Tilt Card — for stat hover
   ────────────────────────────────────────────── */
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotX = ((y - midY) / midY) * -8;
    const rotY = ((x - midX) / midX) * 8;
    setTransform(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.4s ease" }}
      className={className}
    >
      {children}
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════ */
export default function LuxuryAboutSection() {
  // Cursor-reactive glow position (relative to section)
  const sectionRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  const stats = [
    {
      value: "25+",
      label: "Years of Legacy",
      icon: Building2,
      desc: "A legacy built on trust, quality, and commitment since inception.",
    },
    {
      value: "1.2M+",
      label: "Sq. Ft. Under Construction",
      icon: Map,
      desc: "Crafting modern spaces that inspire and elevate everyday living.",
    },
    {
      value: "2M+",
      label: "Sq. Ft. Delivered",
      icon: Home,
      desc: "Delivering excellence in every square foot we build.",
    },
    {
      value: "500+",
      label: "Happy Families",
      icon: Users,
      desc: "Creating communities where families thrive and memories grow.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-40 bg-[#FAF8F4] overflow-clip z-20"
      style={{ isolation: "isolate" }}
    >
      {/* ── BACKGROUND LAYERS ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle paper texture */}
        <div className="absolute inset-0 opacity-[0.025] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

        {/* Architectural grid */}
        <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Ambient gold radials */}
        <div className="absolute -top-60 right-0 w-[800px] h-[800px] bg-[#C9A227]/6 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 -left-40 w-[600px] h-[600px] bg-[#E8D6A8]/8 rounded-full blur-[150px]" />

        {/* Floating geometric accents */}
        <div className="absolute top-32 right-24 w-48 h-48 border border-[#C9A227]/[0.06] rotate-45 rounded-3xl hidden lg:block" />
        <div className="absolute bottom-48 left-20 w-32 h-32 border border-[#C9A227]/[0.05] rotate-12 rounded-2xl hidden lg:block" />
      </div>

      {/* Mouse-following gold glow */}
      <div
        className="absolute w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-[140px] pointer-events-none z-0 hidden md:block"
        style={{
          left: glowPos.x - 200,
          top: glowPos.y - 200,
          transition: "left 1.5s ease-out, top 1.5s ease-out",
        }}
      />

      <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12 relative z-10">
        {/* ═══════════════════════════════════════
           TWO-COLUMN EDITORIAL LAYOUT
           ═══════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-28 items-start mb-32">
          {/* LEFT SIDE */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Label with animated gold line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-10"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                className="h-[1px] w-12 bg-[#C9A227] origin-left"
              />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A227] font-semibold">
                About Vishesh Group
              </span>
            </motion.div>

            {/* Editorial Heading — line by line */}
            <div className="text-4xl md:text-5xl lg:text-[3.75rem] font-serif text-[#111111] leading-[1.1] tracking-tight mb-10">
              <LineReveal delay={0}>Redefining Spaces</LineReveal>
              <LineReveal delay={0.12}>with Trust,</LineReveal>
              <LineReveal delay={0.24}>Quality,</LineReveal>
              <LineReveal delay={0.36}>
                and{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#E8D6A8] italic">
                  Legacy.
                </span>
              </LineReveal>
            </div>

            {/* Animated gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="h-[1px] w-24 bg-gradient-to-r from-[#C9A227] to-transparent origin-left mb-8"
            />

            {/* Supporting statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl font-serif font-light text-[#666666] italic leading-relaxed mb-14 max-w-md"
            >
              &quot;Building more than homes. We create timeless landmarks for
              generations.&quot;
            </motion.p>

            {/* Premium Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#111111] text-white rounded-full overflow-hidden shadow-xl hover:shadow-[0_15px_40px_-8px_rgba(201,162,39,0.35)] hover:-translate-y-0.5 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227] to-[#E8D6A8] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <span className="relative z-10 text-xs tracking-[0.18em] uppercase font-semibold group-hover:text-[#111111] transition-colors duration-500">
                  Explore Our Story
                </span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 group-hover:text-[#111111] transition-all duration-500" />
              </Link>

              <Link
                href="#projects"
                className="group inline-flex items-center justify-center px-9 py-4 bg-transparent text-[#111111] rounded-full border border-[#111111]/20 hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-500"
              >
                <span className="text-xs tracking-[0.18em] uppercase font-semibold">
                  View Our Projects
                </span>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT SIDE — paragraph */}
          <div className="lg:col-span-7 lg:pt-14">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-7 text-[16px] md:text-[18px] font-sans text-[#666666] font-light leading-[2] max-w-[640px]"
            >
              <p>
                Vishesh Group is a prominent real estate developer specializing
                in{" "}
                <span className="text-[#C9A227] font-medium">
                  premium residential
                </span>{" "}
                projects, most notably the 10-acre Balaji Symphony in Panvel.
                With over{" "}
                <span className="text-[#111111] font-semibold relative">
                  25+ years
                  <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-[#C9A227]/30" />
                </span>{" "}
                of experience, we focus on innovative, eco-friendly designs and
                high-quality construction across Navi Mumbai, Panvel, Akurli, and
                Taloja.
              </p>
              <p>
                Our vision is to create iconic landmarks that redefine urban
                living and commercial excellence while setting new benchmarks in{" "}
                <span className="text-[#C9A227] font-medium">quality</span>,{" "}
                design, and{" "}
                <span className="text-[#C9A227] font-medium">
                  sustainability
                </span>
                . At Vishesh Group, every project is more than just a
                development—it is a statement of{" "}
                <span className="text-[#C9A227] font-medium">trust</span>,{" "}
                <span className="text-[#C9A227] font-medium">
                  craftsmanship
                </span>
                , and aspiration.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
           PREMIUM FLOATING STAT CARDS
           ═══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                delay: 0.15 * idx,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TiltCard className="group relative bg-white/80 backdrop-blur-xl rounded-[28px] p-9 lg:p-10 border border-[rgba(0,0,0,0.04)] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-12px_rgba(201,162,39,0.15)] hover:-translate-y-1 transition-all duration-700 h-full flex flex-col overflow-hidden">
                {/* Gold glow behind icon on hover */}
                <div className="absolute top-6 left-8 w-20 h-20 bg-[#C9A227]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Animated bottom gold border */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C9A227] to-[#E8D6A8] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />

                {/* Architectural blueprint bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-28 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:1rem_1rem] [mask-image:linear-gradient(to_top,black,transparent)] pointer-events-none" />

                {/* Icon */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#FAF8F4] border border-[#C9A227]/15 flex items-center justify-center text-[#C9A227] mb-7 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-sm">
                  <stat.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>

                {/* Number */}
                <div className="relative z-10 text-[2.75rem] font-serif text-[#111111] font-semibold tracking-tight leading-none mb-3 group-hover:text-[#C9A227] transition-colors duration-500">
                  <AnimatedCounter value={stat.value} />
                </div>

                {/* Label */}
                <span className="relative z-10 text-[10px] uppercase tracking-[0.22em] text-[#C9A227] font-bold mb-4">
                  {stat.label}
                </span>

                {/* Gold accent line */}
                <div className="relative z-10 flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-px bg-gradient-to-r from-[#C9A227] to-transparent" />
                  <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A227]/40" />
                </div>

                {/* Supporting text */}
                <p className="relative z-10 text-[13px] text-[#888888] font-light leading-relaxed">
                  {stat.desc}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
