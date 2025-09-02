import React, { useState } from 'react'
import { rsvp as rsvpCfg } from '../config.js'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
const STORAGE_KEY='mina-rsvps'; const load=()=>{try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[]}catch{return[]}}; const save=(l)=>localStorage.setItem(STORAGE_KEY,JSON.stringify(l))
const toCSV=(rows)=>{const header=['name','adults','kids','message','attending','timestamp'];const esc=(s)=>`"${String(s??'').replace(/"/g,'""')}"`;return[header.join(',')].concat(rows.map(r=>header.map(h=>esc(r[h])).join(','))).join('\n')}
export default function RSVP(){
  const [form,setForm]=useState({name:'',adults:2,kids:0,message:'',attending:true}); const [list,setList]=useState(load()); const [pin,setPin]=useState(''); const [admin,setAdmin]=useState(false)
  const handleChange=(e)=>{const{name,value,type,checked}=e.target;setForm(f=>({...f,[name]:type==='checkbox'?checked:value}))}
  
  // Functions to handle counter buttons
  const incrementCounter = (field) => {
    setForm(prev => ({...prev, [field]: Number(prev[field]) + 1}));
  }
  
  const decrementCounter = (field) => {
    setForm(prev => ({...prev, [field]: Math.max(0, Number(prev[field]) - 1)}));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const row = { ...form, timestamp: new Date().toISOString() };
    const updated = [row, ...list];
    setList(updated);
    save(updated);

    if (form.attending) {
      // Celebration effects
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 1000,
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#ff69b4', '#ff1493', '#ff69b4', '#dda0dd']
      });

      fire(0.2, {
        spread: 60,
        colors: ['#ff69b4', '#ff1493', '#ff69b4', '#dda0dd']
      });

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ['#ff69b4', '#ff1493', '#ff69b4', '#dda0dd']
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ['#ff69b4', '#ff1493', '#ff69b4', '#dda0dd']
      });

      toast.success('Hvala na potvrdi! 🎉', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#ff69b4',
          color: '#fff',
          fontWeight: 'bold'
        }
      });
    }

    const subject = encodeURIComponent(`RSVP – ${row.name} (${row.attending ? 'Dolazimo' : 'Ne dolazimo'})`);
    const body = encodeURIComponent(`Ime: ${row.name}\nOdraslih: ${row.adults}\nDece: ${row.kids}\nPrisustvo: ${row.attending ? 'DA' : 'NE'}\nPoruka: ${row.message}`);
    window.location.href = `mailto:${rsvpCfg.mailTo}?subject=${subject}&body=${body}`;
    setForm({ name: '', adults: 2, kids: 0, message: '', attending: true });
  }
  const tryAdmin=()=>setAdmin(pin===rsvpCfg.adminPin); const exportCSV=()=>{const blob=new Blob([toCSV(list)],{type:'text/csv;charset=utf-8'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='rsvp.csv'; a.click(); URL.revokeObjectURL(url)}
  return(
    <section id="rsvp" className="section relative">
      <motion.div 
        className="card relative overflow-visible"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-pink-700 animate-bounce">RSVP</h2>
          <p className="opacity-80 mt-1">Molimo potvrdi dolazak kako bismo sve lepo organizovali. 💖</p>
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 mt-4">
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium mb-1">Ime i prezime</label>
        <input required name="name" value={form.name} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" placeholder="Vaše ime"/>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Broj odraslih</label>
        <div className="flex items-center">
          <button 
            type="button"
            onClick={() => decrementCounter('adults')}
            className="w-10 h-10 flex items-center justify-center bg-pink-100 text-pink-700 rounded-l-xl border border-r-0 hover:bg-pink-200"
          >
            -
          </button>
          <div className="flex-1 h-10 flex items-center justify-center bg-white border-t border-b">
            {form.adults}
          </div>
          <button 
            type="button"
            onClick={() => incrementCounter('adults')}
            className="w-10 h-10 flex items-center justify-center bg-pink-100 text-pink-700 rounded-r-xl border border-l-0 hover:bg-pink-200"
          >
            +
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Broj dece</label>
        <div className="flex items-center">
          <button 
            type="button"
            onClick={() => decrementCounter('kids')}
            className="w-10 h-10 flex items-center justify-center bg-pink-100 text-pink-700 rounded-l-xl border border-r-0 hover:bg-pink-200"
          >
            -
          </button>
          <div className="flex-1 h-10 flex items-center justify-center bg-white border-t border-b">
            {form.kids}
          </div>
          <button 
            type="button"
            onClick={() => incrementCounter('kids')}
            className="w-10 h-10 flex items-center justify-center bg-pink-100 text-pink-700 rounded-r-xl border border-l-0 hover:bg-pink-200"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium mb-1">Poruka (opciono)</label>
        <textarea name="message" value={form.message} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" rows="3" placeholder="Poruka domaćinu..."></textarea>
      </div>
      
      <div className="sm:col-span-2 flex items-center gap-2">
        <input id="attending" type="checkbox" name="attending" checked={form.attending} onChange={handleChange} className="h-4 w-4"/>
        <label htmlFor="attending">Dolazimo</label>
      </div>
      
      <div className="sm:col-span-2">
        <button className="btn btn-primary" type="submit">Pošalji potvrdu</button>
      </div>
    </form>
    
    <hr className="my-6"/>
    
    {!admin ? (
      <div className="space-y-2">
        <p className="text-sm opacity-70">Admin pregled RSVP‑ova (samo domaćin):</p>
        <div className="flex gap-2">
          <input value={pin} onChange={e=>setPin(e.target.value)} placeholder="PIN" className="rounded-xl border px-3 py-2 w-32"/>
          <button onClick={tryAdmin} className="btn btn-outline">Ulaz</button>
        </div>
      </div>
    ) : (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Prijave ({list.length})</h3>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="btn btn-outline">Eksportuj CSV</button>
            <button onClick={()=>{save([]);setList([])}} className="btn btn-outline">Obriši sve</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="p-2">Ime</th>
                <th className="p-2">Odr.</th>
                <th className="p-2">Deca</th>
                <th className="p-2">Dolazak</th>
                <th className="p-2">Poruka</th>
                <th className="p-2">Vreme</th>
              </tr>
            </thead>
            <tbody>
              {list.map((r,i)=>(
                <tr key={i} className="border-t">
                  <td className="p-2">{r.name}</td>
                  <td className="p-2">{r.adults}</td>
                  <td className="p-2">{r.kids}</td>
                  <td className="p-2">{r.attending?'DA':'NE'}</td>
                  <td className="p-2">{r.message}</td>
                  <td className="p-2">{new Date(r.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
        </div>
      </motion.div>
    </section>
  );
}