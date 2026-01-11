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
    <>
      <div className='relative ' 
      style={{
        border: "2px solid red"
      }}>
        <GalaxyBackground />
        <div className='relative pointer-events-none' style={{ zIndex: 10 }}>
          <div className='pointer-events-auto sticky top-0 z-50'>
            <Navbar />
          </div>
          <div className='flex flex-col gap-20 justify-center items-center p-20 pointer-events-auto'>
            <Hero />
          </div>
            <Brand />
          
          {/* Slide 2 */}
          <div className='relative min-h-screen flex flex-col justify-center items-center pointer-events-auto py-20'
          style={{
            // border: "2px solid blue"
          }}>
            {/* Secslide as background */}
            <div className='absolute inset-0 w-full h-full'>
              <Secslide/>
            </div>
            
            {/* Content on top */}
            <div className='relative z-10 w-full max-w-7xl'>
              <h2 className='text-7xl font-bold text-white mb-8'>Slide 2 Title</h2>
              <p className='text-3xl text-gray-200 mb-16'>This is your second slide with galaxy background</p>
              <div className='grid grid-cols-3 gap-8'>
                <div className='bg-white/20 backdrop-blur-md p-10 rounded-xl border border-white/30'>
                  <h3 className='text-3xl font-bold text-white mb-4'>Card 1</h3>
                  <p className='text-xl text-gray-200'>Content here</p>
                </div>
                <div className='bg-white/20 backdrop-blur-md p-10 rounded-xl border border-white/30'>
                  <h3 className='text-3xl font-bold text-white mb-4'>Card 2</h3>
                  <p className='text-xl text-gray-200'>Content here</p>
                </div>
                <div className='bg-white/20 backdrop-blur-md p-10 rounded-xl border border-white/30'>
                  <h3 className='text-3xl font-bold text-white mb-4'>Card 3</h3>
                  <p className='text-xl text-gray-200'>Content here</p>
                </div>
              </div>
            </div>
          </div>
      </div>
        </div>

    </>
  )
}

export default App
