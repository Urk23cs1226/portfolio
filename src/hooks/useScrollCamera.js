import { useEffect, useRef } from 'react';

export function useScrollCamera() {
  const scrollInfo = useRef({
    y: 0,
    progress: 0,
    targetY: 0,
    targetProgress: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      scrollInfo.current.targetY = scrollY;
      scrollInfo.current.targetProgress = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLerpedScroll = (damping = 0.05) => {
    scrollInfo.current.y += (scrollInfo.current.targetY - scrollInfo.current.y) * damping;
    scrollInfo.current.progress += (scrollInfo.current.targetProgress - scrollInfo.current.progress) * damping;
    return {
      y: scrollInfo.current.y,
      progress: scrollInfo.current.progress,
      rawY: scrollInfo.current.targetY,
      rawProgress: scrollInfo.current.targetProgress,
    };
  };

  return { scrollInfo, getLerpedScroll };
}
