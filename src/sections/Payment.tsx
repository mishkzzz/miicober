import { motion } from 'motion/react';
import { Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import qrImage from './qr-code/IMG_3489.jpeg';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Payment() {
  return (
    <section className="section" id="activate">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="section-head-row">
            <span className="section-index">04 / Activate</span>
            <span className="section-line" />
          </div>
          <h2 className="h2">
            Activate <span className="display" style={{ fontStyle: 'italic' }}>System</span>
          </h2>
          <p className="lead">
            UPI only. No cards, no external checkout. Scan, pay, and send the screenshot — we
            handle the rest manually to keep intake selective.
          </p>
        </motion.div>

        <motion.div
          className="pay-grid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <div className="pay-card">
            <div className="pay-qr" aria-label="UPI QR code">
              <img
                src={qrImage}
                alt="UPI QR code for MiiCober"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: 12,
                  display: 'block',
                }}
              />
            </div>
            <div>
              <span className="mono-label">Scan to pay via UPI</span>
              <p className="body" style={{ marginTop: 8, maxWidth: '42ch' }}>
                Open any UPI app, scan the code, and complete the payment. After payment, send
                the screenshot via email or WhatsApp to confirm your slot.
              </p>
            </div>
          </div>

          <div className="pay-info">
            <div className="pay-info-row">
              <span className="pay-info-label">After payment</span>
              <span className="pay-info-value">Send screenshot</span>
              <span className="pay-info-hint">
                Email a screenshot to{' '}
                <a
                  href="mailto:bymishka.x@gmail.com"
                  style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  bymishka.x@gmail.com
                </a>{' '}
                or WhatsApp. Include your name and the system you selected.
              </span>
            </div>

            <div className="pay-info-row">
              <span className="pay-info-label">Channels</span>
              <span className="pay-info-value" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Mail size={16} strokeWidth={2} /> Email
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <MessageCircle size={16} strokeWidth={2} /> WhatsApp
                </span>
              </span>
            </div>

            <div className="pay-info-row">
              <span className="pay-info-label">Note</span>
              <span className="pay-info-hint" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <ShieldCheck size={16} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                No Stripe, no cards, no third-party checkout. Payments are confirmed manually
                to keep intake selective and fraud-free.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
