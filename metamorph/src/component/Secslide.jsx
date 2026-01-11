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
        const marsMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xcd5c5c  // Fallback color
        });

        const marsTexture = textureLoader.load(
            'https://planetary.s3.amazonaws.com/web/assets/pictures/20161110_march2016_wholemap_equi.jpg',
            // onLoad
            function(texture) {
                console.log('Mars texture loaded successfully');
                marsMaterial.map = texture;
                marsMaterial.needsUpdate = true;
            },
            // onProgress
            undefined,
            // onError
            function(err) {
                console.error('Failed to load Mars texture:', err);
            }
        );

        const box1 = new THREE.Mesh( 
            new THREE.SphereGeometry(0.5, 64, 64),
            marsMaterial
        );

        // Earth
        const box2 = new THREE.Mesh( 
            new THREE.SphereGeometry(2, 64, 64),
            new THREE.MeshStandardMaterial({ 
                map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
            }),
        );
        scene.add(box2);

        // Moon
        const box3 = new THREE.Mesh( 
            new THREE.SphereGeometry(1, 64, 64),
            new THREE.MeshStandardMaterial({ 
                map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg'),
            }),
        );

        // group.add(box1);
        // group.add(box3);
        box1.position.x = -5;
        box3.position.x = 5;
        // box2.position.y = 10;
        // box2.position.x = 0;
        // box2.position.z = -10;
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
        camera.position.z = 20;
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
            box3.rotation.y = 0.1 * elapsedTime;
            box1.rotation.y = 1.5 * elapsedTime;
            group.rotation.y = 0.4 * elapsedTime;

            camera.position.x = cursor.x * 20;
            camera.position.z = Math.cos(cursor.y * 3) * 3;
            camera.position.y = cursor.y * 6;
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
            marsMaterial.dispose();
            box1.geometry.dispose();
            box2.geometry.dispose();
            box3.geometry.dispose();
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
