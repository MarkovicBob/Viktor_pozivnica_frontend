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

// Kreiramo context za popup
const PopupContext = createContext();
export const usePopup = () => useContext(PopupContext);

export default function App(){
  const [showSadPopup, setShowSadPopup] = useState(false);
  
  const showSad = () => {
    setShowSadPopup(true);
    setTimeout(() => setShowSadPopup(false), 2000);
  };

  return (
    <PopupContext.Provider value={{ showSad }}>
      <div className="min-h-screen">
        <Toaster />
        <CursorConfetti />
        <FloatingBubbles />
        <Hero/>
        <main className="space-y-12">
          <Details/>
          <Gallery/>
          {/* <RSVP/> */}
          <RsvpWidget />
        </main>
        <TeddyImage />
        <Footer/>
        <SadPopup isVisible={showSadPopup} />
      </div>
    </PopupContext.Provider>
  );
}