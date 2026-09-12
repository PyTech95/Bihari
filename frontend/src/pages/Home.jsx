import React from 'react';
import { Link } from 'react-router-dom';
import { Ship, Anchor, PackageOpen, ShieldCheck, Compass, Globe, Plane, Truck, FileCheck2, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { KPICounter } from '@/components/sections/KPICounter';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/ui-extras/Reveal';
import { RegionsMap } from '@/components/sections/RegionsMap';
import { VesselCard } from '@/components/sections/VesselCard';
import { getVessels, getNews } from '@/lib/api';
import { CORE_VALUES, KPI_HOME, REGIONS, SITE } from '@/lib/site';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';
import { SEO } from '@/components/SEO';

export default function Home() {
  const [vessels, setVessels] = React.useState([]);
  const [news, setNews] = React.useState([]);
  React.useEffect(() => {
    getVessels().then(setVessels).catch(() => {});
    getNews().then(setNews).catch(() => {});
  }, []);

  return (
    <Layout transparentNav>
      <SEO
        title="Maritime Logistics, Vessel Chartering & Port Agency"
        description="Bahari Global Holdings — international maritime & logistics group. Vessel chartering, brokerage, port agency, husbandry, freight forwarding and global trade solutions across the Caribbean and Americas."
        path="/"
        keywords="maritime logistics, vessel chartering, port agency, husbandry, freight forwarding, Caribbean shipping, US shipping, Bahari Global Holdings"
      />
      <HeroVideo />

      {/* Services Pillars */}
      <section className="bg-[#F6F3EC]" data-testid="home-services-grid">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal>
            <SectionHeader
              eyebrow="What We Do"
              title="An integrated maritime & logistics platform."
              sub="From chartering and brokerage to port agency, freight forwarding and customs — a single accountable partner across the Caribbean and Americas."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Reveal delay={0}><ServiceCard icon={Ship} title="Vessel Chartering" desc="Time, voyage, bareboat and project cargo chartering for owners and charterers worldwide." to="/vessel-chartering" dataTestId="home-service-chartering" /></Reveal>
            <Reveal delay={60}><ServiceCard icon={Compass} title="Vessel Brokerage" desc="Sale & purchase, charter brokerage and vessel sourcing across the global fleet." to="/vessel-brokerage" dataTestId="home-service-brokerage" /></Reveal>
            <Reveal delay={120}><ServiceCard icon={Anchor} title="Port Agency & Husbandry" desc="24/7 port representation, clearance, crew change, bunkers and full husbandry support." to="/port-agency-husbandry" dataTestId="home-service-port-agency" /></Reveal>
            <Reveal delay={180}><ServiceCard icon={Globe} title="Ocean Freight" desc="FCL, LCL, breakbulk and project cargo on Caribbean, Americas and global trade lanes." to="/logistics-services#ocean" dataTestId="home-service-ocean" /></Reveal>
            <Reveal delay={240}><ServiceCard icon={Plane} title="Air & Inland" desc="Time-critical air freight, FTL/LTL inland, drayage and cross-border solutions." to="/logistics-services#air" dataTestId="home-service-air" /></Reveal>
            <Reveal delay={300}><ServiceCard icon={ShieldCheck} title="Customs & Compliance" desc="Brokerage, ISF, cargo insurance and trade compliance support across US and Caribbean." to="/logistics-services#customs" dataTestId="home-service-customs" /></Reveal>
          </div>
        </div>
      </section>

      {/* Vessel highlights */}
      <section className="bg-white border-t border-[rgba(11,27,43,0.06)]" data-testid="home-vessel-carousel">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <SectionHeader eyebrow="Fleet Network" title="Vessels available for charter." sub="A curated network of multipurpose, RoRo, landing-craft, feeder and barge tonnage ready to deploy across the Americas." />
              <Link to="/vessel-chartering" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1B2B] hover:text-[#C8A24A] transition-colors" data-testid="home-vessels-view-all">View all vessels <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vessels.slice(0, 3).map((v, i) => (
              <Reveal key={v.id} delay={i * 80}><VesselCard vessel={v} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ports & Regions teaser */}
      <section className="bg-[#F6F3EC] border-t border-[rgba(11,27,43,0.06)]" data-testid="home-regions-teaser">
        <div className="bahari-container py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal><RegionsMap /></Reveal>
          <Reveal>
            <SectionHeader eyebrow="Where We Operate" title="Caribbean roots. Americas reach. Global network." sub="Direct presence across the Caribbean and the United States, complemented by a vetted international partner network in Europe, Asia and Latin America." />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {REGIONS.map((r) => (
                <div key={r.key} className="rounded-xl bg-white border border-[rgba(11,27,43,0.10)] p-5" data-testid={`home-region-${r.key}`}>
                  <div className="eyebrow text-[#C8A24A]">Region</div>
                  <div className="mt-1 font-display text-xl text-[#0B1B2B]">{r.name}</div>
                  <ul className="mt-3 space-y-1 text-xs text-[#2A3440]">
                    {r.ports.slice(0, 3).map((p) => <li key={p}>• {p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <Link to="/ports-regions" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1B2B] hover:text-[#C8A24A] transition-colors">Explore ports & regions <ArrowRight className="w-4 h-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Why Bahari */}
      <section className="bg-[#0B1B2B] text-[#F6F3EC]" data-testid="home-why-bahari">
        <div className="bahari-container py-20 lg:py-28">
          <Reveal>
            <SectionHeader light eyebrow="Why Bahari" title="Investor-grade governance. Operator-grade execution." sub="We combine the operational discipline of a global maritime carrier with the agility of a specialist regional partner. Our values aren't decorative — they shape every port call." />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {CORE_VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <div className="rounded-2xl bg-[#10263D] p-6 border border-white/10 hover:border-[rgba(200,162,74,0.5)] transition-colors h-full" data-testid={`value-${v.title.toLowerCase()}`}>
                  <div className="text-[#C8A24A] font-display text-2xl">{i + 1}.</div>
                  <h4 className="mt-2 font-display text-xl text-[#F6F3EC]">{v.title}</h4>
                  <p className="mt-2 text-sm text-[#F6F3EC]/75 leading-relaxed">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* KPI counters */}
      <section className="bg-[#F6F3EC]" data-testid="home-kpis">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="By the Numbers" title="A platform built for scale." /></Reveal>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-10">
            {KPI_HOME.map((k) => (<Reveal key={k.id}><KPICounter value={k.value} suffix={k.suffix} label={k.label} /></Reveal>))}
          </div>
        </div>
      </section>

      {/* News teaser */}
      <section className="bg-white border-t border-[rgba(11,27,43,0.06)]" data-testid="home-news-teaser">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <SectionHeader eyebrow="News & Insights" title="Briefings for owners, charterers and investors." />
              <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1B2B] hover:text-[#C8A24A] transition-colors" data-testid="home-news-view-all">All articles <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.slice(0, 3).map((n, i) => (
              <Reveal key={n.id} delay={i * 80}>
                <Link to={`/news/${n.slug}`} className="group block rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] overflow-hidden hover:shadow-[0_18px_50px_rgba(11,27,43,0.10)] transition-shadow" data-testid={`home-news-card-${n.id}`}>
                  <div className="relative aspect-[16/10] bg-[#0B1B2B] overflow-hidden">
                    <img src={n.image_url} alt={n.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="eyebrow text-[#C8A24A]">{n.category}</div>
                    <h4 className="mt-2 font-display text-xl text-[#0B1B2B] leading-snug line-clamp-2">{n.title}</h4>
                    <p className="mt-2 text-sm text-[#2A3440] line-clamp-2">{n.excerpt}</p>
                    <div className="mt-4 text-xs text-[#2A3440]/70">{n.published_at} • {n.read_minutes} min read</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip />

      {/* Home Quote CTA */}
      <section className="bg-[#F6F3EC]" data-testid="home-quote-cta">
        <div className="bahari-container py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <SectionHeader eyebrow="Get a Tailored Proposal" title="Request a quote in 60 seconds." sub="Share your route, cargo and timing. Our chartering desk responds with vessel/lane options within one business day." />
            <div className="mt-8 rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] p-6 text-sm text-[#2A3440] space-y-3">
              <div><strong className="text-[#0B1B2B]">Email</strong> — {SITE.contact.email}</div>
              <div><strong className="text-[#0B1B2B]">Phone</strong> — {SITE.contact.phones.join(' • ')}</div>
              <div><strong className="text-[#0B1B2B]">HQ</strong> — {SITE.contact.address}</div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={100}>
            <QuoteRequestForm />
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
