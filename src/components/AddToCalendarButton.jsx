import React from "react";
import { FaCalendarPlus } from "react-icons/fa";
import { event } from "../config.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { buildICS } from "../utils/ics.js";

export default function AddToCalendarButton() {
  const { t, language } = useLanguage();

  const getCalendarDescription = () => {
    switch (language) {
      case "en":
        return "See you at Viktor's 1st birthday! 🎂🎈";
      case "de":
        return "Wir sehen uns bei Viktors 1. Geburtstag! 🎂🎈";
      default:
        return "Vidimo se na Viktorovom 1. rođendanu! 🎂🎈";
    }
  };

  const handleICS = () => {
    const ics = buildICS({
      title: t("heroTitle"),
      startISO: event.dateStart,
      endISO: event.dateEnd,
      location: `${event.location}, ${event.address}`,
      description: getCalendarDescription(),
    });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "viktor-rodjendan.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const googleLink = () => {
    const toGoogle = (d) =>
      new Date(d)
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z");
    const start = toGoogle(event.dateStart);
    const end = toGoogle(event.dateEnd);
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: "Viktor Marković 1.rođendan",
      dates: `${start}/${end}`,
      details: getCalendarDescription(),
      location: `${event.location}, ${event.address}`,
    });

    // Na mobilnim uređajima koristi direktan link ka Google Calendar app-u
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const baseUrl = isMobile
      ? "https://www.google.com/calendar/render"
      : "https://calendar.google.com/calendar/render";

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center">
      <a
        className="px-8 py-3 rounded-full font-medium transition-all inline-block"
        style={{
          backgroundColor: "#C9A961",
          color: "white",
          border: "2px solid #C9A961",
        }}
        target="_blank"
        rel="noreferrer"
        href={googleLink()}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "transparent";
          e.target.style.color = "#C9A961";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#C9A961";
          e.target.style.color = "white";
        }}
      >
        {t("addToGoogleCalendar")}
      </a>
    </div>
  );
}
