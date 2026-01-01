import confetti from "canvas-confetti";
import { useEffect, useMemo, useState } from "react";
import { usePopup } from "../App";
import { getInviteByCode, searchInvites, submitRsvp } from "../api/rsvp";
import { useLanguage } from "../context/LanguageContext.jsx";

function useDebounced(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function RsvpWidget({ bounce }) {
  const { t } = useLanguage();
  const [showConfirm, setShowConfirm] = useState(false);
  const [sent, setSent] = useState(false);
  // Bounce animacija
  useEffect(() => {
    if (bounce) {
      const el = document.getElementById("rsvp-widget");
      if (el) {
        el.classList.add("bounce-anim");
        setTimeout(() => el.classList.remove("bounce-anim"), 700);
      }
    }
  }, [bounce]);
  const [query, setQuery] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [picked, setPicked] = useState(null); // { invitationCode, ... }
  const [invite, setInvite] = useState(null); // detalji iz /by-code
  const [status, setStatus] = useState("accepted");
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const { showSad } = usePopup();

  // ako postoji code u URL-u (?code=XYZ), automatski učitaj
  const codeFromUrl = useMemo(() => {
    const sp = new URLSearchParams(window.location.search);
    return sp.get("code") || "";
  }, []);

  const debounced = useDebounced(query);

  // auto-complete
  useEffect(() => {
    let stop = false;
    if (!debounced) {
      setSuggest([]);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const data = await searchInvites(debounced);
        if (!stop) setSuggest(data);
      } catch (_) {
        if (!stop) setSuggest([]);
      } finally {
        if (!stop) setLoading(false);
      }
    })();
    return () => {
      stop = true;
    };
  }, [debounced]);

  // ako ima code u URLu, učitaj odmah
  useEffect(() => {
    if (!codeFromUrl) return;
    (async () => {
      try {
        setLoading(true);
        const data = await getInviteByCode(codeFromUrl);
        setPicked({
          invitationCode: codeFromUrl,
          familyName: data.familyName,
          members: data.members,
        });
        setInvite(data);
        setStatus("accepted");

        // Ista logika kao u pick funkciji
        const totalMembers = (data.members || []).length;
        if (totalMembers <= 2) {
          setAdultCount(totalMembers);
          setChildCount(0);
        } else {
          setAdultCount(2);
          setChildCount(totalMembers - 2);
        }
      } catch (e) {
        setNotice(t("thankYouDeclined"));
      } finally {
        setLoading(false);
      }
    })();
  }, [codeFromUrl, t]);

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

      // Računamo broj odraslih i dece na osnovu broja članova
      const totalMembers = (data.members || []).length;
      if (totalMembers <= 2) {
        setAdultCount(totalMembers);
        setChildCount(0);
      } else {
        setAdultCount(2);
        setChildCount(totalMembers - 2);
      }
    } catch (e) {
      setNotice(e.message || "Greška");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit() {
    if (!picked?.invitationCode) return;
    setShowConfirm(false);
    try {
      setLoading(true);
      await submitRsvp({
        code: picked.invitationCode,
        status,
        attendeesCount: status === "accepted" ? adultCount + childCount : 0,
        adultCount: status === "accepted" ? adultCount : 0,
        childCount: status === "accepted" ? childCount : 0,
        message,
      });
      setSent(true);
      if (status === "accepted") {
        setNotice(t("thankYouAccepted"));
      } else {
        setNotice(t("thankYouDeclined"));
      }
    } catch (e) {
      setNotice(e.message || "Greška");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="rsvp-widget"
      aria-label="RSVP"
      className={`py-12 sm:py-16${bounce ? " bounce-anim" : ""}`}
      style={{
        background: "linear-gradient(135deg, #e8dcc8 0%, #f5e6d3 100%)",
      }}
    >
      {!sent ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div
            className="relative overflow-hidden rounded-2xl p-8 sm:p-10"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Decorations */}
            <div className="absolute top-4 right-4 text-3xl opacity-30">🎈</div>
            <div className="absolute top-4 left-4 text-3xl opacity-30">🌿</div>
            <div className="absolute bottom-4 right-4 text-2xl opacity-30">
              🍃
            </div>

            <div className="flex items-center justify-center mb-6">
              <h3
                className="text-3xl sm:text-4xl font-light"
                style={{ color: "#8B7355", fontFamily: "Great Vibes, cursive" }}
              >
                {t("rsvpTitle")}
              </h3>
            </div>
            <p
              className="text-base text-center mb-4"
              style={{ color: "#8B7355" }}
            >
              {t("rsvpDescription")}
            </p>
            <p
              className="text-sm text-center mb-2"
              style={{ color: "#C9A961" }}
            >
              {t("rsvpWarning1")}
            </p>
            <p
              className="text-sm text-center mb-6"
              style={{ color: "#C9A961" }}
            >
              {t("rsvpWarning2")}
            </p>

            {!picked && (
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "#8B7355" }}
                >
                  {t("findFamily")}
                </label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full rounded-xl px-4 py-3 text-base focus:outline-none transition-all duration-200"
                  style={{
                    border: "2px solid #C4B5A0",
                    color: "#8B7355",
                    background: "rgba(255,255,255,0.8)",
                  }}
                />
                {loading && (
                  <div className="text-sm mt-2 opacity-70">
                    {t("searching")}
                  </div>
                )}
                {suggest.length > 0 && (
                  <ul className="mt-2 border rounded-xl divide-y overflow-hidden">
                    {suggest.map((it) => (
                      <li key={it.invitationCode}>
                        <button
                          onClick={() => pick(it)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 font-fredoka"
                        >
                          <div className="font-medium font-fredoka">
                            {it.familyName}
                          </div>
                          <div className="text-sm opacity-70 font-fredoka">
                            {(it.members || []).map((m) => m.name).join(", ")}
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
                      {(picked.members || []).map((m) => m.name).join(", ")}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setPicked(null);
                      setInvite(null);
                      setNotice("");
                    }}
                    className="text-sm underline"
                  >
                    {t("change")}
                  </button>
                </div>

                {!invite ? (
                  <div className="text-sm opacity-70">
                    {t("loadingDetails")}
                  </div>
                ) : invite.status !== "pending" ? (
                  <div className="p-3 border rounded bg-gray-50">
                    {t("alreadyResponded")}
                    {/* ({invite.status}) */}
                  </div>
                ) : (
                  <>
                    <div className="flex gap-4 mb-6">
                      <button
                        onClick={() => setStatus("accepted")}
                        className={`flex-1 py-4 px-6 rounded-2xl text-lg font-medium transition-all duration-200 ${
                          status === "accepted"
                            ? "bg-emerald-600 text-white shadow-lg scale-105"
                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        }`}
                      >
                        {t("coming")}
                      </button>
                      <button
                        onClick={() => {
                          setStatus("declined");
                          showSad();
                        }}
                        className={`flex-1 py-4 px-6 rounded-2xl text-lg font-medium transition-all duration-200 ${
                          status === "declined"
                            ? "bg-gray-500 text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {t("notComing")}
                      </button>
                    </div>

                    {status === "accepted" && (
                      <div className="space-y-3">
                        <div>
                          <label
                            className="block text-sm mb-2"
                            style={{ color: "#8B7355" }}
                          >
                            {t("numberOfAdults")}
                          </label>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  setAdultCount(Math.max(0, adultCount - 1))
                                }
                                className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-xl transition-all duration-200"
                                style={{
                                  border: "2px solid #C4B5A0",
                                  color: "#8B7355",
                                  background: "rgba(255,255,255,0.8)",
                                }}
                              >
                                -
                              </button>
                              <div
                                className="w-20 text-center text-xl font-semibold"
                                style={{ color: "#8B7355" }}
                              >
                                {adultCount}
                              </div>
                              <button
                                onClick={() =>
                                  setAdultCount(Math.min(10, adultCount + 1))
                                }
                                className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-xl transition-all duration-200"
                                style={{
                                  border: "2px solid #C4B5A0",
                                  color: "#8B7355",
                                  background: "rgba(255,255,255,0.8)",
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label
                            className="block text-sm mb-2"
                            style={{ color: "#8B7355" }}
                          >
                            {t("numberOfChildren")}
                          </label>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  setChildCount(Math.max(0, childCount - 1))
                                }
                                className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-xl transition-all duration-200"
                                style={{
                                  border: "2px solid #C4B5A0",
                                  color: "#8B7355",
                                  background: "rgba(255,255,255,0.8)",
                                }}
                              >
                                -
                              </button>
                              <div
                                className="w-20 text-center text-xl font-semibold"
                                style={{ color: "#8B7355" }}
                              >
                                {childCount}
                              </div>
                              <button
                                onClick={() =>
                                  setChildCount(Math.min(10, childCount + 1))
                                }
                                className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-xl transition-all duration-200"
                                style={{
                                  border: "2px solid #C4B5A0",
                                  color: "#8B7355",
                                  background: "rgba(255,255,255,0.8)",
                                }}
                              >
                                +
                              </button>
                            </div>
                            <span
                              className="text-sm mt-1 sm:mt-0"
                              style={{ color: "#A0826D" }}
                            >
                              {t("childrenAge")}
                            </span>
                          </div>
                        </div>

                        <div
                          className="mt-4 p-4 rounded-xl text-center"
                          style={{ background: "rgba(201,169,97,0.1)" }}
                        >
                          <div
                            className="text-base font-medium"
                            style={{ color: "#8B7355" }}
                          >
                            {t("totalAttending")}{" "}
                            <span
                              className="font-bold"
                              style={{ color: "#C9A961" }}
                            >
                              {adultCount + childCount}
                            </span>{" "}
                            {adultCount + childCount === 1
                              ? t("person")
                              : t("people")}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-600 mb-2">
                          {t("messageForUs")}
                        </label>
                        <textarea
                          placeholder={t("messagePlaceholder")}
                          className="w-full border-2 border-emerald-100 rounded-xl px-4 py-3 h-32 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>

                      <button
                        disabled={loading}
                        onClick={() => setShowConfirm(true)}
                        className="w-full py-3 px-8 rounded-full text-lg font-medium shadow-lg 
                        hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                        style={{
                          background:
                            "linear-gradient(135deg, #C9A961 0%, #A0826D 100%)",
                          color: "white",
                        }}
                      >
                        {loading ? t("sending") : t("confirmResponse")}
                      </button>

                      {showConfirm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                          <div
                            className="rounded-2xl shadow-xl p-8 max-w-sm w-full text-center"
                            style={{ background: "rgba(255,255,255,0.95)" }}
                          >
                            <div
                              className="text-xl font-bold mb-4"
                              style={{ color: "#8B7355" }}
                            >
                              {t("confirmationTitle")}
                            </div>
                            <div className="flex gap-4 justify-center mt-6">
                              <button
                                className="px-6 py-2 rounded-full border-2 transition-all"
                                style={{
                                  borderColor: "#C4B5A0",
                                  color: "#8B7355",
                                }}
                                onClick={() => setShowConfirm(false)}
                              >
                                {t("cancel")}
                              </button>
                              <button
                                className="px-6 py-2 rounded-full transition-all"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #C9A961 0%, #A0826D 100%)",
                                  color: "white",
                                }}
                                onClick={onSubmit}
                              >
                                {t("send")}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {notice && (
              <div className="mt-6 p-4 text-center rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-800 animate-fade-in">
                {notice}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card relative text-center py-16">
          <div className="text-2xl font-bold text-emerald-800 mb-4">
            {t("responseSent")}
          </div>
          <div className="text-lg text-gray-700 mb-2">{notice}</div>
          {/* <div className="mt-8 text-gray-400">Možete osvežiti stranicu za novu potvrdu.</div> */}
        </div>
      )}
    </section>
  );
}
