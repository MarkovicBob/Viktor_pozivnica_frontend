import { useLanguage } from "../context/LanguageContext.jsx";

export default function SadPopup({ isVisible }) {
  const { t } = useLanguage();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fade-in">
      <div className="text-center scale-150 animate-bounce">
        <div className="text-[150px] mb-4">😢</div>
        <div className="text-white text-3xl font-medium">{t("sadPopup")}</div>
      </div>
    </div>
  );
}
