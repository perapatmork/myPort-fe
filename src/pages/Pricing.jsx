import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/UI/PageTransition';
import ScrollReveal from '../components/UI/ScrollReveal';
import SectionTitle from '../components/UI/SectionTitle';
import PricingCard from '../components/UI/PricingCard';
import pricingTiers from '../data/pricing';
import './Pricing.css';

function Pricing() {
  const navigate = useNavigate();

  const handleContact = (tierName) => {
    navigate('/contact', { state: { selectedTier: tierName } });
  };

  return (
    <PageTransition>
      <div className="pricing-page">
        <div className="container">
          <ScrollReveal>
            <SectionTitle
              title="Pricing"
              subtitle="Choose the perfect plan for your project"
            />
          </ScrollReveal>

          <div className="pricing-grid">
            {(pricingTiers || []).map((tier, index) => (
              <ScrollReveal key={tier.name || index} delay={index * 0.15}>
                <div
                  className={`pricing-grid__item ${
                    tier.highlighted ? 'pricing-grid__item--highlighted' : ''
                  }`}
                >
                  <PricingCard
                    {...tier}
                    onContact={() => handleContact(tier.name)}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <p className="pricing-note">
              All prices are estimates. Contact me for a custom quote.
            </p>
          </ScrollReveal>

          {/* CTA Section */}
          <ScrollReveal delay={0.6}>
            <div className="pricing-cta">
              <div className="pricing-cta__content">
                <h3 className="pricing-cta__title">Need something custom?</h3>
                <p className="pricing-cta__text">
                  Have a unique project in mind? Let&apos;s discuss your
                  requirements and create a tailored solution.
                </p>
                <button
                  className="pricing-cta__button"
                  onClick={() => navigate('/contact')}
                >
                  <span>Get In Touch</span>
                  <span className="pricing-cta__arrow">→</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}

export default Pricing;
