import React from 'react';
import GlassCard from '../ui/GlassCard';
import { FaMapMarkerAlt, FaUniversity, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';

export default function About() {
  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
        {/* Left Side: About Me text content */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              About <span className="text-accent-blue text-glow-blue">Me</span>
            </h2>
            <div className="h-[2px] w-20 bg-gradient-to-r from-accent-blue to-accent-purple" />
          </div>

          <GlassCard className="space-y-4">
            <p className="text-text-light/85 leading-relaxed font-body text-sm sm:text-base">
              Motivated Computer Science Engineering student passionate about Full Stack Development, Artificial Intelligence, IoT, and Computer Vision. Interested in building innovative software solutions that solve real-world problems while continuously learning modern technologies.
            </p>
          </GlassCard>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlassCard hoverGlow={false} className="p-4 flex items-center space-x-3 bg-white/2 border-white/5">
              <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
                <FaMapMarkerAlt className="text-lg flex-shrink-0" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-light/40">Location</p>
                <p className="text-sm font-medium text-white">Trichy, Tamil Nadu</p>
              </div>
            </GlassCard>

            <GlassCard hoverGlow={false} className="p-4 flex items-center space-x-3 bg-white/2 border-white/5">
              <div className="p-2 rounded-lg bg-accent-purple/10 text-accent-purple">
                <FaUniversity className="text-lg flex-shrink-0" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-light/40">University</p>
                <p className="text-sm font-medium text-white">Karunya University</p>
              </div>
            </GlassCard>

            <GlassCard hoverGlow={false} className="p-4 flex items-center space-x-3 bg-white/2 border-white/5">
              <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
                <FaGraduationCap className="text-lg flex-shrink-0" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-light/40">Degree</p>
                <p className="text-sm font-medium text-white">B.Tech CSE</p>
              </div>
            </GlassCard>

            <GlassCard hoverGlow={false} className="p-4 flex items-center space-x-3 bg-white/2 border-white/5">
              <div className="p-2 rounded-lg bg-accent-purple/10 text-accent-purple">
                <FaCalendarAlt className="text-lg flex-shrink-0" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-light/40">Graduation</p>
                <p className="text-sm font-medium text-white">Class of 2027</p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Right Side: Spacer for desktop so the 3D scene (Avatar) floats freely here */}
        <div className="hidden md:block" />
      </div>
    </section>
  );
}
