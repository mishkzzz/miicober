import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4';

type HeroProps = {
  onRequestAccess: () => void;
  onAudit: () => void;
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};

const item = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export default function Hero({ onRequestAccess, onAudit }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="hero-video-wrap">
        <motion.video
          className="hero-video"
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        />
      </div>
      <div className="hero-veil" />
      <div className="hero-grain" />

      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="hero-eyebrow" variants={item}>
          <span className="hero-eyebrow-dot" />
          MiiCober OS — v1.0
        </motion.div>

        <motion.h1 className="hero-title" variants={item}>
          Decoding the systems behind brands people <em>build, scale,</em> and protect.
        </motion.h1>

        <motion.p className="hero-sub" variants={item}>
          Systems intelligence studio for modern brands. We design the brand, growth, and
          operational architecture behind companies that compound.
        </motion.p>

        <motion.div className="hero-actions" variants={item}>
          <button className="btn btn-hero-primary" onClick={onRequestAccess}>
            Request Access
            <ArrowRight size={16} strokeWidth={2.2} className="btn-arrow" />
          </button>
          <button className="btn btn-hero-ghost" onClick={onAudit}>
            <Play size={14} strokeWidth={2.2} />
            Start System Audit
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-meta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.2 }}
      >
        <div className="hero-meta-block">
          <span className="hero-meta-label">Studio</span>
          <span className="hero-meta-value">Systems Intelligence</span>
        </div>
        <div className="scroll-cue">
          <span className="scroll-cue-line" />
          Scroll
          <ArrowUpRight size={12} strokeWidth={2} />
        </div>
        <div className="hero-meta-block" style={{ alignItems: 'flex-end' }}>
          <span className="hero-meta-label">Intake</span>
          <span className="hero-meta-value">Limited / Weekly</span>
        </div>
      </motion.div>
    </section>
  );
}
