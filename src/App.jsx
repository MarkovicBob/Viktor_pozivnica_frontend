import React from 'react'
import Hero from './components/Hero.jsx'
import Details from './components/Details.jsx'
import Gallery from './components/Gallery.jsx'
import Footer from './components/Footer.jsx'
import { Toaster } from 'react-hot-toast'
import TeddyImage from './components/TeddyImage.jsx'
import CursorConfetti from './components/CursorConfetti.jsx'
import FloatingBubbles from './components/FloatingBubbles.jsx'
import RSVP from './components/RSVP.jsx'
import './styles.css'
export default function App(){
  return (
    <div className="min-h-screen">
      <Toaster />
      <CursorConfetti />
      <FloatingBubbles />
      <Hero/>
      <main className="space-y-12">
        <Details/>
        <Gallery/>
        <RSVP/>
      </main>
      <TeddyImage />
      <Footer/>
    </div>
  )
}