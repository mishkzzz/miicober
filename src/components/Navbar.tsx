import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Plus, LayoutGrid } from 'lucide-react';
import Logo from './Logo';

type NavbarProps = {
  onOpenMenu: () => void;
  onOpenIntake: () => void;
};

export default function Navbar({ onOpenMenu, onOpenIntake }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={scrolled ? 'nav nav-scrolled' : 'nav'}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <div className="nav-left">
        <a href="#top" aria-label="MiiCober home" style={{ color: 'var(--ink)' }}>
          <Logo size={28} />
        </a>
        <a href="#top" className="brand-text" style={{ color: 'var(--ink)' }}>
          MiiCober
        </a>
      </div>

      <div className="nav-center">
        <button className="pill pill-dark" onClick={onOpenMenu} aria-label="Open menu">
          <Plus size={14} strokeWidth={2.4} />
          Menu
        </button>
        <div className="nav-tags" aria-hidden="true">
          <span className="nav-tag">Systems Intelligence</span>
          <span className="nav-tag-sep" />
          <span className="nav-tag">Brand Architecture</span>
        </div>
      </div>

      <div className="nav-right">
        <button className="pill pill-light" onClick={onOpenIntake}>
          <LayoutGrid size={14} strokeWidth={2.2} />
          Adaptive Systems
        </button>
      </div>
    </motion.nav>
  );
}
