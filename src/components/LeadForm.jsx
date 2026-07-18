"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FORM_CONFIG = {
  FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLSeBcmgrWvPetEtK__dn-5n1b0kAcKVC1jwKG7DohPwzP_2kFw/formResponse",
  ENTRY_NAME: "entry.1856231609",
  ENTRY_MOBILE: "entry.1901639526",
  ENTRY_EMAIL: "entry.1488197927"
};

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobile.trim()) tempErrors.mobile = "Mobile number required.";
    else if (!mobileRegex.test(formData.mobile)) tempErrors.mobile = "Invalid mobile number.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) tempErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) tempErrors.email = "Invalid email.";
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

  const renderInputField = (name, type, placeholder, maxLength) => (
    <div className="relative w-full" key={name}>
      <motion.div
        animate={{
          borderColor: errors[name] ? "rgba(248, 113, 113, 0.8)" : focusedField === name ? "rgba(212, 175, 55, 0.8)" : "rgba(63, 63, 70, 0.6)",
          backgroundColor: focusedField === name ? "rgba(39, 39, 42, 0.8)" : "rgba(24, 24, 27, 0.8)"
        }}
        transition={{ duration: 0.2 }}
        className="relative rounded-lg overflow-hidden border border-zinc-700/60 shadow-inner"
      >
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full px-4 py-3 bg-transparent text-white placeholder:text-zinc-400 focus:outline-none text-sm font-medium"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focusedField === name ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold origin-left"
        />
      </motion.div>
      <AnimatePresence>
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-red-400 text-[11px] mt-1 ml-2 absolute font-medium z-10"
          >
            {errors[name]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-[360px] mx-auto mt-4"
    >
      {/* 
        Solid, Highly Visible Dark Card 
        Uses zinc-950 (almost black) with high opacity and a sharp border 
        so it never blends into the background.
      */}
      <div className="relative overflow-hidden bg-zinc-950/95 backdrop-blur-xl border border-zinc-700/80 p-6 md:p-7 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] rounded-2xl">

        {/* Subtle top highlight for a premium card feel */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent" />

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center py-6"
            >
              <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 text-green-400 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-white mb-2 tracking-tight">Request Received</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                Our luxury consultant will contact you shortly.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsSuccess(false)}
                className="px-6 py-2.5 rounded-full bg-zinc-800 text-white font-medium text-[11px] tracking-widest uppercase border border-zinc-700 hover:border-gold hover:text-gold transition-colors duration-300"
              >
                Submit Another
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              <div className="mb-5 text-center">
                <h3 className="text-2xl font-serif text-white mb-1 tracking-tight">
                  Priority Access
                </h3>
                <p className="text-xs text-zinc-400 font-light">
                  Reserve your private viewing today.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {renderInputField("name", "text", "Full Name")}
                {renderInputField("mobile", "tel", "Mobile Number", 10)}
                {renderInputField("email", "email", "Email Address")}

                {errors.submit && (
                  <p className="text-red-400 text-xs text-center font-medium mt-1">{errors.submit}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 relative overflow-hidden rounded-lg bg-gold text-black font-semibold tracking-widest uppercase text-[11px] py-3.5 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    {isSubmitting ? "Processing..." : "Request Call Back"}
                  </span>
                  <div className="absolute inset-0 bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300 ease-out z-0" />
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
