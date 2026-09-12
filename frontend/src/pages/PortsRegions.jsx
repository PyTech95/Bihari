import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/ui-extras/Reveal';
import { RegionsMap } from '@/components/sections/RegionsMap';
import { REGIONS } from '@/lib/site';
import { SEO } from '@/components/SEO';

export default function PortsRegions() {
  return (
    <Layout>
      <SEO
        title="Ports & Regions — Caribbean, United States & International"
        description="Direct presence across the Caribbean and the United States with vetted international partner network across Europe, Asia and Latin America. Explore our trade corridors."
        path="/ports-regions"
        keywords="Caribbean ports, US Gulf ports, Port of Miami, Kingston, Cartagena, Houston, trade corridors, maritime network"
      />
      <PageHero eyebrow="Ports & Regions" title="Direct presence where it matters. Network where it scales." subtitle="Caribbean roots, United States footprint and an international partner network spanning Europe, Asia and Latin America." imageUrl="https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=1600" breadcrumbs={[{ label: 'Ports & Regions' }]} />

      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-7"><RegionsMap /></Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <SectionHeader eyebrow="Coverage" title="Three theaters. One platform." sub="We staff the Caribbean and US directly and operate with vetted partners internationally." />
            <div className="mt-8 space-y-4">
              {REGIONS.map((r) => (
                <div key={r.key} className="rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] p-5" data-testid={`region-${r.key}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl text-[#0B1B2B]">{r.name}</h3>
                    <span className="text-xs text-[#C8A24A] tracking-[0.18em] uppercase">{r.ports.length} ports</span>
                  </div>
                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-[#2A3440]">
                    {r.ports.map((p) => <li key={p}>• {p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white border-t border-[rgba(11,27,43,0.06)]">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="Trade Corridors" title="Where we move the most cargo." /></Reveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: 'US Gulf → Caribbean', d: 'Houston, New Orleans, Port Everglades to Kingston, Cap-Haïtien, Bridgetown.' },
              { t: 'Florida ↔ Caribbean', d: 'Daily/weekly feeder loops connecting Miami and Port Everglades to multiple islands.' },
              { t: 'LatAm → Caribbean', d: 'Cartagena and Manzanillo to Caribbean islands and US Gulf.' },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 60}>
                <div className="rounded-2xl bg-[#F6F3EC] border border-[rgba(11,27,43,0.08)] p-6 h-full">
                  <div className="eyebrow text-[#C8A24A]">Corridor</div>
                  <h4 className="mt-1 font-display text-2xl text-[#0B1B2B]">{c.t}</h4>
                  <p className="mt-2 text-sm text-[#2A3440]">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip headline="Planning a route across our regions?" />
    </Layout>
  );
}
