import React from "react";
import { motion } from "framer-motion";

export default function TeddyImage() {
  return (
    <div className="relative max-w-5xl mx-auto py-16 px-4">
      <motion.div
        className="w-48 h-48 md:w-72 md:h-72 mx-auto relative"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{
          y: [20, 0, 20],
          rotate: [-3, 3, -3],
          opacity: 1,
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 0.8,
          },
        }}
        viewport={{ once: true }}
      >
        {/* Hidden SVG definition for the clip-path */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id="remove-white" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 30 -15"
              />
            </filter>
          </defs>
        </svg>

        <div className="relative w-full h-full">
          {/* Soft glow effect behind the bear */}
          <div
            className="absolute inset-0 rounded-full bg-emerald-100/40 blur-xl"
            style={{
              transform: "scale(0.8) translateY(10%)",
              filter: "blur(20px)",
            }}
          ></div>

          <img
            src="/lion.png"
            alt="lion"
            className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
            style={{
              filter:
                "url(#remove-white) drop-shadow(0 10px 8px rgba(252, 165, 165, 0.2))",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
