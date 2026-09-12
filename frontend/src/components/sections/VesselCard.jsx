import React from 'react';
import { Ruler, ArrowsUpFromLine, Package, MapPin, CalendarCheck2, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

export const VesselCard = ({ vessel }) => {
  const reduce = useReducedMotion();
  const statusColor = vessel.availability.toLowerCase().includes('available')
    ? 'bg-[#0B1B2B] text-[#C8A24A] border-[rgba(200,162,74,0.6)]'
    : 'bg-[#F6F3EC] text-[#0B1B2B] border-[rgba(11,27,43,0.2)]';

  return (
    <motion.article
      data-testid={`vessel-card-${vessel.id}`}
      whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="group rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] shadow-[0_10px_30px_rgba(11,27,43,0.06)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_22px_60px_rgba(11,27,43,0.15)] flex flex-col h-full"
    >
      <div className="relative aspect-[16/10] bg-[#0B1B2B] overflow-hidden">
        <img
          src={vessel.image_url}
          alt={vessel.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(11,27,43,0.85) 100%)' }} />
        <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[rgba(11,27,43,0.78)] backdrop-blur text-[10px] tracking-[0.16em] uppercase text-[#F6F3EC] border border-white/10">
          {vessel.vessel_type}
        </div>
        <div className={`absolute top-3 right-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[10px] tracking-[0.16em] uppercase border ${statusColor}`}>
          {vessel.availability}
        </div>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <h3 className="font-display text-xl sm:text-2xl text-white drop-shadow-md">{vessel.name}</h3>
        </div>
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <p className="text-sm text-[#2A3440] leading-relaxed line-clamp-2">{vessel.summary}</p>
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-[#2A3440]">
          <Spec icon={Ruler} label="Length" value={`${vessel.length_m} m`} />
          <Spec icon={ArrowsUpFromLine} label="Beam" value={`${vessel.beam_m} m`} />
          <Spec icon={Package} label="Capacity" value={vessel.cargo_capacity} />
          <Spec icon={MapPin} label="Location" value={vessel.location} />
          <Spec icon={CalendarCheck2} label="Built" value={vessel.year_built} />
          <Spec icon={Flag} label="Flag" value={vessel.flag} />
        </ul>
        <div className="mt-6 mt-auto flex items-center justify-between">
          <Link to="/contact" className="text-sm font-semibold text-[#0B1B2B] hover:text-[#C8A24A] transition-colors group/cta inline-flex items-center gap-1" data-testid={`vessel-quote-${vessel.id}`}>
            Request Charter Quote <span className="transition-transform group-hover/cta:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const Spec = ({ icon: Icon, label, value }) => (
  <li className="flex items-start gap-2">
    <Icon className="w-3.5 h-3.5 text-[#C8A24A] mt-0.5" />
    <span>
      <div className="text-[10px] tracking-[0.18em] uppercase text-[#2A3440]/60">{label}</div>
      <div className="font-medium text-[#0B1B2B]">{value}</div>
    </span>
  </li>
);
