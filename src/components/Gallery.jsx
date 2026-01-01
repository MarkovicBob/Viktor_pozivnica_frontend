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
    <section
      className="py-12 sm:py-16"
      style={{
        background: "linear-gradient(135deg, #e8dcc8 0%, #f5e6d3 100%)",
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
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-2xl opacity-30">🌿</div>
          <div className="absolute bottom-4 left-4 text-2xl opacity-30">🍃</div>

          <div className="flex items-center justify-center mb-6">
            <h2
              className="text-3xl sm:text-4xl font-light"
              style={{ color: "#8B7355", fontFamily: "Great Vibes, cursive" }}
            >
              {t("galleryTitle")}
            </h2>
          </div>
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              className="px-4 py-2 rounded-full transition-all"
              style={{
                background: "linear-gradient(135deg, #C9A961 0%, #A0826D 100%)",
                color: "white",
              }}
              onClick={prev}
            >
              ◀
            </button>
            <button
              className="px-4 py-2 rounded-full transition-all"
              style={{
                background: "linear-gradient(135deg, #C9A961 0%, #A0826D 100%)",
                color: "white",
              }}
              onClick={next}
            >
              ▶
            </button>
          </div>

          <div
            className="relative aspect-video overflow-hidden rounded-xl"
            style={{ border: "2px solid #C4B5A0" }}
          >
            <img
              src={items[index].src}
              alt={items[index].label}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-center mt-4 text-sm" style={{ color: "#A0826D" }}>
            {items[index].label} {index + 1}/{items.length}
          </p>
        </div>
      </div>
    </section>
  );
}
