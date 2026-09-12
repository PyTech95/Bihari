import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { Reveal } from '@/components/ui-extras/Reveal';
import { SERVICES_MARITIME } from '@/lib/site';
import { Ship, Compass, Anchor, LifeBuoy } from 'lucide-react';
import { SEO } from '@/components/SEO';

const PROCESS = [
  { step: '01', title: 'Discovery', body: 'We capture cargo, route, schedule and compliance requirements in a structured brief.' },
  { step: '02', title: 'Sourcing', body: 'We match the right vessel and lane from our owned and partner network within 24–48 hours.' },
  { step: '03', title: 'Contracting', body: 'We negotiate clear, fair terms with risk allocation that reflects industry best practice.' },
  { step: '04', title: 'Execution', body: 'A single operations owner manages port calls, husbandry, customs and documentation end-to-end.' },
  { step: '05', title: 'Reporting', body: 'Investor-grade post-voyage reporting closes every engagement.' },
];

const FAQS = [
  { q: 'What cargo types do you handle?', a: 'Containerized, breakbulk, project cargo, RoRo, bulk, reefer and heavy-lift across the Americas.' },
  { q: 'What is your typical response time?', a: 'We respond to chartering and husbandry inquiries within one business day, often same-day.' },
  { q: 'Do you work with government and NGO clients?', a: 'Yes. We hold a strong track record on government and NGO cargo, including disaster relief logistics.' },
];

export default function MaritimeServices() {
  const icons = { chartering: Ship, brokerage: Compass, husbandry: LifeBuoy, 'port-agency': Anchor };
  return (
    <Layout>
      <SEO
        title="Maritime Services — Chartering, Brokerage, Port Agency"
        description="Vessel chartering, vessel brokerage, port agency and husbandry services across the Caribbean and Americas. Single accountable partner for owners, charterers and shippers."
        path="/maritime-services"
        keywords="maritime services, vessel chartering, vessel brokerage, port agency, husbandry, ship management, Caribbean shipping"
      />
      <PageHero eyebrow="Maritime Services" title="Vessels, ports and crews — handled." subtitle="A single, accountable partner for chartering, brokerage, port agency and husbandry across the Caribbean and Americas." imageUrl="https://images.pexels.com/photos/33622086/pexels-photo-33622086.jpeg?auto=compress&cs=tinysrgb&w=1600" breadcrumbs={[{ label: 'Maritime Services' }]} />

      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="Capabilities" title="Four pillars of maritime delivery." sub="Each pillar is staffed by senior maritime professionals with carrier-side and owner-side experience." /></Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES_MARITIME.map((s, i) => (
              <Reveal key={s.key} delay={i * 70}>
                <ServiceCard icon={icons[s.key]} title={s.title} desc={s.desc} items={s.items} to={s.key === 'chartering' ? '/vessel-chartering' : s.key === 'brokerage' ? '/vessel-brokerage' : s.key === 'port-agency' || s.key === 'husbandry' ? '/port-agency-husbandry' : '/contact'} dataTestId={`maritime-card-${s.key}`} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-[rgba(11,27,43,0.06)]">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="Process" title="How we operate." sub="A disciplined, transparent process from inquiry to post-voyage report." /></Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 60}>
                <div className="rounded-2xl bg-[#F6F3EC] border border-[rgba(11,27,43,0.08)] p-6 h-full">
                  <div className="text-[#C8A24A] font-display text-2xl">{p.step}</div>
                  <h4 className="mt-1 font-display text-xl text-[#0B1B2B]">{p.title}</h4>
                  <p className="mt-2 text-sm text-[#2A3440] leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="FAQ" title="Frequently asked questions." /></Reveal>
          <div className="mt-10 max-w-3xl space-y-4">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] p-5" data-testid="maritime-faq-item">
                <summary className="flex items-center justify-between cursor-pointer text-[#0B1B2B] font-medium"><span>{f.q}</span><span className="text-[#C8A24A] font-display text-xl group-open:rotate-45 transition-transform">+</span></summary>
                <p className="mt-3 text-sm text-[#2A3440] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip headline="Looking for vessel capacity or port agency support?" ctaLabel="Request a Quote" />
    </Layout>
  );
}
