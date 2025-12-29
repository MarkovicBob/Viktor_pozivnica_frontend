import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const bubbleColors = [
  // Iridescent soap bubble colors with rainbow effects
  {
    gradient: "from-emerald-200/40 via-lime-200/30 to-teal-200/40",
    shine: "bg-white/80",
  },
  {
    gradient: "from-blue-200/40 via-teal-200/30 to-purple-200/40",
    shine: "bg-white/80",
  },
  {
    gradient: "from-emerald-200/40 via-green-200/30 to-teal-200/40",
    shine: "bg-white/80",
  },
  {
    gradient: "from-lime-200/40 via-emerald-200/30 to-green-200/40",
    shine: "bg-white/80",
  },
  {
    gradient: "from-teal-200/40 via-emerald-200/30 to-green-200/40",
    shine: "bg-white/80",
  },
];

const generateBubbles = (count) => {
  return Array.from({ length: count }).map((_, i) => {
    const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    return {
      id: i,
      left: Math.random() * 100,
      initialDelay: Math.random() * 5,
      duration: 8 + Math.random() * 7,
      // Create more variety in bubble sizes, with some being much larger
      scale:
        Math.random() < 0.3
          ? 1.2 + Math.random() * 1.5
          : 0.4 + Math.random() * 0.8,
      color: color.gradient,
      shine: color.shine,
      swayAmount: [-30 + Math.random() * 60, -30 + Math.random() * 60],
      zIndex: Math.floor(Math.random() * 10),
    };
  });
};

export default function FloatingBubbles() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    setBubbles(generateBubbles(30));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute bottom-0"
          style={{
            left: `${bubble.left}%`,
            zIndex: bubble.zIndex,
          }}
          initial={{
            y: "110vh",
            opacity: 0,
            x: 0,
          }}
          animate={{
            y: [100, "-110vh"],
            opacity: [0, 0.8, 0.8, 0],
            x: bubble.swayAmount,
          }}
          transition={{
            y: {
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.initialDelay,
              ease: "easeInOut",
            },
            opacity: {
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.initialDelay,
              times: [0, 0.1, 0.8, 1],
            },
            x: {
              duration: bubble.duration / 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          <div
            className={`relative rounded-full backdrop-blur-sm border border-white/40
              before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br ${bubble.color}
              after:absolute after:inset-0 after:rounded-full after:bg-white/20 after:blur-sm
              group hover:scale-110 transition-transform duration-200 shadow-lg bubble-pulse rainbow-shift`}
            style={{
              width: `${Math.max(30, bubble.scale * 80)}px`,
              height: `${Math.max(30, bubble.scale * 80)}px`,
              animationDelay: `${bubble.initialDelay}s`,
              boxShadow:
                "0 0 10px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* Bubble shine effect - main highlight */}
            <div
              className={`absolute w-4 h-4 rounded-full ${bubble.shine} blur-sm top-1/4 left-1/4 bubble-shine`}
              style={{ animationDelay: `${bubble.initialDelay + 0.5}s` }}
            />

            {/* Secondary highlight */}
            <div
              className={`absolute w-2 h-2 rounded-full ${bubble.shine} blur-sm top-1/3 right-1/4 bubble-shine`}
              style={{ animationDelay: `${bubble.initialDelay + 1}s` }}
            />

            {/* Small reflection spot */}
            <div
              className={`absolute w-1 h-1 rounded-full bg-white/90 blur-sm bottom-1/4 right-1/3 bubble-shine`}
              style={{ animationDelay: `${bubble.initialDelay + 1.5}s` }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
