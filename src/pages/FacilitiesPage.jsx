import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Clock, Sun, Wifi, Dumbbell, ArrowRight, CheckCircle } from 'lucide-react';

const FacilitiesPage = ({ isMobile, navigateTo }) => {
  const facilities = [
    {
      name: 'Championship Courts',
      img: '/images/brave_screenshot_www.google.com (1).png',
      desc: 'Premium hard courts with professional lighting for day and night play. Our courts meet international standards and are maintained to perfection.',
      features: ['Professional LED lighting', 'International standard dimensions', 'Premium playing surface', 'Shaded spectator areas']
    },
    {
      name: 'Expert Coaching',
      img: '/images/brave_screenshot_www.google.com (2).png',
      desc: 'Step-by-step guidance for beginners and pros alike. Our certified coaches bring years of experience and a passion for developing talent.',
      features: ['Certified professional coaches', 'Personalized training plans', 'Group & private sessions', 'Video analysis technology']
    },
    {
      name: 'Community Events',
      img: '/images/brave_screenshot_www.google.com (3).png',
      desc: 'Regular tournaments and social tennis mixers. We foster a community where players connect, compete, and grow together.',
      features: ['Weekly tournaments', 'Social mixers & doubles', 'Junior development program', 'Seasonal championships']
    },
    {
      name: 'Premium Amenities',
      img: '/images/brave_screenshot_www.google.com.png',
      desc: 'Modern locker rooms, lounge areas, and equipment rental. Everything you need for a seamless tennis experience.',
      features: ['Air-conditioned lounge', 'Equipment rental shop', 'Modern locker rooms', 'Free Wi-Fi throughout']
    }
  ];

  return (
    <div style={{ paddingTop: isMobile ? '90px' : '120px', backgroundColor: 'var(--base-creamy)', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        backgroundColor: 'var(--deep-black)', color: 'white',
        padding: isMobile ? '60px 0' : '100px 0', overflow: 'hidden'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{
              fontSize: isMobile ? '3rem' : '6rem',
              fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em',
              textTransform: 'uppercase'
            }}>
              OUR <span style={{ color: 'var(--tennis-green)' }}>FACILITIES</span>
            </h1>
            <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--tennis-green)', margin: '30px auto' }} />
            <p style={{
              color: '#aaa', fontSize: isMobile ? '1rem' : '1.3rem',
              maxWidth: '600px', margin: '0 auto', lineHeight: 1.7
            }}>
              World-class amenities designed for peak performance and ultimate comfort.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gap: '40px' }}>
            {facilities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                  gap: isMobile ? '20px' : '50px',
                  alignItems: 'center',
                  direction: i % 2 !== 0 && !isMobile ? 'rtl' : 'ltr'
                }}
              >
                <div style={{
                  height: isMobile ? '250px' : '400px',
                  borderRadius: '25px', overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  order: isMobile ? 1 : (i % 2 === 0 ? 0 : 1)
                }}>
                  <div style={{
                    width: '100%', height: '100%',
                    backgroundImage: `url("${item.img}")`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    transition: 'transform 0.5s'
                  }} />
                </div>

                <div style={{ direction: 'ltr', order: isMobile ? 2 : (i % 2 === 0 ? 1 : 0) }}>
                  <h2 style={{
                    fontSize: isMobile ? '1.8rem' : '2.5rem',
                    fontWeight: 900, marginBottom: '15px',
                    letterSpacing: '-0.02em', textTransform: 'uppercase'
                  }}>
                    {item.name.split(' ')[0]} <span style={{ color: 'var(--tennis-green)' }}>{item.name.split(' ').slice(1).join(' ')}</span>
                  </h2>
                  <p style={{ color: '#555', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '25px' }}>
                    {item.desc}
                  </p>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {item.features.map((feat, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <CheckCircle size={18} color="var(--tennis-green)" style={{ flexShrink: 0 }} />
                        <span style={{ color: '#444', fontSize: '0.95rem' }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Hours + CTA */}
      <section style={{ backgroundColor: 'var(--deep-black)', color: 'white', padding: '80px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '40px' : '80px',
            alignItems: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{
                fontSize: isMobile ? '1.8rem' : '2.5rem',
                fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px'
              }}>
                Operating <span style={{ color: 'var(--tennis-green)' }}>Hours</span>
              </h2>
              <div style={{ display: 'grid', gap: '15px', color: '#ccc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                  <span>Saturday - Thursday</span>
                  <span style={{ fontWeight: 700, color: 'white' }}>6:00 AM - 11:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                  <span>Friday</span>
                  <span style={{ fontWeight: 700, color: 'white' }}>2:00 PM - 11:00 PM</span>
                </div>
              </div>
              <div style={{ marginTop: '30px', display: 'flex', gap: '20px', color: '#888', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="var(--tennis-green)" /> Open late daily
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sun size={16} color="var(--tennis-green)" /> Indoor & outdoor
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: '#111', padding: '40px', borderRadius: '25px',
                textAlign: 'center'
              }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '15px' }}>
                Ready to <span style={{ color: 'var(--tennis-green)' }}>Play?</span>
              </h3>
              <p style={{ color: '#888', marginBottom: '25px', lineHeight: 1.6 }}>
                Book your court now and experience premium tennis at Fighters Academy.
              </p>
              <button onClick={() => navigateTo('contact')}
                style={{
                  backgroundColor: 'var(--tennis-green)', color: 'var(--deep-black)',
                  padding: '16px 40px', borderRadius: '50px', fontWeight: 800,
                  border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
                  gap: '10px', fontSize: '0.95rem'
                }}
              >
                BOOK A COURT <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacilitiesPage;
