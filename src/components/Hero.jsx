import FloatingBubbles from "./FloatingBubbles.jsx";
import React from "react";
import { motion } from "framer-motion";
import { FaBirthdayCake } from "react-icons/fa";
import { event } from "../config.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Hero({ scrollToRsvp }) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-green-50">
      {/* Tropical leaves decoration top left */}
      <motion.div
        className="absolute top-0 left-0 z-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, type: "spring" }}
      >
        <img
          src="https://i.imgur.com/tropical-leaves-left.png"
          alt="Tropical leaves"
          className="w-full h-full object-contain opacity-90"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.innerHTML =
              '<div class="text-8xl opacity-30 animate-wave">🌿🍃</div>';
          }}
        />
      </motion.div>

      {/* Tropical leaves decoration top right */}
      <motion.div
        className="absolute top-0 right-0 z-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, type: "spring" }}
      >
        <img
          src="https://i.imgur.com/tropical-leaves-right.png"
          alt="Tropical leaves"
          className="w-full h-full object-contain opacity-90"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.innerHTML =
              '<div class="text-8xl opacity-30 animate-wave" style="animation-delay: 0.3s">🌿🍃</div>';
          }}
        />
      </motion.div>

      <div className="relative py-20 sm:py-28">
        <div className="section text-center relative z-10">
          {/* Wild ONE text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="mb-6"
          >
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-script text-emerald-700 mb-2"
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              Wild
            </div>
            <div
              className="text-7xl sm:text-8xl md:text-9xl font-bold text-amber-500"
              style={{
                fontFamily: "serif",
                textShadow: "4px 4px 0px rgba(0,0,0,0.1)",
                letterSpacing: "0.1em",
              }}
            >
              ONE
            </div>
          </motion.div>
          {/* Safari animals group */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex justify-center items-end gap-3 sm:gap-6 mb-8 px-4"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src="/teddy_bear.png"
                alt="Monkey"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src="/giraffe.png"
                alt="Giraffe"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              className="w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src="/lion.png"
                alt="Lion"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src="/teddy_bear2.png"
                alt="Zebra"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
          {/* Bottom foliage decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center gap-2 text-4xl sm:text-5xl mb-6"
          >
            <span className="opacity-60">🌿</span>
            <span className="opacity-70">🍃</span>
            <span className="opacity-80">🌿</span>
            <span className="opacity-70">🍃</span>
            <span className="opacity-60">🌿</span>
          </motion.div>
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-8"
          >
            <p className="text-lg sm:text-xl text-emerald-700 font-medium mb-3">
              Please Join Us To Celebrate
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-script text-amber-600 mb-4"
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              {t("heroTitle")}
            </h1>
          </motion.div>
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2 }}
            className="mt-8"
          >
            <button
              type="button"
              className="btn text-lg px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={scrollToRsvp}
            >
              <FaBirthdayCake className="text-2xl" /> {t("confirmAttendance")}{" "}
              🎉
            </button>
          </motion.div>
          {/* Event info 
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-8 space-y-2 text-emerald-800"
          >
            <p className="text-lg font-medium">{event.location}</p>
            <p className="text-base">{event.address}</p>
          </motion.div>*/}
        </div>
      </div>
    </section>
  );
}
