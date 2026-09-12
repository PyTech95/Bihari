import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { getNewsBySlug, getNews } from '@/lib/api';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SEO } from '@/components/SEO';

export default function NewsArticle() {
  const { slug } = useParams();
  const [article, setArticle] = React.useState(null);
  const [related, setRelated] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    getNewsBySlug(slug)
      .then((a) => { setArticle(a); return getNews(); })
      .then((all) => setRelated((all || []).filter((n) => n.slug !== slug).slice(0, 3)))
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center text-[#2A3440]">Loading article…</div>
      </Layout>
    );
  }
  if (!article) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center text-[#2A3440]">
          <div>
            <div>Article not found.</div>
            <Link to="/news" className="text-[#C8A24A]">Back to News</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={article.title}
        description={article.excerpt}
        path={`/news/${article.slug}`}
        image={article.image_url}
        type="article"
        keywords={`${article.category}, maritime news, ${article.title}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: article.title,
          description: article.excerpt,
          image: [article.image_url],
          datePublished: article.published_at,
          dateModified: article.published_at,
          author: { '@type': 'Person', name: article.author },
          publisher: {
            '@type': 'Organization',
            name: 'Bahari Global Holdings',
            logo: { '@type': 'ImageObject', url: 'https://best-designs-1.emergent.host/assets/logo-shield.jpg' }
          },
          articleSection: article.category,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `https://best-designs-1.emergent.host/news/${article.slug}` }
        }}
      />
      <PageHero eyebrow={article.category} title={article.title} subtitle={`${article.author} • ${article.published_at} • ${article.read_minutes} min read`} imageUrl={article.image_url} breadcrumbs={[{ label: 'News & Insights', to: '/news' }, { label: article.title }]} />
      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8" data-testid="news-article-body">
            <div className="prose prose-slate max-w-none text-[#2A3440]" dangerouslySetInnerHTML={{ __html: article.body_html }} />
            <div className="mt-10 pt-6 border-t border-[rgba(11,27,43,0.1)] flex items-center justify-between">
              <Link to="/news" className="inline-flex items-center gap-2 text-sm text-[#0B1B2B] hover:text-[#C8A24A]"><ArrowLeft className="w-4 h-4" /> All articles</Link>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm text-[#0B1B2B] hover:text-[#C8A24A]">Talk to us <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </article>
          <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit space-y-4">
            <div className="eyebrow text-[#C8A24A]">Related</div>
            {related.map((n) => (
              <Link key={n.id} to={`/news/${n.slug}`} className="block group rounded-xl bg-white border border-[rgba(11,27,43,0.10)] p-4 hover:border-[#C8A24A] transition-colors">
                <div className="text-[10px] tracking-[0.14em] uppercase text-[#C8A24A]">{n.category}</div>
                <div className="mt-1 font-display text-lg text-[#0B1B2B] leading-snug line-clamp-2 group-hover:text-[#0B1B2B]">{n.title}</div>
                <div className="mt-1 text-xs text-[#2A3440]/70">{n.published_at} • {n.read_minutes} min</div>
              </Link>
            ))}
          </aside>
        </div>
      </section>
      <CTAStrip />
    </Layout>
  );
}
