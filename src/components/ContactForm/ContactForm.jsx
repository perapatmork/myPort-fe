import { useState, useCallback } from 'react';
import './ContactForm.css';

const INITIAL_DATA = {
  name: '',
  email: '',
  subject: 'General',
  message: '',
};

const SUBJECT_OPTIONS = [
  'General',
  'Project Inquiry',
  'Pricing',
  'Support',
  'Other',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data) {
  const errors = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!data.email.trim() || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}

function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    setErrors((prev) => {
      if (prev[name]) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return prev;
    });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setLoading(true);
      setErrors({});

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (onSubmit) {
        onSubmit(formData);
      }

      setLoading(false);
      setSuccess(true);
    },
    [formData, onSubmit]
  );

  const handleReset = useCallback(() => {
    setFormData(INITIAL_DATA);
    setErrors({});
    setSuccess(false);
  }, []);

  // Success state
  if (success) {
    return (
      <div className="contact-form">
        <div className="contact-form__success">
          <div className="contact-form__success-icon">
            <span className="contact-form__success-checkmark">✓</span>
          </div>
          <h3 className="contact-form__success-title">Message Sent!</h3>
          <p className="contact-form__success-text">
            Thank you for reaching out. I&apos;ll get back to you soon.
          </p>
          <button
            type="button"
            className="contact-form__reset-btn"
            onClick={handleReset}
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <form
        className={`contact-form__form${loading ? ' contact-form__form--loading' : ''}`}
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Name */}
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-name">
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            name="name"
            className={`contact-form__input${errors.name ? ' contact-form__input--error' : ''}`}
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
          />
          {errors.name && (
            <span className="contact-form__error">{errors.name}</span>
          )}
        </div>

        {/* Email */}
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-email">
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            className={`contact-form__input${errors.email ? ' contact-form__input--error' : ''}`}
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && (
            <span className="contact-form__error">{errors.email}</span>
          )}
        </div>

        {/* Subject */}
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-subject">
            Subject
          </label>
          <select
            id="cf-subject"
            name="subject"
            className="contact-form__select"
            value={formData.subject}
            onChange={handleChange}
          >
            {SUBJECT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-message">
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            className={`contact-form__textarea${errors.message ? ' contact-form__textarea--error' : ''}`}
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={handleChange}
            rows={6}
          />
          {errors.message && (
            <span className="contact-form__error">{errors.message}</span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="contact-form__submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="contact-form__spinner" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
