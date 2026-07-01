import React, { useState, useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import Loader from './components/ui/Loader';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Internships from './components/sections/Internships';
import Education from './components/sections/Education';
import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact';

// Lazy load 3D Canvas
const PortfolioCanvas = lazy(() => import('./components/3d/PortfolioCanvas'));

export default function App() {
  const [progress, setProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const prog = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollProgress(prog);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    lenis.on('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Simulated progress to handle initial load/fade-in smoothly
  useEffect(() => {
    if (progress < 100) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(timer);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [progress]);

  const handleWebGLProgress = (val) => {
    // Merge simulated progress with real WebGL progress
    if (val >= 100) {
      setProgress(100);
    } else {
      setProgress((prev) => Math.max(prev, val));
    }
  };

  return (
    <div className="relative bg-bg-space min-h-screen text-white overflow-hidden selection:bg-accent-blue/30 selection:text-white">
      {/* Custom neon glowing cursor */}
      <CustomCursor />
      
      {/* Loading Splash Screen */}
      <Loader progress={progress} />

      {/* Navigation */}
      <Navbar />

      {/* 3D WebGL Background Canvas */}
      <Suspense fallback={null}>
        <PortfolioCanvas
          scrollProgress={scrollProgress}
          activeProjectIndex={activeProjectIndex}
          setActiveProjectIndex={setActiveProjectIndex}
          onProgress={handleWebGLProgress}
        />
      </Suspense>

      {/* Page Contents (overlapping the WebGL Canvas background) */}
      <div className="relative z-10 w-full">
        <Hero />
        <About />
        <Skills />
        <Projects
          activeIndex={activeProjectIndex}
          setActiveIndex={setActiveProjectIndex}
        />
        <Internships />
        <Education />
        <Resume />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
