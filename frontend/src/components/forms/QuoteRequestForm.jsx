import React from 'react';
import { submitQuote } from '@/lib/api';
import { toast } from 'sonner';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const SERVICE_OPTIONS = [
  'Vessel Chartering',
  'Vessel Brokerage',
  'Port Agency & Husbandry',
  'Ocean Freight',
  'Air Freight',
  'Inland Transportation',
  'Customs & Compliance',
  'Project Cargo',
  'Other',
];

const CARGO_OPTIONS = [
  'Containerized (FCL/LCL)',
  'Project Cargo / Breakbulk',
  'RoRo / Rolling Stock',
  'Bulk',
  'Reefer / Perishables',
  'Heavy Lift',
  'General Cargo',
  'Other',
];

const initial = {
  company_name: '',
  contact_person: '',
  email: '',
  phone: '',
  cargo_type: CARGO_OPTIONS[0],
  origin: '',
  destination: '',
  service_needed: SERVICE_OPTIONS[0],
  notes: '',
};

export const QuoteRequestForm = () => {
  const [data, setData] = React.useState(initial);
  const [step, setStep] = React.useState(1);
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const reduce = useReducedMotion();

  const setField = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const isStep1Valid = data.company_name && data.contact_person && data.email && data.phone;
  const isStep2Valid = data.cargo_type && data.origin && data.destination && data.service_needed;

  const next = () => {
    if (step === 1 && !isStep1Valid) { toast.error('Please complete all required fields.'); return; }
    if (step === 2 && !isStep2Valid) { toast.error('Please complete all shipment fields.'); return; }
    setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isStep1Valid || !isStep2Valid) { toast.error('Please complete required fields.'); return; }
    setSubmitting(true);
    try {
      await submitQuote(data);
      setDone(true);
      toast.success('Quote request received', { description: 'A Bahari representative will respond within one business day.' });
    } catch (err) {
      console.error(err);
      toast.error('Submission failed', { description: 'Please verify the details and try again.' });
    } finally { setSubmitting(false); }
  };

  if (done) {
    return (
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] shadow-[0_10px_30px_rgba(11,27,43,0.06)] p-7 sm:p-9 text-center"
        data-testid="quote-request-success"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 12 }}
          className="w-14 h-14 mx-auto rounded-full bg-[#0B1B2B] ring-1 ring-[rgba(200,162,74,0.5)] flex items-center justify-center"
        >
          <Check className="w-7 h-7 text-[#C8A24A]" />
        </motion.div>
        <h3 className="mt-5 font-display text-2xl text-[#0B1B2B]">Quote request received</h3>
        <p className="mt-3 text-sm text-[#2A3440] max-w-md mx-auto">Thank you, {data.contact_person.split(' ')[0]}. Our chartering desk will respond within one business day with a tailored proposal.</p>
        <button
          onClick={() => { setDone(false); setData(initial); setStep(1); }}
          className="mt-6 inline-flex items-center gap-2 text-sm text-[#0B1B2B] hover:text-[#C8A24A] transition-colors"
          data-testid="quote-request-reset-button"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white border border-[rgba(11,27,43,0.10)] shadow-[0_10px_30px_rgba(11,27,43,0.06)] overflow-hidden"
      data-testid="quote-request-form"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 border-b border-[rgba(11,27,43,0.08)]">
        <div>
          <div className="eyebrow text-[#C8A24A]">Quote Request — Step {step} of 3</div>
          <h3 className="font-display text-xl sm:text-2xl text-[#0B1B2B] mt-1">
            {step === 1 ? 'Tell us about your company' : step === 2 ? 'Shipment details' : 'Review & submit'}
          </h3>
        </div>
        <div className="flex items-center gap-2" aria-label="progress">
          {[1, 2, 3].map((n) => (
            <motion.div
              key={n}
              animate={{ width: step >= n ? 40 : 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`h-1.5 rounded-full transition-colors ${step >= n ? 'bg-[#C8A24A]' : 'bg-[rgba(11,27,43,0.15)]'}`}
            />
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduce ? { opacity: 1 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Company Name" required>
                  <input data-testid="quote-company-input" required value={data.company_name} onChange={setField('company_name')} className={inputClass} placeholder="Atlas Shipping LLC" />
                </Field>
                <Field label="Contact Person" required>
                  <input data-testid="quote-contact-person-input" required value={data.contact_person} onChange={setField('contact_person')} className={inputClass} placeholder="John Smith" />
                </Field>
                <Field label="Email" required>
                  <input data-testid="quote-email-input" required type="email" value={data.email} onChange={setField('email')} className={inputClass} placeholder="you@company.com" />
                </Field>
                <Field label="Phone" required>
                  <input data-testid="quote-phone-input" required value={data.phone} onChange={setField('phone')} className={inputClass} placeholder="+1 (___) ___-____" />
                </Field>
              </div>
            )}
            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Service Needed" required>
                  <select data-testid="quote-service-select" value={data.service_needed} onChange={setField('service_needed')} className={inputClass}>
                    {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Cargo Type" required>
                  <select data-testid="quote-cargo-select" value={data.cargo_type} onChange={setField('cargo_type')} className={inputClass}>
                    {CARGO_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Origin" required>
                  <input data-testid="quote-origin-input" required value={data.origin} onChange={setField('origin')} className={inputClass} placeholder="Port / City / Country" />
                </Field>
                <Field label="Destination" required>
                  <input data-testid="quote-destination-input" required value={data.destination} onChange={setField('destination')} className={inputClass} placeholder="Port / City / Country" />
                </Field>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <Field label="Additional Notes">
                  <textarea data-testid="quote-notes-textarea" value={data.notes} onChange={setField('notes')} rows={5} className={`${inputClass} resize-none`} placeholder="Volumes, schedule, special handling, INCOTERMS, references..." />
                </Field>
                <Summary data={data} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 p-5 sm:p-6 border-t border-[rgba(11,27,43,0.08)] bg-[#F6F3EC]/60">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="inline-flex items-center justify-center sm:justify-start gap-2 text-sm text-[#0B1B2B] disabled:opacity-30 hover:text-[#C8A24A] transition-colors h-11 sm:h-auto"
          data-testid="quote-back-button"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="group inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-[#0B1B2B] text-[#F6F3EC] text-sm font-semibold uppercase tracking-wide hover:bg-[#10263D] transition-colors"
            data-testid="quote-next-button"
          >
            Continue <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-[#C8A24A] text-[#0B1B2B] text-sm font-semibold uppercase tracking-wide hover:bg-[#B8923E] transition-colors disabled:opacity-60"
            data-testid="quote-submit-button"
          >
            {submitting ? 'Submitting…' : 'Submit Request'} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>
    </form>
  );
};

const inputClass = 'w-full h-11 rounded-md bg-white border border-[rgba(11,27,43,0.14)] px-3 text-sm text-[#0B1B2B] placeholder:text-[#0B1B2B]/40 focus:outline-none focus:border-[#C8A24A] focus:ring-2 focus:ring-[rgba(200,162,74,0.35)] transition-colors';

const Field = ({ label, required, children }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-[11px] tracking-[0.16em] uppercase text-[#2A3440]">
      {label}{required && <span className="text-[#C8A24A]"> *</span>}
    </span>
    {children}
  </label>
);

const Summary = ({ data }) => (
  <div className="rounded-xl bg-[#F6F3EC] border border-[rgba(11,27,43,0.08)] p-4 text-xs text-[#2A3440] space-y-1" data-testid="quote-summary">
    <div><strong className="text-[#0B1B2B]">Company:</strong> {data.company_name}</div>
    <div><strong className="text-[#0B1B2B]">Contact:</strong> {data.contact_person} • {data.email} • {data.phone}</div>
    <div><strong className="text-[#0B1B2B]">Service:</strong> {data.service_needed}</div>
    <div><strong className="text-[#0B1B2B]">Cargo:</strong> {data.cargo_type}</div>
    <div><strong className="text-[#0B1B2B]">Route:</strong> {data.origin} → {data.destination}</div>
  </div>
);
