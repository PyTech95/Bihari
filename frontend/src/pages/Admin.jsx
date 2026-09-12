import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { getAdminSubmissions } from '@/lib/api';
import { RefreshCw, Mail, Building2, Send, Inbox } from 'lucide-react';
import { SEO } from '@/components/SEO';

export default function Admin() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState('quotes');

  const load = React.useCallback(async () => {
    setLoading(true);
    try { setData(await getAdminSubmissions()); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  return (
    <Layout>
      <SEO title="Admin" description="Bahari internal submissions" path="/admin" noindex />
      <PageHero eyebrow="Internal" title="Submissions overview" subtitle="View all quote requests, contact messages and newsletter subscribers captured by the website." imageUrl="https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=1600" breadcrumbs={[{ label: 'Admin' }]} />

      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-16 lg:py-20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex gap-2" data-testid="admin-tabs">
              {[
                { key: 'quotes', label: 'Quote Requests', icon: Inbox, count: data?.counts?.quote_requests || 0 },
                { key: 'contact', label: 'Contact Messages', icon: Mail, count: data?.counts?.contact_messages || 0 },
                { key: 'newsletter', label: 'Newsletter', icon: Send, count: data?.counts?.newsletter_subscribers || 0 },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button key={t.key} onClick={() => setTab(t.key)} data-testid={`admin-tab-${t.key}`} className={`inline-flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-medium transition-colors border ${tab === t.key ? 'bg-[#0B1B2B] text-[#C8A24A] border-[rgba(200,162,74,0.55)]' : 'bg-white text-[#0B1B2B] border-[rgba(11,27,43,0.15)] hover:border-[#C8A24A]'}`}>
                    <Icon className="w-4 h-4" /> {t.label} <span className="ml-1 inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-[11px] bg-[rgba(200,162,74,0.18)] text-[#0B1B2B]">{t.count}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={load} disabled={loading} data-testid="admin-refresh" className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-medium bg-white text-[#0B1B2B] border border-[rgba(11,27,43,0.15)] hover:border-[#C8A24A] transition-colors disabled:opacity-60">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>

          <div className="mt-8 rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] overflow-hidden">
            {tab === 'quotes' && (
              <QuotesTable rows={data?.quote_requests || []} />
            )}
            {tab === 'contact' && (
              <ContactTable rows={data?.contact_messages || []} />
            )}
            {tab === 'newsletter' && (
              <NewsletterTable rows={data?.newsletter_subscribers || []} />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function QuotesTable({ rows }) {
  if (!rows.length) return <Empty label="No quote requests yet." />;
  return (
    <div className="overflow-x-auto" data-testid="admin-quotes-table">
      <table className="w-full text-sm">
        <thead className="bg-[#F6F3EC] text-[#0B1B2B]">
          <tr>
            <Th>Submitted</Th><Th>Company</Th><Th>Contact</Th><Th>Service</Th><Th>Cargo</Th><Th>Route</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-[rgba(11,27,43,0.06)] align-top">
              <Td>{(r.created_at || '').slice(0, 16).replace('T', ' ')}</Td>
              <Td><div className="flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-[#C8A24A]" /><span>{r.company_name}</span></div></Td>
              <Td><div className="text-[#0B1B2B]">{r.contact_person}</div><div className="text-xs text-[#2A3440]/70">{r.email} • {r.phone}</div></Td>
              <Td>{r.service_needed}</Td>
              <Td>{r.cargo_type}</Td>
              <Td>{r.origin} → {r.destination}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function ContactTable({ rows }) {
  if (!rows.length) return <Empty label="No contact messages yet." />;
  return (
    <div className="overflow-x-auto" data-testid="admin-contact-table">
      <table className="w-full text-sm">
        <thead className="bg-[#F6F3EC] text-[#0B1B2B]">
          <tr>
            <Th>Submitted</Th><Th>Name</Th><Th>Email</Th><Th>Subject</Th><Th>Message</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-[rgba(11,27,43,0.06)] align-top">
              <Td>{(r.created_at || '').slice(0, 16).replace('T', ' ')}</Td>
              <Td>{r.name}<div className="text-xs text-[#2A3440]/70">{r.company || '—'}</div></Td>
              <Td>{r.email}<div className="text-xs text-[#2A3440]/70">{r.phone || '—'}</div></Td>
              <Td>{r.subject}</Td>
              <Td className="max-w-md"><div className="line-clamp-3">{r.message}</div></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function NewsletterTable({ rows }) {
  if (!rows.length) return <Empty label="No newsletter subscribers yet." />;
  return (
    <div className="overflow-x-auto" data-testid="admin-newsletter-table">
      <table className="w-full text-sm">
        <thead className="bg-[#F6F3EC] text-[#0B1B2B]">
          <tr><Th>Subscribed</Th><Th>Email</Th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-[rgba(11,27,43,0.06)]"><Td>{(r.created_at || '').slice(0, 16).replace('T', ' ')}</Td><Td>{r.email}</Td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const Th = ({ children }) => <th className="text-left px-5 py-3 font-medium text-xs tracking-[0.14em] uppercase">{children}</th>;
const Td = ({ children, className = '' }) => <td className={`px-5 py-3 text-[#2A3440] ${className}`}>{children}</td>;
const Empty = ({ label }) => (<div className="p-10 text-center text-[#2A3440]">{label}</div>);
