import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

const items = [
  {
    id: 1,
    label: "",
    src: "/1.jpg",
  },
  {
    id: 2,
    label: "",
    src: "/2.jpg",
  },
  {
    id: 3,
    label: "",
    src: "/3.jpg",
  },
  {
    id: 4,
    label: "",
    src: "/4.jpg",
  },
  {
    id: 5,
    label: "",
    src: "/5.jpg",
  },
  {
    id: 6,
    label: "",
    src: "/6.jpg",
  },
  {
    id: 7,
    label: "",
    src: "/7.jpg",
  },
  {
    id: 8,
    label: "",
    src: "/8.jpg",
  },
  {
    id: 9,
    label: "",
    src: "/9.jpg",
  },
  {
    id: 10,
    label: "",
    src: "/10.jpg",
  },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <section className="section">
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-3xl font-bold text-pink-700 font-elegant">
            {t("galleryTitle")}
          </h2>
          <div className="flex gap-2">
            <button className="btn btn-outline" onClick={prev}>
              ◀
            </button>
            <button className="btn btn-outline" onClick={next}>
              ▶
            </button>
          </div>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-xl border">
          <img
            src={items[index].src}
            alt={items[index].label}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-center mt-2 opacity-80">
          {items[index].label} • {index + 1}/{items.length}
        </p>
      </div>
    </section>
  );
}
