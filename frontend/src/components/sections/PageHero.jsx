import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export const PageHero = ({ eyebrow, title, subtitle, imageUrl, breadcrumbs = [] }) => {
  const reduce = useReducedMotion();
  const ref = React.useRef(null);
  const { scrollY } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollY, [0, 600], [0, 120]);
  const imgScale = useTransform(scrollY, [0, 600], [1.05, 1.12]);
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden text-[#F6F3EC] bg-[#0B1B2B] bg-noise"
      data-testid="page-hero"
    >
      <motion.img
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(11,27,43,0.70) 0%, rgba(11,27,43,0.60) 40%, rgba(11,27,43,0.90) 100%)' }}
      />
      <div className="relative z-10 bahari-container pt-32 sm:pt-36 lg:pt-44 pb-14 sm:pb-16 lg:pb-24">
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-5 sm:mb-6 text-xs text-[#F6F3EC]/70"
            aria-label="Breadcrumb"
            data-testid="page-breadcrumb"
          >
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link to="/" className="hover:text-[#C8A24A]">Home</Link></li>
              {breadcrumbs.map((b, i) => (
                <React.Fragment key={i}>
                  <li className="text-[#F6F3EC]/40">/</li>
                  <li>{b.to ? <Link to={b.to} className="hover:text-[#C8A24A]">{b.label}</Link> : <span className="text-[#C8A24A]">{b.label}</span>}</li>
                </React.Fragment>
              ))}
            </ol>
          </motion.nav>
        )}
        {eyebrow && (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="flex items-center gap-3 mb-3 sm:mb-4"
          >
            <motion.span
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              animate={reduce ? { scaleX: 1 } : { scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="inline-block h-px w-10 bg-[#C8A24A] origin-left"
            />
            <span className="eyebrow text-[#C8A24A]">{eyebrow}</span>
          </motion.div>
        )}
        <motion.h1
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 22 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease }}
          className="font-display text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-6xl max-w-4xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 22 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease }}
            className="mt-4 sm:mt-5 max-w-3xl text-sm sm:text-base lg:text-lg text-[#F6F3EC]/85 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};
