import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { FaBriefcase } from 'react-icons/fa';

const INTERNSHIPS = [
  {
    role: 'Cybersecurity Intern',
    company: 'Cisco Academy',
    duration: '2024',
    description: 'Developed critical understanding of foundational security models, routing architectures, and threat mitigation. Configured firewalls, analyzed packet captures, and conducted mock penetrative tests.'
  },
  {
    role: 'Web Development Intern',
    company: 'Ediglobe',
    duration: '2024',
    description: 'Designed responsive user interfaces using HTML5, CSS3, and JavaScript. Optimized site speeds, integrated REST APIs, and collaborated on clean repository commits.'
  },
  {
    role: 'Java Developer Intern',
    company: 'CodTech IT Solutions',
    duration: '2023',
    description: 'Constructed local server architectures, developed object-oriented logic modules, and designed unit tests to check application runtime stability.'
  },
  {
    role: 'Python Developer Intern',
    company: 'CodTech IT Solutions',
    duration: '2023',
    description: 'Implemented automated web scraping scripts, conducted exploratory data analysis (EDA), and built basic linear regression prediction models.'
  }
];

export default function Internships() {
  return (
    <section 
      id="internships" 
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto relative z-10 py-16"
    >
      <div className="space-y-2 mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
          Professional <span className="text-accent-blue text-glow-blue">Internships</span>
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto" />
      </div>

      <div className="relative border-l border-white/10 md:border-l-0 md:flex md:flex-col md:items-center space-y-12">
        {/* Center line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-blue to-accent-purple transform -translate-x-1/2" />

        {INTERNSHIPS.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          const nodeColor = idx % 2 === 0 ? '#00E5FF' : '#915EFF';
          const nodeGlow = idx % 2 === 0 ? '0 0 10px #00E5FF' : '0 0 10px #915EFF';

          return (
            <div key={idx} className="relative w-full md:grid md:grid-cols-2 md:gap-8 items-center">
              {/* Timeline marker node */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute left-[-9px] md:left-1/2 top-4 w-[18px] h-[18px] rounded-full border-4 border-bg-space z-20 md:transform md:-translate-x-1/2"
                style={{ 
                  backgroundColor: nodeColor, 
                  boxShadow: nodeGlow 
                }}
              />

              {/* Card Container */}
              <div className={`pl-6 md:pl-0 ${isLeft ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}`}>
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 70 }}
                >
                  <GlassCard className="p-6 inline-block w-full max-w-md text-left">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-accent-blue">
                        <FaBriefcase />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-text-light/50 font-body">{item.duration}</span>
                        <h4 className="text-base sm:text-lg font-heading font-bold text-white leading-snug">{item.role}</h4>
                      </div>
                    </div>
                    
                    <span className="text-xs font-semibold text-accent-purple uppercase tracking-wider block mb-3 font-body">
                      {item.company}
                    </span>

                    <p className="text-text-light/75 text-xs sm:text-sm leading-relaxed font-body">
                      {item.description}
                    </p>
                  </GlassCard>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
