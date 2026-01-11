import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import InteractiveHoverButton from './InteractiveHoverButton';

function Hero() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonRef = useRef(null);
    const decorLineRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // tl.fromTo(
        //   decorLineRef.current,
        //   { scaleX: 0 },
        //   { scaleX: 1, duration: 1 }
        // )
       tl.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        ).fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }
        );
    }, []);

    return (
        <div className="flex flex-col text-center justify-center items-center h-full"
            style={{
                // border: "2px solid red",
                // height: "80vh",
                // width: "100%",
            }}
        >
            <div className="jis pointer-events-auto flex flex-col justify-center items-center">
                <div className='mb-10'><img ref={titleRef} src="../header-web.png" alt=""
                    className='mix-blend-screen'
                    style={{
                        height: "80px",
                        width: "550px",
                    }} /></div>
                <h1
                    ref={subtitleRef}
                    className="text-5xl md:text-6xl font-bold text-white mb-4 text-shadow-lg font-poppins "
                >
                    <img src="https://www.meta-morph.tech/logo-center.webp" alt="" className='w-64 md:w-96 mix-blend-multiply' />
                </h1>
            </div>
            <div className="flex w-full items-center justify-center p-4 gap-6">
                <InteractiveHoverButton text="Apply With Devfolio" />
                <InteractiveHoverButton text="Join Discord" />
            </div>
               <div className='relative w-full'>
       
      </div>
        </div>

    );
}

export default Hero;
