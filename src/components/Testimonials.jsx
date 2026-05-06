import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = ({ isMobile }) => {
  const [index, setIndex] = useState(0);

  const reviews = [
    {
      quote: "Coach Amin is excellent, patient, and professional. He explains techniques step-by-step, making it easy for beginners to build a solid foundation.",
      author: "Arafah Ebraheem",
      role: "Local Guide • 28 reviews",
      rating: 5
    },
    {
      quote: "The lessons are about more than just skills—they are about enjoying the game in a friendly, supportive, and motivating atmosphere.",
      author: "Arafah Ebraheem",
      role: "Local Guide • 28 reviews",
      rating: 5
    },
    {
      quote: "I highly recommend Fighter Tennis Academy for anyone starting their journey with confidence and pure enjoyment!",
      author: "Arafah Ebraheem",
      role: "Local Guide • 28 reviews",
      rating: 5
    }
  ];

  const next = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section id="reviews" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }} className="section-padding">
      <div className="container">
        <div style={{ position: 'relative', minHeight: isMobile ? '350px' : '450px' }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: isMobile ? '10px' : '30px' }}>
            {/* Static Tennis Ball Green Quotation - Inline with text */}
            <div style={{ 
              fontSize: isMobile ? '3rem' : '8rem', 
              color: 'var(--tennis-green)', 
              fontFamily: 'serif',
              lineHeight: 0.8,
              marginTop: isMobile ? '5px' : '15px',
              opacity: 0.8,
              flexShrink: 0
            }}>“</div>

            <div style={{ flex: 1 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} // Smoother cubic-bezier for phone
                >
                  {/* Quote Text */}
                  <h2 style={{ 
                    fontSize: isMobile ? '1.4rem' : '3.8rem', 
                    fontWeight: 800, 
                    lineHeight: 1.2, 
                    color: 'var(--deep-black)',
                    maxWidth: '1100px',
                    fontFamily: 'var(--font-main)',
                    letterSpacing: '-0.02em',
                    margin: 0
                  }}>
                    {reviews[index].quote}
                  </h2>

                  {/* Author Info */}
                  <div style={{ 
                    marginTop: isMobile ? '40px' : '60px', 
                    display: 'flex', 
                    alignItems: isMobile ? 'flex-start' : 'center', 
                    justifyContent: 'space-between',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '30px' : '0',
                    borderTop: '1px solid #eee',
                    paddingTop: '30px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ width: '3px', height: '40px', backgroundColor: 'var(--tennis-green)' }} />
                      <span style={{ textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#888', fontWeight: 700 }}>
                        Review 0{index + 1}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ 
                        width: isMobile ? '50px' : '70px', 
                        height: isMobile ? '50px' : '70px', 
                        borderRadius: '50%', 
                        backgroundColor: 'var(--soft-gray)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        color: 'var(--deep-black)',
                        border: '2px solid var(--tennis-green)'
                      }}>
                        A
                      </div>
                      <div>
                        <h4 style={{ fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: 800 }}>{reviews[index].author}</h4>
                        <p style={{ fontSize: '0.8rem', color: '#888' }}>{reviews[index].role}</p>
                        <div style={{ display: 'flex', gap: '2px', marginTop: '5px' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill="var(--tennis-green)" color="var(--tennis-green)" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Slider Controls */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            marginTop: '30px',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <button 
              onClick={prev}
              style={{
                width: isMobile ? '50px' : '60px',
                height: isMobile ? '50px' : '60px',
                borderRadius: '50%',
                border: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next}
              style={{
                width: isMobile ? '50px' : '60px',
                height: isMobile ? '50px' : '60px',
                borderRadius: '50%',
                border: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
