import React from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function LanguageSwitcher() {
  const { language, cycleLanguage } = useLanguage();

  const getLanguageLabel = () => {
    switch (language) {
      case "sr":
        return "SR";
      case "en":
        return "EN";
      case "de":
        return "DE";
      default:
        return "SR";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={cycleLanguage}
        className="text-sm font-medium uppercase tracking-wider transition-all duration-200 hover:opacity-60"
        style={{
          color: "#8B7355",
          background: "transparent",
          border: "none",
          padding: "4px 8px",
        }}
        title="Cycle through languages / Promeni jezik / Sprache wechseln"
      >
        {getLanguageLabel()}
      </button>
    </div>
  );
}
