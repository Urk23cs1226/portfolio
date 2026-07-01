import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ progress }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-bg-space font-heading"
        >
          {/* Glowing central RM logo */}
          <div className="relative mb-8 flex items-center justify-center">
            {/* Glowing background halo */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute h-32 w-32 rounded-full bg-accent-purple/20 blur-2xl"
            />
            
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-6xl font-bold tracking-widest text-transparent filter drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]"
            >
              RM
            </motion.h1>
          </div>

          {/* Progress bar container */}
          <div className="w-64 overflow-hidden rounded-full bg-white/5 border border-white/10 h-[4px]">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            className="mt-4 text-xs font-light tracking-wider text-text-light/60 font-body uppercase"
          >
            Lifting systems ... {Math.round(progress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
