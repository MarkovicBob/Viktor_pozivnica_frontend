import { AiOutlineCopyright } from "react-icons/ai";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Footer({ onYearClick }) {
  const { t } = useLanguage();
  return (
    <footer
      className="py-8 text-center"
      style={{
        background: "linear-gradient(135deg, #f5e6d3 0%, #e8dcc8 100%)",
        color: "#8B7355",
      }}
    >
      <p className="text-sm opacity-70">
        {t("footerMadeBy")}
        <a
          href="https://wa.me/491634008867"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline"
          style={{ cursor: "pointer", color: "#8B7355" }}
        >
          {t("footerWhatsApp")}
        </a>
      </p>
      <p className="text-sm opacity-70 mt-2">{t("footerRights")}</p>
      <p className="flex items-center justify-center gap-1 text-sm opacity-70">
        <AiOutlineCopyright />
        <span style={{ cursor: "pointer" }} onClick={onYearClick}>
          2025
        </span>
      </p>
    </footer>
  );
}
