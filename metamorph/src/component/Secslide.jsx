import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Secslide = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        
        // No starfield needed - using shared galaxy background
        
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
       

      

     

        // Earth with advanced shader
        const earthGeometry = new THREE.SphereGeometry(3.5, 64, 64);
        
        // Load textures
        const dayTexture = textureLoader.load('/day.jpg');
        const nightTexture = textureLoader.load('/night.jpg');
        const specularCloudsTexture = textureLoader.load('/specularClouds.jpg');
        
        const earthMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uDayTexture: { value: dayTexture },
                uNightTexture: { value: nightTexture },
                uSpecularCloudsTexture: { value: specularCloudsTexture },
                uSunDirection: { value: new THREE.Vector3(1, 0, 0) },
                uAtmosphereDayColor: { value: new THREE.Color('#00aaff') },
                uAtmosphereTwilightColor: { value: new THREE.Color('#ff6600') }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D uDayTexture;
                uniform sampler2D uNightTexture;
                uniform sampler2D uSpecularCloudsTexture;
                uniform vec3 uSunDirection;
                uniform vec3 uAtmosphereDayColor;
                uniform vec3 uAtmosphereTwilightColor;
                
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    vec3 viewDirection = normalize(vPosition - cameraPosition);
                    vec3 normal = normalize(vNormal);
                    vec3 color = vec3(0.0);
                    
                    // Day and night textures
                    vec3 dayColor = texture2D(uDayTexture, vUv).rgb * 2.0;
                    vec3 nightColor = texture2D(uNightTexture, vUv).rgb;
                    vec2 specularCloudsColor = texture2D(uSpecularCloudsTexture, vUv).rg;
                    
                    // Sun orientation
                    float sunOrientation = dot(uSunDirection, normal);
                    float dayMix = smoothstep(-0.25, 0.5, sunOrientation);
                    color = mix(nightColor, dayColor, dayMix);
                    
                    // Clouds
                    float cloudMix = smoothstep(0.5, 1.0, specularCloudsColor.g * 1.1);
                    cloudMix *= dayMix;
                    color = mix(color, vec3(1.0), cloudMix);
                    
                    // Atmosphere
                    float fresnel = dot(viewDirection, normal) + 1.1;
                    fresnel = pow(fresnel, 2.0);
                    float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
                    vec3 atmosphereColors = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
                    color = mix(color, atmosphereColors, fresnel * atmosphereDayMix);
                    
                    // Specular reflection
                    vec3 reflection = reflect(-uSunDirection, normal);
                    float specular = -dot(reflection, viewDirection);
                    specular = max(specular, 0.0);
                    specular = pow(specular, 32.0);
                    specular *= specularCloudsColor.r * 0.7;
                    vec3 specularColor = mix(vec3(1.0), atmosphereColors, fresnel);
                    color += specular * specularColor;
                    
                    gl_FragColor = vec4(color, 1.0);
                }
            `
        });
        
        const box2 = new THREE.Mesh(earthGeometry, earthMaterial);
        box2.position.set(0, 0, 0);
        scene.add(box2);
        
        // Atmosphere layer with advanced shader
        const atmosphereGeometry = new THREE.SphereGeometry(3.7, 64, 64);
        const atmosphereMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uSunDirection: { value: new THREE.Vector3(1, 0, 0) },
                uAtmosphereDayColor: { value: new THREE.Color('#00aaff') },
                uAtmosphereTwilightColor: { value: new THREE.Color('#ff6600') },
                uOpacity: { value: 1.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    // Position
                    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * viewMatrix * modelPosition;
                    
                    // Model normal
                    vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
                    
                    // Varyings
                    vUv = uv;
                    vNormal = modelNormal;
                    vPosition = modelPosition.xyz;
                }
            `,
            fragmentShader: `
                uniform vec3 uSunDirection;
                uniform vec3 uAtmosphereDayColor;
                uniform vec3 uAtmosphereTwilightColor;
                uniform float uOpacity;
                
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    vec3 viewDirection = normalize(vPosition - cameraPosition);
                    vec3 normal = normalize(vNormal);
                    vec3 color = vec3(0.0);
                    
                    // Sun orientation
                    float sunOrientation = dot(uSunDirection, normal);
                    float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
                    vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
                    color = mix(color, atmosphereColor, atmosphereDayMix);
                    color += atmosphereColor;
                    
                    // Edge alpha for atmospheric glow
                    float edgeAlpha = dot(viewDirection, normal);
                    edgeAlpha = smoothstep(0.0, 1.3, edgeAlpha);
                    
                    float dayAlpha = smoothstep(-0.5, 0.0, sunOrientation);
                    float alpha = edgeAlpha * dayAlpha;
                    
                    gl_FragColor = vec4(color, alpha);
                    gl_FragColor.a *= uOpacity;
                }
            `,
            side: THREE.BackSide,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        atmosphere.position.set(0, 0, 0);
        scene.add(atmosphere);

        // Clouds layer - removed since clouds are now in the shader
        // Position Earth at center
        box2.position.set(0, 0, 0);
        
        scene.add(group);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(10, 5, 10);
        scene.add(directionalLight);
        
        const directionalLight2 = new THREE.DirectionalLight(0x3366ff, 0.3);
        directionalLight2.position.set(-10, -5, -10);
        scene.add(directionalLight2);

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
            antialias: true,
            alpha: true
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Animation
        const clock = new THREE.Clock();
        let animationFrameId;

        function animate() {
            const elapsedTime = clock.getElapsedTime();

            animationFrameId = requestAnimationFrame(animate);
            
            box2.rotation.y = elapsedTime * 0.1;
           
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
            box2.material.dispose();
            atmosphere.geometry.dispose();
            atmosphere.material.dispose();
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
