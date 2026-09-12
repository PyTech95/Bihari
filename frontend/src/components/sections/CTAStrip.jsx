import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export const CTAStrip = ({
  headline = 'Plan your next shipment with Bahari.',
  sub = 'Talk to our chartering and logistics desk — we respond within one business day.',
  ctaLabel = 'Request a Quote',
  ctaTo = '/contact',
}) => {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-[#0B1B2B] text-[#F6F3EC] overflow-hidden" data-testid="cta-strip">
      {/* Soft gold radial accent */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(200,162,74,0.25), rgba(200,162,74,0) 70%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
        />
      )}
      <div className="gold-hairline" />
      <div className="bahari-container py-10 sm:py-12 lg:py-14 flex flex-col lg:flex-row items-start lg:items-center gap-5 sm:gap-6 justify-between relative">
        <div>
          <div className="eyebrow text-[#C8A24A] mb-2 sm:mb-3">Ready when you are</div>
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-tight max-w-2xl">{headline}</h3>
          <p className="mt-2 text-sm text-[#F6F3EC]/75 max-w-2xl">{sub}</p>
        </div>
        <Link
          to={ctaTo}
          className="group inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-[#C8A24A] text-[#0B1B2B] text-xs sm:text-sm font-semibold tracking-wide uppercase hover:bg-[#B8923E] transition-colors w-full sm:w-auto justify-center shadow-[0_10px_30px_rgba(200,162,74,0.25)]"
          data-testid="cta-strip-button"
        >
          {ctaLabel} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="gold-hairline" />
    </section>
  );
};
