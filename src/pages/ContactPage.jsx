import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const ContactPage = ({ isMobile }) => {
  return (
    <div style={{ paddingTop: isMobile ? '90px' : '120px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <section className="section-padding" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{ fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 900 }}>
              GET IN <span style={{ color: 'var(--tennis-green)' }}>TOUCH</span>
            </h2>
            <p style={{ color: '#666', marginTop: '15px', fontSize: '1.1rem', maxWidth: '500px', margin: '15px auto 0' }}>
              Ready to start your tennis journey? Reach out and we'll get you on the court.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '50px' : '80px', alignItems: 'start' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Send us a message
              </h3>
              <ContactForm isMobile={isMobile} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Visit us
              </h3>

              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--soft-gray)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin color="black" size={24} />
                  </div>
                  <div>
                    <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 800 }}>Location</h4>
                    <p style={{ color: '#666', marginTop: '5px' }}>Al Olaya, Riyadh 12211, Saudi Arabia</p>
                  </div>
                </div>

                <div style={{
                  height: isMobile ? '250px' : '350px',
                  backgroundColor: 'var(--soft-gray)', borderRadius: '30px', overflow: 'hidden',
                  position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid rgba(223, 255, 0, 0.2)',
                  marginBottom: '40px'
                }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5168541437!2d46.6719!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f032255555555%3A0x5555555555555555!2sFighters%20Tennis%20Academy!5e0!3m2!1sen!2ssa!4v1620000000000!5m2!1sen!2ssa"
                    width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9) hue-rotate(180deg)' }}
                    allowFullScreen="" loading="lazy"
                  />
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--soft-gray)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone color="black" size={24} />
                  </div>
                  <div>
                    <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 800 }}>Contact</h4>
                    <p style={{ color: '#666', marginTop: '5px' }}>054 379 3628</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                  <a href="https://wa.me/966543793628" target="_blank" rel="noopener noreferrer"
                    style={{ backgroundColor: '#25D366', color: 'white', padding: '15px 30px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
                    <MessageCircle size={20} /> WHATSAPP
                  </a>
                  <a href="https://maps.app.goo.gl/B4673Z2S4N8K5X5R9" target="_blank" rel="noopener noreferrer"
                    style={{ backgroundColor: 'var(--deep-black)', color: 'white', padding: '15px 30px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
                    <ExternalLink size={20} /> GET DIRECTIONS
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
