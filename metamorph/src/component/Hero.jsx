import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import InteractiveHoverButton from './InteractiveHoverButton';

function Hero() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const taglineRef = useRef(null);
    const buttonsRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          titleRef.current,
          { y: 80, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.3 }
        )
        .fromTo(
          subtitleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(
          taglineRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        );

        // Pulsing glow effect
        gsap.to(glowRef.current, {
          scale: 1.2,
          opacity: 0.6,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
    }, []);

    return (
        <div className="relative flex flex-col text-center justify-center items-center min-h-screen px-6 py-20 overflow-hidden">
            {/* Animated glow effect behind logo */}
            <div 
                ref={glowRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)',
                    zIndex: 0
                }}
            />

            <div className="relative z-10 pointer-events-auto flex flex-col justify-center items-center max-w-5xl mx-auto gap-8">
                {/* Header Image */}
                <div ref={titleRef}>
                    <img 
                        src="../header-web.png" 
                        alt="Metamorph Header"
                        className='mix-blend-screen drop-shadow-2xl'
                        style={{
                            height: "auto",
                            width: "100%",
                            maxWidth: "600px",
                            filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.5))'
                        }} 
                    />
                </div>

                {/* Logo */}
                <div
                    ref={subtitleRef}
                >
                    <img 
                        src="https://www.meta-morph.tech/logo-center.webp" 
                        alt="Metamorph Logo" 
                        className='w-72 md:w-[450px] drop-shadow-2xl'
                        style={{
                            filter: 'drop-shadow(0 0 40px rgba(99, 102, 241, 0.6))'
                        }}
                    />
                </div>

                {/* Tagline */}
                <p 
                    ref={taglineRef}
                    className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed font-light tracking-wide"
                    style={{
                        textShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                    }}
                >
                    Transform your ideas into reality. Join the ultimate hackathon experience.
                </p>

                {/* Buttons */}
                <div 
                    ref={buttonsRef}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
                >
                    <InteractiveHoverButton text="Apply With Devfolio" />
                    <InteractiveHoverButton text="Join Discord" />
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-gray-400 text-sm tracking-widest uppercase">Scroll</span>
                        <svg 
                            className="w-6 h-6 text-indigo-400" 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
