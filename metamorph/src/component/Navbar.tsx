import React from 'react'
import { Link } from 'react-router-dom'
import InteractiveHoverButton from './InteractiveHoverButton'
import { gsap } from 'gsap'
function Navbar() {
    const tl = gsap.timeline();
    tl.fromTo(
      '.navbar',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

  return (
    <nav className='sticky top-0 z-50 w-full bg-transparent  ' style={{
        // border: "2px solid red",
        // borderRadius: "10px"

    }}>
      <div className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo/Title */}
          <Link to="/" className='group'>
            <h1 className='text-3xl font-bold text-white tracking-wide transition-all duration-300 group-hover:scale-105 group-hover:tracking-wider'>
              <img src="https://www.meta-morph.tech/logo-nav.png" alt="" className='h-8 md:h-10' />
              {/* <span className='text-yellow-300'>-2k26</span> */}
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className='flex items-center gap-8'>
            <Link 
              to="/about" 
              className='relative text-white font-semibold text-lg transition-all duration-300 hover:[#646cff] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#646cff] after:transition-all after:duration-300 hover:after:w-full'
            >
              About
            </Link>
            <Link 
              to="/guide" 
              className='relative text-white font-semibold text-lg transition-all duration-300 hover:[#646cff] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#646cff]  after:transition-all after:duration-300 hover:after:w-full'
            >
              Guide
            </Link>
            <Link 
              to="/prize" 
              className='relative text-white font-semibold text-lg transition-all duration-300 hover:[#646cff] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#646cff]  after:transition-all after:duration-300 hover:after:w-full'
            >
              Prize
            </Link>
            <Link 
              to="/judges" 
              className='relative text-white font-semibold text-lg transition-all duration-300 hover:[#646cff] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#646cff]  after:transition-all after:duration-300 hover:after:w-full'
            >
              Judges
            </Link>
            <Link 
              to="/judges" 
              className='relative text-white font-semibold text-lg transition-all duration-300 hover:[#646cff] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#646cff]  after:transition-all after:duration-300 hover:after:w-full'
            >
              Mentor
            </Link>
             {/* <InteractiveHoverButton text="Apply With Devfolio" /> */}
          
            {/* <div className='mentor-container flex flex-col'>
            <Link to="/" className='text-white font-semibold text-lg'>Mentors</Link>
            <div className='navbar'></div>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
