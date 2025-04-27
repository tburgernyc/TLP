import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/About.css';

const About = () => {
  const timelineRef = useRef(null);
  const starfieldRef = useRef(null);
  
  // Timeline data
  const timeline = [
    {
      year: '1995',
      title: 'Beginning of the Journey',
      description: 'First encounter with tarot and spiritual practices during college studies in comparative religion.',
      icon: 'fas fa-seedling'
    },
    {
      year: '2001',
      title: 'Formal Training',
      description: 'Completed intensive study with master tarot readers and astrologers in the United States and Europe.',
      icon: 'fas fa-book'
    },
    {
      year: '2004',
      title: 'Opening Private Practice',
      description: 'Established first private practice offering tarot readings and astrological consultations.',
      icon: 'fas fa-store'
    },
    {
      year: '2009',
      title: 'Workshop Development',
      description: 'Created signature workshops on intuitive development and spiritual practices.',
      icon: 'fas fa-chalkboard-teacher'
    },
    {
      year: '2015',
      title: 'First Book Publication',
      description: 'Published first book on tarot interpretation, which became a bestseller in its category.',
      icon: 'fas fa-book-open'
    },
    {
      year: '2018',
      title: 'International Teaching',
      description: 'Began teaching workshops and retreats internationally, sharing spiritual wisdom across cultures.',
      icon: 'fas fa-globe-americas'
    },
    {
      year: '2021',
      title: 'Online Platform Launch',
      description: 'Expanded reach through online courses and virtual readings during global pandemic.',
      icon: 'fas fa-laptop'
    },
    {
      year: '2024',
      title: 'Present Day',
      description: 'Continuing to write, teach, and offer spiritual guidance while developing new approaches.',
      icon: 'fas fa-star'
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      text: "Tim's tarot reading was the most insightful experience I've had. His ability to connect with spiritual energies and translate them into practical guidance is remarkable.",
      author: "Jennifer R.",
      location: "Seattle, WA",
      image: "/assets/images/testimonials/jennifer.jpg"
    },
    {
      text: "I was skeptical at first, but Tim's astrological reading was so accurate it gave me chills. He provided clarity during a difficult time and helped me navigate major life decisions.",
      author: "Michael T.",
      location: "Boston, MA",
      image: "/assets/images/testimonials/michael.jpg"
    },
    {
      text: "The spiritual coaching sessions with Tim transformed my understanding of myself. His compassionate approach and deep knowledge created a safe space for profound inner work.",
      author: "Sophia L.",
      location: "Austin, TX",
      image: "/assets/images/testimonials/sophia.jpg"
    }
  ];
  
  // 3D Starfield Background
  useEffect(() => {
    if (starfieldRef.current) {
      const container = starfieldRef.current;
      
      // Scene setup
      const scene = new THREE.Scene();
      
      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 20;
      
      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
      
      // Create stars
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 1000;
      
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        
        // Position stars in a sphere
        const radius = 50 + Math.random() * 100;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        // Random colors with blues and purples dominant
        const hue = 0.6 + Math.random() * 0.2; // Blue to purple range
        const saturation = 0.5 + Math.random() * 0.5;
        const lightness = 0.5 + Math.random() * 0.5;
        
        const color = new THREE.Color().setHSL(hue, saturation, lightness);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        // Random sizes
        sizes[i] = Math.random() * 2;
      }
      
      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Star material
      const starMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      });
      
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      
      // Create nebula clouds
      const createNebula = () => {
        const geometry = new THREE.BufferGeometry();
        const particleCount = 500;
        
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        // Create a cluster of particles in a specific region
        const centerX = Math.random() * 100 - 50;
        const centerY = Math.random() * 100 - 50;
        const centerZ = Math.random() * 100 - 50;
        const nebulaSize = 20 + Math.random() * 30;
        
        // Choose a dominant color for the nebula
        const nebulaHue = Math.random();
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          // Position within the nebula cluster
          positions[i3] = centerX + (Math.random() - 0.5) * nebulaSize;
          positions[i3 + 1] = centerY + (Math.random() - 0.5) * nebulaSize;
          positions[i3 + 2] = centerZ + (Math.random() - 0.5) * nebulaSize;
          
          // Color variation within the nebula's dominant color
          const colorVariation = 0.1;
          const hue = (nebulaHue + (Math.random() - 0.5) * colorVariation) % 1;
          const saturation = 0.5 + Math.random() * 0.5;
          const lightness = 0.3 + Math.random() * 0.4;
          
          const color = new THREE.Color().setHSL(hue, saturation, lightness);
          colors[i3] = color.r;
          colors[i3 + 1] = color.g;
          colors[i3 + 2] = color.b;
          
          // Larger particles for nebula clouds
          sizes[i] = 1 + Math.random() * 3;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({
          size: 0.5,
          vertexColors: true,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending
        });
        
        return new THREE.Points(geometry, material);
      };
      
      // Add a few nebulae
      const nebulaeCount = 3;
      const nebulae = [];
      
      for (let i = 0; i < nebulaeCount; i++) {
        const nebula = createNebula();
        scene.add(nebula);
        nebulae.push(nebula);
      }
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Slowly rotate stars
        stars.rotation.y += 0.0005;
        stars.rotation.x += 0.0002;
        
        // Animate nebulae
        nebulae.forEach((nebula, index) => {
          nebula.rotation.y += 0.0003 * (index + 1);
          nebula.rotation.z += 0.0002 * (index + 1);
        });
        
        // Parallax effect on mouse move
        document.addEventListener('mousemove', (event) => {
          const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          const mouseY = (event.clientY / window.innerHeight) * 2 - 1;
          
          stars.rotation.y = mouseX * 0.1;
          stars.rotation.x = mouseY * 0.1;
        });
        
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
  
  // Animate timeline on scroll
  useEffect(() => {
    if (timelineRef.current) {
      const timelineElements = timelineRef.current.querySelectorAll('.timeline-item');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate');
            }
          });
        },
        { threshold: 0.2 }
      );
      
      timelineElements.forEach((element) => {
        observer.observe(element);
      });
      
      return () => {
        timelineElements.forEach((element) => {
          observer.unobserve(element);
        });
      };
    }
  }, []);
  
  return (
    <div className="about-page">
      <Navigation />
      
      <div className="starfield-background" ref={starfieldRef}></div>
      
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About Tim Burger</h1>
          <p>Spiritual Guide, Tarot Reader, and Author</p>
        </div>
      </div>
      
      <section className="about-intro">
        <div className="about-grid">
          <div className="about-image">
            <img src="/assets/images/tim-burger-portrait.jpg" alt="Tim Burger" />
          </div>
          
          <div className="about-bio">
            <h2>My Spiritual Journey</h2>
            <p>
              For over two decades, I've dedicated my life to exploring the mysteries of spiritual
              connection and helping others find clarity on their own paths. My journey began during
              my university studies in comparative religion, where I first encountered the rich
              symbolic language of tarot and the cosmic patterns of astrology.
            </p>
            <p>
              What started as intellectual curiosity quickly became a calling as I discovered my natural
              intuitive abilities and passion for guiding others. After completing formal training with
              respected teachers in various spiritual traditions, I established a practice that has since
              touched thousands of lives through readings, workshops, and books.
            </p>
            <p>
              My approach combines traditional wisdom with contemporary psychological insights, making
              ancient practices relevant and accessible for modern seekers. I believe that spiritual
              tools like tarot and astrology serve as mirrors reflecting our inner truth and catalysts
              for personal transformation.
            </p>
            <p>
              Whether through one-on-one sessions, group workshops, or my written works, my mission
              remains the same: to help you connect with your authentic self and illuminate your unique path.
            </p>
          </div>
        </div>
      </section>
      
      <section className="spiritual-approach">
        <h2>My Approach to Spiritual Guidance</h2>
        
        <div className="approach-cards">
          <div className="approach-card">
            <div className="approach-icon">
              <i className="fas fa-hands"></i>
            </div>
            <h3>Compassionate Presence</h3>
            <p>
              Every session begins with creating a safe, non-judgmental space where you can explore
              your questions and concerns without fear. My role is not to judge but to illuminate
              possibilities and support your journey.
            </p>
          </div>
          
          <div className="approach-card">
            <div className="approach-icon">
              <i className="fas fa-balance-scale"></i>
            </div>
            <h3>Balanced Perspective</h3>
            <p>
              I integrate intuitive insights with practical wisdom, helping you bridge the spiritual
              and material aspects of life. My readings provide both cosmic context and actionable guidance.
            </p>
          </div>
          
          <div className="approach-card">
            <div className="approach-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>Empowering Interpretation</h3>
            <p>
              Rather than predicting fixed outcomes, I focus on illuminating patterns and potentials,
              empowering you to make conscious choices that align with your highest good and authentic self.
            </p>
          </div>
          
          <div className="approach-card">
            <div className="approach-icon">
              <i className="fas fa-book-reader"></i>
            </div>
            <h3>Educational Focus</h3>
            <p>
              I believe in demystifying spiritual practices by sharing knowledge openly. Each session
              includes elements of teaching that help you develop your own intuitive abilities and spiritual understanding.
            </p>
          </div>
        </div>
      </section>
      
      <section className="credentials">
        <h2>Education & Training</h2>
        
        <div className="credentials-grid">
          <div className="credential-card">
            <div className="credential-icon">
              <i className="fas fa-university"></i>
            </div>
            <h3>Academic Background</h3>
            <ul>
              <li>M.A. in Comparative Religion, Pacific Northwest University</li>
              <li>B.A. in Psychology with minor in Philosophy, Evergreen State College</li>
              <li>Certificate in Jungian Psychology, European Institute of Depth Psychology</li>
            </ul>
          </div>
          
          <div className="credential-card">
            <div className="credential-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <h3>Spiritual Training</h3>
            <ul>
              <li>Advanced Certification in Tarot Mastery, International Tarot Guild</li>
              <li>Professional Astrologer Certification, American Federation of Astrologers</li>
              <li>Meditation Instructor Training, Mindfulness Center of the Northwest</li>
              <li>Ceremonial Practice Training, Indigenous Wisdom Keepers Council</li>
            </ul>
          </div>
          
          <div className="credential-card">
            <div className="credential-icon">
              <i className="fas fa-award"></i>
            </div>
            <h3>Professional Memberships</h3>
            <ul>
              <li>American Tarot Association, Professional Member since 2005</li>
              <li>International Association of Professional Astrologers</li>
              <li>Global Spiritual Practitioners Network, Founding Member</li>
              <li>Authors Guild, Professional Member</li>
            </ul>
          </div>
          
          <div className="credential-card">
            <div className="credential-icon">
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
            <h3>Teaching Experience</h3>
            <ul>
              <li>Guest Lecturer, Department of Religious Studies, Seattle University</li>
              <li>Workshop Leader, International Spiritual Symposium (2015-Present)</li>
              <li>Online Course Creator, "Intuitive Tarot Mastery" and "Practical Astrology"</li>
              <li>Retreat Facilitator, Sacred Journey Retreats</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="spiritual-journey">
        <h2>My Spiritual Journey Timeline</h2>
        
        <div className="timeline" ref={timelineRef}>
          {timeline.map((item, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-icon">
                  <i className={item.icon}></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </section>
      
      <section className="client-testimonials">
        <h2>What Clients Say</h2>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-content">
                <i className="fas fa-quote-left"></i>
                <p>{testimonial.text}</p>
                <i className="fas fa-quote-right"></i>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src={testimonial.image} alt={testimonial.author} />
                </div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="media-appearances">
        <h2>Media Appearances & Features</h2>
        
        <div className="media-grid">
          <div className="media-item">
            <div className="media-logo spiritual-times"></div>
            <h3>Spiritual Times Magazine</h3>
            <p>"The Modern Face of Tarot" - Cover Feature</p>
          </div>
          
          <div className="media-item">
            <div className="media-logo mystic-podcast"></div>
            <h3>The Mystic Podcast</h3>
            <p>Featured Guest, Episode 127: "Tarot in the Digital Age"</p>
          </div>
          
          <div className="media-item">
            <div className="media-logo wellness-channel"></div>
            <h3>Wellness Channel</h3>
            <p>Expert Contributor: "Understanding Astrological Transits"</p>
          </div>
          
          <div className="media-item">
            <div className="media-logo spiritual-summit"></div>
            <h3>Global Spiritual Summit</h3>
            <p>Keynote Speaker: "Intuitive Development for Modern Times"</p>
          </div>
        </div>
      </section>
      
      <section className="connect-section">
        <div className="connect-grid">
          <div className="connect-info">
            <h2>Connect With Me</h2>
            <p>
              I'm honored to be part of your spiritual journey. Whether you're seeking guidance
              through a personal reading, looking to develop your own intuitive abilities through
              a workshop, or exploring spiritual concepts through my books, I'm here to support you.
            </p>
            <div className="connect-options">
              <Link to="/services" className="connect-option">
                <i className="fas fa-calendar-alt"></i>
                <h3>Book a Reading</h3>
                <p>Schedule a personal tarot or astrological consultation</p>
              </Link>
              
              <Link to="/contact" className="connect-option">
                <i className="fas fa-envelope"></i>
                <h3>Contact Me</h3>
                <p>Send a message or inquiry about workshops and events</p>
              </Link>
              
              <div className="connect-option">
                <i className="fas fa-rss"></i>
                <h3>Follow My Blog</h3>
                <p>Spiritual insights and guidance updated weekly</p>
              </div>
              
              <div className="connect-option">
                <i className="fas fa-users"></i>
                <h3>Join Community</h3>
                <p>Connect with fellow seekers in our online spiritual community</p>
              </div>
            </div>
          </div>
          
          <div className="social-media-links">
            <h3>Find Me On Social Media</h3>
            <div className="social-icons">
              <a href="https://instagram.com/tarotlightpath" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com/tarotlightpath" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://youtube.com/tarotlightpath" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://tiktok.com/@tarotlightpath" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  
