import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: 'Systems', href: '#systems', index: '01' },
  { label: 'Pipeline', href: '#pipeline', index: '02' },
  { label: 'Trust', href: '#trust', index: '03' },
  { label: 'Activate', href: '#activate', index: '04' },
  { label: 'Contact', href: '#contact', index: '05' },
];

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenIntake: () => void;
};

export default function MenuDrawer({ open, onClose, onOpenIntake }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

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
          style={{ alignItems: 'stretch', justifyContent: 'flex-end', padding: 0 }}
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--ink)',
              color: 'var(--white)',
              width: 'min(440px, 100vw)',
              height: '100vh',
              padding: '32px 32px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
              position: 'relative',
              overflowY: 'auto',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                Index
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 16 }}>
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    padding: '18px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    fontSize: 'clamp(28px, 4vw, 40px)',
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    color: 'var(--white)',
                    lineHeight: 1,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                    <span style={{ fontSize: 11, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)' }}>
                      {l.index}
                    </span>
                    {l.label}
                  </span>
                  <ArrowUpRight size={20} strokeWidth={2} style={{ color: 'rgba(255,255,255,0.6)' }} />
                </motion.a>
              ))}
            </nav>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={() => {
                  onClose();
                  onOpenIntake();
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: 12,
                  background: 'var(--white)',
                  color: 'var(--ink)',
                  fontSize: 15,
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                Request Access
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </button>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                Selective intake · Limited projects weekly
              </p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
