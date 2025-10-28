import React from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function LanguageSwitcher() {
  const { language, cycleLanguage } = useLanguage();

  const getLanguageLabel = () => {
    switch (language) {
      case "sr":
        return "🇷🇸 SR";
      case "en":
        return "🇺🇸 EN";
      case "de":
        return "🇩🇪 DE";
      default:
        return "🇷🇸 SR";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={cycleLanguage}
        className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-lg shadow-lg transition-all duration-200 font-semibold text-sm"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(236, 72, 153, 0.9)",
        }}
        title="Cycle through languages / Promeni jezik / Sprache wechseln"
      >
        {getLanguageLabel()}
      </button>
    </div>
  );
}
