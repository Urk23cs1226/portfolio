import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { FaGraduationCap } from 'react-icons/fa';

const EDUCATION = [
  {
    institution: 'Karunya University',
    degree: 'B.Tech Computer Science & Engineering',
    duration: '2023 – 2027',
    details: 'Focusing on core engineering fundamentals, object-oriented programming, data structures, database stacks, machine learning, and IoT setups.'
  },
  {
    institution: 'Higher Secondary',
    degree: 'State Board of Examinations',
    duration: '2022 – 2023',
    details: 'Completed major courses in Physics, Chemistry, Mathematics, and Computer Science.'
  },
  {
    institution: 'SSLC',
    degree: 'State Board of Secondary Education',
    duration: '2020 – 2021',
    details: 'Secondary education with high distinction in core sciences and mathematics.'
  }
];

export default function Education() {
  return (
    <section 
      id="education" 
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto relative z-10 py-16"
    >
      <div className="space-y-2 mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
          My <span className="text-accent-purple text-glow-purple">Education</span>
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-accent-purple to-accent-blue mx-auto" />
      </div>

      <div className="space-y-8">
        {EDUCATION.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
          >
            <GlassCard className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 md:p-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-accent-purple/10 text-accent-purple text-2xl flex-shrink-0 mt-1">
                  <FaGraduationCap />
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-accent-blue block font-body">
                    {edu.duration}
                  </span>
                  <h4 className="text-lg sm:text-xl font-heading font-bold text-white leading-tight">
                    {edu.degree}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-text-light/50 font-body">
                    {edu.institution}
                  </p>
                  <p className="text-text-light/75 text-xs sm:text-sm leading-relaxed mt-2 font-body max-w-xl">
                    {edu.details}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
