import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES, type Service } from '../lib/services';

const EASE = [0.16, 1, 0.3, 1] as const;

type SystemsProps = {
  onSelect: (service: Service) => void;
};

export default function Systems({ onSelect }: SystemsProps) {
  return (
    <section className="section" id="systems">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="section-head-row">
            <span className="section-index">02 / Systems</span>
            <span className="section-line" />
          </div>
          <h2 className="h2">
            MiiCober <span className="display" style={{ fontStyle: 'italic' }}>Systems</span>
          </h2>
          <p className="lead">
            Four operating layers. Each one is a deliverable, not a deck. Select a system to
            begin a structured intake — you will be contacted within 24–48 hours.
          </p>
        </motion.div>

        <motion.div
          className="systems-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <motion.button
                key={s.id}
                className="system-card"
                onClick={() => onSelect(s)}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <span className="system-card-index">{s.index}</span>
                <span className="system-card-icon">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <span className="system-card-title">{s.title}</span>
                <span className="system-card-desc">{s.desc}</span>
                <span className="system-card-cta">
                  Begin intake
                  <ArrowUpRight size={14} strokeWidth={2.2} />
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
