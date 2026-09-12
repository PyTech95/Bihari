import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Reveal } from '@/components/ui-extras/Reveal';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';
import { ContactForm } from '@/components/forms/ContactForm';
import { SITE } from '@/lib/site';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SEO } from '@/components/SEO';

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="Contact — Request a Quote or Talk to Our Team"
        description="Get a tailored maritime or logistics quote in 60 seconds, or talk to our chartering and operations team. Office in Hollywood, FL. 24/7 operations desk."
        path="/contact"
        keywords="contact Bahari, request quote, maritime quote, freight quote, Hollywood FL maritime, shipping enquiry"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Bahari Global Holdings',
          url: 'https://best-designs-1.emergent.host/contact'
        }}
      />
      <PageHero eyebrow="Contact" title="Let's plan your next shipment." subtitle="Share your route, cargo and timing. Our chartering and logistics desk responds within one business day." imageUrl="https://images.pexels.com/photos/20216716/pexels-photo-20216716.jpeg?auto=compress&cs=tinysrgb&w=1600" breadcrumbs={[{ label: 'Contact' }]} />

      <section className="bg-[#F6F3EC]">
        <div className="bahari-container py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5 space-y-6">
            <SectionHeader eyebrow="Direct Lines" title="Talk to a human." sub="For urgent operations, call our 24/7 desk. Otherwise, the form on the right is the fastest path to a tailored proposal." />
            <div className="rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] p-6 space-y-4 text-sm text-[#2A3440]">
              <div className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-[#0B1B2B] flex items-center justify-center ring-1 ring-[rgba(200,162,74,0.45)]"><MapPin className="w-4 h-4 text-[#C8A24A]" /></div><div><div className="font-medium text-[#0B1B2B]">Headquarters</div><div>{SITE.contact.address}</div></div></div>
              <div className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-[#0B1B2B] flex items-center justify-center ring-1 ring-[rgba(200,162,74,0.45)]"><Mail className="w-4 h-4 text-[#C8A24A]" /></div><div><div className="font-medium text-[#0B1B2B]">Email</div><a className="hover:text-[#C8A24A]" href={`mailto:${SITE.contact.email}`} data-testid="contact-email-link">{SITE.contact.email}</a></div></div>
              <div className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-[#0B1B2B] flex items-center justify-center ring-1 ring-[rgba(200,162,74,0.45)]"><Phone className="w-4 h-4 text-[#C8A24A]" /></div><div><div className="font-medium text-[#0B1B2B]">Phone</div><div>{SITE.contact.phones.join(' • ')}</div></div></div>
            </div>

            {/* Office map embed */}
            <div className="rounded-2xl overflow-hidden border border-[rgba(11,27,43,0.10)] shadow-[0_10px_30px_rgba(11,27,43,0.06)] bg-white" data-testid="contact-map-embed">
              <iframe
                title="Bahari Global Holdings HQ"
                src="https://www.google.com/maps?q=2455+Hollywood+Blvd,+Hollywood,+FL+33020&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            <QuoteRequestForm />
            <div className="mt-10">
              <div className="eyebrow text-[#C8A24A]">Not a quote?</div>
              <h3 className="mt-1 font-display text-2xl text-[#0B1B2B]">Send us a general message</h3>
              <p className="mt-2 text-sm text-[#2A3440]">For press, partnerships or anything else, use the form below.</p>
              <div className="mt-6"><ContactForm /></div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
