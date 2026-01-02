import "dayjs/locale/de";
import "dayjs/locale/en";
import "dayjs/locale/sr";
import AddToCalendarButton from "./AddToCalendarButton.jsx";
import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { event, host } from "../config.js";
import { useLanguage } from "../context/LanguageContext.jsx";

dayjs.extend(utc);

export default function Details() {
  const { t, language } = useLanguage();

  // Set locale based on selected language
  const getLocale = () => {
    switch (language) {
      case "en":
        return "en";
      case "de":
        return "de";
      default:
        return "sr";
    }
  };

  dayjs.locale(getLocale());
  const start = dayjs(event.dateStart);
  const end = dayjs(event.dateEnd);

  // Map language based on selected language
  const getMapLanguage = () => {
    switch (language) {
      case "en":
        return "en";
      case "de":
        return "de";
      default:
        return "sr";
    }
  };

  return (
    <section
      className="py-12 sm:py-16"
      style={{
        background: "linear-gradient(135deg, #f5e6d3 0%, #e8dcc8 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl p-8 sm:p-10"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Decorative corners */}
          <div className="absolute top-4 right-4 text-3xl opacity-30">🌿</div>
          <div className="absolute bottom-4 left-4 text-3xl opacity-30">🍃</div>

          <div className="flex items-center justify-center gap-3 mb-8">
            <h2
              className="text-3xl sm:text-4xl font-light text-center"
              style={{ color: "#8B7355", fontFamily: "Great Vibes, cursive" }}
            >
              {t("eventDetails")}
            </h2>
          </div>
          <div className="mt-6 grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "#A0826D" }}
              >
                {t("when")}
              </p>
              <p className="text-base font-medium" style={{ color: "#8B7355" }}>
                {start.format("dddd, D. MMMM YYYY.")}
              </p>
              <p className="text-base" style={{ color: "#8B7355" }}>
                {start.format("HH:mm")}
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "#A0826D" }}
              >
                {t("where")}
              </p>
              <p className="text-base font-medium" style={{ color: "#8B7355" }}>
                {t("restaurantLabel")} {event.location} - {t("grandHall")}
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "#A0826D" }}
              >
                {t("host")}
              </p>
              <p className="text-base font-medium" style={{ color: "#8B7355" }}>
                {t("hostLine1")}
                <br />
                {t("hostLine2")}
              </p>
              <a
                className="text-sm underline"
                style={{ color: "#C9A961" }}
                href={`tel:${host.phone}`}
              >
                {t("callMinasDad")}
              </a>
              <br />
              <a
                className="text-sm underline"
                style={{ color: "#C9A961" }}
                href={`tel:${host.phone2}`}
              >
                {t("callMinasMom")}
              </a>
            </div>
          </div>
          <div className="mt-8">
            <AddToCalendarButton />
          </div>
          <div className="mt-8">
            <iframe
              title="Mapa"
              className="w-full h-80 sm:h-96 rounded-xl"
              style={{ border: "2px solid #C4B5A0" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                event.gmapsQuery
              )}&zoom=15&language=${getMapLanguage()}`}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
