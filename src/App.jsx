import "./styles.css";
import AdminDashboard from "./components/AdminDashboard.jsx";
import CursorConfetti from "./components/CursorConfetti.jsx";
import Details from "./components/Details.jsx";
import FloatingBubbles from "./components/FloatingBubbles.jsx";
import Footer from "./components/Footer.jsx";
import Gallery from "./components/Gallery.jsx";
import Hero from "./components/Hero.jsx";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";
import React, { createContext, useContext, useState } from "react";
import RsvpWidget from "./components/RsvpWidget.jsx";
import SadPopup from "./components/SadPopup.jsx";
import TeddyImage from "./components/TeddyImage.jsx";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "./context/LanguageContext.jsx";

const PopupContext = createContext();
export const usePopup = () => useContext(PopupContext);

export default function App() {
  const [showSadPopup, setShowSadPopup] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

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
    <LanguageProvider>
      <PopupContext.Provider value={{ showSad }}>
        <div className="min-h-screen">
          <LanguageSwitcher />
          <Toaster />
          <CursorConfetti />
          <FloatingBubbles />
          <Hero scrollToRsvp={scrollToRsvp} />
          <main className="space-y-12">
            <Details />
            <Gallery />
            <div ref={rsvpRef}>
              <RsvpWidget bounce={bounce} />
            </div>
          </main>
          <TeddyImage />
          <Footer onYearClick={() => setShowAdmin(true)} />
          <SadPopup isVisible={showSadPopup} />
          {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}
        </div>
      </PopupContext.Provider>
    </LanguageProvider>
  );
}
