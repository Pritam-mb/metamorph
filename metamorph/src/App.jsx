import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import Navbar from './component/navbar'
import StarBackground from './component/StarBackground'
import GalaxyBackground from './component/GalaxyBackground'
import Hero from './component/Hero'
import Brand from './component/Brand'
import Secslide from './component/Secslide'
gsap.registerPlugin(ScrollTrigger)

function App() {
  const secSlideRef = useRef(null)
  const earthContainerRef = useRef(null)

  useEffect(() => {
    // Animate Earth on scroll - starts zoomed in showing top half, then zooms out and moves right
    if (earthContainerRef.current && secSlideRef.current) {
      gsap.fromTo(
        earthContainerRef.current,
        {
          x: '0%',
          y: '20%',
          scale: 5,
          opacity: 1
        },
        {
          x: '25%',
          y: '0%',
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: secSlideRef.current,
            start: 'top 100%',
            end: 'center center',
            scrub: 1.5,
            markers: true
          }
        }
      )
    }
  }, [])

  return (
    <div className='relative min-h-screen'>
      {/* Fixed star background for all slides */}
      <div className='fixed inset-0 w-full h-full' style={{ zIndex: 0 }}>
        <StarBackground />
      </div>
      
      {/* Scrollable content with transparent backgrounds */}
      <div className='relative' style={{ zIndex: 1 }}>
        {/* Navbar - sticky across all slides */}
        <div className='pointer-events-auto sticky top-0 z-50'>
          <Navbar />
        </div>
        
        {/* First slide - Hero with galaxy */}
        <div className='relative min-h-screen flex flex-col justify-center items-center pointer-events-none'>
          {/* Galaxy only on first slide */}
          <div className='absolute inset-0 w-full h-full' style={{ zIndex: 1 }}>
            <GalaxyBackground />
          </div>
          
          {/* Content on top of galaxy */}
          <div className='relative pointer-events-auto' style={{ zIndex: 2 }}>
            <Hero />
          </div>
          <div className='relative pointer-events-auto' style={{ zIndex: 2 }}>
            <Brand />
          </div>
        </div>
        
        {/* Spacer between slides */}
        <div className='h-96'></div>
        
        {/* Slide 2 - Earth slide (no galaxy, just stars) */}
        <div 
          ref={secSlideRef}
          className='relative min-h-screen flex items-center justify-start'
          style={{ overflow: 'visible' }}
        >
          {/* Earth container with animation */}
          <div 
            ref={earthContainerRef}
            className='absolute inset-0 w-full h-full'
            style={{
              transformOrigin: 'center center'
            }}
          >
            <Secslide/>
          </div>
          
          {/* Content on left side */}
          <div className='relative z-10 pointer-events-auto max-w-2xl p-12 ml-12'>
            <h2 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              Welcome To<br />The New World
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              AI agents that actually bring value to businesses and elevate workers productivity.
            </p>
            <button className='px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors'>
              Get started.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
