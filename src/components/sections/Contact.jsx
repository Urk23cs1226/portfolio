import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState({ name: false, email: false, message: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    if (formData[field] === '') {
      setFocused({ ...focused, [field]: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message, Ragunath will get back to you shortly!');
    setFormData({ name: '', email: '', message: '' });
    setFocused({ name: false, email: false, message: false });
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 py-16"
    >
      <div className="space-y-2 mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
          Get In <span className="text-accent-blue text-glow-blue">Touch</span>
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch w-full">
        {/* Left Side: Info Glass Card */}
        <div className="md:col-span-5 flex">
          <GlassCard className="w-full flex flex-col justify-between p-8 space-y-8">
            <div className="space-y-6 text-left">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
                Let's collaborate
              </h3>
              <p className="text-text-light/75 text-xs sm:text-sm leading-relaxed font-body">
                I am interested in internship opportunities, collaborative projects, or research roles. Drop a message or reach out via socials.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3 text-text-light/80">
                  <FaEnvelope className="text-accent-blue text-lg" />
                  <span className="text-xs sm:text-sm font-body">ragunath.m@email.com</span>
                </div>
                <div className="flex items-center space-x-3 text-text-light/80">
                  <FaPhone className="text-accent-purple text-lg" />
                  <span className="text-xs sm:text-sm font-body">+91 63798 94595</span>
                </div>
                <div className="flex items-center space-x-3 text-text-light/80">
                  <FaMapMarkerAlt className="text-accent-blue text-lg" />
                  <span className="text-xs sm:text-sm font-body">Trichy, Tamil Nadu</span>
                </div>
              </div>
            </div>

            {/* Social items */}
            <div className="flex space-x-4 pt-6">
              <MagneticButton 
                href="https://linkedin.com" 
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:text-accent-blue hover:border-accent-blue/40 transition-colors"
              >
                <FaLinkedin className="text-lg" />
              </MagneticButton>
              <MagneticButton 
                href="https://github.com" 
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:text-accent-purple hover:border-accent-purple/40 transition-colors"
              >
                <FaGithub className="text-lg" />
              </MagneticButton>
              <MagneticButton 
                href="https://wa.me/916379894595" 
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:text-accent-blue hover:border-accent-blue/40 transition-colors"
              >
                <FaWhatsapp className="text-lg" />
              </MagneticButton>
            </div>
          </GlassCard>
        </div>

        {/* Right Side: Form details */}
        <div className="md:col-span-7 flex">
          <GlassCard className="w-full p-8">
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {/* Name */}
              <div className="relative">
                <label
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-xs sm:text-sm text-text-light/50 transition-all duration-200 pointer-events-none font-body ${
                    focused.name || formData.name 
                      ? '-translate-y-[24px] scale-90 text-accent-blue bg-bg-space px-2' 
                      : ''
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3.5 text-white text-xs sm:text-sm font-body focus:outline-none focus:border-accent-blue focus:shadow-[0_0_15px_rgba(0,229,255,0.12)] transition-all"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-xs sm:text-sm text-text-light/50 transition-all duration-200 pointer-events-none font-body ${
                    focused.email || formData.email 
                      ? '-translate-y-[24px] scale-90 text-accent-blue bg-bg-space px-2' 
                      : ''
                  }`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3.5 text-white text-xs sm:text-sm font-body focus:outline-none focus:border-accent-blue focus:shadow-[0_0_15px_rgba(0,229,255,0.12)] transition-all"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <label
                  className={`absolute left-4 top-6 transform -translate-y-1/2 text-xs sm:text-sm text-text-light/50 transition-all duration-200 pointer-events-none font-body ${
                    focused.message || formData.message 
                      ? '-translate-y-[22px] scale-90 text-accent-blue bg-bg-space px-2' 
                      : ''
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3.5 text-white text-xs sm:text-sm font-body focus:outline-none focus:border-accent-blue focus:shadow-[0_0_15px_rgba(0,229,255,0.12)] transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <MagneticButton
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-bg-space font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all duration-300"
                >
                  Send Message
                </MagneticButton>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
