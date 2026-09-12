import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/ui-extras/Reveal';
import { CORE_VALUES } from '@/lib/site';
import { ShieldCheck, Compass, Anchor, Ship, Globe } from 'lucide-react';
import { SEO } from '@/components/SEO';

const TIMELINE = [
  { year: '2011', title: 'Founded', body: 'Bahari Global is founded in South Florida with a focus on Caribbean trade lanes.' },
  { year: '2014', title: 'Port Agency Network', body: 'Established direct port agency network across Caribbean and US Gulf Coast.' },
  { year: '2017', title: 'Chartering Desk', body: 'Launched dedicated chartering desk for multipurpose and project cargo vessels.' },
  { year: '2020', title: 'Logistics Integration', body: 'Integrated ocean, air, inland and customs into a single platform.' },
  { year: '2023', title: 'Expansion', body: 'Expanded into LatAm corridors and added landing-craft tonnage for remote islands.' },
  { year: '2026', title: 'Investor-Ready', body: 'Transitioning to an investor-ready platform model with formal governance.' },
];

export default function About() {
  return (
    <Layout>
      <SEO
        title="About Us — Our Vision, Mission and Heritage"
        description="Founded in South Florida, Bahari Global Holdings is a maritime & logistics platform with Caribbean roots and Americas reach. Discover our vision, mission, core values and timeline."
        path="/about"
        keywords="about Bahari, maritime company history, vision, mission, core values, Hollywood Florida shipping"
      />
      <PageHero
        eyebrow="Who we are"
        title="An international maritime & logistics group with Caribbean roots."
        subtitle="Bahari Global Holdings specializes in vessel chartering, freight forwarding, port agency representation, husbandry services, cargo transportation and global trade solutions."
        imageUrl="https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=1600"
        breadcrumbs={[{ label: 'About' }]}
      />

      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7">
            <SectionHeader eyebrow="Our Story" title="Built on trust, shaped by the sea." sub="We exist to make global trade more dependable for cargo owners, charterers and governments operating across the Americas. Our promise is simple: schedule integrity, transparent execution and zero-harm operations on every voyage." />
            <div className="mt-8 prose prose-slate max-w-none text-[#2A3440]">
              <p>Founded in Hollywood, Florida, Bahari Global Holdings has grown into a trusted regional platform with a global footprint. Our operations team blends decades of carrier-side experience with the agility of a specialist boutique — enabling us to deliver on schedules that larger lines often cannot accommodate.</p>
              <p>Today, we represent owners, charterers and shippers across the Caribbean, United States, Latin America and global partner network.</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <div className="rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] p-6 sm:p-7 space-y-6">
              <div>
                <div className="eyebrow text-[#C8A24A]">Vision</div>
                <p className="mt-2 font-display text-xl sm:text-2xl text-[#0B1B2B] leading-snug">To become a leading Caribbean and Americas maritime services provider connecting ports, people and commerce.</p>
              </div>
              <div className="gold-hairline" />
              <div>
                <div className="eyebrow text-[#C8A24A]">Mission</div>
                <p className="mt-2 text-sm text-[#2A3440] leading-relaxed">Deliver dependable maritime and logistics solutions for owners, charterers, shippers and governments — with operational discipline, transparent governance and investor-grade reporting.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white border-t border-[rgba(11,27,43,0.06)]" data-testid="about-values">
        <div className="bahari-container py-16 sm:py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="Core Values" title="What we stand for." /></Reveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {CORE_VALUES.map((v, i) => {
              const icons = [ShieldCheck, Compass, Anchor, Ship, Globe];
              const Icon = icons[i] || ShieldCheck;
              return (
                <Reveal key={v.title} delay={i * 70}>
                  <div className="rounded-2xl bg-[#F6F3EC] border border-[rgba(11,27,43,0.08)] p-5 sm:p-6 h-full" data-testid={`about-value-${v.title.toLowerCase()}`}>
                    <div className="w-11 h-11 rounded-xl bg-[#0B1B2B] flex items-center justify-center ring-1 ring-[rgba(200,162,74,0.45)]"><Icon className="w-5 h-5 text-[#C8A24A]" /></div>
                    <h3 className="mt-4 font-display text-xl text-[#0B1B2B]">{v.title}</h3>
                    <p className="mt-2 text-sm text-[#2A3440] leading-relaxed">{v.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0B1B2B] text-[#F6F3EC]" data-testid="about-timeline">
        <div className="bahari-container py-16 sm:py-20 lg:py-24">
          <Reveal><SectionHeader light eyebrow="Our Heritage" title="From a single desk to a regional platform." /></Reveal>
          <div className="mt-12 relative">
            <div className="absolute left-3 top-1 bottom-1 w-px bg-[rgba(200,162,74,0.35)] hidden md:block" />
            <div className="space-y-7 sm:space-y-8">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.year} delay={i * 60}>
                  <div className="md:pl-12 relative">
                    <div className="hidden md:flex absolute left-0 top-2 w-6 h-6 rounded-full bg-[#10263D] ring-1 ring-[rgba(200,162,74,0.6)] items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#C8A24A]" />
                    </div>
                    <div className="text-[#C8A24A] font-display text-2xl">{t.year}</div>
                    <h3 className="mt-1 font-display text-xl">{t.title}</h3>
                    <p className="mt-1 text-sm text-[#F6F3EC]/75 max-w-2xl">{t.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTAStrip headline="Partner with a maritime team that operates like an owner." ctaLabel="Talk to leadership" ctaTo="/contact" />
    </Layout>
  );
}
