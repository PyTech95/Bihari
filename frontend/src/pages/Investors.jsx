import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/ui-extras/Reveal';
import { KPICounter } from '@/components/sections/KPICounter';
import { ContactForm } from '@/components/forms/ContactForm';
import { KPI_INVESTOR } from '@/lib/site';
import { ShieldCheck, FileText, LineChart, HandshakeIcon } from 'lucide-react';
import { SEO } from '@/components/SEO';

export default function Investors() {
  return (
    <Layout>
      <SEO
        title="Investors & Partnerships — A Regional Maritime Platform"
        description="Bahari Global Holdings is building an investor-ready maritime services platform across the Caribbean, US and Latin America. Aligned long-term capital and partnership inquiries welcomed."
        path="/investors"
        keywords="maritime investors, shipping platform investment, Caribbean maritime, Bahari Global investors, partnerships, NDA"
      />
      <PageHero eyebrow="Investors & Partnerships" title="A platform play in maritime & logistics." subtitle="Bahari Global Holdings is building an investor-ready maritime services platform connecting the Caribbean, United States and Latin America." imageUrl="https://images.pexels.com/photos/33622086/pexels-photo-33622086.jpeg?auto=compress&cs=tinysrgb&w=1600" breadcrumbs={[{ label: 'Investors & Partnerships' }]} />

      {/* Narrative */}
      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7">
            <SectionHeader eyebrow="Thesis" title="A regional platform with global tailwinds." sub="Near-shoring, renewables build-outs and structural intra-Caribbean trade growth underpin a multi-year demand expansion that few platforms are positioned to capture with the same operating discipline." />
            <div className="mt-8 prose prose-slate max-w-none text-[#2A3440]">
              <p>Our strategy is to combine owned and partner tonnage with a sticky port agency, husbandry and customs services layer — creating a defensible regional platform with attractive unit economics and clear operating leverage.</p>
              <p>We are selectively open to investor and partnership conversations aligned with our long-term vision.</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <div className="rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] p-7 space-y-5">
              <div className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-[#0B1B2B] flex items-center justify-center ring-1 ring-[rgba(200,162,74,0.45)]"><LineChart className="w-4 h-4 text-[#C8A24A]" /></div><div><div className="font-display text-lg text-[#0B1B2B]">Operating leverage</div><div className="text-sm text-[#2A3440]">Fixed agency infrastructure compounds as we add tonnage and lanes.</div></div></div>
              <div className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-[#0B1B2B] flex items-center justify-center ring-1 ring-[rgba(200,162,74,0.45)]"><ShieldCheck className="w-4 h-4 text-[#C8A24A]" /></div><div><div className="font-display text-lg text-[#0B1B2B]">Governance</div><div className="text-sm text-[#2A3440]">Investor-grade reporting and disciplined risk management.</div></div></div>
              <div className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-[#0B1B2B] flex items-center justify-center ring-1 ring-[rgba(200,162,74,0.45)]"><FileText className="w-4 h-4 text-[#C8A24A]" /></div><div><div className="font-display text-lg text-[#0B1B2B]">Documentation</div><div className="text-sm text-[#2A3440]">Transparent contracts, audit-ready files and structured KPIs.</div></div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* KPIs */}
      <section className="bg-white border-t border-[rgba(11,27,43,0.06)]" data-testid="investor-kpis">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="Selected Metrics" title="Operating performance." sub="Indicative metrics, normalized for confidentiality. Subject to NDA review." /></Reveal>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-10">
            {KPI_INVESTOR.map((k) => (<Reveal key={k.id}><KPICounter value={k.value} suffix={k.suffix} label={k.label} /></Reveal>))}
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section className="bg-[#0B1B2B] text-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <SectionHeader light eyebrow="Get in Touch" title="Investor & partnership inquiries." sub="Reach out for an introductory call. We share the management deck under NDA after a qualifying conversation." />
            <div className="mt-8 space-y-3 text-sm text-[#F6F3EC]/85">
              <div>Office of the Managing Partner</div>
              <div>investors@bahariglobal.com</div>
              <div>+1 (347) 606-6228</div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <CTAStrip headline="Aligned long-term capital is what we look for." ctaLabel="Open a confidential conversation" />
    </Layout>
  );
}
