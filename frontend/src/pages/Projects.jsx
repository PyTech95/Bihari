import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/ui-extras/Reveal';
import { getCaseStudies } from '@/lib/api';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '@/components/SEO';

export default function Projects() {
  const [cases, setCases] = React.useState([]);
  const [filter, setFilter] = React.useState('All');
  React.useEffect(() => { getCaseStudies().then(setCases).catch(() => {}); }, []);

  const sectors = ['All', ...Array.from(new Set(cases.map((c) => c.sector)))];
  const filtered = filter === 'All' ? cases : cases.filter((c) => c.sector === filter);

  return (
    <Layout>
      <SEO
        title="Projects & Case Studies — Outcomes, Not Promises"
        description="Selected case studies from disaster relief, renewables, perishables and project cargo across the Caribbean and Americas. Outcomes documented and metric-backed."
        path="/projects"
        keywords="case studies, project cargo, disaster relief logistics, renewables shipping, reefer logistics, Caribbean trade case studies"
      />
      <PageHero eyebrow="Projects & Case Studies" title="Outcomes, not promises." subtitle="Anonymized highlights from disaster relief, renewables, perishables and project cargo across the Americas." imageUrl="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1600&q=80" breadcrumbs={[{ label: 'Projects & Case Studies' }]} />

      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal><SectionHeader eyebrow="Case Studies" title="Selected engagements." sub="Filter by sector to see how we deliver under pressure." /></Reveal>
          <div className="mt-8 flex flex-wrap gap-2" data-testid="case-filters">
            {sectors.map((s) => (
              <button key={s} onClick={() => setFilter(s)} data-testid={`case-filter-${s.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className={`px-4 h-9 rounded-full text-xs tracking-[0.14em] uppercase font-semibold transition-colors border ${filter === s ? 'bg-[#0B1B2B] text-[#C8A24A] border-[rgba(200,162,74,0.6)]' : 'bg-white text-[#0B1B2B] border-[rgba(11,27,43,0.15)] hover:border-[#C8A24A]'}`}>{s}</button>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((c, i) => (
              <Reveal key={c.id} delay={i * 60}>
                <article className="rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] overflow-hidden hover:shadow-[0_18px_50px_rgba(11,27,43,0.10)] transition-shadow" data-testid={`case-card-${c.id}`}>
                  <div className="relative aspect-[16/9] bg-[#0B1B2B] overflow-hidden">
                    <img src={c.image_url} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(11,27,43,0.85) 100%)' }} />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[rgba(11,27,43,0.78)] text-[10px] tracking-[0.16em] uppercase text-[#F6F3EC] border border-white/10">{c.sector}</div>
                    <div className="absolute bottom-3 left-4 right-4"><h3 className="font-display text-2xl text-white drop-shadow-md">{c.title}</h3></div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-[#2A3440] leading-relaxed">{c.summary}</p>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {c.metrics.map((m) => (
                        <div key={m.label} className="rounded-xl bg-[#F6F3EC] p-3 text-center">
                          <div className="font-display text-xl text-[#0B1B2B]">{m.value}</div>
                          <div className="text-[10px] tracking-[0.14em] uppercase text-[#2A3440]/70">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <details className="mt-5 group">
                      <summary className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-[#0B1B2B] hover:text-[#C8A24A]">Read full case study <ArrowRight className="w-4 h-4" /></summary>
                      <div className="mt-4 space-y-3 text-sm text-[#2A3440]">
                        <div><strong className="text-[#0B1B2B]">Challenge:</strong> {c.problem}</div>
                        <div><strong className="text-[#0B1B2B]">Approach:</strong> {c.approach}</div>
                        <div><strong className="text-[#0B1B2B]">Outcome:</strong> {c.outcome}</div>
                      </div>
                    </details>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip headline="Have a complex shipment? We've probably solved one like it." />
    </Layout>
  );
}
