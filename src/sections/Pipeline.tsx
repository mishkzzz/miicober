import { motion } from 'motion/react';
import { Users, FileText, CheckCircle, Tag, CreditCard, Package } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { label: 'Step 01', title: 'Traffic', desc: 'Inbound from content, referrals, and search.', icon: Users },
  { label: 'Step 02', title: 'Request', desc: 'Visitor submits a structured intake form.', icon: FileText },
  { label: 'Step 03', title: 'Qualification', desc: 'Manual review against scope, budget, fit.', icon: CheckCircle },
  { label: 'Step 04', title: 'Offer', desc: 'Scoped system audit with fixed deliverables.', icon: Tag },
  { label: 'Step 05', title: 'Payment', desc: 'UPI confirmation, slot locked in.', icon: CreditCard },
  { label: 'Step 06', title: 'Delivery', desc: 'Audit document + implementation map.', icon: Package },
];

export default function Pipeline() {
  return (
    <section className="section-tight" id="pipeline" style={{ background: 'var(--snow)' }}>
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="section-head-row">
            <span className="section-index">03 / Flow</span>
            <span className="section-line" />
          </div>
          <h2 className="h2">
            The <span className="display" style={{ fontStyle: 'italic' }}>pipeline</span>, end to end
          </h2>
          <p className="lead">
            Six stages from first touch to delivered system. No black boxes — every step is
            documented and manually reviewed.
          </p>
        </motion.div>

        <div className="pipeline">
          <div className="pipeline-rail" />
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                className={i === 0 ? 'pipeline-step is-active' : 'pipeline-step'}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              >
                <span className="pipeline-node" />
                <span className="pipeline-step-label">{s.label}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                  <Icon size={16} strokeWidth={1.8} style={{ color: 'var(--slate)' }} />
                  <span className="pipeline-step-title">{s.title}</span>
                </span>
                <span className="pipeline-step-desc">{s.desc}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
