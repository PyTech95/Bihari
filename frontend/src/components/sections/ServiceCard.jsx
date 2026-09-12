import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export const ServiceCard = ({ icon: Icon, title, desc, items, to, dataTestId }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-testid={dataTestId}
      whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="relative group rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] shadow-[0_10px_30px_rgba(11,27,43,0.06)] overflow-hidden h-full transition-shadow duration-300 hover:shadow-[0_22px_60px_rgba(11,27,43,0.15)]"
    >
      {/* Gold top accent that grows on hover */}
      <span className="absolute inset-x-0 top-0 h-px bg-[rgba(200,162,74,0.75)] origin-left transition-transform duration-500 group-hover:scale-x-110" />
      {/* Subtle gold corner glow on hover */}
      <span aria-hidden className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[rgba(200,162,74,0.16)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="p-5 sm:p-6 lg:p-7 relative">
        <div className="flex items-center gap-3 sm:gap-4">
          {Icon && (
            <div className="w-11 h-11 rounded-xl bg-[#0B1B2B] flex items-center justify-center ring-1 ring-[rgba(200,162,74,0.45)] transition-transform duration-300 group-hover:scale-110">
              <Icon className="w-5 h-5 text-[#C8A24A]" />
            </div>
          )}
          <h3 className="font-display text-xl sm:text-2xl text-[#0B1B2B] leading-tight">{title}</h3>
        </div>
        {desc && <p className="mt-3 text-sm text-[#2A3440] leading-relaxed">{desc}</p>}
        {items && items.length > 0 && (
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {items.map((it) => (
              <li key={it} className="flex items-start gap-2 text-sm text-[#2A3440]">
                <span className="mt-2 inline-block w-1 h-1 rounded-full bg-[#C8A24A] flex-shrink-0" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        )}
        {to && (
          <Link
            to={to}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#0B1B2B] hover:text-[#C8A24A] transition-colors"
          >
            Learn more
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};
