import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    interest: 'general'
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const crystalBallRef = useRef(null);
  
  // Interest options
  const interestOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'tarot', label: 'Tarot Readings' },
    { value: 'astrology', label: 'Astrological Services' },
    { value: 'spiritual', label: 'Spiritual Guidance' },
    { value: 'products', label: 'Shop Products' },
    { value: 'books', label: 'Books & Publications' },
    { value: 'media', label: 'Media Inquiry' },
    { value: 'other', label: 'Other' }
  ];
  
  // FAQ data
  const faqs = [
    {
      question: 'What happens during a tarot reading?',
      answer: 'During a tarot reading, I'll create a safe and sacred space before shuffling the deck and laying out cards in a specific pattern (called a "spread"). Each position in the spread represents different aspects of your question or situation. I'll interpret the cards in relation to their positions, providing insights and guidance. Sessions typically last 30-60 minutes depending on the type of reading you've booked.'
    },
    {
      question: 'Do I need to prepare anything for my astrological reading?',
      answer: 'For an accurate astrological reading, I'll need your exact birth date, time, and location. This information allows me to calculate your precise birth chart. It's helpful to have questions or areas of focus prepared, though this isn't required. Astrological readings can cover life purpose, relationships, career paths, upcoming transits, and more.'
    },
    {
      question: 'How do online readings work?',
      answer: 'Online readings are conducted via Zoom or similar video conferencing platforms. After booking, you'll receive a confirmation email with a secure link for your session. Despite the distance, the spiritual connection remains strong, and many clients find online readings just as insightful as in-person sessions. They also offer the convenience of connecting from wherever you are in the world.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'You may reschedule or cancel your appointment up to 24 hours before your scheduled session for a full refund. Changes made with less than 24 hours' notice may be subject to a rebooking fee. If you need to make changes to your appointment, please contact me as soon as possible.'
    },
    {
      question: 'Do you offer gift certificates?',
      answer: 'Yes! Gift certificates are available for all services and make meaningful presents for loved ones. You can purchase these through the website or contact me directly to customize a spiritual gift package.'
    }
  ];
  
  // 3D Crystal Ball Scene
  useEffect(() => {
    if (crystalBallRef.current) {
      const container = crystalBallRef.current;
      
      // Scene setup
      const scene = new THREE.Scene();
      
      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      
      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
      
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);
      
      const pointLight1 = new THREE.PointLight(0x9c27b0, 2, 10);
      pointLight1.position.set(2, 1, 4);
      scene.add(pointLight1);
      
      const pointLight2 = new THREE.PointLight(0x2196f3, 2, 10);
      pointLight2.position.set(-2, -1, 4);
      scene.add(pointLight2);
      
      // Create crystal ball
      const ballGeometry = new THREE.SphereGeometry(2, 64, 64);
      const ballMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.95,
        transparent: true,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      });
      
      const crystalBall = new THREE.Mesh(ballGeometry, ballMaterial);
      scene.add(crystalBall);
      
      // Create inner sphere with galaxy texture
      const innerGeometry = new THREE.SphereGeometry(1.8, 32, 32);
      const textureLoader = new THREE.TextureLoader();
      const galaxyTexture = textureLoader.load('/assets/images/galaxy-texture.jpg');
      const innerMaterial = new THREE.MeshBasicMaterial({
        map: galaxyTexture,
        transparent: true,
        opacity: 0.7
      });
      
      const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
      scene.add(innerSphere);
      
      // Create floating particles inside
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 100;
      const posArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position particles within a sphere
        const radius = 1.5 * Math.random();
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = radius * Math.cos(phi);
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
      
      // Create base/stand for crystal ball
      const standGeometry = new THREE.CylinderGeometry(1, 1.5, 0.5, 32);
      const standMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a4a4a,
        metalness: 0.8,
        roughness: 0.2
      });
      const stand = new THREE.Mesh(standGeometry, standMaterial);
      stand.position.y = -2.25;
      scene.add(stand);
      
      // Create decorative ring around ball
      const ringGeometry = new THREE.TorusGeometry(2.05, 0.1, 16, 100);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.9,
        roughness: 0.1
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -0.5;
      scene.add(ring);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate crystal ball slowly
        crystalBall.rotation.y += 0.003;
        
        // Rotate inner sphere in opposite direction
        innerSphere.rotation.y -= 0.005;
        innerSphere.rotation.x += 0.002;
        
        // Rotate particles
        particles.rotation.y += 0.002;
        
        // Pulsate lights
        const time = Date.now() * 0.001;
        pointLight1.intensity = 1.5 + Math.sin(time) * 0.5;
        pointLight2.intensity = 1.5 + Math.sin(time + Math.PI) * 0.5;
        
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
      
      // Add mouse move effect for interactive movement
      const handleMouseMove = (event) => {
        const rect = container.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        const mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
        
        // Subtle tilt based on mouse position
        crystalBall.rotation.x = mouseY * 0.2;
        crystalBall.rotation.z = mouseX * 0.2;
      };
      
      container.addEventListener('mousemove', handleMouseMove);
      
      // Start animation
      animate();
      
      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('mousemove', handleMouseMove);
        scene.clear();
        renderer.dispose();
        
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }
  }, []);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // If form is valid, proceed with submission
    setIsSubmitting(true);
    
    // Simulate API call to submit form
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        interest: 'general'
      });
      
      // Hide success message after a few seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="contact-page">
      <Navigation />
      
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Tim</h1>
          <p>Reach out for spiritual guidance, booking inquiries, or general questions</p>
        </div>
      </div>
      
      <div className="contact-container">
        <div className="contact-form-section">
          <h2>Send a Message</h2>
          
          {submitSuccess ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out. I'll get back to you within 24-48 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={formErrors.name ? 'error' : ''}
                  />
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? 'error' : ''}
                  />
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="interest">Area of Interest</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                  >
                    {interestOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={formErrors.subject ? 'error' : ''}
                />
                {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className={formErrors.message ? 'error' : ''}
                ></textarea>
                {formErrors.message && <span className="error-message">{formErrors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
          
          <div className="contact-details">
            <h3>Other Ways to Connect</h3>
            <div className="contact-methods">
              <div className="contact-method">
                <i className="fas fa-phone"></i>
                <div className="contact-info">
                  <h4>Phone</h4>
                  <p>(555) 123-4567</p>
                  <p className="hours">Available Mon-Fri, 10am-6pm PST</p>
                </div>
              </div>
              
              <div className="contact-method">
                <i className="fas fa-envelope"></i>
                <div className="contact-info">
                  <h4>Email</h4>
                  <p>tim@tarotlightpath.com</p>
                  <p className="hours">Responses within 24-48 hours</p>
                </div>
              </div>
              
              <div className="contact-method">
                <i className="fas fa-map-marker-alt"></i>
                <div className="contact-info">
                  <h4>Office Location</h4>
                  <p>123 Mystic Avenue, Suite 456</p>
                  <p>Seattle, WA 98101</p>
                  <p className="hours">By appointment only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="crystal-ball-section">
          <div className="crystal-ball-container" ref={crystalBallRef}></div>
          
          <div className="quick-links">
            <h3>Quick Links</h3>
            <div className="links-grid">
              <Link to="/services" className="quick-link">
                <i className="fas fa-calendar-alt"></i>
                <span>Book a Reading</span>
              </Link>
              
              <Link to="/shop" className="quick-link">
                <i className="fas fa-shopping-bag"></i>
                <span>Shop Products</span>
              </Link>
              
              <Link to="/books" className="quick-link">
                <i className="fas fa-book"></i>
                <span>Explore Books</span>
              </Link>
              
              <Link to="/faq" className="quick-link">
                <i className="fas fa-question-circle"></i>
                <span>FAQ</span>
              </Link>
            </div>
          </div>
          
          <div className="social-connect">
            <h3>Connect on Social Media</h3>
            <div className="social-grid">
              <a href="https://instagram.com/tarotlightpath" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </a>
              
              <a href="https://facebook.com/tarotlightpath" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                <i className="fab fa-facebook"></i>
                <span>Facebook</span>
              </a>
              
              <a href="https://youtube.com/tarotlightpath" target="_blank" rel="noopener noreferrer" className="social-link youtube">
                <i className="fab fa-youtube"></i>
                <span>YouTube</span>
              </a>
              
              <a href="https://tiktok.com/@tarotlightpath" target="_blank" rel="noopener noreferrer" className="social-link tiktok">
                <i className="fab fa-tiktok"></i>
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3><i className="fas fa-question-circle"></i> {faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="more-questions">
          <p>Don't see your question here?</p>
          <a href="#contact-form" className="ask-button">Ask Tim Directly</a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
