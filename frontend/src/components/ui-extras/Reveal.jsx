import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Reveal with framer-motion: respects reduced motion, supports stagger via children
export const Reveal = ({ children, className = '', delay = 0, y = 24, as = 'div', once = true }) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.18, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </MotionTag>
  );
};

// Stagger group: wraps children with stagger animation
export const Stagger = ({ children, className = '', stagger = 0.08, delay = 0, as = 'div' }) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18, margin: '0px 0px -80px 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
};

export const StaggerItem = ({ children, className = '', y = 24, as = 'div' }) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
        show: reduce ? { opacity: 1 } : { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </MotionTag>
  );
};
