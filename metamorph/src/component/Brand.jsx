import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Brand.css'

gsap.registerPlugin(ScrollTrigger)

function Brand() {
  const brandRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      brandRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: brandRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <div ref={brandRef} className='w-full py-10 pointer-events-auto'>
      <div className='marquee-container'>
        <div className="marquee-content">
            <span className='brand-item'>NVIDIA</span>
            <span className='brand-item'>AMAZON</span>
            <span className='brand-item'>ETH INDIA</span>
            <span className='brand-item'>AWS</span>
            <span className='brand-item'>DEVFOLIO</span>
            <span className='brand-item'>NVIDIA</span>
            <span className='brand-item'>AMAZON</span>
            <span className='brand-item'>ETH INDIA</span>
            <span className='brand-item'>AWS</span>
            <span className='brand-item'>DEVFOLIO</span>
        </div>
      </div>
    </div>
  )
}

export default Brand
