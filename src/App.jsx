import "./styles.css";
import AdminPage from "./pages/AdminPage.jsx";
import CursorConfetti from "./components/CursorConfetti.jsx";
import Details from "./components/Details.jsx";
import FloatingBubbles from "./components/FloatingBubbles.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";
import React, { createContext, useContext, useEffect, useState } from "react";
import RsvpWidget from "./components/RsvpWidget.jsx";
import SadPopup from "./components/SadPopup.jsx";
import TeddyImage from "./components/TeddyImage.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext.jsx";

const PopupContext = createContext();
export const usePopup = () => useContext(PopupContext);

function HomePage() {
  const [showSadPopup, setShowSadPopup] = useState(false);

  // Probudi server čim se komponenta mountuje
  useEffect(() => {
    fetch("https://viktor-pozivnica-server.onrender.com/health").catch(
      () => {}
    ); // Tiho ignoriši greške
  }, []);

  const showSad = () => {
    setShowSadPopup(true);
    setTimeout(() => setShowSadPopup(false), 2000);
  };

  const rsvpRef = React.useRef(null);
  const [bounce, setBounce] = useState(false);
  const scrollToRsvp = () => {
    if (rsvpRef.current) {
      rsvpRef.current.scrollIntoView({ behavior: "smooth" });
      setBounce(true);
      setTimeout(() => setBounce(false), 700);
    }
  };

  return (
    <PopupContext.Provider value={{ showSad }}>
      <div className="min-h-screen">
        <LanguageSwitcher />
        <Toaster />
        <CursorConfetti />
        <FloatingBubbles />
        <Hero scrollToRsvp={scrollToRsvp} />
        <main className="space-y-0 sm:space-y-0">
          <Details />
          <div ref={rsvpRef}>
            <RsvpWidget bounce={bounce} />
          </div>
        </main>
        <TeddyImage />
        <Footer />
        <SadPopup isVisible={showSadPopup} />
      </div>
    </PopupContext.Provider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
