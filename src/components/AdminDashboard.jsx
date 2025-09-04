import React, { useState, useEffect } from "react";

const API_BASE = window.location.hostname === 'localhost'
  ? ''
  : import.meta.env.VITE_API_URL;

export default function AdminDashboard({ onClose }) {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [summary, setSummary] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authed) return;
    setError("");
    fetch(`${API_BASE}/api/admin/rsvps/summary`, {
      headers: { "x-admin-token": token }
    })
      .then(r => r.json())
      .then(data => {
        if (data.error === 'Unauthorized') {
          setError('Uneli ste pogrešnu lozinku');
          setAuthed(false);
        } else {
          setSummary(data);
        }
      });
    fetch(`${API_BASE}/api/admin/rsvps?status=all`, {
      headers: { "x-admin-token": token }
    })
      .then(r => r.json())
      .then(data => {
        if (data.error === 'Unauthorized') {
          setError('Uneli ste pogrešnu lozinku');
          setAuthed(false);
        } else {
          Array.isArray(data) ? setRsvps(data) : setError(data.error || "Greška");
        }
      });
  }, [authed, token]);

  function handleLogin(e) {
    e.preventDefault();
    setAuthed(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 text-2xl" onClick={onClose}>&times;</button>
        {!authed ? (
          <form onSubmit={handleLogin} className="space-y-4 text-center">
            <div className="text-2xl font-bold text-pink-700 mb-2">Admin pristup</div>
            <input
              type="password"
              placeholder="Unesi admin šifru"
              value={token}
              onChange={e => setToken(e.target.value)}
              className="w-full border-2 border-pink-100 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
            />
            <button type="submit" className="btn btn-primary w-full">Prijavi se</button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
        ) : (
          <div>
            <div className="text-2xl font-bold text-pink-700 mb-4">RSVP Statistika</div>
            {summary && (
              <div className="mb-6 grid grid-cols-2 gap-4 text-center">
                <div className="bg-pink-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-pink-600">Porodica ukupno</div>
                  <div className="text-2xl">{summary.totalFamilies}</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-pink-600">Dolazi</div>
                  <div className="text-2xl">{summary.acceptedFamilies}</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-pink-600">Ne dolazi</div>
                  <div className="text-2xl">{summary.declinedFamilies}</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-pink-600">Na čekanju</div>
                  <div className="text-2xl">{summary.pendingFamilies}</div>
                </div>
              </div>
            )}
            <div className="text-xl font-bold text-pink-700 mb-2">Sve porodice</div>
            <div className="overflow-auto max-h-96">
              <table className="w-full text-left border">
                <thead>
                  <tr className="bg-pink-100 text-xs sm:text-sm md:text-base">
                    <th className="p-0.5 sm:p-2 md:p-4">Porodica</th>
                    <th className="p-0.5 sm:p-2 md:p-4">Status</th>
                    <th className="p-0.5 sm:p-2 md:p-4">Odrasli</th>
                    <th className="p-0.5 sm:p-2 md:p-4">Deca</th>
                    <th className="p-0.5 sm:p-2 md:p-4">Poruka</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map(r => (
                    <tr
                      key={r.invitationCode}
                      className={`border-b ${r.status === 'accepted' ? 'bg-green-50' : r.status === 'declined' ? 'bg-red-50' : ''}`}
                    >
                      <td className="p-0.5 sm:p-2 font-bold">
                        {r.familyName}
                        {Array.isArray(r.members) && r.members.length > 0 && (
                          <div className="text-xs text-gray-500 font-normal mt-1">
                            {r.members.map(m => m.name).join(", ")}
                          </div>
                        )}
                      </td>
                      <td className="p-2">{r.status}</td>
                      <td className="p-2">{r.adultCount ?? 0}</td>
                      <td className="p-2">{r.childCount ?? 0}</td>
                      <td className="p-2">{r.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
