import { motion } from 'framer-motion';

const directionOffsets = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
};

function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = '',
}) {
  const offset = directionOffsets[direction] || directionOffsets.up;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
