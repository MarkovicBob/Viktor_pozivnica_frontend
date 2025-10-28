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
      className={`section pt-0${bounce ? " bounce-anim" : ""}`}
    >
      {!sent ? (
        <div className="card relative">
          <h3 className="text-3xl font-bold text-pink-700 font-elegant mb-3">
            {t("rsvpTitle")}
          </h3>
          <p className="text-lg text-gray-700 mb-6">{t("rsvpDescription")}</p>
          <p className="text-lg text-red-700 mb-6">{t("rsvpWarning1")}</p>
          <p className="text-lg text-red-700 mb-6">{t("rsvpWarning2")}</p>

          {!picked && (
            <div>
              <label className="block text-sm mb-1">{t("findFamily")}</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full border-2 border-pink-100 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200 transition-all duration-200 font-fredoka"
                style={{ fontFamily: "Fredoka, system-ui, sans-serif" }}
              />
              {loading && (
                <div className="text-sm mt-2 opacity-70">{t("searching")}</div>
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
                <div className="text-sm opacity-70">{t("loadingDetails")}</div>
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
                          ? "bg-pink-500 text-white shadow-lg scale-105"
                          : "bg-pink-100 text-pink-700 hover:bg-pink-200"
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
                        <label className="block text-sm mb-1">
                          {t("numberOfAdults")}
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setAdultCount(Math.max(0, adultCount - 1))
                              }
                              className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-xl border-2 border-pink-100 text-pink-500 hover:bg-pink-50 active:bg-pink-100 transition-all duration-200"
                            >
                              -
                            </button>
                            <div className="w-20 text-center text-xl font-semibold">
                              {adultCount}
                            </div>
                            <button
                              onClick={() =>
                                setAdultCount(Math.min(10, adultCount + 1))
                              }
                              className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-xl border-2 border-pink-100 text-pink-500 hover:bg-pink-50 active:bg-pink-100 transition-all duration-200"
                            >
                              +
                            </button>
                          </div>
                          {/* <span className="text-gray-500 mt-1 sm:mt-0">odraslih (18+ godina)</span> */}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm mb-1">
                          {t("numberOfChildren")}
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setChildCount(Math.max(0, childCount - 1))
                              }
                              className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-xl border-2 border-pink-100 text-pink-500 hover:bg-pink-50 active:bg-pink-100 transition-all duration-200"
                            >
                              -
                            </button>
                            <div className="w-20 text-center text-xl font-semibold">
                              {childCount}
                            </div>
                            <button
                              onClick={() =>
                                setChildCount(Math.min(10, childCount + 1))
                              }
                              className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-xl border-2 border-pink-100 text-pink-500 hover:bg-pink-50 active:bg-pink-100 transition-all duration-200"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-gray-500 mt-1 sm:mt-0">
                            {t("childrenAge")}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-pink-50/50 rounded-xl text-center">
                        <div className="text-lg font-medium text-gray-700">
                          {t("totalAttending")}{" "}
                          <span className="text-pink-600 font-bold">
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
                        className="w-full border-2 border-pink-100 rounded-xl px-4 py-3 h-32 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button
                      disabled={loading}
                      onClick={() => setShowConfirm(true)}
                      className="w-full py-4 px-8 rounded-xl text-xl font-medium bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg 
                        hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? t("sending") : t("confirmResponse")}
                    </button>

                    {showConfirm && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
                          <div className="text-xl font-bold mb-4 text-pink-700">
                            {t("confirmationTitle")}
                          </div>
                          <div className="flex gap-4 justify-center mt-6">
                            <button
                              className="btn btn-outline"
                              onClick={() => setShowConfirm(false)}
                            >
                              {t("cancel")}
                            </button>
                            <button
                              className="btn btn-primary"
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
            <div className="mt-6 p-4 text-center rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 text-gray-800 animate-fade-in">
              {notice}
            </div>
          )}
        </div>
      ) : (
        <div className="card relative text-center py-16">
          <div className="text-2xl font-bold text-pink-700 mb-4">
            {t("responseSent")}
          </div>
          <div className="text-lg text-gray-700 mb-2">{notice}</div>
          {/* <div className="mt-8 text-gray-400">Možete osvežiti stranicu za novu potvrdu.</div> */}
        </div>
      )}
    </section>
  );
}
