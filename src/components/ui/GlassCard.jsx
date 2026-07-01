import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hoverGlow = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-card rounded-2xl p-6 md:p-8 backdrop-blur-xl ${
        hoverGlow ? 'hover:border-accent-blue/30 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)]' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
