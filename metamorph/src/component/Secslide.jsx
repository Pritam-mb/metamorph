import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Secslide = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        
        // Cursor tracking
        const cursor = {
            x: 0,
            y: 0
        };

        const handleMouseMove = (event) => {
            cursor.x = event.clientX / window.innerWidth - 0.5;
            cursor.y = -(event.clientY / window.innerHeight - 0.5);
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Multiple objects
        const group = new THREE.Group();
        const textureLoader = new THREE.TextureLoader();

        // Mars material
       

      

     

        // Earth
        const box2 = new THREE.Mesh( 
            new THREE.SphereGeometry(2, 32, 64),
            new THREE.MeshStandardMaterial({ 
                map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
            }),
        );
        scene.add(box2);

        // Moon
      

        // box2.position.y = 10;
        // box2.position.x = 40;
        // box2.position.z = -10;
        box2.lookAt(new THREE.Vector3(0, 0, 0));
        scene.add(group);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        // Camera setup - use canvas parent dimensions
        const parentElement = canvasRef.current.parentElement;
        const height = parentElement.clientHeight || window.innerHeight;
        const width = parentElement.clientWidth || window.innerWidth;
        const ratio = width / height;

        const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
        camera.position.z = 10;
        camera.position.y = 0;
            camera.position.x = 0;
        scene.add(camera);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvasRef.current,
            antialias: true 
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Animation
        const clock = new THREE.Clock();
        let animationFrameId;

        function animate() {
            const elapsedTime = clock.getElapsedTime();

            animationFrameId = requestAnimationFrame(animate);
            
            box2.rotation.y = elapsedTime;
           
            group.rotation.y = 0.4 * elapsedTime;

            // camera.position.x = cursor.x * 20;
            // camera.position.z = Math.cos(cursor.y * 3) * 3;
            // camera.position.y = cursor.y * 6;
            camera.lookAt(box2.position);

            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        const handleResize = () => {
            const parentElement = canvasRef.current.parentElement;
            const newWidth = parentElement.clientWidth;
            const newHeight = parentElement.clientHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(newWidth, newHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
           
            box2.geometry.dispose();
            // box3.geometry.dispose();
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                display: 'block'
            }}
        />
    );
};

export default Secslide;
