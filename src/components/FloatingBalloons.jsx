import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const balloonColors = [
  { gradient: 'from-pink-400 to-pink-600', shine: 'bg-pink-200' },
  { gradient: 'from-purple-400 to-purple-600', shine: 'bg-purple-200' },
  { gradient: 'from-blue-400 to-blue-600', shine: 'bg-blue-200' },
  { gradient: 'from-rose-400 to-rose-600', shine: 'bg-rose-200' },
  { gradient: 'from-violet-400 to-violet-600', shine: 'bg-violet-200' },
  { gradient: 'from-fuchsia-400 to-fuchsia-600', shine: 'bg-fuchsia-200' },
];

const generateBalloons = (count) => {
  return Array.from({ length: count }).map((_, i) => {
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    return {
      id: i,
      left: Math.random() * 100,
      initialDelay: Math.random() * 5,
      duration: 20 + Math.random() * 15,
      scale: 0.5 + Math.random() * 0.7,
      rotation: -15 + Math.random() * 30,
      color: color.gradient,
      shine: color.shine,
      swayDuration: 4 + Math.random() * 2,
      swayAmount: [-20 + Math.random() * 40, -20 + Math.random() * 40],
      zIndex: Math.floor(Math.random() * 10),
    };
  });
};

export default function FloatingBalloons() {
  const [balloons, setBalloons] = useState([]);
  
  useEffect(() => {
    setBalloons(generateBalloons(12));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute bottom-0"
          style={{ left: `${balloon.left}%` }}
          initial={{ 
            y: '110vh', 
            opacity: 0,
            x: 0,
            rotate: balloon.rotation 
          }}
          animate={{
            y: [-100, '-110vh'],
            opacity: [0, 1, 1, 0],
            x: balloon.swayAmount,
            rotate: [balloon.rotation - 10, balloon.rotation + 10],
          }}
          transition={{
            y: {
              duration: balloon.duration,
              repeat: Infinity,
              delay: balloon.initialDelay,
              ease: [0.4, 0, 0.2, 1],
            },
            opacity: {
              duration: balloon.duration,
              repeat: Infinity,
              delay: balloon.initialDelay,
              times: [0, 0.1, 0.8, 1],
            },
            x: {
              duration: balloon.swayDuration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
            rotate: {
              duration: balloon.swayDuration * 1.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          <div
            className={`relative w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24
              before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br ${balloon.color}
              before:opacity-90 before:backdrop-blur-sm before:shadow-lg
              after:absolute after:inset-0 after:rounded-full after:bg-white/20 after:blur-sm
              transform-gpu group hover:scale-110 transition-transform duration-200`}
            style={{ 
              transform: `scale(${balloon.scale})`,
              zIndex: balloon.zIndex 
            }}
          >
            {/* Balloon shine effect */}
            <div className={`absolute w-4 h-4 rounded-full ${balloon.shine} opacity-50 blur-sm top-1/4 left-1/4 animate-pulse`} />
            <div className={`absolute w-2 h-2 rounded-full ${balloon.shine} opacity-30 blur-sm top-1/3 right-1/4`} />
            
            {/* Balloon knot and string */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-gray-600 opacity-70 animate-wave" 
                   style={{
                     animation: `wave ${balloon.swayDuration}s ease-in-out infinite alternate`
                   }}
              />
              <div className="w-2 h-2 rounded-full bg-gray-400 opacity-70 -mt-1 ml-[-2px]" />
            </div>
            
            {/* 3D effect shadow */}
            <div className="absolute inset-0 rounded-full bg-black opacity-10 blur-sm transform translate-x-1 translate-y-1" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
