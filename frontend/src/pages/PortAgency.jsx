import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/ui-extras/Reveal';
import { Clock, FileText, Stethoscope, Droplets, Fuel, UsersRound, ShieldCheck } from 'lucide-react';
import { SEO } from '@/components/SEO';

const CHECKLIST = [
  { icon: FileText, t: 'Port Clearance', d: 'Pre-arrival, arrival and departure paperwork managed by senior agents.' },
  { icon: ShieldCheck, t: 'Customs Coordination', d: 'Direct interface with port and customs authorities across the Caribbean and US.' },
  { icon: FileText, t: 'Documentation', d: 'Bills of lading, manifests, certificates, port disbursements and reconciliation.' },
  { icon: UsersRound, t: 'Crew Changes', d: 'Door-to-vessel crew change orchestration with shore-pass coordination.' },
  { icon: UsersRound, t: 'Immigration Assistance', d: 'CBP and immigration paperwork for crew, supernumeraries and technicians.' },
  { icon: Fuel, t: 'Bunkering Coordination', d: 'Tendering, quality verification and barge coordination across regional ports.' },
  { icon: Droplets, t: 'Fresh Water Supply', d: 'Potable water arrangements per vessel specification.' },
  { icon: Stethoscope, t: 'Medical Assistance', d: 'Onshore medical coordination and emergency response.' },
];

export default function PortAgency() {
  return (
    <Layout>
      <SEO
        title="Port Agency & Husbandry Services — 24/7 Owner-Grade Support"
        description="Port clearance, customs coordination, documentation, crew changes, immigration, bunkering, fresh water, provisions and medical assistance across Caribbean & US ports."
        path="/port-agency-husbandry"
        keywords="port agency, husbandry services, crew changes, immigration assistance, bunkering, port clearance, ship agency Caribbean, Port of Miami agency"
      />
      <PageHero eyebrow="Maritime / Port Agency & Husbandry" title="Owner-grade port representation, 24/7." subtitle="Bahari's port agency and husbandry desk acts as your in-port team — senior, accountable and reachable round the clock." imageUrl="https://images.unsplash.com/photo-1523564662140-a21551f4c588?auto=format&fit=crop&w=1600&q=80" breadcrumbs={[{ label: 'Maritime', to: '/maritime-services' }, { label: 'Port Agency & Husbandry' }]} />

      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="Service Checklist" title="What we deliver in port." sub="Every call we handle is run against a structured checklist with named owners and clear SLAs." /></Reveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CHECKLIST.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.t} delay={i * 50}>
                  <div className="rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] p-5 h-full" data-testid={`husbandry-${c.t.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="w-10 h-10 rounded-xl bg-[#0B1B2B] flex items-center justify-center ring-1 ring-[rgba(200,162,74,0.45)]"><Icon className="w-4 h-4 text-[#C8A24A]" /></div>
                    <h4 className="mt-3 font-display text-lg text-[#0B1B2B]">{c.t}</h4>
                    <p className="mt-1 text-sm text-[#2A3440] leading-relaxed">{c.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0B1B2B] text-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-7">
            <SectionHeader light eyebrow="24/7 Operations" title="Always on. Always reachable." sub="Our duty officers monitor every active port call. When something needs attention at 02:47 local, you get a senior person, not a queue." />
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#F6F3EC]/85">
              <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-[#C8A24A] mt-0.5" /><span>Live duty rotation across regions</span></li>
              <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-[#C8A24A] mt-0.5" /><span>One-call escalation matrix</span></li>
              <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-[#C8A24A] mt-0.5" /><span>Pre/arrival/departure status updates</span></li>
              <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-[#C8A24A] mt-0.5" /><span>Documented incident response</span></li>
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img src="https://images.pexels.com/photos/20216716/pexels-photo-20216716.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Night port operations" className="w-full h-full object-cover aspect-[5/4]" />
            </div>
          </Reveal>
        </div>
      </section>

      <CTAStrip headline="Calling a Caribbean or US port?" ctaLabel="Engage our agency desk" />
    </Layout>
  );
}
