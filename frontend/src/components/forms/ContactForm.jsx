import React from 'react';
import { submitContact } from '@/lib/api';
import { toast } from 'sonner';
import { Send, Check } from 'lucide-react';

const initial = { name: '', email: '', phone: '', company: '', subject: 'General Inquiry', message: '' };

export const ContactForm = () => {
  const [data, setData] = React.useState(initial);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const onChange = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(data);
      setDone(true);
      toast.success('Message sent', { description: 'We will get back to you shortly.' });
    } catch (err) {
      toast.error('Failed to send', { description: 'Please try again or email us directly.' });
    } finally { setLoading(false); }
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] shadow-[0_10px_30px_rgba(11,27,43,0.06)] p-8 text-center" data-testid="contact-success">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#0B1B2B] ring-1 ring-[rgba(200,162,74,0.5)] flex items-center justify-center">
          <Check className="w-7 h-7 text-[#C8A24A]" />
        </div>
        <h3 className="mt-5 font-display text-2xl text-[#0B1B2B]">Message received</h3>
        <p className="mt-3 text-sm text-[#2A3440] max-w-md mx-auto">Thank you for reaching out. A Bahari representative will be in touch shortly.</p>
        <button onClick={() => { setDone(false); setData(initial); }} className="mt-6 inline-flex items-center gap-2 text-sm text-[#0B1B2B] hover:text-[#C8A24A] transition-colors">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] shadow-[0_10px_30px_rgba(11,27,43,0.06)] p-6 sm:p-7 space-y-4" data-testid="contact-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name" required><input required value={data.name} onChange={onChange('name')} className={inputClass} data-testid="contact-name-input" /></Field>
        <Field label="Email" required><input type="email" required value={data.email} onChange={onChange('email')} className={inputClass} data-testid="contact-email-input" /></Field>
        <Field label="Phone"><input value={data.phone} onChange={onChange('phone')} className={inputClass} data-testid="contact-phone-input" /></Field>
        <Field label="Company"><input value={data.company} onChange={onChange('company')} className={inputClass} data-testid="contact-company-input" /></Field>
      </div>
      <Field label="Subject" required>
        <select value={data.subject} onChange={onChange('subject')} className={inputClass} data-testid="contact-subject-select">
          <option>General Inquiry</option>
          <option>Quote Request</option>
          <option>Vessel Chartering</option>
          <option>Port Agency / Husbandry</option>
          <option>Investor / Partnership</option>
          <option>Press / Media</option>
        </select>
      </Field>
      <Field label="Message" required>
        <textarea required rows={5} value={data.message} onChange={onChange('message')} className={`${inputClass} resize-none`} data-testid="contact-message-textarea" placeholder="How can we help?" />
      </Field>
      <button type="submit" disabled={loading} data-testid="contact-submit-button" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#0B1B2B] text-[#F6F3EC] text-sm font-semibold uppercase tracking-wide hover:bg-[#10263D] transition-colors disabled:opacity-60">
        {loading ? 'Sending…' : 'Send Message'} <Send className="w-4 h-4" />
      </button>
    </form>
  );
};

const inputClass = 'w-full h-11 rounded-md bg-white border border-[rgba(11,27,43,0.14)] px-3 text-sm text-[#0B1B2B] placeholder:text-[#0B1B2B]/40 focus:outline-none focus:border-[#C8A24A] focus:ring-2 focus:ring-[rgba(200,162,74,0.35)] transition-colors';

const Field = ({ label, required, children }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-[11px] tracking-[0.16em] uppercase text-[#2A3440]">{label}{required && <span className="text-[#C8A24A]"> *</span>}</span>
    {children}
  </label>
);
