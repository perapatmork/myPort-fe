import Button from './Button';
import './PricingCard.css';

function PricingCard({
  name,
  price,
  currency = '$',
  period,
  description,
  features = [],
  highlighted = false,
  icon,
  onContact,
}) {
  return (
    <div
      className={`pricing-card ${highlighted ? 'pricing-card--highlighted' : ''}`}
    >
      {highlighted && <span className="pricing-card__badge">Popular</span>}

      {icon && <span className="pricing-card__icon">{icon}</span>}
      <h3 className="pricing-card__name">{name}</h3>

      <div className="pricing-card__price-wrapper">
        <span className="pricing-card__currency">{currency}</span>
        <span className="pricing-card__price">{price}</span>
        {period && <span className="pricing-card__period">{period}</span>}
      </div>

      {description && (
        <p className="pricing-card__description">{description}</p>
      )}

      {features.length > 0 && (
        <ul className="pricing-card__features">
          {features.map((feature, index) => (
            <li key={index} className="pricing-card__feature">
              <span className="pricing-card__check">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="pricing-card__cta">
        <Button
          variant={highlighted ? 'primary' : 'outline'}
          size="md"
          onClick={onContact}
          className="pricing-card__button"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default PricingCard;
