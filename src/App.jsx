import React from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Calendar, MapPin, Phone, Star, MessageCircle, ExternalLink, Instagram, Facebook, Twitter, Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';

const GraffitiLayer = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'var(--base-creamy)',
    }} />
  </div>
);

const GlobalLoader = ({ progress }) => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'var(--deep-black)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px'
    }}
  >
    <div style={{ position: 'relative', width: '150px', height: '150px' }}>
      {/* Tennis Ball */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--tennis-green)',
          borderRadius: '50%',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.2), 0 0 50px rgba(223, 255, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(0,0,0,0.1)'
        }}
      >
        {/* Tennis Ball Lines */}
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.4 }}>
          <path d="M0 50 Q25 50 50 0" fill="none" stroke="white" strokeWidth="2" />
          <path d="M50 100 Q75 50 100 50" fill="none" stroke="white" strokeWidth="2" />
        </svg>
        
        {/* Percentage */}
        <div style={{ 
          color: 'var(--deep-black)', 
          fontSize: '2rem', 
          fontWeight: 900, 
          zIndex: 10,
          fontFamily: 'Outfit, sans-serif'
        }}>
          {progress}%
        </div>
      </motion.div>
    </div>
    
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'white', fontSize: '1rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '10px' }}>Fighters Academy</h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Preparing Your Gear...</p>
    </div>
  </motion.div>
);

const App = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [loadProgress, setLoadProgress] = React.useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(false);
  const { scrollY } = useScroll();

  React.useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > window.innerHeight * 4.2) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    });
  }, [scrollY]);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && <GlobalLoader progress={loadProgress} />}
      </AnimatePresence>

      <motion.div 
        className="app-wrapper" 
        style={{ 
          position: 'relative',
          opacity: isLoaded ? 1 : 0,
          visibility: isLoaded ? 'visible' : 'hidden'
        }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* Full Width Glassmorphism Header */}
        <AnimatePresence>
          {showHeader && (
            <motion.header 
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: isMobile ? '70px' : '90px',
                zIndex: 1100,
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(223, 255, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                padding: isMobile ? '0 20px' : '0 60px',
                justifyContent: 'space-between'
              }}
            >
              {/* ... nav content ... */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                {!isMobile && (
                  <div style={{ display: 'flex', gap: '30px', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>
                    <a href="#reviews" style={{ textDecoration: 'none', color: 'inherit' }}>Reviews</a>
                    <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>About</a>
                    <a href="#facilities" style={{ textDecoration: 'none', color: 'inherit' }}>Facilities</a>
                    <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</a>
                  </div>
                )}
                {isMobile ? (
                  <button onClick={() => setIsMenuOpen(true)} style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--deep-black)', display: 'flex', alignItems: 'center' }}>
                    <Menu size={28} />
                  </button>
                ) : (
                  <button style={{ backgroundColor: 'var(--deep-black)', color: 'white', padding: '12px 35px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}>
                    BOOK NOW
                  </button>
                )}
              </div>
            </motion.header>
          )}
        </AnimatePresence>

        <GraffitiLayer />

        {/* Scroll Progress Bar */}
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            backgroundColor: 'var(--tennis-green)',
            transformOrigin: '0%',
            zIndex: 1000,
            scaleX
          }}
        />

        {/* Full Screen Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: 'var(--deep-black)',
                zIndex: 2000,
                display: 'flex',
                flexDirection: 'column',
                padding: '40px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setIsMenuOpen(false)} style={{ backgroundColor: 'transparent', border: 'none', color: 'white' }}>
                  <X size={40} />
                </button>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '30px' }}>
                {['REVIEWS', 'ABOUT', 'FACILITIES', 'CONTACT'].map((item, i) => (
                  <motion.a key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} style={{ fontSize: '3rem', fontWeight: 900, textDecoration: 'none', color: 'white', letterSpacing: '-0.02em' }}>
                    {item}<span style={{ color: 'var(--tennis-green)' }}>.</span>
                  </motion.a>
                ))}
              </div>
              <div style={{ marginTop: 'auto' }}>
                <button style={{ width: '100%', backgroundColor: 'var(--tennis-green)', color: 'black', padding: '25px', borderRadius: '20px', border: 'none', fontWeight: 900, fontSize: '1.2rem' }}>
                  BOOK A COURT NOW
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Hero 
          onProgress={(p) => setLoadProgress(p)} 
          onLoadComplete={() => setIsLoaded(true)} 
        />
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'transparent', color: 'var(--deep-black)' }}> 
        <Testimonials isMobile={isMobile} />
      </div>

      {/* Rest of the sections remain the same... */}
      {/* About Section */}
      <section id="about" className="section-padding" style={{ position: 'relative', zIndex: 5, backgroundColor: 'var(--base-creamy)', color: 'var(--deep-black)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '80px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ 
                fontSize: isMobile ? '3rem' : '5rem', 
                lineHeight: 1, 
                marginBottom: '30px',
                color: 'var(--tennis-green)',
                textShadow: '0 0 10px rgba(223, 255, 0, 0.5), 5px 5px 0px rgba(0,0,0,0.8)',
                WebkitTextStroke: '1px black'
              }}>URBAN <br /><span>COURTS</span></h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#444' }}>
                Fighters Tennis Academy brings a raw, high-energy street aesthetic to the world of luxury tennis. We aren't just an academy; we are a movement.
              </p>
              <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '15px', flex: 1 }}>
                  <h3 style={{ fontSize: '1.5rem' }}>50+</h3>
                  <p style={{ textTransform: 'uppercase', fontSize: '0.6rem' }}>Active Fighters</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '15px', flex: 1 }}>
                  <h3 style={{ fontSize: '1.5rem' }}>4.9</h3>
                  <p style={{ textTransform: 'uppercase', fontSize: '0.6rem' }}>Google Rating</p>
                </div>
              </div>
            </motion.div>
            <div style={{ 
              height: isMobile ? '300px' : '500px', 
              backgroundColor: 'var(--tennis-green)', 
              borderRadius: '30px', 
              transform: isMobile ? 'none' : 'rotate(-2deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: isMobile ? 'none' : '20px 20px 0px var(--deep-black)'
            }}>
              <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundImage: 'url("/images/brave_screenshot_www.google.com.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '20px',
                transform: isMobile ? 'none' : 'rotate(2deg)'
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" style={{ backgroundColor: 'var(--deep-black)', color: 'white' }} className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ 
              fontSize: isMobile ? '2.5rem' : '3rem',
              color: 'var(--tennis-green)',
              textShadow: '0 0 10px rgba(223, 255, 0, 0.3)'
            }}>Our Facilities</h2>
            <div style={{ width: '100px', height: '4px', backgroundColor: 'var(--tennis-green)', margin: '20px auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '30px' }}>
            {[
              { name: 'Championship Courts', desc: 'Premium hard courts with professional lighting.', img: '/images/brave_screenshot_www.google.com (1).png' },
              { name: 'Expert Coaching', desc: 'Step-by-step guidance for beginners and pros alike.', img: '/images/brave_screenshot_www.google.com (2).png' },
              { name: 'Community Events', desc: 'Regular tournaments and social tennis mixers.', img: '/images/brave_screenshot_www.google.com (3).png' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                style={{ borderRadius: '20px', overflow: 'hidden', backgroundColor: '#111' }}
              >
                <div style={{ height: '250px', backgroundImage: `url("${item.img}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: '30px' }}>
                  <h3>{item.name}</h3>
                  <p style={{ color: '#888', marginTop: '10px' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '50px' : '100px' }}>
            <div>
              <h2 style={{ fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 900 }}>VISIT US<span style={{ color: 'var(--tennis-green)' }}>.</span></h2>
              <p style={{ color: '#666', marginTop: '20px', fontSize: '1.1rem' }}>
                Join us at our Olaya facility. We're open late every day to accommodate your schedule.
              </p>
              
              <div style={{ marginTop: '50px' }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--soft-gray)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin color="black" size={24} />
                  </div>
                  <div>
                    <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 800 }}>Location</h4>
                    <p style={{ color: '#666', marginTop: '5px' }}>Al Olaya, Riyadh 12211, Saudi Arabia</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--soft-gray)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone color="black" size={24} />
                  </div>
                  <div>
                    <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 800 }}>Contact</h4>
                    <p style={{ color: '#666', marginTop: '5px' }}>054 379 3628</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                  <a 
                    href="https://wa.me/966543793628" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      backgroundColor: '#25D366', 
                      color: 'white', 
                      padding: '15px 30px', 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                  >
                    <MessageCircle size={20} /> WHATSAPP
                  </a>
                  <a 
                    href="https://maps.app.goo.gl/B4673Z2S4N8K5X5R9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      backgroundColor: 'var(--deep-black)', 
                      color: 'white', 
                      padding: '15px 30px', 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                  >
                    <ExternalLink size={20} /> VISIT US
                  </a>
                </div>
              </div>
            </div>

            <div style={{ 
              height: isMobile ? '350px' : '500px', 
              backgroundColor: 'var(--soft-gray)', 
              borderRadius: '30px', 
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid rgba(223, 255, 0, 0.2)'
            }}>
              {/* Interactive Google Map Iframe */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5168541437!2d46.6719!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f032255555555%3A0x5555555555555555!2sFighters%20Tennis%20Academy!5e0!3m2!1sen!2ssa!4v1620000000000!5m2!1sen!2ssa" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9) hue-rotate(180deg)' }} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
              <div style={{ 
                position: 'absolute', 
                bottom: '20px', 
                left: '20px', 
                right: '20px',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                padding: '20px',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10
              }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Al Olaya, Riyadh</h4>
                  <p style={{ margin: '5px 0 0', fontSize: '0.7rem', color: '#666' }}>Kingdom's Premier Tennis Hub</p>
                </div>
                <a href="https://maps.app.goo.gl/B4673Z2S4N8K5X5R9" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'var(--deep-black)', color: 'white', padding: '10px 20px', borderRadius: '10px', fontSize: '0.7rem', textDecoration: 'none', fontWeight: 800 }}>
                  DIRECTIONS
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--deep-black)', color: 'white', padding: '80px 0 40px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr', gap: '60px' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '20px' }}>FIGHTERS<span style={{ color: 'var(--tennis-green)' }}>.</span></h2>
              <p style={{ color: '#888', maxWidth: '400px', lineHeight: 1.6 }}>
                Elevating the game in Riyadh through professional coaching and a high-energy urban tennis community.
              </p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
                <Instagram size={24} style={{ cursor: 'pointer' }} />
                <Facebook size={24} style={{ cursor: 'pointer' }} />
                <Twitter size={24} style={{ cursor: 'pointer' }} />
              </div>
            </div>
            <div>
              <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '25px', color: 'var(--tennis-green)' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '15px' }}>
                <li><a href="#about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</a></li>
                <li><a href="#facilities" style={{ color: '#ccc', textDecoration: 'none' }}>Facilities</a></li>
                <li><a href="#reviews" style={{ color: '#ccc', textDecoration: 'none' }}>Reviews</a></li>
                <li><a href="#contact" style={{ color: '#ccc', textDecoration: 'none' }}>Location</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '25px', color: 'var(--tennis-green)' }}>Contact</h4>
              <p style={{ color: '#ccc', marginBottom: '10px' }}>Al Olaya, Riyadh</p>
              <p style={{ color: '#ccc', marginBottom: '10px' }}>+966 54 379 3628</p>
              <p style={{ color: '#ccc' }}>info@fighterstennis.com</p>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '80px', 
            paddingTop: '30px', 
            borderTop: '1px solid #222', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '20px' : '0'
          }}>
            <p style={{ color: '#666', fontSize: '0.8rem' }}>
              © 2026 Fighters Tennis Academy. All rights reserved.
            </p>
            <p style={{ color: '#888', fontSize: '0.8rem', fontWeight: 600 }}>
              Website built by <span style={{ color: 'white', fontWeight: 800 }}>Epoch Studios</span>
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
    </>
  );
};

export default App;
