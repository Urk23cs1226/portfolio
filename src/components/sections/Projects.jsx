import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import { FaChevronLeft, FaChevronRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const PROJECTS = [
  {
    name: 'Farmer to Consumer Marketplace',
    description: 'A transparent digital platform that connects farmers directly with consumers. By eliminating intermediaries, it allows farmers to secure higher profits while offering consumers fresher produce at competitive prices. Features include real-time inventory listing and dynamic pricing.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#00E5FF'
  },
  {
    name: 'HealthGuard AI Symptom Intelligence System',
    description: 'An AI-powered diagnostic and symptom intelligence system. It utilizes machine learning models to analyze symptoms input by users, suggesting potential diagnoses, recommending consultations, and offering initial health tips. Integrates OpenCV for analysis.',
    tags: ['Python', 'OpenCV', 'React.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#915EFF'
  },
  {
    name: 'Blood Bank Management System',
    description: 'A real-time database management solution for blood banks, donors, and hospitals. Facilitates seamless searching for specific blood groups, coordinates donations, tracks inventory, and sends automatic request alerts during emergencies.',
    tags: ['Java', 'HTML5', 'CSS3', 'JavaScript', 'MongoDB'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#FF007F'
  },
  {
    name: 'Gas Detection System',
    description: 'An IoT-based environmental safety system utilizing MQ-4 gas sensors connected to Arduino. It monitors gas concentration levels in real time, triggering buzzer alarms and sending instant alert webhooks/notifications when leakages are detected.',
    tags: ['Arduino', 'REST API', 'Python', 'Express.js'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#00FF88'
  },
  {
    name: 'Waste Management System',
    description: 'A smart waste management system equipped with ultrasonic sensors on garbage containers. Tracks container fill levels in real time and optimizes waste collection vehicle routes using a centralized dashboard built with React.',
    tags: ['Arduino', 'React.js', 'MongoDB', 'Node.js'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#FFD700'
  }
];

export default function Projects({ activeIndex, setActiveIndex }) {
  const currentProject = PROJECTS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <section 
      id="projects" 
      className="min-h-screen flex items-center px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        {/* Left Side: Active Project Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Featured <span className="text-accent-blue text-glow-blue">Projects</span>
            </h2>
            <div className="h-[2px] w-20 bg-gradient-to-r from-accent-blue to-accent-purple" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <GlassCard className="border-l-4" style={{ borderColor: currentProject.color }}>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-text-light/50 font-body">
                  Project {activeIndex + 1} of {PROJECTS.length}
                </span>
                
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-2 mb-4">
                  {currentProject.name}
                </h3>
                
                <p className="text-text-light/75 text-sm leading-relaxed mb-6 font-body">
                  {currentProject.description}
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-body px-3 py-1 rounded-full bg-white/5 border border-white/5 text-text-light/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <MagneticButton
                    href={currentProject.github}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/3 hover:bg-white/10 hover:border-white/20 text-white text-xs font-semibold font-body transition-all"
                  >
                    <FaGithub className="text-sm" /> GitHub
                  </MagneticButton>
                  <MagneticButton
                    href={currentProject.live}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-bg-space font-semibold text-xs font-body hover:brightness-110 shadow-lg transition-all"
                    style={{ backgroundColor: currentProject.color }}
                  >
                    <FaExternalLinkAlt className="text-xs" /> Live Demo
                  </MagneticButton>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots and Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/8 bg-white/2 hover:border-accent-blue/40 text-white transition-colors cursor-pointer"
              aria-label="Previous Project"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            
            <div className="flex gap-2">
              {PROJECTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex ? 'w-6' : 'w-2.5 bg-white/15'
                  }`}
                  style={{ backgroundColor: idx === activeIndex ? currentProject.color : undefined }}
                  aria-label={`Jump to project ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/8 bg-white/2 hover:border-accent-blue/40 text-white transition-colors cursor-pointer"
              aria-label="Next Project"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* Right Side: Column spacer for desktop interaction with WebGL Canvas */}
        <div className="h-[250px] md:h-[400px] w-full relative z-0 pointer-events-none" />
      </div>
    </section>
  );
}
