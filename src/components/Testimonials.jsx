import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ExternalLink } from 'lucide-react';

const Testimonials = ({ isMobile }) => {
  const reviews = [
    {
      quote: "Coach Amin is excellent, patient, and professional. He explains techniques step-by-step, making it easy for beginners.",
      author: "Arafah Ebraheem",
      role: "Local Guide",
      initial: "A",
      rotate: -1
    },
    {
      quote: "The lessons are about more than just skills—they are about enjoying the game in a friendly, motivating atmosphere.",
      author: "Sarah J.",
      role: "Tennis Enthusiast",
      initial: "S",
      rotate: 2
    },
    {
      quote: "I highly recommend Fighter Tennis Academy for anyone starting their journey with confidence and pure enjoyment!",
      author: "Omar K.",
      role: "Pro Member",
      initial: "O",
      rotate: -2
    },
    {
      quote: "Best facility in Riyadh. The urban vibe combined with world-class coaching is something you won't find anywhere else.",
      author: "Layla M.",
      role: "Local Resident",
      initial: "L",
      rotate: 1
    },
    {
      quote: "Transformed my backhand in just 4 sessions. The focus on detail is incredible.",
      author: "Khalid A.",
      role: "Advanced Player",
      initial: "K",
      rotate: -1
    }
  ];

  const Row = ({ items, reverse = false }) => (
    <div style={{ display: 'flex', overflow: 'hidden', padding: '20px 0' }}>
      <motion.div
        animate={{ x: reverse ? [0, -1000] : [-1000, 0] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ display: 'flex', gap: '30px', flexShrink: 0 }}
      >
        {[...items, ...items, ...items].map((review, i) => (
          <motion.div
            key={i}
            whileHover={{ 
              scale: 1.02, 
              y: -10,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              borderColor: 'var(--tennis-green)'
            }}
            style={{
              width: isMobile ? '300px' : '400px',
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '0px',
              border: '1px solid rgba(0,0,0,0.05)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px',
              transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
              boxShadow: '10px 10px 0px rgba(0,0,0,0.02)',
              cursor: 'default'
            }}
          >
            {/* Quote Icon */}
            <div style={{ 
              position: 'absolute', top: '20px', right: '30px', 
              opacity: 0.1, color: 'var(--tennis-green)' 
            }}>
              <Quote size={60} fill="currentColor" />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--tennis-green)" color="var(--tennis-green)" />
                ))}
              </div>
              <p style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                lineHeight: 1.6,
                color: 'var(--deep-black)',
                letterSpacing: '-0.01em',
                margin: 0
              }}>
                "{review.quote}"
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                backgroundColor: 'var(--deep-black)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', color: 'var(--tennis-green)',
                boxShadow: '4px 4px 0px var(--tennis-green)'
              }}>
                {review.initial}
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 900, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{review.author}</h4>
                <p style={{ fontSize: '0.75rem', color: '#999', margin: '2px 0 0', fontWeight: 700, textTransform: 'uppercase' }}>{review.role}</p>
              </div>
              <ExternalLink size={16} style={{ marginLeft: 'auto', opacity: 0.2 }} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section id="reviews" style={{ overflow: 'hidden', backgroundColor: 'var(--base-creamy)', padding: '120px 0' }}>
      <div className="container" style={{ marginBottom: '60px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <span style={{ 
            fontSize: '0.85rem', fontWeight: 900, color: 'var(--tennis-green)', 
            textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: '20px', display: 'block' 
          }}>
            Community Voice
          </span>
          <h2 style={{ 
            fontSize: isMobile ? '3rem' : '5rem', 
            fontWeight: 900, 
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
            lineHeight: 1
          }}>
            THE <span style={{ 
              color: 'var(--tennis-green)', 
              fontFamily: "'Sedgwick Ave Display', cursive",
              textTransform: 'none',
              fontSize: isMobile ? '3.5rem' : '6rem'
            }}>Fighters</span> FEEDBACK
          </h2>
        </motion.div>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Gradient Overlays */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '200px', height: '100%', 
          background: 'linear-gradient(to right, var(--base-creamy), transparent)', zIndex: 10, pointerEvents: 'none' 
        }} />
        <div style={{ 
          position: 'absolute', top: 0, right: 0, width: '200px', height: '100%', 
          background: 'linear-gradient(to left, var(--base-creamy), transparent)', zIndex: 10, pointerEvents: 'none' 
        }} />

        <Row items={reviews} />
      </div>

      <div className="container" style={{ marginTop: '60px', textAlign: 'center' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '10px', 
            padding: '12px 25px', backgroundColor: 'white', borderRadius: '50px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer',
            border: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <Star size={18} fill="var(--tennis-green)" color="var(--tennis-green)" />
          <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>4.9/5 Based on 100+ Reviews</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
