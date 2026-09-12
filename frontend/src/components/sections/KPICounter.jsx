import React from 'react';
import { motion, useReducedMotion, animate, useInView } from 'framer-motion';

export const KPICounter = ({ value, suffix = '', label, duration = 1.8 }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = React.useState(0);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) { setDisplay(value); return; }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-center sm:text-left"
      data-testid={`kpi-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
    >
      <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#0B1B2B] tabular-nums">
        {display.toLocaleString()}<span className="text-[#C8A24A]">{suffix}</span>
      </div>
      <motion.div
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        animate={inView || reduce ? { scaleX: 1 } : undefined}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="gold-hairline mt-3 max-w-[6rem] sm:max-w-[8rem] mx-auto sm:mx-0 origin-left"
      />
      <div className="mt-3 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#2A3440] leading-snug">
        {label}
      </div>
    </motion.div>
  );
};
