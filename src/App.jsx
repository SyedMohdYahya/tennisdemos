import React from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Calendar, MapPin, Phone, Star, MessageCircle, ExternalLink, Instagram, Facebook, Twitter, Menu, X, ArrowRight, Award, CheckCircle } from 'lucide-react';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import FacilitiesPage from './pages/FacilitiesPage';

const GraffitiLayer = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'var(--base-creamy)' }} />
  </div>
);

const GlobalLoader = ({ progress }) => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
      backgroundColor: 'var(--deep-black)', zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px'
    }}
  >
    <div style={{ position: 'relative', width: '150px', height: '150px' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{
          width: '100%', height: '100%', backgroundColor: 'var(--tennis-green)',
          borderRadius: '50%', position: 'relative', overflow: 'hidden',
          boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.2), 0 0 50px rgba(223, 255, 0, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid rgba(0,0,0,0.1)'
        }}
      >
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.4 }}>
          <path d="M0 50 Q25 50 50 0" fill="none" stroke="white" strokeWidth="2" />
          <path d="M50 100 Q75 50 100 50" fill="none" stroke="white" strokeWidth="2" />
        </svg>
        <div style={{ color: 'var(--deep-black)', fontSize: '2rem', fontWeight: 900, zIndex: 10, fontFamily: 'var(--font-main)' }}>
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

const Footer = ({ isMobile, navigateTo }) => (
  <footer style={{ 
    backgroundColor: 'var(--deep-black)', 
    color: 'white', 
    padding: '100px 0 60px',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 20
  }}>
    {/* Large Silhouette Background Element */}
    <div style={{
      position: 'absolute',
      bottom: '-10%',
      right: isMobile ? '-20%' : '5%',
      width: isMobile ? '300px' : '600px',
      height: isMobile ? '400px' : '800px',
      backgroundImage: 'url("/tennis_player_silhouette_footer_v2_1778373546936.png")',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom right',
      opacity: 0.1,
      filter: 'invert(1) brightness(2)', // Making the black silhouette white and subtle
      pointerEvents: 'none',
      zIndex: 0
    }} />

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1.5fr', gap: isMobile ? '60px' : '100px' }}>
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '30px', cursor: 'pointer' }} 
            onClick={() => navigateTo('home')}
          >
            FIGHTERS<span style={{ color: 'var(--tennis-green)' }}>.</span>
          </motion.div>
          <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '400px', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '40px' }}>
            Unleashing the raw energy of urban tennis in Riyadh. Join the community where high-performance meets street aesthetic.
          </p>
          <div style={{ display: 'flex', gap: '25px' }}>
            {[
              { icon: <Instagram size={24} />, href: '#' },
              { icon: <Facebook size={24} />, href: '#' },
              { icon: <Twitter size={24} />, href: '#' }
            ].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -5, color: 'var(--tennis-green)' }}
                href={social.href}
                style={{ 
                  color: 'white', 
                  backgroundColor: 'rgba(255,255,255,0.05)', 
                  width: '50px', height: '50px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.25em', marginBottom: '35px', color: 'var(--tennis-green)', fontWeight: 900 }}>Directory</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '20px' }}>
            {[
              { label: 'The Academy', target: 'about' },
              { label: 'Our Facilities', target: 'facilities' },
              { label: 'Player Reviews', target: 'reviews-home' },
              { label: 'Join the Movement', target: 'contact' }
            ].map((link, i) => (
              <li key={i}>
                <motion.span 
                  whileHover={{ x: 10, color: 'var(--tennis-green)' }}
                  onClick={() => navigateTo(link.target)} 
                  style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    textDecoration: 'none', 
                    cursor: 'pointer', 
                    fontSize: '1rem', 
                    fontWeight: 600,
                    display: 'inline-block',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {link.label}
                </motion.span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.02)', 
          padding: '45px', 
          borderRadius: '35px', 
          border: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <h4 style={{ textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.25em', marginBottom: '35px', color: 'var(--tennis-green)', fontWeight: 900 }}>Headquarters</h4>
          <div style={{ display: 'grid', gap: '30px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(188, 224, 36, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={20} style={{ color: 'var(--tennis-green)' }} />
              </div>
              <div>
                <p style={{ fontWeight: 800, marginBottom: '5px', fontSize: '1.1rem' }}>Al Olaya Street</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.5 }}>Al Bilad Bank Metro Station,<br/> Riyadh, Saudi Arabia</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(188, 224, 36, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={20} style={{ color: 'var(--tennis-green)' }} />
              </div>
              <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>+966 54 379 3628</p>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(188, 224, 36, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MessageCircle size={20} style={{ color: 'var(--tennis-green)' }} />
              </div>
              <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>info@fighterstennis.com</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '100px', 
        paddingTop: '40px', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row', 
        gap: '30px'
      }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>
          &copy; 2026 Fighters Tennis Academy. Built with passion by <span style={{ color: 'white', fontWeight: 800 }}>Epoch Studios</span>.
        </p>
        <div style={{ display: 'flex', gap: '40px', color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <motion.span whileHover={{ color: 'white' }} style={{ cursor: 'pointer' }}>Privacy</motion.span>
          <motion.span whileHover={{ color: 'white' }} style={{ cursor: 'pointer' }}>Terms</motion.span>
          <motion.span whileHover={{ color: 'white' }} style={{ cursor: 'pointer' }}>Cookie Policy</motion.span>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [loadProgress, setLoadProgress] = React.useState(0);
  const [page, setPage] = React.useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [isMobile, setIsMobile] = React.useState(() => window.matchMedia('(max-width: 767px)').matches);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(false);
  const { scrollY } = useScroll();

  React.useEffect(() => {
    return scrollY.on("change", (latest) => {
      const threshold = window.innerHeight * (isMobile ? 4.1 : 3.2);
      const nextShowHeader = latest > threshold;
      setShowHeader((current) => (current === nextShowHeader ? current : nextShowHeader));
    });
  }, [isMobile, scrollY]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (event) => setIsMobile(event.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const navigateTo = (target) => {
    if (target === 'reviews-home') {
      setPage('home');
      setTimeout(() => {
        document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (target === 'home') {
      setPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPage(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToSection = (id) => {
    if (page !== 'home') {
      setPage('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const showHeaderAlways = page !== 'home';
  const isHeaderVisible = showHeaderAlways || showHeader;
  const handleHeroProgress = React.useCallback((progress) => {
    setLoadProgress((current) => (current === progress ? current : progress));
  }, []);
  const handleHeroLoadComplete = React.useCallback(() => {
    setLoadProgress(100);
    setIsLoaded(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && <GlobalLoader progress={loadProgress} />}
      </AnimatePresence>

      <motion.div
        className="app-wrapper"
        style={{ position: 'relative', opacity: isLoaded ? 1 : 0, visibility: isLoaded ? 'visible' : 'hidden' }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <motion.header
          initial={false}
          animate={isHeaderVisible ? { y: 0, opacity: 1 } : { y: -96, opacity: 0 }}
          transition={{ duration: isHeaderVisible ? 0.42 : 0.24, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%',
            height: isMobile ? '70px' : '90px', zIndex: 1100,
            background: isHeaderVisible
              ? showHeaderAlways ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.46)'
              : 'rgba(255, 255, 255, 0)',
            backdropFilter: isHeaderVisible ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isHeaderVisible ? 'blur(12px)' : 'none',
            borderBottom: isHeaderVisible ? '1px solid rgba(223, 255, 0, 0.2)' : '1px solid rgba(223, 255, 0, 0)',
            display: 'flex', alignItems: 'center',
            padding: isMobile ? '0 20px' : '0 60px', justifyContent: 'space-between',
            pointerEvents: isHeaderVisible ? 'auto' : 'none',
            willChange: 'transform, opacity'
          }}
        >
            <div style={{ fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer' }} onClick={() => navigateTo('home')}>
              FIGHTERS<span style={{ color: 'var(--tennis-green)' }}>.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
              {!isMobile && (
                <div style={{ display: 'flex', gap: '30px', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>
                  <span onClick={() => scrollToSection('reviews')} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>Reviews</span>
                  <span onClick={() => navigateTo('about')} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>About</span>
                  <span onClick={() => navigateTo('facilities')} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>Facilities</span>
                  <span onClick={() => navigateTo('contact')} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>Contact</span>
                </div>
              )}
              {isMobile ? (
                <button onClick={() => setIsMenuOpen(true)} style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--deep-black)', display: 'flex', alignItems: 'center' }}>
                  <Menu size={28} />
                </button>
              ) : (
                <button onClick={() => navigateTo('contact')} style={{ backgroundColor: 'var(--deep-black)', color: 'white', padding: '12px 35px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}>
                  BOOK NOW
                </button>
              )}
            </div>
        </motion.header>

        <GraffitiLayer />

        <motion.div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, height: '5px',
            backgroundColor: 'var(--tennis-green)', transformOrigin: '0%', zIndex: 1000, scaleX
          }}
        />

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
                backgroundColor: 'var(--deep-black)', zIndex: 2000,
                display: 'flex', flexDirection: 'column', padding: '40px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setIsMenuOpen(false)} style={{ backgroundColor: 'transparent', border: 'none', color: 'white' }}>
                  <X size={40} />
                </button>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '30px' }}>
                {[
                  { label: 'HOME', target: 'home' },
                  { label: 'ABOUT', target: 'about' },
                  { label: 'FACILITIES', target: 'facilities' },
                  { label: 'CONTACT', target: 'contact' }
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => navigateTo(item.target)}
                    style={{ fontSize: '3rem', fontWeight: 900, textDecoration: 'none', color: 'white', letterSpacing: '-0.02em', cursor: 'pointer' }}
                  >
                    {item.label}<span style={{ color: 'var(--tennis-green)' }}>.</span>
                  </motion.div>
                ))}
              </div>
              <div style={{ marginTop: 'auto' }}>
                <button onClick={() => navigateTo('contact')} style={{ width: '100%', backgroundColor: 'var(--tennis-green)', color: 'black', padding: '25px', borderRadius: '20px', border: 'none', fontWeight: 900, fontSize: '1.2rem' }}>
                  BOOK A COURT NOW
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {page === 'home' && (
          <>
            <Hero onProgress={handleHeroProgress} onLoadComplete={handleHeroLoadComplete} />

            {/* Testimonials - Reviews first */}
            <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'transparent', color: 'var(--deep-black)' }}>
              <Testimonials isMobile={isMobile} />
            </div>

            {/* Business Details - About section second */}
            <section id="about" style={{ backgroundColor: 'var(--base-creamy)', position: 'relative', overflow: 'hidden', zIndex: 10 }}>
              {/* Background Graffiti Ghost Text */}
              <div style={{
                position: 'absolute',
                top: '10%',
                right: '-5%',
                fontFamily: "'Sedgwick Ave Display', cursive",
                fontSize: '15vw',
                color: 'var(--tennis-green)',
                opacity: 0.05,
                transform: 'rotate(-5deg)',
                pointerEvents: 'none',
                zIndex: -1,
                whiteSpace: 'nowrap'
              }}>
                STREET TENNIS
              </div>

              <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px', position: 'relative' }}>
                {/* SVG Splatters */}
                <svg style={{ position: 'absolute', top: '10%', left: '-20px', opacity: 0.1, zIndex: -1 }} width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="20" cy="20" r="15" fill="var(--tennis-green)" />
                  <circle cx="50" cy="30" r="10" fill="var(--tennis-green)" />
                  <circle cx="30" cy="60" r="12" fill="var(--tennis-green)" />
                </svg>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr',
                  gap: isMobile ? '40px' : '80px',
                  alignItems: 'center'
                }}>
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      style={{
                        fontSize: '0.85rem', letterSpacing: '0.3em', fontWeight: 900,
                        color: 'var(--tennis-green)', textTransform: 'uppercase', marginBottom: '20px',
                        display: 'flex', alignItems: 'center', gap: '10px'
                      }}>
                      <div style={{ width: '30px', height: '2px', backgroundColor: 'var(--tennis-green)' }} />
                      About the Academy
                    </motion.h3>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      style={{
                        fontSize: isMobile ? '2.5rem' : '4rem',
                        fontWeight: 900, lineHeight: 0.95, marginBottom: '30px',
                        textTransform: 'uppercase', letterSpacing: '-0.04em',
                        fontFamily: "var(--font-accent)"
                      }}>
                      Fighters Tennis <span style={{ color: 'var(--tennis-green)', fontStyle: 'italic' }}>Academy</span>
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      style={{ color: '#444', lineHeight: 1.6, marginBottom: '20px', fontSize: '1.1rem', maxWidth: '90%' }}>
                      Located in the prestigious Al Olaya District on Al Bilad Bank metro station, <span style={{ fontWeight: 700, color: 'var(--deep-black)' }}>Fighters Tennis Academy</span> brings a raw, high-energy street aesthetic to the world of luxury tennis.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      style={{ color: '#666', lineHeight: 1.6, marginBottom: '30px', fontSize: '1rem', maxWidth: '90%' }}>
                      We offer a range of facilities and services for tennis enthusiasts, including booking courts, viewing court calendars, and connecting with local players. Our Al Olaya Street address makes us easily accessible for anyone looking to engage in high-performance training.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                      {['Premium Courts', 'Expert Coaches', 'Vibrant Community'].map((tag, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05, backgroundColor: 'var(--deep-black)', color: 'white' }}
                          style={{
                            backgroundColor: '#fff', padding: '10px 24px',
                            borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800,
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                            transition: 'all 0.3s', cursor: 'pointer',
                            border: '1px solid rgba(0,0,0,0.05)',
                            textTransform: 'uppercase', letterSpacing: '0.05em'
                          }}>
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '20px',
                      alignContent: 'start',
                      position: 'relative'
                    }}
                  >
                    {/* Background Decorative Cross */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03, pointerEvents: 'none', zIndex: 0 }}>
                      <svg width="400" height="400" viewBox="0 0 100 100">
                        <path d="M50 0 L50 100 M0 50 L100 50" stroke="black" strokeWidth="1" />
                      </svg>
                    </div>

                    {[
                      { icon: <MapPin size={28} />, value: 'Al Olaya', label: 'Prime Location', rotate: -1 },
                      { icon: <Trophy size={28} />, value: '50+', label: 'Active Fighters', rotate: 1 },
                      { icon: <Star size={28} />, value: '4.9', label: 'Google Rating', rotate: 1 },
                      { icon: <Users size={28} />, value: '100+', label: 'Happy Clients', rotate: -1 },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                        style={{
                          padding: '40px 20px', borderRadius: '30px',
                          backgroundColor: '#fff', textAlign: 'center',
                          transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                          transform: isMobile ? 'none' : `rotate(${item.rotate}deg)`,
                          border: '1px solid rgba(0,0,0,0.03)',
                          position: 'relative',
                          zIndex: 1
                        }}>
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', stiffness: 200, delay: 0.4 + i * 0.1 }}
                          style={{ color: 'var(--tennis-green)', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                          <div style={{ padding: '12px', borderRadius: '18px', backgroundColor: 'var(--base-creamy)' }}>
                            {item.icon}
                          </div>
                        </motion.div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em', color: 'var(--deep-black)' }}>{item.value}</h3>
                        <p style={{ color: '#999', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginTop: '8px' }}>{item.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Best Tennis Lessons - at the bottom, green background, hover scroll */}
            <section
              style={{
                position: 'relative', zIndex: 10,
                backgroundColor: 'var(--tennis-green)', overflow: 'hidden',
                padding: isMobile ? '80px 0' : '150px 0'
              }}
            >
              {/* Floating Decorative Elements */}
              {!isMobile && [
                { top: '15%', left: '10%', rotate: 15 },
                { top: '65%', left: '5%', rotate: -20 },
                { top: '25%', right: '8%', rotate: 45 },
                { top: '75%', right: '12%', rotate: -10 }
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [pos.rotate, pos.rotate + 10, pos.rotate]
                  }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: 'absolute', top: pos.top, left: pos.left, right: pos.right,
                    width: '60px', height: '60px', borderRadius: '50%',
                    backgroundColor: 'var(--deep-black)', opacity: 0.05,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <Trophy size={30} />
                </motion.div>
              ))}

              {/* Marquee Background Track */}
              <div style={{
                position: 'absolute', top: '15%', left: 0, width: '200%',
                display: 'flex', whiteSpace: 'nowrap', pointerEvents: 'none',
                opacity: 0.12, transform: 'rotate(-3deg)', zIndex: 0
              }}>
                <style>{`
                  @keyframes marquee-fun {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                `}</style>
                <div style={{ animation: 'marquee-fun 25s linear infinite', display: 'flex', gap: '80px', fontSize: '10vw', fontWeight: 900, fontFamily: "'Sedgwick Ave Display', cursive" }}>
                  <span>BORN IN THE STREETS • PLAY LIKE A PRO • NO EXCUSES • BORN IN THE STREETS • </span>
                </div>
              </div>

              <div
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <motion.div
                  className="container"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    initial={{ opacity: 0, rotate: -10 }}
                    whileInView={{ opacity: 1, rotate: -2 }}
                    viewport={{ once: true }}
                    style={{
                      display: 'inline-block', padding: '12px 30px', backgroundColor: 'var(--deep-black)',
                      color: 'var(--tennis-green)', borderRadius: '4px', fontSize: '0.9rem',
                      fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px',
                      boxShadow: '8px 8px 0px rgba(0,0,0,0.1)'
                    }}>
                    Elite Tennis Experience
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                      fontSize: isMobile ? '3.5rem' : '8.5rem',
                      fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.06em',
                      maxWidth: '1300px', margin: '0 auto', textTransform: 'uppercase',
                      color: 'var(--deep-black)', position: 'relative'
                    }}>
                    <span style={{ display: 'block' }}>Best Tennis Lessons</span>
                    <span style={{ 
                      color: 'white', 
                      fontSize: isMobile ? '4.5rem' : '10rem',
                      fontFamily: "'Sedgwick Ave Display', cursive",
                      display: 'block',
                      marginTop: '0px',
                      transform: 'rotate(-3deg)',
                      textShadow: '8px 8px 0px rgba(0,0,0,0.1)'
                    }}>
                      in Riyadh
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                      color: 'rgba(0,0,0,0.85)', fontSize: isMobile ? '1.1rem' : '1.6rem',
                      maxWidth: '800px', margin: '50px auto 40px', lineHeight: 1.4,
                      fontWeight: 600, letterSpacing: '-0.01em'
                    }}>
                    Ready to crush it? Our world-class facilities and expert coaches are waiting for you in the heart of Riyadh.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '60px' }}
                  >
                    {['Private & Group', 'All Skill Levels', 'Pro Coaching'].map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 3 : -3, backgroundColor: 'var(--deep-black)', color: 'white' }}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.8)', padding: '15px 35px',
                          borderRadius: '0px', fontSize: '1rem', fontWeight: 900,
                          color: 'var(--deep-black)', boxShadow: '10px 10px 0px rgba(0,0,0,0.05)',
                          border: '2px solid var(--deep-black)', cursor: 'default',
                          textTransform: 'uppercase', transition: 'all 0.2s'
                        }}>
                        {item}
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.button
                    onClick={() => navigateTo('contact')}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', damping: 12, delay: 0.8 }}
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: 'white',
                      color: 'var(--deep-black)',
                      boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      backgroundColor: 'var(--deep-black)', color: 'white',
                      padding: '28px 80px', borderRadius: '0px', fontSize: '1.4rem',
                      fontWeight: 900, display: 'inline-flex', alignItems: 'center',
                      gap: '20px', border: 'none', cursor: 'pointer',
                      letterSpacing: '0.05em', textTransform: 'uppercase',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '15px 15px 0px rgba(0,0,0,0.2)'
                    }}
                  >
                    BOOK YOUR SLOT <ArrowRight size={28} />
                  </motion.button>
                </motion.div>
              </div>
            </section>

            <Footer isMobile={isMobile} navigateTo={navigateTo} />
          </>
        )}

        {page === 'about' && (
          <>
            <AboutPage isMobile={isMobile} navigateTo={navigateTo} />
            <Footer isMobile={isMobile} navigateTo={navigateTo} />
          </>
        )}

        {page === 'facilities' && (
          <>
            <FacilitiesPage isMobile={isMobile} navigateTo={navigateTo} />
            <Footer isMobile={isMobile} navigateTo={navigateTo} />
          </>
        )}

        {page === 'contact' && (
          <>
            <ContactPage isMobile={isMobile} />
            <Footer isMobile={isMobile} navigateTo={navigateTo} />
          </>
        )}
      </motion.div>
    </>
  );
};

export default App;
