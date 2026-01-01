import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

const API_BASE =
  window.location.hostname === "localhost" ? "" : import.meta.env.VITE_API_URL;

export default function AdminDashboard({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [filterStatus, setFilterStatus] = useState("all");
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [summary, setSummary] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authed) return;
    setError("");
    fetch(`${API_BASE}/api/admin/rsvps/summary`, {
      headers: { "x-admin-token": token },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error === "Unauthorized") {
          setError(t("wrongPassword"));
          setAuthed(false);
        } else {
          setSummary(data);
        }
      });
    fetch(`${API_BASE}/api/admin/rsvps?status=all`, {
      headers: { "x-admin-token": token },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error === "Unauthorized") {
          setError(t("wrongPassword"));
          setAuthed(false);
        } else {
          Array.isArray(data)
            ? setRsvps(data)
            : setError(data.error || "Greška");
        }
      });
  }, [authed, token, t]);

  // Prevent background scroll and interaction when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  function handleLogin(e) {
    e.preventDefault();
    setAuthed(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="bg-gradient-to-br from-[#f5e6d3] to-[#e8dcc8] rounded-2xl shadow-xl p-8 max-w-2xl w-full relative border-2"
        style={{ borderColor: "#C4B5A0" }}
      >
        <button
          className="absolute top-4 right-4 text-[#A0826D] hover:text-[#8B7355] text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {!authed ? (
          <form onSubmit={handleLogin} className="space-y-4 text-center">
            <div
              className="text-2xl font-bold mb-2"
              style={{ color: "#8B7355", fontFamily: "Great Vibes, cursive" }}
            >
              {t("adminAccess")}
            </div>
            <input
              type="password"
              placeholder={t("adminPassword")}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full border-2 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "#C4B5A0",
                backgroundColor: "rgba(255,255,255,0.7)",
                color: "#8B7355",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#C9A961")}
              onBlur={(e) => (e.target.style.borderColor = "#C4B5A0")}
            />
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-full font-medium transition-all"
              style={{ backgroundColor: "#C9A961", color: "white" }}
            >
              {t("login")}
            </button>
            {error && (
              <div className="text-red-600 mt-2" style={{ color: "#A0826D" }}>
                {error}
              </div>
            )}
          </form>
        ) : (
          <div>
            <div
              className="text-2xl font-bold mb-4"
              style={{ color: "#8B7355", fontFamily: "Great Vibes, cursive" }}
            >
              {t("rsvpStatistics")}
            </div>
            {summary && (
              <div className="mb-6 grid grid-cols-2 gap-4 text-center">
                <div
                  className="rounded-xl p-4 cursor-pointer border-2 transition-all hover:shadow-md"
                  onClick={() => setFilterStatus("all")}
                  style={{
                    backgroundColor:
                      filterStatus === "all"
                        ? "rgba(201, 169, 97, 0.3)"
                        : "rgba(201, 169, 97, 0.1)",
                    borderColor: "#C9A961",
                    borderWidth: filterStatus === "all" ? "3px" : "2px",
                    transform:
                      filterStatus === "all" ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <div
                    className="text-lg font-bold"
                    style={{ color: "#8B7355" }}
                  >
                    {t("totalFamilies")}
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "#C9A961" }}
                  >
                    {summary.totalFamilies}
                  </div>
                </div>
                <div
                  className="rounded-xl p-4 cursor-pointer border-2 transition-all hover:shadow-md"
                  onClick={() => setFilterStatus("accepted")}
                  style={{
                    backgroundColor:
                      filterStatus === "accepted"
                        ? "rgba(160, 130, 109, 0.3)"
                        : "rgba(160, 130, 109, 0.1)",
                    borderColor: "#A0826D",
                    borderWidth: filterStatus === "accepted" ? "3px" : "2px",
                    transform:
                      filterStatus === "accepted" ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <div
                    className="text-lg font-bold"
                    style={{ color: "#8B7355" }}
                  >
                    {t("accepted")}
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "#A0826D" }}
                  >
                    {summary.acceptedFamilies}
                  </div>
                </div>
                <div
                  className="rounded-xl p-4 cursor-pointer border-2 transition-all hover:shadow-md"
                  onClick={() => setFilterStatus("declined")}
                  style={{
                    backgroundColor:
                      filterStatus === "declined"
                        ? "rgba(139, 115, 85, 0.3)"
                        : "rgba(139, 115, 85, 0.1)",
                    borderColor: "#8B7355",
                    borderWidth: filterStatus === "declined" ? "3px" : "2px",
                    transform:
                      filterStatus === "declined" ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <div
                    className="text-lg font-bold"
                    style={{ color: "#8B7355" }}
                  >
                    {t("declined")}
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "#8B7355" }}
                  >
                    {summary.declinedFamilies}
                  </div>
                </div>
                <div
                  className="rounded-xl p-4 cursor-pointer border-2 transition-all hover:shadow-md"
                  onClick={() => setFilterStatus("pending")}
                  style={{
                    backgroundColor:
                      filterStatus === "pending"
                        ? "rgba(196, 181, 160, 0.3)"
                        : "rgba(196, 181, 160, 0.1)",
                    borderColor: "#C4B5A0",
                    borderWidth: filterStatus === "pending" ? "3px" : "2px",
                    transform:
                      filterStatus === "pending" ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <div
                    className="text-lg font-bold"
                    style={{ color: "#8B7355" }}
                  >
                    {t("pending")}
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "#C4B5A0" }}
                  >
                    {summary.pendingFamilies}
                  </div>
                </div>
              </div>
            )}
            <div
              className="text-xl font-bold mb-2"
              style={{ color: "#8B7355" }}
            >
              {t("allFamilies")}
            </div>
            <div className="overflow-auto max-h-96">
              <table
                className="w-full text-left border"
                style={{ borderColor: "#C4B5A0" }}
              >
                <thead>
                  <tr
                    className="text-xs sm:text-sm md:text-base"
                    style={{ backgroundColor: "#e8dcc8", color: "#8B7355" }}
                  >
                    <th
                      className="p-0.5 sm:p-2 md:p-4 border-r"
                      style={{ borderColor: "#C4B5A0" }}
                    >
                      {t("family")}
                    </th>
                    <th
                      className="p-0.5 sm:p-2 md:p-4 border-r"
                      style={{ borderColor: "#C4B5A0" }}
                    >
                      {t("status")}
                    </th>
                    <th
                      className="p-0.5 sm:p-2 md:p-4 border-r text-center align-middle"
                      style={{ borderColor: "#C4B5A0" }}
                    >
                      {t("adults")}
                    </th>
                    <th
                      className="p-0.5 sm:p-2 md:p-4 border-r text-center align-middle"
                      style={{ borderColor: "#C4B5A0" }}
                    >
                      {t("children")}
                    </th>
                    <th
                      className="p-0.5 sm:p-2 md:p-4 border-r"
                      style={{ borderColor: "#C4B5A0" }}
                    >
                      {t("message")}
                    </th>
                    <th
                      className="p-0.5 sm:p-2 md:p-4 border-r"
                      style={{ borderColor: "#C4B5A0" }}
                    >
                      {t("confirmedAt")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const filtered = rsvps.filter((r) =>
                      filterStatus === "all" ? true : r.status === filterStatus
                    );
                    if (filtered.length === 0) {
                      return (
                        <tr>
                          <td
                            colSpan={6}
                            className="text-center py-6"
                            style={{ color: "#A0826D" }}
                          >
                            {t("emptyList")}
                          </td>
                        </tr>
                      );
                    }
                    return filtered.map((r) => (
                      <tr
                        key={r.invitationCode}
                        className="border-b"
                        style={{
                          borderColor: "#C4B5A0",
                          backgroundColor:
                            r.status === "accepted"
                              ? "rgba(201, 169, 97, 0.08)"
                              : r.status === "declined"
                              ? "rgba(139, 115, 85, 0.08)"
                              : "transparent",
                          color: "#8B7355",
                        }}
                      >
                        <td
                          className="p-0.5 sm:p-2 font-semibold border-r"
                          style={{ borderColor: "#C4B5A0" }}
                        >
                          {r.familyName}
                          {Array.isArray(r.members) && r.members.length > 0 && (
                            <div
                              className="text-xs sm:text-sm xl:text-base font-normal mt-1"
                              style={{ color: "#A0826D" }}
                            >
                              {r.members.map((m) => m.name).join(", ")}
                            </div>
                          )}
                        </td>
                        <td
                          className="p-0.5 text-xs sm:p-2 sm:text-sm border-r"
                          style={{ borderColor: "#C4B5A0" }}
                        >
                          {r.status}
                        </td>
                        <td
                          className="p-0.5 text-xs sm:p-2 sm:text-sm border-r text-center align-middle"
                          style={{ borderColor: "#C4B5A0" }}
                        >
                          {r.adultCount ?? 0}
                        </td>
                        <td
                          className="p-0.5 text-xs sm:p-2 sm:text-sm border-r text-center align-middle"
                          style={{ borderColor: "#C4B5A0" }}
                        >
                          {r.childCount ?? 0}
                        </td>
                        <td
                          className="p-0.5 text-xs sm:p-2 sm:text-sm border-r"
                          style={{ borderColor: "#C4B5A0" }}
                        >
                          {r.message}
                        </td>
                        <td
                          className="p-0.5 text-xs sm:p-2 sm:text-sm border-r"
                          style={{ borderColor: "#C4B5A0" }}
                        >
                          {r.respondedAt
                            ? new Date(r.respondedAt).toLocaleString("sr-RS", {
                                hour12: false,
                              })
                            : "-"}
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
