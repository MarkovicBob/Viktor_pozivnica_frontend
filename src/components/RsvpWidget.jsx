import { useEffect, useMemo, useState } from "react";
import { searchInvites, getInviteByCode, submitRsvp } from "../api/rsvp";

function useDebounced(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function RsvpWidget() {
  const [query, setQuery] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [picked, setPicked] = useState(null); // { invitationCode, ... }
  const [invite, setInvite] = useState(null); // detalji iz /by-code
  const [status, setStatus] = useState("accepted");
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");

  // ako postoji code u URL-u (?code=XYZ), automatski učitaj
  const codeFromUrl = useMemo(() => {
    const sp = new URLSearchParams(window.location.search);
    return sp.get("code") || "";
  }, []);

  const debounced = useDebounced(query);

  // auto-complete
  useEffect(() => {
    let stop = false;
    if (!debounced) { setSuggest([]); return; }
    (async () => {
      try {
        setLoading(true);
        const data = await searchInvites(debounced);
        if (!stop) setSuggest(data);
      } catch (_) {
        if (!stop) setSuggest([]);
      } finally { if (!stop) setLoading(false); }
    })();
    return () => { stop = true; };
  }, [debounced]);

  // ako ima code u URLu, učitaj odmah
  useEffect(() => {
    if (!codeFromUrl) return;
    (async () => {
      try {
        setLoading(true);
        const data = await getInviteByCode(codeFromUrl);
        setPicked({ invitationCode: codeFromUrl, familyName: data.familyName, members: data.members });
        setInvite(data);
        setStatus("accepted");
        setCount(data.seats ?? 0);
      } catch (e) {
        setNotice("Kod nije pronađen.");
      } finally { setLoading(false); }
    })();
  }, [codeFromUrl]);

  async function pick(item) {
    setPicked(item);
    setSuggest([]);
    setQuery("");
    setInvite(null);
    setNotice("");
    try {
      setLoading(true);
      const data = await getInviteByCode(item.invitationCode);
      setInvite(data);
      setStatus("accepted");
      setCount(data.seats ?? 0);
    } catch (e) {
      setNotice(e.message || "Greška");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit() {
    if (!picked?.invitationCode) return;
    try {
      setLoading(true);
      await submitRsvp({
        code: picked.invitationCode,
        status,
        attendeesCount: status === "accepted" ? count : 0,
        message,
      });
      setNotice("Hvala! Vaš odgovor je zabeležen. ❤️");
    } catch (e) {
      setNotice(e.message || "Greška");
    } finally {
      setLoading(false);
    }
  }

  return (
    
    <div className="w-full max-w-xl mx-auto mt-6 p-4 border rounded-2xl shadow-sm">
      <p className="opacity-80 mt-1">Molimo potvrdi dolazak kako bismo sve lepo organizovali. 💖</p>
      <h3 className="text-lg font-semibold mb-2">Potvrda dolaska </h3>

      {!picked && (
        <div>
          <label className="block text-sm mb-1">Pronađi svoju porodicu</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ukucaj prezime ili ime…"
            className="w-full border rounded-xl px-4 py-3"
          />
          {loading && <div className="text-sm mt-2 opacity-70">Tražim…</div>}
          {suggest.length > 0 && (
            <ul className="mt-2 border rounded-xl divide-y overflow-hidden">
              {suggest.map((it) => (
                <li key={it.invitationCode}>
                  <button
                    onClick={() => pick(it)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    <div className="font-medium">{it.familyName}</div>
                    <div className="text-sm opacity-70">
                      {(it.members || []).map(m => m.name).join(", ")}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {picked && (
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-medium">{picked.familyName}</div>
              <div className="text-sm opacity-70">
                {(picked.members || []).map(m => m.name).join(", ")}
              </div>
            </div>
            <button
              onClick={() => { setPicked(null); setInvite(null); setNotice(""); }}
              className="text-sm underline"
            >
              Promeni
            </button>
          </div>

          {!invite ? (
            <div className="text-sm opacity-70">Učitavam detalje…</div>
          ) : invite.status !== "pending" ? (
            <div className="p-3 border rounded bg-gray-50">
              Ovaj poziv je već odgovoren ({invite.status}).
            </div>
          ) : (
            <>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={status === "accepted"}
                    onChange={() => setStatus("accepted")}
                  />
                  Dolazimo
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={status === "declined"}
                    onChange={() => setStatus("declined")}
                  />
                  Nažalost ne možemo
                </label>
              </div>

              {status === "accepted" && (
                <div>
                  <label className="block text-sm mb-1">Broj dolazaka</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={count}
                    onChange={(e) => setCount(+e.target.value || 0)}
                    className="border rounded px-3 py-2 w-32"
                  />
                </div>
              )}

              <textarea
                placeholder="Poruka (opciono)…"
                className="w-full border rounded p-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
                disabled={loading}
                onClick={onSubmit}
                className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60"
              >
                Potvrdi
              </button>
            </>
          )}
        </div>
      )}

      {notice && <div className="mt-3 text-sm">{notice}</div>}
    </div>
  );
}
