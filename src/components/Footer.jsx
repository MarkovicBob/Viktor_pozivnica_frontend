import { AiOutlineCopyright } from "react-icons/ai";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Footer({ onYearClick }) {
  const { t } = useLanguage();
  return (
    <footer className="section py-8 text-center opacity-70">
      <p className="font-cute">{t("footerMadeBy")}</p>
      <p className="font-cute">{t("footerRights")}</p>
      <p className="flex items-center justify-center gap-1 font-cute">
        <AiOutlineCopyright />
        <span style={{ cursor: "pointer" }} onClick={onYearClick}>
          2025
        </span>
      </p>
    </footer>
  );
}
