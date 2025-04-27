import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/NotFound.css';

const NotFound = () => {
  const sceneRef = useRef(null);
  
  useEffect(() => {
    if (sceneRef.current) {
      const container = sceneRef.current;
      
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#050520');
      
      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      
      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
      
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0x9c27b0, 2, 10);
      pointLight.position.set(0, 0, 5);
      scene.add(pointLight);
      
      // Create portal
      const portalGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
      const portalMaterial = new THREE.MeshStandardMaterial({
        color: 0x9c27b0,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x9c27b0,
        emissiveIntensity: 0.5
      });
      const portal = new THREE.Mesh(portalGeometry, portalMaterial);
      scene.add(portal);
      
      // Create portal interior
      const interiorGeometry = new THREE.CircleGeometry(1.5, 32);
      const interiorMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.8
      });
      const interior = new THREE.Mesh(interiorGeometry, interiorMaterial);
      scene.add(interior);
      
      // Create floating particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 200;
      const posArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position particles in a circular pattern around the portal
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.5 + Math.random() * 3;
        
        posArray[i] = Math.cos(angle) * radius;
        posArray[i + 1] = Math.sin(angle) * radius;
        posArray[i + 2] = (Math.random() - 0.5) * 2;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
      });
      
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      
      // Create 404 text
      const fontLoader = new THREE.FontLoader();
      fontLoader.load('/assets/fonts/helvetiker_regular.typeface.json', (font) => {
        const textGeometry = new THREE.TextGeometry('404', {
          font: font,
          size: 0.5,
          height: 0.1,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.02,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5
        });
        
        textGeometry.center();
        
        const textMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.7,
          roughness: 0.2
        });
        
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.z = 1;
        scene.add(textMesh);
      });
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate portal
        portal.rotation.z += 0.005;
        
        // Animate particles
        particles.rotation.z += 0.001;
        
        // Pulsate portal
        const time = Date.now() * 0.001;
        const scale = 1 + 0.1 * Math.sin(time);
        portal.scale.set(scale, scale, 1);
        
        // Pulsate light
        pointLight.intensity = 1.5 + Math.sin(time * 2) * 0.5;
        
        // Render
        renderer.render(scene, camera);
      };
      
      // Handle resize
      const handleResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Start animation
      animate();
      
      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
        scene.clear();
        renderer.dispose();
        
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }
  }, []);
  
  return (
    <div className="not-found-page">
      <Navigation />
      
      <div className="not-found-content">
        <div className="not-found-scene" ref={sceneRef}></div>
        
        <div className="not-found-message">
          <h1>Page Not Found</h1>
          <p>The spiritual path you seek does not exist in this realm.</p>
          <p>Let us guide you back to your journey.</p>
          
          <div className="return-options">
            <Link to="/" className="return-home">
              <i className="fas fa-home"></i> Return to Home
            </Link>
            
            <Link to="/services" className="explore-services">
              <i className="fas fa-star"></i> Explore Services
            </Link>
            
            <Link to="/contact" className="contact-us">
              <i className="fas fa-envelope"></i> Contact Us
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
