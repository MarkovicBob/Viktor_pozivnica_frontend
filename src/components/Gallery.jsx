import React, { useState } from 'react';

// Gallery image placeholders - replace with actual images
const items = [
  { id: 1, label: 'Mina 1', color: '#fbcfe8' },
  { id: 2, label: 'Mina 2', color: '#bfdbfe' },
  { id: 3, label: 'Mina 3', color: '#fde68a' },
  { id: 4, label: 'Mina 4', color: '#bbf7d0' }
].map(x => ({
  ...x,
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'>
      <rect width='800' height='600' fill='${x.color}'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='64'>
        ${x.label}
      </text>
    </svg>`
  )}`
}));

export default function Gallery() {
  const [index, setIndex] = useState(0);
  
  const prev = () => setIndex(i => (i - 1 + items.length) % items.length);
  const next = () => setIndex(i => (i + 1) % items.length);
  
  return (
    <section className="section">
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-3xl font-bold text-pink-700 font-elegant">Mina kroz godinu 📸</h2>
          <div className="flex gap-2">
            <button className="btn btn-outline" onClick={prev}>◀</button>
            <button className="btn btn-outline" onClick={next}>▶</button>
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
        
        <p className="mt-3 text-sm opacity-70">
          Zameni SVG placeholdere pravim fotkama (npr. `src/assets`).
        </p>
      </div>
    </section>
  );
}
