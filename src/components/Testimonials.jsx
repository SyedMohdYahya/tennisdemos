import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
    <section id="reviews" style={{ overflow: 'hidden', backgroundColor: '#fafafc' }} className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
          <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
            WHAT <span style={{ color: 'var(--tennis-green)' }}>FIGHTERS</span> SAY
          </h2>
          <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--tennis-green)', margin: '15px auto 0' }} />
        </div>

        <div style={{ position: 'relative', minHeight: isMobile ? '280px' : '320px', maxWidth: '900px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <Quote size={isMobile ? 28 : 40} color="var(--tennis-green)" style={{ flexShrink: 0, marginTop: '5px', opacity: 0.5 }} />
                <div>
                  <p style={{
                    fontSize: isMobile ? '1.05rem' : '1.5rem',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: 'var(--deep-black)',
                    fontFamily: 'var(--font-main)',
                    letterSpacing: '-0.01em',
                    margin: 0
                  }}>
                    {reviews[index].quote}
                  </p>

                  <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      backgroundColor: 'var(--tennis-green)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', color: 'var(--deep-black)'
                    }}>
                      A
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>{reviews[index].author}</h4>
                      <p style={{ fontSize: '0.75rem', color: '#888', margin: '2px 0 0' }}>{reviews[index].role}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="var(--tennis-green)" color="var(--tennis-green)" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', gap: '10px', marginTop: '30px', justifyContent: 'center' }}>
            <button onClick={prev}
              style={{
                width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #eee',
                display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',
                cursor: 'pointer', WebkitTapHighlightColor: 'transparent'
              }}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={next}
              style={{
                width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #eee',
                display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',
                cursor: 'pointer', WebkitTapHighlightColor: 'transparent'
              }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
