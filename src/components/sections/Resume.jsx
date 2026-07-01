import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import { FaDownload, FaFileAlt } from 'react-icons/fa';

export default function Resume() {
  const docRef = useRef(null);

  const handleMouseMove = (e) => {
    const doc = docRef.current;
    if (!doc) return;
    const rect = doc.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Pronounced tilt to make it feel like a physical page
    const rotX = (y / (rect.height / 2)) * -18;
    const rotY = (x / (rect.width / 2)) * 18;

    doc.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;
    doc.style.boxShadow = `0 25px 50px rgba(145, 94, 255, 0.25)`;
    doc.style.borderColor = `rgba(145, 94, 255, 0.35)`;
  };

  const handleMouseLeave = () => {
    const doc = docRef.current;
    if (!doc) return;
    doc.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    doc.style.boxShadow = `0 8px 32px 0 rgba(0, 0, 0, 0.37)`;
    doc.style.borderColor = `rgba(255, 255, 255, 0.08)`;
  };

  return (
    <section 
      id="resume" 
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto relative z-10 py-16"
    >
      <div className="space-y-2 mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
          Curriculum <span className="text-accent-blue text-glow-blue">Vitae</span>
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Mockup Preview */}
        <div className="flex justify-center">
          <div
            ref={docRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-[280px] h-[380px] sm:w-[320px] sm:h-[430px] rounded-xl glass-card border border-white/8 p-6 flex flex-col justify-between transition-all duration-150 relative cursor-pointer select-none overflow-hidden interactive-3d"
          >
            {/* Tech background overlays */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-purple/10 to-transparent blur-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent-blue/10 to-transparent blur-xl pointer-events-none" />

            {/* CV contents */}
            <div className="space-y-4">
              {/* Mock Header */}
              <div className="border-b border-white/10 pb-4">
                <h4 className="font-heading font-bold text-lg text-white">RAGUNATH M</h4>
                <p className="text-[10px] text-accent-blue font-body tracking-wider uppercase font-semibold">
                  Computer Science Student
                </p>
              </div>

              {/* Bio block */}
              <div className="space-y-1.5">
                <div className="h-2 w-16 bg-accent-purple/40 rounded" />
                <div className="h-1.5 w-full bg-white/5 rounded" />
                <div className="h-1.5 w-full bg-white/5 rounded" />
                <div className="h-1.5 w-4/5 bg-white/5 rounded" />
              </div>

              {/* Education block */}
              <div className="space-y-2 pt-2">
                <div className="h-2.5 w-20 bg-accent-blue/30 rounded" />
                <div className="flex items-center justify-between">
                  <div className="h-1.5 w-24 bg-white/10 rounded" />
                  <div className="h-1.5 w-12 bg-white/5 rounded" />
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded" />
              </div>

              {/* Projects block */}
              <div className="space-y-2 pt-2">
                <div className="h-2.5 w-24 bg-accent-purple/30 rounded" />
                <div className="h-1.5 w-36 bg-white/10 rounded" />
                <div className="h-1.5 w-full bg-white/5 rounded" />
                <div className="h-1.5 w-5/6 bg-white/5 rounded" />
              </div>
            </div>

            {/* Mock Footer */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[9px] text-text-light/40 font-body">
              <span>ragunathm2005@gmail.com</span>
              <span>Trichy, TN</span>
            </div>
          </div>
        </div>

        {/* Right Side: Description and Actions */}
        <div className="text-center md:text-left space-y-6">
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white leading-snug">
            Academically Driven & Skill Oriented
          </h3>
          
          <p className="text-text-light/75 text-xs sm:text-sm leading-relaxed font-body">
            My detailed resume provides comprehensive information about my academic achievements, engineering coursework at Karunya University, hands-on IoT prototyping, full-stack database integrations, and completed professional development internships.
          </p>

          <div className="pt-4 flex justify-center md:justify-start">
            <MagneticButton
              href="#"
              className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-bg-space font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(145,94,255,0.3)] hover:shadow-[0_0_35px_rgba(145,94,255,0.65)] hover:scale-105 transition-all duration-300"
            >
              <FaDownload className="text-sm" /> Download Resume (PDF)
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
