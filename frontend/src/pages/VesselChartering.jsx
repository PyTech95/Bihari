import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/ui-extras/Reveal';
import { VesselCard } from '@/components/sections/VesselCard';
import { getVessels } from '@/lib/api';
import { Ship, Clock, Map, Package } from 'lucide-react';
import { SEO } from '@/components/SEO';

const CHARTER_TYPES = [
  { icon: Clock, title: 'Time Charter', body: 'Lease vessel capacity for a defined period at an agreed daily hire rate. Ideal for repeating lanes and seasonal programs.' },
  { icon: Map, title: 'Voyage Charter', body: 'Single voyage agreements with a defined load/discharge port pair. Best for ad-hoc or project shipments.' },
  { icon: Ship, title: 'Bareboat Charter', body: 'Vessel leased without crew or provisions. Suited to owners and operators building dedicated regional capacity.' },
  { icon: Package, title: 'Project Cargo Charter', body: 'Tailored solutions for oversized, heavy-lift or breakbulk cargo with engineering and stowage support.' },
];

export default function VesselChartering() {
  const [vessels, setVessels] = React.useState([]);
  React.useEffect(() => { getVessels().then(setVessels).catch(() => {}); }, []);
  return (
    <Layout>
      <SEO
        title="Vessel Chartering — Time, Voyage, Bareboat & Project Cargo"
        description="Time, voyage, bareboat and project-cargo vessel chartering. Multipurpose, RoRo, container feeder, landing craft and barge tonnage available across the Caribbean and Americas."
        path="/vessel-chartering"
        keywords="vessel chartering, time charter, voyage charter, bareboat charter, project cargo, multipurpose vessel, container feeder, RoRo charter, landing craft"
      />
      <PageHero eyebrow="Maritime / Vessel Chartering" title="The right vessel, the right lane, the right terms." subtitle="Time, voyage, bareboat and project cargo chartering across the Caribbean and Americas." imageUrl="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1600&q=80" breadcrumbs={[{ label: 'Maritime', to: '/maritime-services' }, { label: 'Vessel Chartering' }]} />

      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="Charter Types" title="Choose the structure that fits your shipment." sub="Our chartering desk negotiates fair, balanced contracts and stays on the voyage from fixture to final disbursement." /></Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {CHARTER_TYPES.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 60}>
                  <div className="rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] p-7 h-full hover:shadow-[0_18px_50px_rgba(11,27,43,0.10)] transition-shadow" data-testid={`charter-type-${c.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="w-11 h-11 rounded-xl bg-[#0B1B2B] flex items-center justify-center ring-1 ring-[rgba(200,162,74,0.45)]"><Icon className="w-5 h-5 text-[#C8A24A]" /></div>
                    <h3 className="mt-4 font-display text-2xl text-[#0B1B2B]">{c.title}</h3>
                    <p className="mt-2 text-sm text-[#2A3440] leading-relaxed">{c.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-[rgba(11,27,43,0.06)]">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="Available Tonnage" title="Vessels available for charter." /></Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vessels.map((v, i) => (<Reveal key={v.id} delay={i * 60}><VesselCard vessel={v} /></Reveal>))}
          </div>
        </div>
      </section>

      <CTAStrip headline="Need to fix tonnage this quarter?" ctaLabel="Talk to the chartering desk" />
    </Layout>
  );
}
