import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

const PARTICLE_COUNT = 18;

function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function Hero({ name = 'Developer', title, tagline, avatarSrc }) {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const size = Math.random() * 4 + 2; // 2–6px
      const colors = ['#7c3aed', '#a855f7', '#06b6d4', '#22d3ee', '#f43f5e'];
      return {
        id: i,
        size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        color: colors[i % colors.length],
        duration: Math.random() * 15 + 10, // 10–25s
        delay: Math.random() * 10, // 0–10s
      };
    });
  }, []);

  return (
    <section className="hero">
      {/* Glow Orbs */}
      <div className="hero__orbs" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      {/* Floating Particles */}
      <div className="hero__particles" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="hero__particle"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              background: p.color,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar */}
        <motion.div className="hero__avatar" variants={itemVariants}>
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={`${name}'s avatar`}
              className="hero__avatar-img"
            />
          ) : (
            <div className="hero__avatar-placeholder">
              {getInitials(name)}
            </div>
          )}
        </motion.div>

        {/* Name */}
        <motion.h1 className="hero__name" variants={itemVariants}>
          {name}
        </motion.h1>

        {/* Title */}
        {title && (
          <motion.h2 className="hero__title" variants={itemVariants}>
            {title}
          </motion.h2>
        )}

        {/* Tagline */}
        {tagline && (
          <motion.p className="hero__tagline" variants={itemVariants}>
            {tagline}
          </motion.p>
        )}

        {/* CTA Buttons */}
        <motion.div className="hero__cta" variants={itemVariants}>
          <Link to="/portfolio" className="hero__btn hero__btn--primary">
            View Portfolio
          </Link>
          <Link to="/contact" className="hero__btn hero__btn--outline">
            Contact Me
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-chevron" />
      </motion.div>
    </section>
  );
}

export default Hero;
