"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Sparkles, Building2, MapPin } from "lucide-react";

const features = [
  {
    title: "Unmatched Legacy",
    description: "Over two decades of shaping the skyline with architectural masterpieces and landmark developments.",
    icon: Building2,
  },
  {
    title: "Prime Locations",
    description: "Strategically situated in the most coveted and rapidly developing nodes of Navi Mumbai.",
    icon: MapPin,
  },
  {
    title: "Premium Quality",
    description: "Uncompromising standards in construction, featuring top-tier materials and state-of-the-art amenities.",
    icon: Shield,
  },
  {
    title: "Visionary Design",
    description: "Where aesthetic brilliance meets functional elegance, creating spaces that inspire every day.",
    icon: Sparkles,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0, 
    transition: { type: "spring", stiffness: 150, damping: 15, delay: 0.3 } 
  },
};

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      className="relative py-24 md:py-36 overflow-hidden bg-[#111111] text-white flex flex-col items-center"
      ref={ref}
    >
      {/* Subtly shifting background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(201,162,39,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(201,162,39,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(201,162,39,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(201,162,39,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(201,162,39,0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-[#C9A227]/50" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A227] font-semibold">
              The Vishesh Advantage
            </span>
            <div className="h-px w-12 bg-[#C9A227]/50" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white mb-6"
          >
            Why Choose <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#E8D6A8]">Us</span>
          </motion.h2>
        </div>

        {/* Cards & Connecting Lines */}
        <motion.div 
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Animated Connecting Line (Desktop only) */}
          <div className="hidden lg:block absolute top-[48px] left-[12%] right-[12%] h-[1px] bg-white/10 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C9A227]/0 via-[#C9A227] to-[#C9A227]/0"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={inView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 2.5, delay: 0.6, ease: "easeInOut" }}
              style={{ originX: 0 }}
            />
          </div>

          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={cardVariants}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="w-24 h-24 mb-8 rounded-full bg-[#1A1A1A] border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center relative group-hover:border-[#C9A227]/40 group-hover:bg-[#111111] transition-all duration-500">
                {/* Rotating ring */}
                <motion.div 
                  className="absolute inset-0 rounded-full border border-dashed border-[#C9A227]/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                
                <motion.div 
                  variants={iconVariants}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <feature.icon className="w-8 h-8 text-[#C9A227] group-hover:scale-125 transition-transform duration-500" strokeWidth={1.5} />
                </motion.div>
              </div>

              {/* Card Content */}
              <h3 className="text-xl font-serif mb-4 text-white group-hover:text-[#C9A227] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-[260px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
