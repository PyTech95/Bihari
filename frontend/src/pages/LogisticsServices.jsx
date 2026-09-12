import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { Reveal } from '@/components/ui-extras/Reveal';
import { SERVICES_LOGISTICS } from '@/lib/site';
import { Globe, Plane, Truck, FileCheck2 } from 'lucide-react';
import { SEO } from '@/components/SEO';

export default function LogisticsServices() {
  const icons = { ocean: Globe, air: Plane, inland: Truck, customs: FileCheck2 };
  return (
    <Layout>
      <SEO
        title="Logistics Services — Ocean, Air, Inland & Customs"
        description="Multimodal logistics from Bahari Global: FCL/LCL ocean freight, air freight, inland transportation, customs brokerage and trade compliance. Built for the Caribbean and Americas."
        path="/logistics-services"
        keywords="ocean freight, air freight, inland transportation, customs brokerage, FCL, LCL, FTL, LTL, drayage, ISF filing, trade compliance"
      />
      <PageHero eyebrow="Logistics Services" title="Multimodal logistics. Single accountability." subtitle="Ocean, air, inland and customs — coordinated by one team across every leg of your supply chain." imageUrl="https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=1600" breadcrumbs={[{ label: 'Logistics Services' }]} />

      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="Capabilities" title="End-to-end logistics, designed for the Americas." sub="Reliable, compliant and well-documented — from origin to final mile." /></Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES_LOGISTICS.map((s, i) => (
              <div key={s.key} id={s.key}>
                <Reveal delay={i * 70}>
                  <ServiceCard icon={icons[s.key]} title={s.title} desc={s.desc} items={s.items} to="/contact" dataTestId={`logistics-card-${s.key}`} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance block */}
      <section className="bg-[#0B1B2B] text-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-6">
            <SectionHeader light eyebrow="Compliance Posture" title="Audit-ready by design." sub="Documentation discipline, ISF filing accuracy and proactive HTS classification reviews reduce risk for importers and shippers." />
            <ul className="mt-8 space-y-3 text-sm text-[#F6F3EC]/85">
              <li>• Quarterly classification & ISF accuracy reviews</li>
              <li>• Cargo insurance placement and claims support</li>
              <li>• Trade compliance advisory (FTAs, restricted parties, sanctions)</li>
              <li>• Investor-grade reporting and document archive</li>
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={100}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img src="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1400&q=80" alt="Customs and compliance" className="w-full h-full object-cover aspect-[5/4]" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,27,43,0) 50%, rgba(11,27,43,0.85) 100%)' }} />
            </div>
          </Reveal>
        </div>
      </section>

      <CTAStrip headline="Building a new lane? Let's design it together." />
    </Layout>
  );
}
