import { useState } from 'react';
import { submitDemoRequest } from '../submitDemoRequest.js';

const emptyForm = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  website: '',
  need: '',
  company_website: '', // honeypot: hidden from people, bots often fill it in
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  if (!values.businessName.trim()) errors.businessName = 'Please tell us your business name.';
  if (!values.email.trim()) {
    errors.email = 'Please add your email so we can reply.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That email doesn\'t look quite right. Check it and try again.';
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    try {
      await submitDemoRequest(values);
      setStatus('sent');
      setValues(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  const fieldError = (name) => (errors[name] ? (
    <p className="field-error" id={`${name}-error`}>{errors[name]}</p>
  ) : null);

  return (
    <section className="section section-tint" id="contact" aria-labelledby="contact-heading">
      <div className="container narrow">
        <h2 id="contact-heading">Get your free demo</h2>
        <p className="section-sub">
          Tell us a bit about your business. We'll reply within one business day.
        </p>

        {status === 'sent' ? (
          <div className="card form-success" role="status">
            <p>Thanks! We got your message and will reply within one business day.</p>
          </div>
        ) : (
          <form className="card demo-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Your name <span aria-hidden="true">*</span></label>
              <input
                id="name" name="name" type="text" autoComplete="name" required
                value={values.name} onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {fieldError('name')}
            </div>

            <div className="field">
              <label htmlFor="businessName">Business name <span aria-hidden="true">*</span></label>
              <input
                id="businessName" name="businessName" type="text" autoComplete="organization" required
                value={values.businessName} onChange={handleChange}
                aria-invalid={Boolean(errors.businessName)}
                aria-describedby={errors.businessName ? 'businessName-error' : undefined}
              />
              {fieldError('businessName')}
            </div>

            <div className="field">
              <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
              <input
                id="email" name="email" type="email" autoComplete="email" required
                value={values.email} onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {fieldError('email')}
            </div>

            <div className="field">
              <label htmlFor="phone">Phone <span className="optional">(optional)</span></label>
              <input
                id="phone" name="phone" type="tel" autoComplete="tel"
                value={values.phone} onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="website">Current website <span className="optional">(optional)</span></label>
              <input
                id="website" name="website" type="url" autoComplete="url" placeholder="https://"
                value={values.website} onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="need">What do you need?</label>
              <textarea
                id="need" name="need" rows="4"
                value={values.need} onChange={handleChange}
              />
            </div>

            {status === 'error' && (
              <p className="field-error" role="alert">
                Something went wrong and your message wasn't sent. Please try again.
              </p>
            )}

            <div className="honeypot" aria-hidden="true">
              <label htmlFor="company_website">Leave this field empty</label>
              <input
                id="company_website" name="company_website" type="text" tabIndex={-1}
                autoComplete="off" value={values.company_website} onChange={handleChange}
              />
            </div>

            <button className="btn btn-primary btn-block" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send me my demo'}
            </button>
            <p className="fine-print">* Required</p>
          </form>
        )}
      </div>
    </section>
  );
}
