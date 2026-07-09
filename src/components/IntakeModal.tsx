import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, MessageCircle, Check, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Service } from '../lib/services';

const EASE = [0.16, 1, 0.3, 1] as const;

const BUDGETS = [
  '< $1K',
  '$1K – $3K',
  '$3K – $7K',
  '$7K – $15K',
  '$15K+',
];

type Props = {
  open: boolean;
  service: Service | null;
  onClose: () => void;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function IntakeModal({ open, service, onClose }: Props) {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [problem, setProblem] = useState('');
  const [budget, setBudget] = useState<string>('');
  const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp'>('email');
  const [contactDetail, setContactDetail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (open) {
      setStatus('idle');
      setErrorMsg('');
    }
  }, [open, service]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const canSubmit =
    name.trim().length > 1 &&
    problem.trim().length > 4 &&
    contactDetail.trim().length > 2 &&
    status !== 'submitting';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus('submitting');
    setErrorMsg('');

    const payload = {
      name: name.trim(),
      business: business.trim() || null,
      problem: problem.trim(),
      budget_range: budget || null,
      contact_method: contactMethod,
      contact_detail: contactDetail.trim(),
      service: service?.id ?? null,
    };

    try {
      const { error } = await supabase.from('intake_requests').insert(payload);
      if (error) {
        console.warn('Supabase insert failed:', error);
      }

      // Fire-and-forget notification to the studio owner. Non-blocking so the
      // user sees the success state even if the notification is slow or fails.
      notifyOwner(payload).catch((err) =>
        console.warn('Owner notification failed:', err),
      );

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  async function notifyOwner(data: {
    name: string;
    business: string | null;
    problem: string;
    budget_range: string | null;
    contact_method: string;
    contact_detail: string;
    service: string | null;
  }) {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/intake-notify`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`notify failed (${res.status}): ${text}`);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={onClose}
        >
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <X size={18} strokeWidth={2} />
            </button>

            {status === 'success' ? (
              <div className="confirm">
                <motion.div
                  className="confirm-icon"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Check size={28} strokeWidth={2.4} />
                </motion.div>
                <h3 className="confirm-title">Request received.</h3>
                <p className="confirm-text">
                  You will be contacted within 24–48 hours. We review every intake manually and
                  accept a limited number of projects each week.
                </p>
                <div className="confirm-meta">
                  <div className="confirm-meta-row">
                    <span className="confirm-meta-key">System</span>
                    <span className="confirm-meta-val">{service?.title ?? 'General'}</span>
                  </div>
                  <div className="confirm-meta-row">
                    <span className="confirm-meta-key">Name</span>
                    <span className="confirm-meta-val">{name}</span>
                  </div>
                  <div className="confirm-meta-row">
                    <span className="confirm-meta-key">Reply via</span>
                    <span className="confirm-meta-val" style={{ textTransform: 'capitalize' }}>
                      {contactMethod}
                    </span>
                  </div>
                  <div className="confirm-meta-row">
                    <span className="confirm-meta-key">{contactMethod === 'email' ? 'Email' : 'WhatsApp'}</span>
                    <span className="confirm-meta-val">{contactDetail}</span>
                  </div>
                </div>
                <button className="submit-btn" onClick={onClose} style={{ marginTop: 8 }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="modal-head">
                  <span className="modal-eyebrow">
                    {service ? `Intake · ${service.index}` : 'Intake'}
                  </span>
                  <h3 className="modal-title">
                    {service ? service.title : 'Begin intake'}
                  </h3>
                  <p className="modal-sub">
                    Share the basics. We will reply with a qualification note and next steps.
                  </p>
                </div>

                <form className="modal-body" onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="field-label" htmlFor="i-name">
                      Name
                    </label>
                    <input
                      id="i-name"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="i-business">
                      <span>Idea / Business</span>
                      <span className="field-optional">Optional</span>
                    </label>
                    <input
                      id="i-business"
                      className="input"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder="What are you building?"
                      autoComplete="organization"
                    />
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="i-problem">
                      Problem
                    </label>
                    <textarea
                      id="i-problem"
                      className="textarea"
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      placeholder="What system are you trying to build, scale, or fix?"
                      required
                      minLength={5}
                    />
                  </div>

                  <div className="field">
                    <label className="field-label">Budget range</label>
                    <div className="budget-chips">
                      {BUDGETS.map((b) => (
                        <button
                          type="button"
                          key={b}
                          className={budget === b ? 'budget-chip is-active' : 'budget-chip'}
                          onClick={() => setBudget(b)}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label className="field-label">Contact method</label>
                    <div className="contact-method-toggle">
                      <button
                        type="button"
                        className={
                          contactMethod === 'email'
                            ? 'contact-method-btn is-active'
                            : 'contact-method-btn'
                        }
                        onClick={() => setContactMethod('email')}
                      >
                        <Mail size={15} strokeWidth={2} />
                        Email
                      </button>
                      <button
                        type="button"
                        className={
                          contactMethod === 'whatsapp'
                            ? 'contact-method-btn is-active'
                            : 'contact-method-btn'
                        }
                        onClick={() => setContactMethod('whatsapp')}
                      >
                        <MessageCircle size={15} strokeWidth={2} />
                        WhatsApp
                      </button>
                    </div>
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="i-contact">
                      {contactMethod === 'email' ? 'Email address' : 'WhatsApp number'}
                    </label>
                    <input
                      id="i-contact"
                      className="input"
                      value={contactDetail}
                      onChange={(e) => setContactDetail(e.target.value)}
                      placeholder={
                        contactMethod === 'email'
                          ? 'you@example.com'
                          : '+91 80885 38418'
                      }
                      type={contactMethod === 'email' ? 'email' : 'tel'}
                      autoComplete={contactMethod === 'email' ? 'email' : 'tel'}
                      required
                    />
                  </div>

                  {status === 'error' && (
                    <p style={{ color: 'var(--ink)', fontSize: 13, marginTop: 4 }}>
                      {errorMsg}
                    </p>
                  )}
                </form>

                <div className="modal-foot">
                  <p className="modal-foot-note">
                    Selective intake. Limited projects weekly. Your information is reviewed
                    manually and never shared.
                  </p>
                  <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} strokeWidth={2.2} style={{ animation: 'spin 1s linear infinite' }} />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit intake
                        <ArrowRight size={16} strokeWidth={2.2} />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
