import { motion } from 'motion/react';
import { ShieldCheck, Gauge, Layers } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const SIGNALS = [
  {
    icon: ShieldCheck,
    title: 'Selective intake',
    desc: 'We accept a limited number of projects each week. Every intake is reviewed manually before a slot is offered.',
  },
  {
    icon: Gauge,
    title: 'Limited projects weekly',
    desc: 'Capacity is capped on purpose. The studio optimizes for depth, not volume — fewer systems, higher fidelity.',
  },
  {
    icon: Layers,
    title: 'Built for execution',
    desc: 'Systems designed for execution, not aesthetics. You receive a documented architecture you can run, not a deck.',
  },
];

export default function Trust() {
  return (
    <section className="section" id="trust">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="section-head-row">
            <span className="section-index">05 / Trust</span>
            <span className="section-line" />
          </div>
          <h2 className="h2">
            How the studio <span className="display" style={{ fontStyle: 'italic' }}>operates</span>
          </h2>
        </motion.div>

        <motion.div
          className="trust-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {SIGNALS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                className="trust-card"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
              >
                <span className="trust-icon">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span className="trust-title">{s.title}</span>
                <span className="trust-desc">{s.desc}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
