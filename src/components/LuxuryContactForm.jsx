"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

const FORM_CONFIG = {
  FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLSeBcmgrWvPetEtK__dn-5n1b0kAcKVC1jwKG7DohPwzP_2kFw/formResponse",
  ENTRY_NAME: "entry.1856231609",
  ENTRY_MOBILE: "entry.1901639526",
  ENTRY_EMAIL: "entry.1488197927"
};

export default function LuxuryContactForm() {
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobile.trim()) tempErrors.mobile = "Mobile number required";
    else if (!mobileRegex.test(formData.mobile)) tempErrors.mobile = "Invalid mobile number";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) tempErrors.email = "Invalid email format";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const submitData = new FormData();
    submitData.append(FORM_CONFIG.ENTRY_NAME, formData.name);
    submitData.append(FORM_CONFIG.ENTRY_MOBILE, formData.mobile);
    submitData.append(FORM_CONFIG.ENTRY_EMAIL, formData.email);

    try {
      await fetch(FORM_CONFIG.FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: submitData,
      });
      setIsSuccess(true);
      setFormData({ name: "", mobile: "", email: "" });
    } catch (error) {
      console.error("Form submission error", error);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInputField = (name, type, placeholder, Icon, maxLength) => {
    const isFocused = focusedField === name;
    const hasValue = formData[name].length > 0;
    
    return (
      <div className="relative w-full" key={name}>
        <motion.div
          animate={{
            borderColor: errors[name] ? "rgba(239, 68, 68, 0.5)" : isFocused ? "rgba(212, 175, 55, 0.8)" : "rgba(255, 255, 255, 0.08)",
            backgroundColor: isFocused ? "rgba(18, 18, 18, 0.95)" : "rgba(18, 18, 18, 0.6)"
          }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl border overflow-hidden flex items-center px-5 h-16 group transition-colors duration-300 hover:border-white/20"
        >
          <Icon className={`w-5 h-5 transition-colors duration-300 ${isFocused || hasValue ? "text-[#D4AF37]" : "text-zinc-600"}`} />
          
          <div className="relative flex-1 ml-4 h-full flex flex-col justify-center pt-3">
            <motion.label
              initial={false}
              animate={{
                y: isFocused || hasValue ? -14 : -2,
                scale: isFocused || hasValue ? 0.75 : 1,
                color: isFocused ? "#D4AF37" : "#B7B7B7"
              }}
              className="absolute left-0 origin-left font-light pointer-events-none transition-colors"
            >
              {placeholder}
            </motion.label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              onFocus={() => setFocusedField(name)}
              onBlur={() => setFocusedField(null)}
              maxLength={maxLength}
              className="w-full bg-transparent text-white focus:outline-none text-sm font-medium mt-3"
            />
          </div>
        </motion.div>
        <AnimatePresence>
          {errors[name] && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-400 text-[10px] mt-1.5 ml-3 absolute"
            >
              {errors[name]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[460px] mx-auto group perspective"
    >
      {/* Floating Ambient Gold Glow */}
      <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-[28px] blur-3xl transform group-hover:bg-[#D4AF37]/20 transition-all duration-700 pointer-events-none" />

      {/* Luxury Glass Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative overflow-hidden bg-[rgba(18,18,18,0.85)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] rounded-[28px] p-8 md:p-12"
      >
        {/* Subtle Top Gold Border */}
        <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center py-10"
            >
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="mb-8"
              >
                <CheckCircle2 className="w-20 h-20 text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" strokeWidth={1} />
              </motion.div>
              <h3 className="text-3xl font-serif text-white mb-4 tracking-wide">Thank You</h3>
              <p className="text-sm text-[#B7B7B7] font-light leading-relaxed mb-10 max-w-[280px]">
                Your priority request has been received. Our relationship manager will contact you shortly.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="group relative px-8 py-3 rounded-full bg-transparent text-white font-medium text-xs tracking-[0.2em] uppercase overflow-hidden border border-[rgba(255,255,255,0.2)] transition-colors duration-500 hover:border-[#D4AF37]"
              >
                <span className="relative z-10 group-hover:text-[#D4AF37] transition-colors duration-500">Book Another</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="mb-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3 block">
                  Priority Access
                </span>
                <p className="text-sm text-[#B7B7B7] font-light max-w-[280px] mx-auto leading-relaxed">
                  Reserve your private site visit with our relationship manager.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {renderInputField("name", "text", "Full Name", User)}
                {renderInputField("mobile", "tel", "Mobile Number", Phone, 10)}
                {renderInputField("email", "email", "Email Address", Mail)}

                {errors.submit && (
                  <p className="text-red-400 text-xs text-center font-medium mt-2">{errors.submit}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#B9932B] via-[#D4AF37] to-[#F3D779] text-black font-bold tracking-[0.15em] uppercase text-xs py-5 mt-4 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? "Processing..." : "Request A Private Tour"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </span>
                  {/* Glossy Sheen Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/40 skew-x-[-20deg]"
                    initial={{ x: "-150%" }}
                    whileHover={{ x: "150%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
