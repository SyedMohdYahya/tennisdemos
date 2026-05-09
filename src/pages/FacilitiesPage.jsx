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

      {/* Facilities List - GALLERY STYLE */}
      <section style={{ backgroundColor: 'var(--base-creamy)', overflow: 'hidden' }}>
        <div>
          {facilities.map((item, i) => (
            <div 
              key={i} 
              style={{ 
                backgroundColor: i % 2 === 0 ? 'transparent' : 'var(--deep-black)',
                color: i % 2 === 0 ? 'var(--deep-black)' : 'white',
                padding: isMobile ? '80px 0' : '150px 0',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative Large Background Number */}
              <div style={{
                position: 'absolute', top: '10%', [i % 2 === 0 ? 'right' : 'left']: '5%',
                fontSize: '20vw', fontWeight: 900, 
                color: i % 2 === 0 ? 'var(--tennis-green)' : 'rgba(188, 224, 36, 0.1)',
                opacity: i % 2 === 0 ? 0.08 : 0.2,
                fontFamily: "'Sedgwick Ave Display', cursive",
                zIndex: 0, pointerEvents: 'none'
              }}>
                0{i + 1}
              </div>

              <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                  gap: isMobile ? '40px' : '100px',
                  alignItems: 'center',
                  direction: i % 2 !== 0 && !isMobile ? 'rtl' : 'ltr'
                }}>
                  {/* Image with tilted frame */}
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'relative',
                      height: isMobile ? '300px' : '500px',
                      padding: '15px',
                      backgroundColor: 'var(--tennis-green)',
                      transform: isMobile ? 'none' : `rotate(${i % 2 === 0 ? 2 : -2}deg)`,
                      boxShadow: '30px 30px 0px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div style={{ 
                      width: '100%', height: '100%', overflow: 'hidden',
                      transform: isMobile ? 'none' : `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                      backgroundColor: '#222'
                    }}>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        style={{
                          width: '100%', height: '100%',
                          backgroundImage: `url("${item.img}")`,
                          backgroundSize: 'cover', backgroundPosition: 'center'
                        }} 
                      />
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <div style={{ direction: 'ltr' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h2 style={{
                        fontSize: isMobile ? '2.5rem' : '4.5rem',
                        fontWeight: 900, lineHeight: 0.9, marginBottom: '25px',
                        textTransform: 'uppercase', letterSpacing: '-0.04em'
                      }}>
                        {item.name.split(' ')[0]} <span style={{ color: 'var(--tennis-green)', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>{item.name.split(' ').slice(1).join(' ')}</span>
                      </h2>
                      <p style={{ 
                        color: i % 2 === 0 ? '#444' : '#aaa', 
                        lineHeight: 1.6, fontSize: '1.2rem', marginBottom: '35px',
                        fontWeight: 500
                      }}>
                        {item.desc}
                      </p>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                        {item.features.map((feat, j) => (
                          <motion.div 
                            key={j} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + j * 0.1 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
                          >
                            <div style={{ 
                              width: '24px', height: '24px', borderRadius: '50%', 
                              backgroundColor: 'var(--tennis-green)', display: 'flex', 
                              alignItems: 'center', justifyContent: 'center', flexShrink: 0 
                            }}>
                              <CheckCircle size={14} color="black" weight="bold" />
                            </div>
                            <span style={{ 
                              fontWeight: 700, fontSize: '0.9rem', 
                              textTransform: 'uppercase', letterSpacing: '0.05em' 
                            }}>{feat}</span>
                          </motion.div>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ x: 10, color: 'var(--tennis-green)' }}
                        style={{ 
                          marginTop: '45px', display: 'flex', alignItems: 'center', 
                          gap: '12px', background: 'none', border: 'none', 
                          color: i % 2 === 0 ? 'black' : 'white', fontWeight: 900, 
                          fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em',
                          cursor: 'pointer' 
                        }}
                      >
                        Explore Facility <ArrowRight size={20} />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
