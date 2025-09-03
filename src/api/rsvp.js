
const BASE = (import.meta.env.DEV ? "" : (import.meta.env.VITE_API_URL || "")).replace(/\/$/, "");

async function req(path, init = {}) {
  const isJsonBody = init.body && typeof init.body === "object" && !(init.body instanceof FormData);

  const res = await fetch(`${BASE}${path}`, {
    ...init, 
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    body: isJsonBody ? JSON.stringify(init.body) : init.body,
  });

  let data = null;
  try { data = await res.json(); } catch {}

  if (!res.ok) {
    throw new Error((data && data.error) || `HTTP ${res.status}`);
  }
  return data;
}

export const searchInvites = (q) =>
  req(`/api/invites/search?q=${encodeURIComponent(q)}`);

export const getInviteByCode = (code) =>
  req(`/api/invites/by-code/${encodeURIComponent(code)}`);

export const submitRsvp = (payload) =>
  req(`/api/rsvp`, { method: "POST", body: payload });
