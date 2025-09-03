import React, { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

/* ==== API helper (bez menjanja strukture projekta) ==== */
const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
async function api(path, init) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    let err = {};
    try { err = await res.json(); } catch {}
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}
const searchInvites = (q) => api(`/api/invites/search?q=${encodeURIComponent(q)}`);
const getInviteByCode = (code) => api(`/api/invites/by-code/${encodeURIComponent(code)}`);
const submitRsvp = (payload) => api(`/api/rsvp`, { method: "POST", body: JSON.stringify(payload) });

/* ==== lokalne pomoćne ==== */
const useDebounced = (value, delay = 250) => {
  const [v, setV] = useState(value);
  useEffect(() => { const t = setTimeout(() => setV(value), delay); return () => clearTimeout(t); }, [value, delay]);
  return v;
};

export default function RSVP() {
  // forma ostaje ista
  const [form, setForm] = useState({ name: "", adults: 2, kids: 0, message: "", attending: true });

  // NOVO: predlozi i izabrana porodica sa servera
  const [suggest, setSuggest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [picked, setPicked] = useState(null); // { familyName, members[], invitationCode, ... }
  const [invite, setInvite] = useState(null); // detalji iz /by-code (status, seats...)

  // admin deo ostaje lokalno (ne diramo)
  const STORAGE_KEY = "mina-rsvps";
  const load = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } };
  const save = (l) => localStorage.setItem(STORAGE_KEY, JSON.stringify(l));
  const [list, setList] = useState(load());
  const [pin, setPin] = useState("");
  const [admin, setAdmin] = useState(false);
  const tryAdmin = () => setAdmin(pin === "0000"); // ostavi svoj lokalni PIN ako želiš

  // brojači
  const incrementCounter = (field) => setForm((p) => ({ ...p, [field]: Number(p[field]) + 1 }));
  const decrementCounter = (field) => setForm((p) => ({ ...p, [field]: Math.max(0, Number(p[field]) - 1) }));

  // promene u poljima
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  /* ==== Auto-complete pretraga po imenu/prezimenu ==== */
  const debouncedName = useDebounced(form.name);
  useEffect(() => {
    let stop = false;
    // ako korisnik obriše naziv, skloni listu
    if (!debouncedName || picked) { if (!debouncedName) setSuggest([]); return; }
    (async () => {
      try {
        setLoading(true);
        const data = await searchInvites(debouncedName);
        if (!stop) setSuggest(data);
      } catch {
        if (!stop) setSuggest([]);
      } finally {
        if (!stop) setLoading(false);
      }
    })();
    return () => { stop = true; };
  }, [debouncedName, picked]);

  // biranje porodice iz padajuće liste
  const pickFamily = async (item) => {
    setPicked(item);
    setForm((f) => ({ ...f, name: item.familyName })); // popuni polje bez promene dizajna
    setSuggest([]);
    try {
      setLoading(true);
      const data = await getInviteByCode(item.invitationCode);
      setInvite(data); // da znamo status/seats
      // možeš po želji da postaviš default count iz seats:
      // setForm(f => ({...f, adults: Math.min(f.adults, data.seats ?? f.adults)}));
    } catch (e) {
      toast.error(e.message);
      setPicked(null);
      setInvite(null);
    } finally {
      setLoading(false);
    }
  };

  /* ==== Link sa ?code=XXXX otvara odmah poziv ==== */
  const codeFromUrl = useMemo(() => new URLSearchParams(window.location.search).get("code") || "", []);
  useEffect(() => {
    if (!codeFromUrl) return;
    (async () => {
      try {
        setLoading(true);
        const data = await getInviteByCode(codeFromUrl);
        setPicked({ invitationCode: codeFromUrl, familyName: data.familyName, members: data.members });
        setInvite(data);
        setForm((f) => ({ ...f, name: data.familyName }));
      } catch {
        toast.error("Kod nije pronađen.");
      } finally {
        setLoading(false);
      }
    })();
  }, [codeFromUrl]);

  /* ==== Submit ide na server (umesto mailto i samo-lokala) ==== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!picked?.invitationCode) {
      toast.error("Molim izaberi svoju porodicu iz liste.");
      return;
    }
    try {
      setLoading(true);
      await submitRsvp({
        code: picked.invitationCode,
        status: form.attending ? "accepted" : "declined",
        attendeesCount: Number(form.adults) + Number(form.kids),
        message: form.message || "",
      });

      // čuvamo i lokalno čisto za tvoj admin pregled (ne utiče na server)
      const row = { ...form, timestamp: new Date().toISOString() };
      const updated = [row, ...list];
      setList(updated);
      save(updated);

      if (form.attending) {
        const count = 200;
        const defaults = { origin: { y: 0.7 }, zIndex: 1000 };
        const fire = (ratio, opts) => confetti({ ...defaults, ...opts, particleCount: Math.floor(count * ratio) });
        fire(0.25, { spread: 26, startVelocity: 55, colors: ["#ff69b4", "#ff1493", "#ff69b4", "#dda0dd"] });
        fire(0.2, { spread: 60, colors: ["#ff69b4", "#ff1493", "#ff69b4", "#dda0dd"] });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ["#ff69b4", "#ff1493", "#ff69b4", "#dda0dd"] });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ["#ff69b4", "#ff1493", "#ff69b4", "#dda0dd"] });
        toast.success("Hvala na potvrdi! 🎉", { duration: 5000, position: "top-center", style: { background: "#ff69b4", color: "#fff", fontWeight: "bold" } });
      } else {
        toast("Žao nam je što ne možete 💗", { position: "top-center" });
      }

      // reset forme ali ostavi izabranu porodicu zaključanom
      setForm({ name: picked.familyName, adults: 2, kids: 0, message: "", attending: true });
    } catch (e2) {
      if (String(e2.message).includes("Already responded")) {
        toast.error("Ovaj poziv je već odgovoren.");
      } else {
        toast.error(e2.message || "Greška pri slanju potvrde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="section relative">
      <motion.div
        className="card relative overflow-visible"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-pink-700 animate-bounce font-elegant">RSVP</h2>
          <p className="opacity-80 mt-1">Molimo potvrdi dolazak kako bismo sve lepo organizovali. 💖</p>

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 mt-4">
            {/* Ime i pretraga */}
            <div className="sm:col-span-2 relative">
              <label className="block text-sm font-medium mb-1">Ime i prezime</label>
              <input
                required
                name="name"
                value={form.name}
                onChange={(e) => { setPicked(null); setInvite(null); handleChange(e); }}
                className="w-full rounded-xl border px-3 py-2"
                placeholder="Vaše ime"
                autoComplete="off"
              />
              {/* lista predloga */}
              {suggest.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 max-h-60 overflow-auto border rounded-xl bg-white shadow z-20">
                  {suggest.map((it) => (
                    <li key={it.invitationCode}>
                      <button
                        type="button"
                        onClick={() => pickFamily(it)}
                        className="w-full text-left px-3 py-2 hover:bg-pink-50"
                      >
                        <div className="font-medium">{it.familyName}</div>
                        <div className="text-xs opacity-70">
                          {(it.members || []).map((m) => m.name).join(", ")}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {loading && <div className="text-xs mt-1 opacity-70">Tražim…</div>}
              {invite?.status && invite.status !== "pending" && (
                <div className="text-xs mt-1 text-red-600">Ovaj poziv je već odgovoren ({invite.status}).</div>
              )}
            </div>

            {/* Broj odraslih */}
            <div>
              <label className="block text-sm font-medium mb-1">Broj odraslih</label>
              <div className="flex items-center">
                <button type="button" onClick={() => decrementCounter("adults")} className="w-10 h-10 flex items-center justify-center bg-pink-100 text-pink-700 rounded-l-xl border border-r-0 hover:bg-pink-200">-</button>
                <div className="flex-1 h-10 flex items-center justify-center bg-white border-t border-b">{form.adults}</div>
                <button type="button" onClick={() => incrementCounter("adults")} className="w-10 h-10 flex items-center justify-center bg-pink-100 text-pink-700 rounded-r-xl border border-l-0 hover:bg-pink-200">+</button>
              </div>
            </div>

            {/* Broj dece */}
            <div>
              <label className="block text-sm font-medium mb-1">Broj dece</label>
              <div className="flex items-center">
                <button type="button" onClick={() => decrementCounter("kids")} className="w-10 h-10 flex items-center justify-center bg-pink-100 text-pink-700 rounded-l-xl border border-r-0 hover:bg-pink-200">-</button>
                <div className="flex-1 h-10 flex items-center justify-center bg-white border-t border-b">{form.kids}</div>
                <button type="button" onClick={() => incrementCounter("kids")} className="w-10 h-10 flex items-center justify-center bg-pink-100 text-pink-700 rounded-r-xl border border-l-0 hover:bg-pink-200">+</button>
              </div>
            </div>

            {/* Poruka */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Poruka (opciono)</label>
              <textarea name="message" value={form.message} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" rows="3" placeholder="Poruka domaćinu..."></textarea>
            </div>

            {/* Dolazimo */}
            <div className="sm:col-span-2 flex items-center gap-2">
              <input id="attending" type="checkbox" name="attending" checked={form.attending} onChange={handleChange} className="h-4 w-4" />
              <label htmlFor="attending">Dolazimo</label>
            </div>

            <div className="sm:col-span-2">
              <button className="btn btn-primary" type="submit" disabled={loading || !picked}>
                Pošalji potvrdu
              </button>
              {!picked && <div className="text-xs mt-1 opacity-70">Izaberi porodicu iz liste da bi poslao potvrdu.</div>}
            </div>
          </form>

          <hr className="my-6" />

          {/* Admin pregled (lokalno — nismo dirali) */}
          {!admin ? (
            <div className="space-y-2">
              <p className="text-sm opacity-70">Admin pregled RSVP-ova (samo domaćin):</p>
              <div className="flex gap-2">
                <input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="PIN" className="rounded-xl border px-3 py-2 w-32" />
                <button onClick={tryAdmin} className="btn btn-outline">Ulaz</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Prijave (lokalni pregled: {list.length})</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const header = ["name", "adults", "kids", "message", "attending", "timestamp"];
                      const esc = (s) => `"${String(s ?? "").replace(/"/g, '""')}"`;
                      const csv = [header.join(",")].concat(list.map((r) => header.map((h) => esc(r[h])).join(","))).join("\n");
                      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url; a.download = "rsvp.csv"; a.click(); URL.revokeObjectURL(url);
                    }}
                    className="btn btn-outline"
                  >
                    Eksportuj CSV
                  </button>
                  <button onClick={() => { save([]); setList([]); }} className="btn btn-outline">Obriši sve</button>
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
                    {list.map((r, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">{r.name}</td>
                        <td className="p-2">{r.adults}</td>
                        <td className="p-2">{r.kids}</td>
                        <td className="p-2">{r.attending ? "DA" : "NE"}</td>
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
