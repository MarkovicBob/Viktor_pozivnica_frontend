import React, { useState, createContext, useContext } from 'react';
import Hero from './components/Hero.jsx';
import Details from './components/Details.jsx';
import Gallery from './components/Gallery.jsx';
import Footer from './components/Footer.jsx';
import { Toaster } from 'react-hot-toast';
import TeddyImage from './components/TeddyImage.jsx';
import CursorConfetti from './components/CursorConfetti.jsx';
import FloatingBubbles from './components/FloatingBubbles.jsx';
import SadPopup from './components/SadPopup.jsx';
import RsvpWidget from './components/RsvpWidget.jsx';
import './styles.css';


const PopupContext = createContext();
export const usePopup = () => useContext(PopupContext);

export default function App(){
  const [showSadPopup, setShowSadPopup] = useState(false);
  
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
        <Toaster />
        <CursorConfetti />
        <FloatingBubbles />
        <Hero scrollToRsvp={scrollToRsvp}/>
        <main className="space-y-12">
          <Details/>
          <Gallery/>
          {/* <RSVP/> */}
          <div ref={rsvpRef}>
            <RsvpWidget bounce={bounce} />
          </div>
        </main>
        <TeddyImage />
        <Footer/>
        <SadPopup isVisible={showSadPopup} />
      </div>
    </PopupContext.Provider>
  );
}