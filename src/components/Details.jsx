import "dayjs/locale/sr";
import AddToCalendarButton from "./AddToCalendarButton.jsx";
import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { event, host } from "../config.js";
import { useLanguage } from "../context/LanguageContext.jsx";

dayjs.extend(utc);
dayjs.locale("sr");

export default function Details() {
  const { t } = useLanguage();
  const start = dayjs(event.dateStart);
  const end = dayjs(event.dateEnd);

  return (
    <section className="section -mt-8">
      <div className="card relative">
        <h2 className="text-3xl font-bold text-pink-700 font-elegant">
          {t("eventDetails")}
        </h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-pink-600 font-semibold">{t("when")}</p>
            <p className="text-lg font-medium">
              {start.format("dddd, D. MMMM YYYY.")}
              <br />
              {start.format("HH:mm")}{" "}
            </p>
          </div>
          <div>
            <p className="text-sm text-pink-600 font-semibold">{t("where")}</p>
            <p className="text-lg font-medium">{event.location}</p>
            <p className="opacity-80">{event.address}</p>
          </div>
          <div>
            <p className="text-sm text-pink-600 font-semibold">{t("host")}</p>
            <p className="text-lg font-medium">{t("hostName")}</p>
            <a className="text-blue-600 underline" href={`tel:${host.phone}`}>
              {t("callMinasDad")}
            </a>
            <br />
            <a className="text-blue-600 underline" href={`tel:${host.phone2}`}>
              {t("callMinasMom")}
            </a>
          </div>
        </div>
        <div className="mt-6">
          <AddToCalendarButton />
        </div>
        <div className="mt-6">
          <iframe
            title="Mapa"
            className="w-full h-64 sm:h-72 rounded-xl border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
              event.gmapsQuery
            )}&zoom=17&language=sr`}
          ></iframe>
        </div>
      </div>
    </section>
  );
}
