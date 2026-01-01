import FloatingBubbles from "./FloatingBubbles.jsx";
import React from "react";
import { motion } from "framer-motion";
import { FaBirthdayCake } from "react-icons/fa";
import { event } from "../config.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Hero({ scrollToRsvp }) {
  const { t } = useLanguage();

  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center justify-center py-12 sm:py-20"
      style={{
        background: "linear-gradient(135deg, #f5e6d3 0%, #e8dcc8 100%)",
      }}
    >
      {/* Leaf decorations */}
      <motion.div
        className="absolute top-8 left-8 text-6xl sm:text-8xl opacity-40"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🌿
      </motion.div>

      {/* Bottom right - Simple leaf */}
      <motion.div
        className="absolute bottom-8 right-8 text-6xl sm:text-8xl opacity-40"
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🍃
      </motion.div>

      {/* Main container with arch background effect */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
        {/* Title at the top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-light"
            style={{
              color: "#8B7355",
              fontFamily: "Great Vibes, cursive",
              letterSpacing: "0.05em",
            }}
          >
            {t("heroTitle")}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Arch background effect */}
          <div
            className="absolute -inset-8 sm:-inset-12 rounded-full opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(200,180,150,0.3) 0%, transparent 70%)",
            }}
          ></div>

          {/* Main content grid - ONE on left, Video on right - HORIZONTAL LINE - mobile too */}
          <div className="relative flex flex-row gap-2 sm:gap-4 lg:gap-8 items-center justify-center">
            {/* Left side - ONE text vertical - each letter on separate line */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center justify-center"
            >
              <div
                className="text-8xl lg:text-9xl font-bold leading-none"
                style={{
                  color: "#8B7355",
                  fontFamily: "Georgia, serif",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  letterSpacing: "0.02em",
                  lineHeight: "0.8",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span>O</span>
                <span>N</span>
                <span>E</span>
              </div>
            </motion.div>

            {/* Right side - Video */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className=""
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="auto"
                className="w-full h-auto rounded-2xl drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0px 10px 25px rgba(0,0,0,0.15))",
                  objectFit: "cover",
                }}
                onEnded={(e) => {
                  e.target.currentTime = 0;
                  e.target.play();
                }}
              >
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>

          {/* Content below video */}
          {/* Viktor name - centered below video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12 mb-8"
          >
            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-light"
              style={{
                color: "#8B7355",
                fontFamily: "Great Vibes, cursive",
                letterSpacing: "0.05em",
              }}
            >
              {t("childName")}
            </h2>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center mb-8"
          >
            <button
              type="button"
              className="text-base sm:text-lg px-10 sm:px-12 py-3 text-white rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 font-medium"
              style={{
                background: "linear-gradient(135deg, #C9A961 0%, #A0826D 100%)",
              }}
              onClick={scrollToRsvp}
            >
              {t("confirmAttendance")}
            </button>
          </motion.div>

          {/* Organizer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center pt-6 border-t-2"
            style={{ borderColor: "#C4B5A0" }}
          >
            <p style={{ color: "#8B7355" }} className="font-medium text-sm">
              Porodica Marković
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
