import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/navbar'
import GalaxyBackground from './component/GalaxyBackground'
// import PlanetBackground from './component/PlanetBackground'
import Hero from './component/Hero'
import Brand from './component/Brand'
import Secslide from './component/Secslide'
gsap.registerPlugin(ScrollTrigger)

function App() {
  const [count, setCount] = useState(0)
  const [showPlanet, setShowPlanet] = useState(false)
  const galaxyRef = useRef(null)
  const planetRef = useRef(null)

  // Detect scroll to switch backgrounds with GSAP
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Switch to planet when scrolled past first section
      if (scrollPosition > windowHeight * 0.8) {
        if (!showPlanet) {
          setShowPlanet(true);
        }
      } else {
        if (showPlanet) {
          setShowPlanet(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='w-full'>
      {/* First slide with galaxy background */}
      <div className='relative w-full h-screen overflow-hidden'>
        <GalaxyBackground />
        <div className='relative w-full h-full flex flex-col' style={{ zIndex: 10 }}>
          <div className='pointer-events-auto sticky top-0 z-50'>
            <Navbar />
          </div>
          <div className='flex-1 flex flex-col justify-center items-center pointer-events-auto'>
            <Hero />
          </div>
          <div className='pointer-events-auto pb-10'>
            <Brand />
          </div>
        </div>
      </div>
      
      {/* Slide 2 - overlaps on scroll */}
      <div className='relative w-full min-h-screen flex flex-col justify-center items-center bg-black'>
        {/* Secslide as background */}
        <div className='absolute inset-0 w-full h-full'>
          <Secslide/>
        </div>
        
        {/* Content on top - add your content here with relative z-10 */}
        <div className='relative z-10 pointer-events-auto'>
          {/* Your slide 2 content goes here */}
        </div>
      </div>
    </div>
  )
}

export default App
