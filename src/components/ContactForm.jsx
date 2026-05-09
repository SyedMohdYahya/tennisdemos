import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { AdminMail } from '../constants/config';

const ContactForm = ({ isMobile }) => {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    const form = formRef.current;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formsubmit.co/ajax/' + AdminMail, {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '60px 40px', textAlign: 'center',
          backgroundColor: '#f9fdf5', borderRadius: '30px',
          border: '1px solid rgba(188, 224, 36, 0.3)'
        }}
      >
        <CheckCircle size={60} color="var(--tennis-green)" style={{ marginBottom: '20px' }} />
        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Message Sent!</h3>
        <p style={{ color: '#666' }}>We'll get back to you shortly.</p>
        <button
          onClick={() => setSubmitted(false)}
          style={{
            marginTop: '25px', backgroundColor: 'var(--deep-black)', color: 'white',
            padding: '12px 30px', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem'
          }}
        >
          Send Another
        </button>
      </motion.div>
    );
  }

  const inputStyle = {
    width: '100%', padding: '16px 20px', borderRadius: '14px', border: '1px solid #ddd',
    fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none', transition: 'border 0.2s',
    backgroundColor: 'white'
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '18px' }}>
        <input type="text" name="name" placeholder="Your Name" required style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = 'var(--tennis-green)'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'} />
        <input type="email" name="email" placeholder="Your Email" required style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = 'var(--tennis-green)'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'} />
      </div>
      <input type="tel" name="phone" placeholder="Phone (optional)" style={inputStyle}
        onFocus={(e) => e.target.style.borderColor = 'var(--tennis-green)'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'} />
      <textarea name="message" placeholder="Your Message..." required rows="5" style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
        onFocus={(e) => e.target.style.borderColor = 'var(--tennis-green)'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <motion.button
        type="submit" disabled={sending}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        style={{
          backgroundColor: 'var(--tennis-green)', color: 'var(--deep-black)',
          padding: '18px 35px', borderRadius: '14px', fontWeight: 800, fontSize: '0.95rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          border: 'none', cursor: sending ? 'not-allowed' : 'pointer', opacity: sending ? 0.7 : 1,
          letterSpacing: '0.02em', textTransform: 'uppercase'
        }}
      >
        {sending ? <Loader size={20} className="spin" /> : <Send size={18} />}
        {sending ? 'Sending...' : 'Send Message'}
      </motion.button>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e74c3c', fontSize: '0.85rem' }}>
          <AlertCircle size={16} /> Something went wrong. Please try again or email us directly.
        </motion.div>
      )}
    </form>
  );
};

export default ContactForm;
