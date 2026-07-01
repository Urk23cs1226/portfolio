import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center md:justify-start px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 pt-24"
    >
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="text-accent-blue font-heading font-semibold uppercase tracking-wider text-xs sm:text-sm">
            Welcome to my space
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight"
        >
          Hello, I'm <br />
          <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">
            RAGUNATH M
          </span>
        </motion.h1>

        {/* Animated Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg lg:text-xl font-light text-text-light/90 h-[40px] flex items-center"
        >
          <span className="mr-2">I am a</span>
          <TypeAnimation
            sequence={[
              'Computer Science Engineer',
              1500,
              'Full Stack Developer',
              1500,
              'AI Enthusiast',
              1500,
              'IoT Developer',
              1500,
              'Computer Vision Learner',
              1500,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="text-accent-blue font-semibold"
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4 w-full"
        >
          <MagneticButton
            href="#projects"
            className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-bg-space font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] transition-all duration-300"
          >
            View Projects
          </MagneticButton>
          
          <MagneticButton
            href="#resume"
            className="px-6 sm:px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white font-semibold text-xs sm:text-sm hover:border-accent-purple/50 hover:bg-white/10 transition-all duration-300"
          >
            Download Resume
          </MagneticButton>

          <MagneticButton
            href="#contact"
            className="px-6 sm:px-8 py-3 rounded-full border border-accent-blue/20 bg-accent-blue/5 text-accent-blue font-semibold text-xs sm:text-sm hover:bg-accent-blue/10 transition-all duration-300"
          >
            Hire Me
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
