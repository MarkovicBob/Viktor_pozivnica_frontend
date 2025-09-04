import React, { useState } from 'react';

const items = [
  {
    id: 1,
    label: 'Mina & tata',
    src: '/BOB05088.JPG'
  },
  {
    id: 2,
    label: 'Mina u parku',
    src: '/BOB05358.JPG'
  },
  {
    id: 3,
    label: 'Mina & mama',
    src: '/BOB05735.JPG'
  },
  {
    id: 4,
    label: 'Mina smeje se',
    src: '/BOB05956.JPG'
  }
];

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

      </div>
    </section>
  );
}
