import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SITE } from '@/lib/site';
import { subscribeNewsletter } from '@/lib/api';
import { toast } from 'sonner';

export const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await subscribeNewsletter(email);
      toast.success('Subscribed', { description: 'Thank you for joining our briefing list.' });
      setEmail('');
    } catch (err) {
      toast.error('Subscription failed', { description: 'Please check the email and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-[#0B1B2B] text-[#F6F3EC] mt-0 overflow-hidden" data-testid="site-footer">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-20 w-[34rem] h-[34rem] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(200,162,74,0.20), rgba(200,162,74,0) 70%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
      />
      <div className="gold-hairline" />
      <div className="bahari-container py-14 sm:py-16 lg:py-20 pb-24 sm:pb-20 lg:pb-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/assets/logo-shield.jpg"
                alt="Bahari logo"
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-md object-cover ring-1 ring-[rgba(200,162,74,0.5)]"
              />
              <div className="leading-tight">
                <div className="font-display text-xl sm:text-2xl">BAHARI</div>
                <div className="text-[10px] tracking-[0.22em] text-[#C8A24A] uppercase">Global Holdings</div>
              </div>
            </Link>
            <p className="mt-5 text-sm text-[#F6F3EC]/70 leading-relaxed max-w-md">
              An international maritime and logistics group connecting ports, people and commerce across the Caribbean, United States and global markets.
            </p>
            <div className="mt-6 space-y-2 text-sm text-[#F6F3EC]/80">
              <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#C8A24A] mt-0.5 flex-shrink-0" /><span>{SITE.contact.address}</span></div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#C8A24A] flex-shrink-0" /><a href={`mailto:${SITE.contact.email}`} className="hover:text-[#C8A24A] transition-colors" data-testid="footer-email-link">{SITE.contact.email}</a></div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#C8A24A] flex-shrink-0" /><span>{SITE.contact.phones.join(' • ')}</span></div>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="eyebrow text-[#C8A24A] mb-3">Company</div>
              <ul className="space-y-2 text-[#F6F3EC]/80">
                <li><FooterLink to="/about">About Us</FooterLink></li>
                <li><FooterLink to="/investors">Investors & Partnerships</FooterLink></li>
                <li><FooterLink to="/projects">Projects & Case Studies</FooterLink></li>
                <li><FooterLink to="/news">News & Insights</FooterLink></li>
                <li><FooterLink to="/contact">Contact Us</FooterLink></li>
              </ul>
            </div>
            <div>
              <div className="eyebrow text-[#C8A24A] mb-3">Maritime</div>
              <ul className="space-y-2 text-[#F6F3EC]/80">
                <li><FooterLink to="/maritime-services">Maritime Services</FooterLink></li>
                <li><FooterLink to="/vessel-chartering">Vessel Chartering</FooterLink></li>
                <li><FooterLink to="/vessel-brokerage">Vessel Brokerage</FooterLink></li>
                <li><FooterLink to="/port-agency-husbandry">Port Agency & Husbandry</FooterLink></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="eyebrow text-[#C8A24A] mb-3">Logistics</div>
              <ul className="space-y-2 text-[#F6F3EC]/80">
                <li><FooterLink to="/logistics-services">Logistics Services</FooterLink></li>
                <li><FooterLink to="/logistics-services#ocean">Ocean Freight</FooterLink></li>
                <li><FooterLink to="/logistics-services#air">Air Freight</FooterLink></li>
                <li><FooterLink to="/logistics-services#inland">Inland Transportation</FooterLink></li>
                <li><FooterLink to="/logistics-services#customs">Customs & Compliance</FooterLink></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <div className="eyebrow text-[#C8A24A] mb-3">Briefing Subscription</div>
            <p className="text-sm text-[#F6F3EC]/70 mb-4">Receive quarterly maritime & logistics insights tailored for owners, charterers and investors.</p>
            <form onSubmit={onSubscribe} className="flex items-stretch gap-2" data-testid="newsletter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                data-testid="newsletter-email-input"
                className="flex-1 min-w-0 h-11 rounded-md bg-white/5 border border-white/15 px-3 text-sm text-[#F6F3EC] placeholder:text-[#F6F3EC]/40 focus:outline-none focus:border-[#C8A24A] focus:ring-2 focus:ring-[rgba(200,162,74,0.35)] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="newsletter-submit-button"
                className="inline-flex items-center justify-center w-11 h-11 rounded-md bg-[#C8A24A] text-[#0B1B2B] hover:bg-[#B8923E] transition-colors disabled:opacity-60 flex-shrink-0"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#F6F3EC]/60">
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="flex items-center gap-4 sm:mr-44 lg:mr-48">
            {SITE.social.map((s) => (
              <a key={s.name} href={s.href} className="hover:text-[#C8A24A] transition-colors inline-flex items-center gap-1">
                {s.name} <ArrowUpRight className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <Link to={to} className="relative inline-block hover:text-[#C8A24A] transition-colors group">
    <span>{children}</span>
    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C8A24A] transition-all duration-300 group-hover:w-full" />
  </Link>
);
