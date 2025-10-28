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
        return "See you at Mina's 1st birthday! 🎂🎈";
      case "de":
        return "Wir sehen uns bei Minas 1. Geburtstag! 🎂🎈";
      default:
        return "Vidimo se na Mininom 1. rođendanu! 🎂🎈";
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
    a.download = "mina-rodjendan.ics";
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
      text: t("heroTitle"),
      dates: `${start}/${end}`,
      details: getCalendarDescription(),
      location: `${event.location}, ${event.address}`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={handleICS} className="btn btn-primary">
        <FaCalendarPlus /> {t("addToCalendarICS")}
      </button>
      <a
        className="btn btn-outline"
        target="_blank"
        rel="noreferrer"
        href={googleLink()}
      >
        {t("googleCalendar")}
      </a>
    </div>
  );
}
