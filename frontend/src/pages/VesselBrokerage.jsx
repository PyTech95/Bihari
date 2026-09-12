import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/ui-extras/Reveal';
import { Handshake, Search, Briefcase } from 'lucide-react';
import { SEO } from '@/components/SEO';

const BROKERAGE = [
  { icon: Briefcase, title: 'Sale & Purchase', body: 'Buy-side and sell-side representation across multipurpose, container feeder, RoRo, landing craft and barge tonnage.' },
  { icon: Handshake, title: 'Charter Brokerage', body: 'Owner and charterer-side negotiations on time, voyage and bareboat fixtures, including COA structures.' },
  { icon: Search, title: 'Vessel Sourcing', body: 'Confidential sourcing for specific cargo profiles, lane requirements and project schedules.' },
];

const DEALS = [
  { type: 'S&P', vessel: 'Multipurpose 12.5K DWT', region: 'Caribbean', status: 'Closed Q3 2025' },
  { type: 'TC Fixture', vessel: 'Container Feeder 720 TEU', region: 'Intra-Caribbean', status: 'Fixed Q1 2026' },
  { type: 'Voyage', vessel: 'Landing Craft 650 DWT', region: 'Haiti relief', status: 'Closed Q4 2025' },
  { type: 'S&P', vessel: 'Heavy-lift MPP 7.2K DWT', region: 'LatAm → Caribbean', status: 'Closed Q2 2025' },
];

export default function VesselBrokerage() {
  return (
    <Layout>
      <SEO
        title="Vessel Brokerage — Sale & Purchase, Chartering, Sourcing"
        description="Discreet and disciplined vessel brokerage from Bahari Global. Sale & purchase, charter brokerage and confidential vessel sourcing for owners, operators and investors."
        path="/vessel-brokerage"
        keywords="vessel brokerage, ship sale purchase, S&P brokerage, charter brokerage, vessel sourcing, ship broker Caribbean"
      />
      <PageHero eyebrow="Maritime / Vessel Brokerage" title="Discreet, disciplined vessel brokerage." subtitle="Sale & purchase, charter brokerage and confidential vessel sourcing for owners, operators and investors." imageUrl="https://images.unsplash.com/photo-1577258582902-31a8c7d72ae4?auto=format&fit=crop&w=1600&q=80" breadcrumbs={[{ label: 'Maritime', to: '/maritime-services' }, { label: 'Vessel Brokerage' }]} />

      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="Capabilities" title="Brokerage with operator insight." sub="Because we operate vessels, we understand the assumptions buyers and charterers should test before they sign." /></Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {BROKERAGE.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.title} delay={i * 60}>
                  <div className="rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] p-7 h-full hover:shadow-[0_18px_50px_rgba(11,27,43,0.10)] transition-shadow">
                    <div className="w-11 h-11 rounded-xl bg-[#0B1B2B] flex items-center justify-center ring-1 ring-[rgba(200,162,74,0.45)]"><Icon className="w-5 h-5 text-[#C8A24A]" /></div>
                    <h3 className="mt-4 font-display text-2xl text-[#0B1B2B]">{b.title}</h3>
                    <p className="mt-2 text-sm text-[#2A3440] leading-relaxed">{b.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-[rgba(11,27,43,0.06)]">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="Recent Activity" title="Representative deals." sub="A short, anonymized selection of recent activity from our brokerage desk." /></Reveal>
          <div className="mt-10 rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] overflow-hidden" data-testid="brokerage-deals-table">
            <table className="w-full text-sm">
              <thead className="bg-[#F6F3EC] text-[#0B1B2B]">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Type</th>
                  <th className="text-left px-5 py-3 font-medium">Vessel / Profile</th>
                  <th className="text-left px-5 py-3 font-medium">Region</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {DEALS.map((d, i) => (
                  <tr key={i} className="border-t border-[rgba(11,27,43,0.06)]"><td className="px-5 py-3 text-[#C8A24A] font-semibold">{d.type}</td><td className="px-5 py-3 text-[#0B1B2B]">{d.vessel}</td><td className="px-5 py-3 text-[#2A3440]">{d.region}</td><td className="px-5 py-3 text-[#2A3440]">{d.status}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTAStrip headline="Considering a fixture or fleet decision?" ctaLabel="Speak with brokerage" />
    </Layout>
  );
}
