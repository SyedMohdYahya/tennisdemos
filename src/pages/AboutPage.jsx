import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Award, Calendar, Trophy, Star, ExternalLink } from 'lucide-react';

const AboutPage = ({ isMobile, navigateTo }) => {
  return (
    <div style={{ paddingTop: isMobile ? '90px' : '120px', backgroundColor: 'var(--base-creamy)', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <section style={{ backgroundColor: 'var(--deep-black)', color: 'white', padding: isMobile ? '60px 0' : '100px 0', overflow: 'hidden' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', position: 'relative' }}
          >
            <h1 style={{
              fontSize: isMobile ? '3rem' : '6rem',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase'
            }}>
              ABOUT <span style={{ color: 'var(--tennis-green)' }}>FIGHTERS</span>
            </h1>
            <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--tennis-green)', margin: '30px auto' }} />
            <p style={{
              color: '#aaa', fontSize: isMobile ? '1rem' : '1.3rem',
              maxWidth: '700px', margin: '0 auto', lineHeight: 1.7
            }}>
              Where the raw energy of the streets meets the precision of world-class tennis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '80px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: '25px',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase'
              }}>
                OUR <span style={{ color: 'var(--tennis-green)' }}>STORY</span>
              </h2>
              <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '20px' }}>
                The Fighters Tennis Academy in Riyadh is a premier sports club located in the heart of the Al Olaya District, specifically on Al Bilad Bank metro station. We offer a range of exceptional facilities and services for tennis enthusiasts of all levels.
              </p>
              <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '20px' }}>
                From booking world-class courts and viewing real-time court calendars to connecting with local players and groups, our academy is designed to make tennis accessible, enjoyable, and competitive for everyone.
              </p>
              <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.8 }}>
                Situated at the prime Al Olaya Street address, our facility is easily accessible for anyone looking to engage in tennis activities, professional training sessions, or casual play. The academy is committed to providing optimal service and ensuring a positive experience for every participant.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                height: isMobile ? '350px' : '550px',
                backgroundColor: 'var(--tennis-green)',
                borderRadius: '30px',
                overflow: 'hidden',
                transform: isMobile ? 'none' : 'rotate(2deg)',
                boxShadow: isMobile ? 'none' : '-20px 20px 0px var(--deep-black)'
              }}
            >
              <div style={{
                width: '100%', height: '100%',
                backgroundImage: 'url("/images/brave_screenshot_www.google.com.png")',
                backgroundSize: 'cover', backgroundPosition: 'center',
                transform: isMobile ? 'none' : 'rotate(-2deg)'
              }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section
        style={{ backgroundColor: 'var(--tennis-green)', padding: '50px 0', overflow: 'hidden' }}
      >
        <style>{`
          .stats-track {
            display: flex;
            gap: 50px;
            animation: scroll-stats 30s linear infinite;
          }
          @keyframes scroll-stats {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <div className="stats-track">
            <div style={{ display: 'flex', gap: '50px', padding: '0 20px', flexShrink: 0, alignItems: 'center' }}>
              {[
                { icon: <Trophy size={22} />, value: '50+', label: 'Active Fighters' },
                { icon: <Star size={22} />, value: '4.9', label: 'Google Rating' },
                { icon: <Users size={22} />, value: '100+', label: 'Happy Clients' },
                { icon: <Calendar size={22} />, value: '3', label: 'Championship Courts' },
                { icon: <MapPin size={22} />, value: 'Al Olaya', label: 'Prime Location' },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 0', minWidth: '180px', flexShrink: 0
                  }}
                >
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    backgroundColor: 'var(--deep-black)', flexShrink: 0
                  }} />
                  <div style={{ color: 'var(--deep-black)', display: 'flex', alignItems: 'center' }}>{stat.icon}</div>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    backgroundColor: 'var(--deep-black)', flexShrink: 0
                  }} />
                  <span style={{
                    fontSize: '1.5rem', fontWeight: 900, color: 'var(--deep-black)',
                    lineHeight: 1
                  }}>{stat.value}</span>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, color: 'rgba(0,0,0,0.6)',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    whiteSpace: 'nowrap'
                  }}>{stat.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '50px', padding: '0 20px', flexShrink: 0, alignItems: 'center' }}>
              {[
                { icon: <Trophy size={22} />, value: '50+', label: 'Active Fighters' },
                { icon: <Star size={22} />, value: '4.9', label: 'Google Rating' },
                { icon: <Users size={22} />, value: '100+', label: 'Happy Clients' },
                { icon: <Calendar size={22} />, value: '3', label: 'Championship Courts' },
                { icon: <MapPin size={22} />, value: 'Al Olaya', label: 'Prime Location' },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 0', minWidth: '180px', flexShrink: 0
                  }}
                >
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    backgroundColor: 'var(--deep-black)', flexShrink: 0
                  }} />
                  <div style={{ color: 'var(--deep-black)', display: 'flex', alignItems: 'center' }}>{stat.icon}</div>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    backgroundColor: 'var(--deep-black)', flexShrink: 0
                  }} />
                  <span style={{
                    fontSize: '1.5rem', fontWeight: 900, color: 'var(--deep-black)',
                    lineHeight: 1
                  }}>{stat.value}</span>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, color: 'rgba(0,0,0,0.6)',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    whiteSpace: 'nowrap'
                  }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission + Values - WHY CHOOSE US */}
      <section className="section-padding" style={{ backgroundColor: 'var(--base-creamy)', position: 'relative', overflow: 'hidden' }}>
        {/* Background Ghost Text */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-5deg)',
          fontSize: '25vw', fontWeight: 900, color: 'var(--tennis-green)', opacity: 0.03,
          whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 0, fontFamily: "'Sedgwick Ave Display', cursive"
        }}>
          CHAMPIONS
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontSize: isMobile ? '3rem' : '5rem',
                fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em',
                lineHeight: 1
              }}>
              WHY <span style={{ color: 'var(--tennis-green)', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>CHOOSE US</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ height: '6px', backgroundColor: 'var(--tennis-green)', margin: '20px auto 0' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '40px' }}>
            {[
              {
                icon: <MapPin size={40} />,
                title: 'Prime Location',
                desc: 'Located in the prestigious Al Olaya District, easily accessible from anywhere in Riyadh.',
                rotate: -2
              },
              {
                icon: <Award size={40} />,
                title: 'Expert Coaching',
                desc: 'Certified trainers providing step-by-step guidance for beginners and advanced techniques.',
                rotate: 2
              },
              {
                icon: <Users size={40} />,
                title: 'Vibrant Community',
                desc: 'Connect with local players, participate in tournaments, and join the movement.',
                rotate: -1
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: isMobile ? 0 : item.rotate }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  y: -15, 
                  rotate: 0,
                  scale: 1.02,
                  boxShadow: '0 30px 60px rgba(0,0,0,0.12)'
                }}
                style={{
                  padding: '50px 40px', 
                  borderRadius: '0px', 
                  backgroundColor: '#fff',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
                  borderTop: '8px solid var(--tennis-green)',
                  position: 'relative',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Decorative Number */}
                <div style={{
                  position: 'absolute', top: '20px', right: '30px',
                  fontSize: '4rem', fontWeight: 900, color: 'var(--base-creamy)',
                  zIndex: -1, fontFamily: "'Sedgwick Ave Display', cursive"
                }}>
                  0{i + 1}
                </div>

                <div style={{ color: 'var(--tennis-green)', marginBottom: '30px' }}>{item.icon}</div>
                <h3 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 900, 
                  marginBottom: '15px', 
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em'
                }}>{item.title}</h3>
                <p style={{ color: '#555', lineHeight: 1.6, fontSize: '1.05rem' }}>{item.desc}</p>
                
                <motion.div 
                  style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--tennis-green)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}
                  whileHover={{ x: 5 }}
                >
                  Learn More <ArrowRight size={16} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: isMobile ? '2rem' : '3.5rem',
              fontWeight: 900, lineHeight: 1.1, marginBottom: '20px',
              textTransform: 'uppercase', letterSpacing: '-0.02em'
            }}>
              Ready to <span style={{ color: 'var(--tennis-green)' }}>Join</span> the Movement?
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 30px' }}>
              Book a court, meet the community, and experience tennis like never before.
            </p>
            <button onClick={() => navigateTo('contact')}
              style={{
                backgroundColor: 'var(--deep-black)', color: 'white',
                padding: '18px 45px', borderRadius: '50px', fontSize: '1rem',
                fontWeight: 800, display: 'inline-flex', alignItems: 'center',
                gap: '10px', border: 'none', cursor: 'pointer'
              }}
            >
              BOOK A COURT <ExternalLink size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
