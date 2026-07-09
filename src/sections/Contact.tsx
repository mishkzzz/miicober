import { motion } from 'motion/react';
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const EMAIL = 'bymishka.x@gmail.com';
const WHATSAPP = '+91 80885 38418';

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          className="contact-wrap"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="section-head" style={{ color: 'var(--white)' }}>
            <div className="section-head-row">
              <span className="section-index" style={{ color: 'rgba(255,255,255,0.5)' }}>
                06 / Contact
              </span>
              <span
                className="section-line"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              />
            </div>
            <h2 className="h2" style={{ color: 'var(--white)' }}>
              Direct <span className="display" style={{ fontStyle: 'italic' }}>lines</span>
            </h2>
            <p
              className="lead"
              style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '52ch' }}
            >
              Send: <strong style={{ color: 'var(--white)', fontWeight: 500 }}>Name / Problem / Budget</strong>{' '}
              for a faster response. We reply within 24–48 hours.
            </p>
          </div>

          <div className="contact-grid">
            <a
              className="contact-channel"
              href={`mailto:${EMAIL}?subject=MiiCober%20Intake&body=Name%3A%0AProblem%3A%0ABudget%3A`}
            >
              <span className="contact-channel-label">Email</span>
              <span className="contact-channel-value">
                <Mail size={22} strokeWidth={1.6} />
                {EMAIL}
                <ArrowUpRight size={20} strokeWidth={2} />
              </span>
            </a>

            <a
              className="contact-channel"
              href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-channel-label">WhatsApp</span>
              <span className="contact-channel-value">
                <MessageCircle size={22} strokeWidth={1.6} />
                {WHATSAPP}
                <ArrowUpRight size={20} strokeWidth={2} />
              </span>
            </a>
          </div>

          <p
            className="contact-instruction"
            style={{ marginTop: 32, maxWidth: '60ch' }}
          >
            For fastest qualification, include your name, the problem you are solving, and your
            budget range in the first message.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
