import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/ui-extras/Reveal';
import { getNews } from '@/lib/api';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '@/components/SEO';

export default function News() {
  const [news, setNews] = React.useState([]);
  const [filter, setFilter] = React.useState('All');
  React.useEffect(() => { getNews().then(setNews).catch(() => {}); }, []);
  const cats = ['All', ...Array.from(new Set(news.map((n) => n.category)))];
  const filtered = filter === 'All' ? news : news.filter((n) => n.category === filter);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <Layout>
      <SEO
        title="News & Insights — Maritime, Logistics & Market Briefings"
        description="Market analysis, operations playbooks and investor updates from Bahari Global Holdings. Caribbean trade, freight market trends, customs compliance and project cargo insights."
        path="/news"
        keywords="maritime news, freight market trends, Caribbean shipping news, port news, customs compliance updates"
      />
      <PageHero eyebrow="News & Insights" title="Briefings from the bridge." subtitle="Market analysis, operations playbooks and investor updates from across our trade corridors." imageUrl="https://images.unsplash.com/photo-1523564662140-a21551f4c588?auto=format&fit=crop&w=1600&q=80" breadcrumbs={[{ label: 'News & Insights' }]} />

      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-20 lg:py-24">
          <Reveal>
            <div className="flex flex-wrap gap-2" data-testid="news-filters">
              {cats.map((c) => (
                <button key={c} onClick={() => setFilter(c)} data-testid={`news-filter-${c.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className={`px-4 h-9 rounded-full text-xs tracking-[0.14em] uppercase font-semibold transition-colors border ${filter === c ? 'bg-[#0B1B2B] text-[#C8A24A] border-[rgba(200,162,74,0.6)]' : 'bg-white text-[#0B1B2B] border-[rgba(11,27,43,0.15)] hover:border-[#C8A24A]'}`}>{c}</button>
              ))}
            </div>
          </Reveal>
          {featured && (
            <Reveal>
              <Link to={`/news/${featured.slug}`} className="group mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] overflow-hidden hover:shadow-[0_18px_50px_rgba(11,27,43,0.10)] transition-shadow" data-testid="news-featured-card">
                <div className="relative lg:col-span-7 aspect-[16/9] lg:aspect-auto bg-[#0B1B2B]">
                  <img src={featured.image_url} alt={featured.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="lg:col-span-5 p-7 lg:p-10 flex flex-col justify-center">
                  <div className="eyebrow text-[#C8A24A]">{featured.category}</div>
                  <h2 className="mt-3 font-display text-3xl sm:text-4xl text-[#0B1B2B] leading-tight">{featured.title}</h2>
                  <p className="mt-4 text-sm text-[#2A3440] leading-relaxed">{featured.excerpt}</p>
                  <div className="mt-6 text-xs text-[#2A3440]/70">{featured.author} • {featured.published_at} • {featured.read_minutes} min read</div>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1B2B] group-hover:text-[#C8A24A] transition-colors">Read article <ArrowRight className="w-4 h-4" /></div>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((n, i) => (
              <Reveal key={n.id} delay={i * 50}>
                <Link to={`/news/${n.slug}`} className="group block rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] overflow-hidden hover:shadow-[0_18px_50px_rgba(11,27,43,0.10)] transition-shadow" data-testid={`news-card-${n.id}`}>
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

      <CTAStrip headline="Want briefings in your inbox quarterly?" ctaLabel="Subscribe" ctaTo="#footer" />
    </Layout>
  );
}
