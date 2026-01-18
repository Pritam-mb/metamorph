import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

const GalaxyBackground = () => {
  const canvasRef = useRef(null);
  const guiRef = useRef(null);

  useEffect(() => {
    // Canvas
    const canvas = canvasRef.current;
    
    // Scene
    const scene = new THREE.Scene();
    
    // GUI Setup
    const gui = new GUI();
    guiRef.current = gui;
    
    const guipops = {};
    guipops.lineRadius = 5;
    guipops.count2 = 100000;
    guipops.branch = 4;
    guipops.spin = 1;
    guipops.randomness = 0.2;
    guipops.power = 8;
    guipops.insideColor = '#ff6030';
    guipops.outsideColor = '#1b3989';
    
    let particles2 = null;
    let particlegeometry2 = null;
    let particlematerial2 = null;
    
    // Galaxy 2 function (spiral galaxy)
    const galaxy2 = () => {
      if (particles2 !== null) {
        particlegeometry2.dispose();
        particlematerial2.dispose();
        scene.remove(particles2);
      }
      
      particlegeometry2 = new THREE.BufferGeometry();
      const count = 100000;
      const positions2 = new Float32Array(count * 3);
      const colors2 = new Float32Array(count * 3);
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const radius = Math.random() * guipops.lineRadius;
        const branch = ((i % guipops.branch) / guipops.branch) * Math.PI * 2;
        const spinangle = radius * guipops.spin;
        const randomx =
          Math.pow(Math.random(), guipops.power) *
          (Math.random() < 0.5 ? 1 : -1) *
          guipops.randomness;
        const randomy =
          Math.pow(Math.random(), guipops.power) *
          (Math.random() < 0.5 ? 1 : -1) *
          guipops.randomness;
        const randomz =
          Math.pow(Math.random(), guipops.power) *
          (Math.random() < 0.5 ? 1 : -1) *
          guipops.randomness;
        
        positions2[i3] = Math.cos(branch + spinangle) * radius + randomx;
        positions2[i3 + 1] = randomy;
        positions2[i3 + 2] = Math.sin(branch + spinangle) * radius + randomz;
        
        const insideColor = new THREE.Color(guipops.insideColor);
        const outsideColor = new THREE.Color(guipops.outsideColor);
        const mixedColor = insideColor.clone();
        mixedColor.lerp(outsideColor, radius / guipops.lineRadius);
        
        colors2[i3] = mixedColor.r;
        colors2[i3 + 1] = mixedColor.g;
        colors2[i3 + 2] = mixedColor.b;
      }
      
      particlegeometry2.setAttribute(
        'position',
        new THREE.BufferAttribute(positions2, 3)
      );
      particlegeometry2.setAttribute(
        'color',
        new THREE.BufferAttribute(colors2, 3)
      );
      
      particlematerial2 = new THREE.PointsMaterial({
        size: 0.02,
        sizeAttenuation: true,
        vertexColors: true,
      });
      
      particles2 = new THREE.Points(particlegeometry2, particlematerial2);
      scene.add(particles2);
    };
    
    galaxy2();
    
    // GUI Controls
    gui.add(guipops, 'lineRadius').min(0.01).max(20).step(0.01).name('Line Radius').onChange(galaxy2);
    gui.add(guipops, 'count2').min(100).max(10000).step(100).onFinishChange(galaxy2);
    gui.add(guipops, 'branch').min(2).max(5).step(1).onFinishChange(galaxy2);
    gui.add(guipops, 'spin').min(-5).max(20).step(0.001).onChange(galaxy2);
    gui.add(guipops, 'randomness').min(0).max(2).step(0.001).onChange(galaxy2);
    gui.add(guipops, 'power').min(1).max(10).step(0.1).onChange(galaxy2);
    gui.addColor(guipops, 'insideColor').onChange(galaxy2);
    gui.addColor(guipops, 'outsideColor').onChange(galaxy2);
    
    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 3;
    camera.position.y = 5;
    camera.position.z = 5;
    scene.add(camera);
    
    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableZoom = false; // Disable scroll zoom
    controls.enablePan = false; // Disable panning
    
    // Prevent wheel event on canvas to allow page scrolling
    const preventWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    canvas.addEventListener('wheel', preventWheel, { passive: false });
    
    // Renderer with transparency
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true, // Enable transparency
    });
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Animation
    const clock = new THREE.Clock();
    
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate spiral galaxy
      if (particles2) particles2.rotation.y = elapsedTime * 0.1;
      
      // Update controls
      controls.update();
      
      // Render
      renderer.render(scene, camera);
      
      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };
    
    tick();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('wheel', preventWheel);
      
      // Dispose geometries and materials
      if (particlegeometry2) particlegeometry2.dispose();
      if (particlematerial2) particlematerial2.dispose();
      
      // Remove GUI
      if (guiRef.current) {
        guiRef.current.destroy();
      }
      
      // Dispose renderer
      renderer.dispose();
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="webgl absolute top-0 left-0 w-full h-full"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default GalaxyBackground;
