const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function req(path, init) {
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

export const searchInvites = (q) =>
  req(`/api/invites/search?q=${encodeURIComponent(q)}`);

export const getInviteByCode = (code) =>
  req(`/api/invites/by-code/${encodeURIComponent(code)}`);

export const submitRsvp = (payload) =>
  req(`/api/rsvp`, { method: "POST", body: JSON.stringify(payload) });
