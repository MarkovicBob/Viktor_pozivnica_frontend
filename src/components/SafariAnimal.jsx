import React from "react";
import { motion } from "framer-motion";

export default function SafariAnimal({ variant = "lion" }) {
  const src = variant === "giraffe" ? "/giraffe.png" : "/lion.png";
  const alt = variant === "giraffe" ? "Giraffe" : "Lion";

  return (
    <motion.div
      className="absolute top-0 left-0 z-20 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 float-animation"
      initial={{ y: -100, rotate: -10, opacity: 0 }}
      animate={{
        y: [0, -10, 0],
        rotate: [-5, 5, -5],
        opacity: 1,
        transition: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
      whileHover={{
        rotate: [0, -5, 5, -5, 0],
        scale: 1.1,
        transition: { duration: 0.6 },
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        style={{
          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.25))",
          transformOrigin: "center bottom",
          transform: "scale(1.2)",
        }}
      />
    </motion.div>
  );
}
