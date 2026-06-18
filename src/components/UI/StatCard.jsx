import { useState, useEffect, useRef, useCallback } from 'react';
import './StatCard.css';

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function StatCard({ label, value = 0, suffix = '', icon, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef(null);
  const hasAnimated = useRef(false);

  const animateCount = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.round(easedProgress * value);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [value]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
            animateCount();
          }, delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay, animateCount]);

  return (
    <div
      className={`stat-card ${visible ? 'stat-card--visible' : ''}`}
      ref={cardRef}
      style={{ transitionDelay: `${delay}s` }}
    >
      {icon && <span className="stat-card__icon">{icon}</span>}
      <div>
        <span className="stat-card__value">{displayValue}</span>
        {suffix && <span className="stat-card__suffix">{suffix}</span>}
      </div>
      <p className="stat-card__label">{label}</p>
    </div>
  );
}

export default StatCard;
