import PageTransition from '../components/UI/PageTransition';
import ScrollReveal from '../components/UI/ScrollReveal';
import SectionTitle from '../components/UI/SectionTitle';
import ContactForm from '../components/ContactForm/ContactForm';
import profile from '../data/profile';
import './Contact.css';

const SOCIAL_LINKS = [
  {
    icon: '💬',
    platform: 'Discord',
    value: profile.socials?.discord || 'username#0000',
    href: null,
  },
  {
    icon: '📧',
    platform: 'Email',
    value: profile.socials?.email || 'hello@example.com',
    href: profile.socials?.email ? `mailto:${profile.socials.email}` : null,
  },
  {
    icon: '🎮',
    platform: 'Roblox',
    value: profile.socials?.roblox || 'RobloxProfile',
    href: profile.socials?.robloxUrl || profile.socials?.roblox
      ? `https://www.roblox.com/users/${profile.socials?.robloxId || ''}/profile`
      : null,
    external: true,
  },
  {
    icon: '📲',
    platform: 'Facebook',
    value: profile.socials?.facebook || 'FacebookProfile',
    href: profile.socials?.facebook
      ? `https://www.facebook.com/mok.perapat`
      : null,
    external: true,
  },
];

function Contact() {
  return (
    <PageTransition>
      <div className="contact-page">
        {/* Decorative Glow Orbs */}
        <div className="contact-glow contact-glow--purple" aria-hidden="true" />
        <div className="contact-glow contact-glow--cyan" aria-hidden="true" />

        <div className="container">
          <ScrollReveal>
            <SectionTitle
              title="Get In Touch"
              subtitle="Let's discuss your next project"
            />
          </ScrollReveal>

          <div className="contact-grid">
            {/* Left Column: Contact Info */}
            <div className="contact-info">
              <ScrollReveal direction="left">
                <h3 className="contact-info__heading">Let&apos;s Connect</h3>
                <p className="contact-info__description">
                  I&apos;m always open to new projects, collaborations, and
                  creative opportunities. Whether you need a full game built from
                  scratch or help with an existing project, feel free to reach
                  out through any of these channels.
                </p>
              </ScrollReveal>

              <div className="social-links">
                {SOCIAL_LINKS.map((social, index) => (
                  <ScrollReveal key={social.platform} delay={index * 0.1}>
                    {social.href ? (
                      <a
                        href={social.href}
                        className="social-card"
                        target={social.external ? '_blank' : undefined}
                        rel={social.external ? 'noopener noreferrer' : undefined}
                      >
                        <span className="social-card__icon">{social.icon}</span>
                        <div className="social-card__info">
                          <span className="social-card__platform">
                            {social.platform}
                          </span>
                          <span className="social-card__value">
                            {social.value}
                          </span>
                        </div>
                        {social.external && (
                          <span className="social-card__arrow">↗</span>
                        )}
                      </a>
                    ) : (
                      <div className="social-card">
                        <span className="social-card__icon">{social.icon}</span>
                        <div className="social-card__info">
                          <span className="social-card__platform">
                            {social.platform}
                          </span>
                          <span className="social-card__value">
                            {social.value}
                          </span>
                        </div>
                      </div>
                    )}
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="contact-form-wrapper">
              <ScrollReveal direction="right" delay={0.2}>
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Contact;
