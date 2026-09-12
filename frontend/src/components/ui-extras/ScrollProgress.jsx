import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const ScrollProgress = () => {
  const [progress, setProgress] = React.useState(0);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    if (reduce) return;
    let raf = null;
    const update = () => {
      const doc = document.documentElement;
      const total = (doc.scrollHeight - doc.clientHeight) || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / total));
      setProgress(p);
      raf = null;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [reduce]);

  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#C8A24A] via-[#E1C078] to-[#C8A24A]"
      style={{ scaleX: progress, transformOrigin: '0% 50%' }}
      data-testid="scroll-progress"
    />
  );
};
