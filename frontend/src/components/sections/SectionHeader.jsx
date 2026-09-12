import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const SectionHeader = ({ eyebrow, title, sub, align = 'left', light = false }) => {
  const reduce = useReducedMotion();
  const textCol = light ? 'text-[#F6F3EC]' : 'text-[#0B1B2B]';
  const subCol = light ? 'text-[#F6F3EC]/75' : 'text-[#2A3440]';
  const ease = [0.22, 1, 0.36, 1];

  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      {eyebrow && (
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease }}
          className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
        >
          <motion.span
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={reduce ? { scaleX: 1 } : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="inline-block h-px w-10 bg-[#C8A24A] origin-left"
          />
          <span className="eyebrow text-[#C8A24A]">{eyebrow}</span>
          {align === 'center' && (
            <motion.span
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={reduce ? { scaleX: 1 } : { scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="inline-block h-px w-10 bg-[#C8A24A] origin-right"
            />
          )}
        </motion.div>
      )}
      <motion.h2
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.12, ease }}
        className={`mt-3 font-display text-[1.85rem] sm:text-4xl lg:text-5xl leading-tight ${textCol}`}
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.22, ease }}
          className={`mt-4 max-w-2xl ${align === 'center' ? 'mx-auto' : ''} text-sm sm:text-base ${subCol} leading-relaxed`}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
};
