import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import gsap from 'gsap';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/Homepage.css';

const HomePage = () => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Scene setup
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#121212');
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = false;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 5);
    scene.add(directionalLight);
    
    // Create tarot card circle
    const createTarotCircle = () => {
      const group = new THREE.Group();
      const cards = 22; // Major Arcana
      const radius = 3;
      
      for (let i = 0; i < cards; i++) {
        const cardGeometry = new THREE.PlaneGeometry(0.8, 1.4);
        const cardMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
          metalness: 0.3,
          roughness: 0.7,
        });
        
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        
        // Position in circle
        const angle = (i / cards) * Math.PI * 2;
        card.position.x = Math.cos(angle) * radius;
        card.position.y = Math.sin(angle) * radius;
        
        // Rotate to face center
        card.lookAt(0, 0, 0);
        
        // Add shine effect with custom shader
        const edges = new THREE.EdgesGeometry(cardGeometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xd4af37 });
        const wireframe = new THREE.LineSegments(edges, lineMaterial);
        card.add(wireframe);
        
        group.add(card);
      }
      
      return group;
    };
    
    const tarotCircle = createTarotCircle();
    scene.add(tarotCircle);
    
    // Create a floating light orb in the center
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x5e17eb,
      emissive: 0x5e17eb,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8,
    });
    const lightOrb = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(lightOrb);
    
    // Add light from the orb
    const pointLight = new THREE.PointLight(0x5e17eb, 2, 10);
    lightOrb.add(pointLight);
    
    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate tarot circle slowly
      tarotCircle.rotation.z += 0.001;
      
      // Animate light orb
      lightOrb.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      lightOrb.rotation.y += 0.01;
      
      // Pulse light
      const pulseValue = Math.sin(Date.now() * 0.002) * 0.5 + 1;
      pointLight.intensity = pulseValue * 2;
      
      // Update controls
      controls.update();
      
      // Render
      renderer.render(scene, camera);
    };
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Simulate loading content
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);
  
  return (
    <div className="homepage">
      <Navigation />
      
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="fade-in">Tarot Light Path</h1>
          <h2 className="fade-in delay-1">Discover Your Spiritual Journey with Tim Burger</h2>
          <p className="fade-in delay-2">
            Illuminating your path through tarot readings, astrological insights, and spiritual guidance
          </p>
          <div className="cta-buttons fade-in delay-3">
            <Link to="/services" className="cta-button primary">Book a Reading</Link>
            <Link to="/shop" className="cta-button secondary">Explore Shop</Link>
          </div>
        </div>
        
        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Connecting to the spiritual realm...</p>
          </div>
        ) : (
          <div className="three-container" ref={mountRef}></div>
        )}
      </div>
      
      <section className="services-preview">
        <h2>Spiritual Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon tarot-icon"></div>
            <h3>Tarot Readings</h3>
            <p>Gain clarity and insight with personalized tarot readings</p>
            <Link to="/services#tarot" className="learn-more">Learn More</Link>
          </div>
          
          <div className="service-card">
            <div className="service-icon astrology-icon"></div>
            <h3>Astrological Charts</h3>
            <p>Discover what the stars reveal about your life path</p>
            <Link to="/services#astrology" className="learn-more">Learn More</Link>
          </div>
          
          <div className="service-card">
            <div className="service-icon spiritual-icon"></div>
            <h3>Spiritual Guidance</h3>
            <p>One-on-one sessions to nurture your spiritual growth</p>
            <Link to="/services#guidance" className="learn-more">Learn More</Link>
          </div>
        </div>
      </section>
      
      <section className="testimonials">
        <h2>What Clients Say</h2>
        <div className="testimonial-carousel">
          <div className="testimonial">
            <p>"Tim's readings have been transformative for my spiritual journey. His insights are profound and accurate."</p>
            <div className="testimonial-author">Sarah M.</div>
          </div>
          
          <div className="testimonial">
            <p>"The clarity I gained from my astrological reading was exactly what I needed during a challenging time."</p>
            <div className="testimonial-author">David T.</div>
          </div>
          
          <div className="testimonial">
            <p>"Tim has a true gift. His spiritual guidance has helped me find my authentic path."</p>
            <div className="testimonial-author">Jessica K.</div>
          </div>
        </div>
      </section>
      
      <section className="featured-products">
        <h2>Featured Spiritual Tools</h2>
        <div className="product-carousel">
          <div className="product-card">
            <div className="product-image tarot-deck"></div>
            <h3>Mystic Moon Tarot Deck</h3>
            <p className="price">$42.99</p>
            <Link to="/shop/tarot-decks" className="shop-button">Shop Now</Link>
          </div>
          
          <div className="product-card">
            <div className="product-image crystals"></div>
            <h3>Crystal Healing Set</h3>
            <p className="price">$35.99</p>
            <Link to="/shop/crystals" className="shop-button">Shop Now</Link>
          </div>
          
          <div className="product-card">
            <div className="product-image sage"></div>
            <h3>Purification Sage Bundle</h3>
            <p className="price">$18.99</p>
            <Link to="/shop/incense" className="shop-button">Shop Now</Link>
          </div>
        </div>
        <div className="view-all">
          <Link to="/shop" className="view-all-link">View All Products</Link>
        </div>
      </section>
      
      <section className="latest-book">
        <div className="book-content">
          <h2>Latest Book by Tim Burger</h2>
          <h3>Illuminating the Path: Tarot Wisdom for Modern Seekers</h3>
          <p>
            Embark on a journey of self-discovery with Tim's comprehensive guide to understanding tarot
            and applying its ancient wisdom to contemporary challenges.
          </p>
          <Link to="/books" className="cta-button">Explore Books</Link>
        </div>
        <div className="book-image"></div>
      </section>
      
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Stay Connected on Your Spiritual Journey</h2>
          <p>Sign up for monthly insights, special offers, and spiritual guidance</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="subscribe-button">Subscribe</button>
          </form>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
