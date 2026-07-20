"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  Star,
} from "lucide-react";

const FORM_CONFIG = {
  FORM_URL:
    "https://docs.google.com/forms/d/e/1FAIpQLSeBcmgrWvPetEtK__dn-5n1b0kAcKVC1jwKG7DohPwzP_2kFw/formResponse",
  ENTRY_NAME: "entry.1856231609",
  ENTRY_MOBILE: "entry.1901639526",
  ENTRY_EMAIL: "entry.1488197927",
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
    else if (!mobileRegex.test(formData.mobile))
      tempErrors.mobile = "Invalid mobile number";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      tempErrors.email = "Invalid email format";
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

  const fields = [
    { name: "name", type: "text", placeholder: "Full Name", icon: User },
    {
      name: "mobile",
      type: "tel",
      placeholder: "Mobile Number",
      icon: Phone,
      maxLength: 10,
    },
    { name: "email", type: "email", placeholder: "Email Address", icon: Mail },
  ];

  const trustBadges = [
    { icon: Shield, label: "100% Secure" },
    { icon: Clock, label: "24hr Response" },
    { icon: Star, label: "VIP Access" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 2 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[480px] mx-auto"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient Glow Behind Card */}
      <div className="absolute -inset-4 bg-gradient-to-br from-[#C9A227]/12 via-[#E8D6A8]/8 to-transparent rounded-[36px] blur-2xl pointer-events-none opacity-80" />

      {/* Main Card */}
      <div className="relative overflow-hidden bg-white rounded-[2rem] border border-[rgba(0,0,0,0.05)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1),0_0_0_1px_rgba(201,162,39,0.05)]">
        {/* Gold Accent Line - Top */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-60" />

        <div className="p-8 md:p-10">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              /* ── SUCCESS STATE ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.15,
                  }}
                  className="relative mb-8"
                >
                  <div className="absolute inset-0 bg-[#C9A227]/15 rounded-full blur-xl scale-150" />
                  <CheckCircle2
                    className="w-20 h-20 text-[#C9A227] relative z-10"
                    strokeWidth={1}
                  />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-serif text-[#111111] mb-3 tracking-wide"
                >
                  Thank You
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-[#888888] font-light leading-relaxed mb-10 max-w-[280px]"
                >
                  Your priority request has been received. Our relationship
                  manager will contact you shortly.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3.5 rounded-full bg-[#111111] text-white font-medium text-xs tracking-[0.2em] uppercase hover:bg-[#C9A227] hover:text-black transition-all duration-500"
                >
                  Book Another Tour
                </motion.button>
              </motion.div>
            ) : (
              /* ── FORM STATE ── */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="text-center mb-9">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#C9A227]/15 to-[#E8D6A8]/10 border border-[#C9A227]/15 flex items-center justify-center"
                  >
                    <svg
                      className="w-6 h-6 text-[#C9A227]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-serif text-[#111111] tracking-wide mb-2 font-medium">
                    Priority Access
                  </h3>
                  <p className="text-[13px] text-[#999999] font-light max-w-[260px] mx-auto leading-relaxed">
                    Reserve your private site visit with our relationship
                    manager.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {fields.map((field, idx) => {
                    const isFocused = focusedField === field.name;
                    const hasValue = formData[field.name].length > 0;
                    const hasError = errors[field.name];
                    const FieldIcon = field.icon;

                    return (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 + idx * 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="relative"
                      >
                        <div
                          className={`
                            relative rounded-xl overflow-hidden flex items-center h-[56px] px-4 transition-all duration-400
                            bg-[#F7F5F0] border
                            ${
                              hasError
                                ? "border-red-400/50"
                                : isFocused
                                  ? "border-[#C9A227]/50 bg-white shadow-[0_0_0_3px_rgba(201,162,39,0.08)]"
                                  : "border-transparent hover:border-[rgba(0,0,0,0.08)] hover:bg-[#F5F2ED]"
                            }
                          `}
                        >
                          {/* Gold focus indicator */}
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C9A227] rounded-full"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: isFocused ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ originY: "50%" }}
                          />

                          <FieldIcon
                            className={`w-[18px] h-[18px] transition-colors duration-300 flex-shrink-0 ${
                              isFocused || hasValue
                                ? "text-[#C9A227]"
                                : "text-[#CCCCCC]"
                            }`}
                            strokeWidth={1.5}
                          />

                          <div className="relative flex-1 ml-3 h-full flex items-center">
                            <motion.label
                              initial={false}
                              animate={{
                                y: isFocused || hasValue ? -11 : 0,
                                scale: isFocused || hasValue ? 0.72 : 1,
                                color: isFocused
                                  ? "#C9A227"
                                  : hasValue
                                    ? "#999999"
                                    : "#AAAAAA",
                              }}
                              transition={{ duration: 0.25 }}
                              className="absolute left-0 origin-left pointer-events-none text-sm font-light"
                            >
                              {field.placeholder}
                            </motion.label>
                            <input
                              type={field.type}
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleChange}
                              onFocus={() => setFocusedField(field.name)}
                              onBlur={() => setFocusedField(null)}
                              maxLength={field.maxLength}
                              className="w-full bg-transparent text-[#111111] focus:outline-none text-[14px] font-medium pt-2.5"
                            />
                          </div>

                          {/* Checkmark for valid filled field */}
                          <AnimatePresence>
                            {hasValue && !hasError && !isFocused && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 20,
                                }}
                              >
                                <CheckCircle2
                                  className="w-4 h-4 text-emerald-500"
                                  strokeWidth={2}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Error Message */}
                        <AnimatePresence>
                          {hasError && (
                            <motion.p
                              initial={{ opacity: 0, y: -4, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: "auto" }}
                              exit={{ opacity: 0, y: -4, height: 0 }}
                              className="text-red-500 text-[11px] mt-1.5 ml-1 font-medium"
                            >
                              {errors[field.name]}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}

                  {errors.submit && (
                    <p className="text-red-500 text-xs text-center font-medium mt-2">
                      {errors.submit}
                    </p>
                  )}

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="pt-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.015, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative overflow-hidden rounded-xl bg-[#111111] text-white font-semibold tracking-[0.18em] uppercase text-[12px] py-[18px] shadow-[0_8px_30px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_-8px_rgba(201,162,39,0.35)] transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2.5">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            Request A Private Tour
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                      {/* Sweep Gradient on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227] via-[#E8D6A8] to-[#C9A227] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="absolute inset-0 z-20 flex items-center justify-center gap-2.5 text-[#111111] font-semibold tracking-[0.18em] uppercase text-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                        Request A Private Tour
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.button>
                  </motion.div>
                </form>

                {/* Trust Badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-center gap-6 mt-7 pt-6 border-t border-[rgba(0,0,0,0.04)]"
                >
                  {trustBadges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 text-[#BBBBBB]"
                    >
                      <badge.icon className="w-3 h-3" strokeWidth={1.5} />
                      <span className="text-[10px] font-medium tracking-wide uppercase">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
