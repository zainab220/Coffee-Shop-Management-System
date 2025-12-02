'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to backend API
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <header>
        <h1>Contact Us</h1>
        <p>We&apos;d love to hear from you — your thoughts keep our coffee brewing ☕</p>
      </header>

      <section className="content">
        <form className="contact-form shadow" onSubmit={handleSubmit}>
          {submitted && (
            <div className="alert alert-success" role="alert">
              Thank you for your message! We&apos;ll get back to you soon.
            </div>
          )}
          <input
            type="text"
            placeholder="Your Name"
            className="form-control mb-3"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="form-control mb-3"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
          <button type="submit" className="btn">
            Send Message
          </button>
        </form>
      </section>
    </>
  );
}

