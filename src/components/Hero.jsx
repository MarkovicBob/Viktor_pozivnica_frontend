import React from 'react'
import { motion } from 'framer-motion'
import { FaBirthdayCake } from 'react-icons/fa'
import FloatingBubbles from './FloatingBubbles.jsx'
import { event } from '../config.js'
export default function Hero({ scrollToRsvp }){
  return(<section className="relative overflow-hidden">
    {/* Teddy bear in top left corner */}
    <motion.div 
      className="absolute top-0 left-0 z-20 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 float-animation"
      initial={{ y: -100, rotate: -10, opacity: 0 }}
      animate={{ y: 0, rotate: 0, opacity: 1 }}
      transition={{ 
        duration: 1, 
        type: "spring",
        stiffness: 50 
      }}
      whileHover={{ 
        rotate: [0, -5, 5, -5, 0],
        scale: 1.1,
        transition: { duration: 0.6 } 
      }}
    >
      <img 
        src="/teddy_bear.png" 
        alt="Teddy Bear" 
        className="w-full h-full object-contain" 
        style={{ 
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
          transformOrigin: 'center bottom',
          transform: 'scale(1.2)'
        }}
      />
    </motion.div>
    
    <div className="hero-grad"><div className="section py-20 sm:py-28 text-center text-white relative">
      <motion.h1 
        initial={{opacity:0,y:20}} 
        animate={{opacity:1,y:0}} 
        transition={{duration:0.7}} 
        className="text-5xl sm:text-7xl font-bold drop-shadow-lg tracking-wide font-script"
        style={{ 
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          lineHeight: '1.2'
        }}
      >
        {event.title}
      </motion.h1>
      <motion.p 
        initial={{opacity:0,y:20}} 
        animate={{opacity:1,y:0}} 
        transition={{duration:0.9,delay:0.1}} 
        className="mt-6 text-lg sm:text-xl opacity-95 font-cute"
      >
        Dođite da zajedno duvamo svećicu, jedemo tortu i pravimo uspomene! 🎈
      </motion.p>
      <motion.div 
        initial={{opacity:0,y:20}} 
        animate={{opacity:1,y:0}} 
        transition={{duration:0.9,delay:0.2}} 
        className="mt-8 flex justify-center"
      >
  <button type="button" className="btn btn-primary text-lg" onClick={scrollToRsvp}><FaBirthdayCake/> Potvrdi dolazak</button>
      </motion.div>
      </div>
    </div>
    
    {/* FloatingBubbles positioned behind everything except the teddy bear */}
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      <FloatingBubbles/>
    </div>
  </section>)}
