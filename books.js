import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/Books.css';

const Books = () => {
  const [activeBook, setActiveBook] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const bookSceneRef = useRef(null);
  
  // Books data
  const books = [
    {
      id: 'b1',
      title: 'Illuminating the Path: Tarot Wisdom for Modern Seekers',
      coverImage: '/assets/images/books/illuminating-path.jpg',
      publishDate: 'March 2024',
      amazonLink: 'https://www.amazon.com/dp/XXXXXXXXXX',
      description: `In "Illuminating the Path," Tim Burger draws on decades of tarot experience to guide readers through the rich symbolism and ancient wisdom of the tarot. This comprehensive guide helps modern spiritual seekers apply tarot insights to navigate life's challenges and opportunities.
      
      The book explores the major and minor arcana in depth, offering fresh interpretations that bridge traditional meanings with contemporary psychology and spiritual practices. Readers will discover how to develop their intuitive abilities, conduct meaningful readings, and use tarot as a tool for personal growth and transformation.
      
      Whether you're a beginner or experienced practitioner, this book provides the knowledge and techniques to deepen your tarot practice and illuminate your spiritual journey.`,
      pages: 312,
      isbn: '978-1234567890',
      featured: true,
      tags: ['tarot', 'spirituality', 'divination', 'self-help'],
      reviews: [
        {
          author: 'Sarah Johnson, Mystic Magazine',
          text: '"A groundbreaking approach to tarot that honors tradition while speaking to contemporary seekers. Burger\'s insights are profound yet accessible."',
          rating: 5
        },
        {
          author: 'Michael Liu, Spiritual Studies Professor',
          text: '"Combines scholarly depth with practical wisdom. This will become a standard reference for serious tarot students."',
          rating: 5
        }
      ]
    },
    {
      id: 'b2',
      title: 'Celestial Blueprints: Understanding Your Astrological Birth Chart',
      coverImage: '/assets/images/books/celestial-blueprints.jpg',
      publishDate: 'September 2023',
      amazonLink: 'https://www.amazon.com/dp/XXXXXXXXXX',
      description: `Your birth chart is a cosmic snapshot of the sky at the moment you were born—a personal map that can guide you through life's journey. In "Celestial Blueprints," Tim Burger demystifies astrology, making this ancient wisdom system accessible and relevant to modern readers.
      
      This comprehensive guide walks you through each component of your birth chart, from planets and signs to houses and aspects, revealing how these elements interact to shape your personality, challenges, and opportunities. You'll learn to interpret your own chart and gain insights into relationships, career paths, and spiritual growth.
      
      With practical exercises, case studies, and beautiful illustrations, this book transforms complex astrological concepts into tools for self-discovery and personal empowerment.`,
      pages: 278,
      isbn: '978-0987654321',
      featured: true,
      tags: ['astrology', 'birth charts', 'planets', 'spirituality'],
      reviews: [
        {
          author: 'Emma Roberts, Cosmic Connections',
          text: '"Finally, an astrology book that explains complex concepts without oversimplification. Burger\'s approach is both intellectually rigorous and spiritually enriching."',
          rating: 5
        },
        {
          author: 'James Thompson, Astrologer',
          text: '"A masterful blend of traditional astrology and modern psychological insights. This book has become my go-to recommendation for serious students."',
          rating: 4
        }
      ]
    },
    {
      id: 'b3',
      title: 'Sacred Spaces: Creating Altars and Rituals for Spiritual Connection',
      coverImage: '/assets/images/books/sacred-spaces.jpg',
      publishDate: 'May 2022',
      amazonLink: 'https://www.amazon.com/dp/XXXXXXXXXX',
      description: `In our busy modern world, creating sacred space is essential for spiritual wellbeing. "Sacred Spaces" guides readers in establishing personal altars and meaningful rituals that honor their unique spiritual path.
      
      Tim Burger draws on diverse traditions to present a framework for sacred space creation that can be adapted to any spiritual practice. With detailed instructions for altar setups, ritual tools, and ceremonies for different intentions and life transitions, this book empowers readers to craft their own spiritual practices.
      
      Beautiful photographs and personal stories inspire creativity while practical advice ensures that even beginners can successfully create spaces that support meditation, manifestation, healing, and connection with higher consciousness.`,
      pages: 224,
      isbn: '978-5678901234',
      featured: false,
      tags: ['altars', 'rituals', 'sacred space', 'spirituality'],
      reviews: [
        {
          author: 'Diana Chen, Mindful Living Guide',
          text: '"A beautiful, practical guide that has transformed my relationship with my home and spiritual practice. The photography alone is worth the price."',
          rating: 5
        },
        {
          author: 'Robert Williams, Spiritual Director',
          text: '"Burger offers thoughtful guidance for creating intentional space that transcends any single tradition. A truly inclusive approach to sacred space."',
          rating: 4
        }
      ]
    },
    {
      id: 'b4',
      title: 'The Language of Dreams: Symbols and Messages from the Unconscious',
      coverImage: '/assets/images/books/dream-language.jpg',
      publishDate: 'November 2021',
      amazonLink: 'https://www.amazon.com/dp/XXXXXXXXXX',
      description: `Dreams speak to us in a symbolic language that bridges our conscious and unconscious mind. In "The Language of Dreams," Tim Burger provides tools to decode this language and access the wisdom hidden in our nighttime visions.
      
      Drawing on psychology, mythology, and spiritual traditions, this guide explores common dream symbols and themes while acknowledging that the most powerful interpretations come from the dreamer. Readers will learn techniques for dream recall, journaling, and active dreamwork that transform sleeping hours into opportunities for insight and spiritual growth.
      
      With a comprehensive dream symbol directory and guidance for establishing a personal dream practice, this book helps readers develop an ongoing relationship with their dream world that enriches waking life.`,
      pages: 246,
      isbn: '978-6789012345',
      featured: false,
      tags: ['dreams', 'symbolism', 'unconscious', 'psychology'],
      reviews: [
        {
          author: 'Sophia Martinez, Dream Researcher',
          text: '"A fascinating blend of traditional symbolism and contemporary dreamwork techniques. Burger respects the reader\'s personal connection to their dreams while offering valuable guidance."',
          rating: 4
        },
        {
          author: 'Thomas Lee, Psychology Today',
          text: '"Accessible yet profound. This book stands out in the crowded field of dream interpretation by encouraging readers to develop their own symbolic language."',
          rating: 5
        }
      ]
    }
  ];

  // Set first book as active by default
  useEffect(() => {
    if (books.length > 0 && !activeBook) {
      setActiveBook(books[0]);
    }
  }, []);

  // 3D Floating Book Scene
  useEffect(() => {
    if (bookSceneRef.current) {
      const container = bookSceneRef.current;
      
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#121212');
      
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
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Create a mystical book
      const createBook = () => {
        const bookGroup = new THREE.Group();
        
        // Book cover
        const coverGeometry = new THREE.BoxGeometry(3, 4, 0.2);
        const coverMaterial = new THREE.MeshStandardMaterial({
          color: 0x7b0096,
          metalness: 0.3,
          roughness: 0.7
        });
        const cover = new THREE.Mesh(coverGeometry, coverMaterial);
        
        // Book pages
        const pagesGeometry = new THREE.BoxGeometry(2.8, 3.8, 0.4);
        const pagesMaterial = new THREE.MeshStandardMaterial({
          color: 0xf5f5f5,
          metalness: 0.1,
          roughness: 0.9
        });
        const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
        pages.position.z = 0.1;
        
        // Book decoration - golden lines
        const createGoldenLine = (width, height, x, y, z) => {
          const lineGeometry = new THREE.PlaneGeometry(width, height);
          const lineMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.8,
            roughness: 0.2
          });
          const line = new THREE.Mesh(lineGeometry, lineMaterial);
          line.position.set(x, y, z);
          return line;
        };
        
        // Add decorative lines to cover
        const borderWidth = 0.1;
        
        // Top horizontal line
        const topLine = createGoldenLine(3, borderWidth, 0, 1.95, 0.11);
        
        // Bottom horizontal line
        const bottomLine = createGoldenLine(3, borderWidth, 0, -1.95, 0.11);
        
        // Left vertical line
        const leftLine = createGoldenLine(borderWidth, 4, -1.45, 0, 0.11);
        
        // Right vertical line
        const rightLine = createGoldenLine(borderWidth, 4, 1.45, 0, 0.11);
        
        // Center emblem
        const emblemGeometry = new THREE.CircleGeometry(0.8, 32);
        const emblemMaterial = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: 0.8,
          roughness: 0.2
        });
        const emblem = new THREE.Mesh(emblemGeometry, emblemMaterial);
        emblem.position.z = 0.11;
        
        // Add star pattern to emblem
        const starGeometry = new THREE.CircleGeometry(0.7, 5);
        const starMaterial = new THREE.MeshStandardMaterial({
          color: 0x7b0096,
          metalness: 0.3,
          roughness: 0.7
        });
        const star = new THREE.Mesh(starGeometry, starMaterial);
        star.position.z = 0.12;
        
        // Add mystical symbols
        const symbolsGeometry = new THREE.PlaneGeometry(2.5, 2.5);
        const symbolsTexture = new THREE.TextureLoader().load('/assets/images/mystical-symbols.png');
        const symbolsMaterial = new THREE.MeshStandardMaterial({
          map: symbolsTexture,
          transparent: true,
          opacity: 0.7
        });
        const symbols = new THREE.Mesh(symbolsGeometry, symbolsMaterial);
        symbols.position.z = 0.13;
        
        // Assemble book
        bookGroup.add(cover);
        bookGroup.add(pages);
        bookGroup.add(topLine);
        bookGroup.add(bottomLine);
        bookGroup.add(leftLine);
        bookGroup.add(rightLine);
        bookGroup.add(emblem);
        bookGroup.add(star);
        bookGroup.add(symbols);
        
        return bookGroup;
      };
      
      const book = createBook();
      scene.add(book);
      
      // Create floating particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 100;
      const posArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0xffd700,
        transparent: true,
        opacity: 0.8
      });
      
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      
      // Animation variables
      let isBookOpening = false;
      let isBookClosing = false;
      let openingAngle = 0;
      
      // Book opening animation
      const openBook = () => {
        if (!isBookOpening && openingAngle < Math.PI) {
          isBookOpening = true;
          isBookClosing = false;
        }
      };
      
      // Book closing animation
      const closeBook = () => {
        if (!isBookClosing && openingAngle > 0) {
          isBookClosing = true;
          isBookOpening = false;
        }
      };
      
      // Trigger open and close animations periodically
      setTimeout(openBook, 2000);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Floating animation
        book.position.y = Math.sin(Date.now() * 0.001) * 0.2;
        
        // Gentle rotation
        book.rotation.y = Math.sin(Date.now() * 0.0005) * 0.2;
        
        // Book opening/closing animation
        if (isBookOpening) {
          openingAngle += 0.02;
          if (openingAngle >= Math.PI) {
            openingAngle = Math.PI;
            isBookOpening = false;
            
            // Schedule closing
            setTimeout(closeBook, 3000);
          }
          
          // Apply rotation to cover and pages
          book.children[0].rotation.x = openingAngle;
        }
        
        if (isBookClosing) {
          openingAngle -= 0.02;
          if (openingAngle <= 0) {
            openingAngle = 0;
            isBookClosing = false;
            
            // Schedule opening again
            setTimeout(openBook, 3000);
          }
          
          // Apply rotation to cover and pages
          book.children[0].rotation.x = openingAngle;
        }
        
        // Rotate particles
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
        
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

  const handleBookSelect = (book) => {
    setActiveBook(book);
    
    // Scroll to details section
    document.getElementById('book-details').scrollIntoView({ behavior: 'smooth' });
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="books-page">
      <Navigation />
      
      <div className="books-hero">
        <div className="books-hero-content">
          <h1>Books by Tim Burger</h1>
          <p>Spiritual wisdom and practical guidance for your journey</p>
        </div>
        <div className="floating-book-scene" ref={bookSceneRef}></div>
      </div>
      
      <div className="books-gallery">
        <h2>Published Works</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div 
              key={book.id} 
              className={`book-card ${activeBook?.id === book.id ? 'active' : ''}`}
              onClick={() => handleBookSelect(book)}
            >
              <div className="book-cover">
                <img src={book.coverImage} alt={book.title} />
                {book.featured && <span className="featured-badge">New Release</span>}
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="publish-date">Published: {book.publishDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {activeBook && (
        <div className="book-details" id="book-details">
          <div className="book-details-grid">
            <div className="book-cover-large">
              <img src={activeBook.coverImage} alt={activeBook.title} />
            </div>
            
            <div className="book-info-detailed">
              <h2>{activeBook.title}</h2>
              <div className="book-meta">
                <span><i className="far fa-calendar-alt"></i> Published: {activeBook.publishDate}</span>
                <span><i className="fas fa-book-open"></i> {activeBook.pages} pages</span>
                <span><i className="fas fa-barcode"></i> ISBN: {activeBook.isbn}</span>
              </div>
              
              <div className="book-description">
                {activeBook.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className="book-tags">
                {activeBook.tags.map((tag, index) => (
                  <span key={index} className="book-tag">{tag}</span>
                ))}
              </div>
              
              <div className="book-reviews">
                <h3>Reviews</h3>
                {activeBook.reviews.map((review, index) => (
                  <div key={index} className="review">
                    <div className="review-stars">
                      {[...Array(review.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <p className="review-text">{review.text}</p>
                    <p className="review-author">- {review.author}</p>
                  </div>
                ))}
              </div>
              
              <div className="book-actions">
                <button className="preview-button" onClick={togglePreview}>
                  <i className="far fa-eye"></i> Preview Pages
                </button>
                <a 
                  href={activeBook.amazonLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="amazon-button"
                >
                  <i className="fab fa-amazon"></i> Buy on Amazon
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showPreview && activeBook && (
        <div className="book-preview-overlay" onClick={togglePreview}>
          <div className="book-preview-container" onClick={(e) => e.stopPropagation()}>
            <div className="preview-header">
              <h3>Preview: {activeBook.title}</h3>
              <button className="close-preview" onClick={togglePreview}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="preview-content">
              <div className="preview-page">
                <h2>Table of Contents</h2>
                <ul className="toc-list">
                  <li><span className="chapter-number">1.</span> Introduction</li>
                  <li><span className="chapter-number">2.</span> The Foundations of Spiritual Practice</li>
                  <li><span className="chapter-number">3.</span> Understanding Sacred Symbols</li>
                  <li><span className="chapter-number">4.</span> Developing Intuitive Awareness</li>
                  <li><span className="chapter-number">5.</span> Practical Applications</li>
                  <li><span className="chapter-number">6.</span> Advanced Techniques</li>
                  <li><span className="chapter-number">7.</span> Integration into Daily Life</li>
                  <li><span className="chapter-number">8.</span> Case Studies and Examples</li>
                  <li><span className="chapter-number">9.</span> Conclusion: Your Continuing Journey</li>
                </ul>
              </div>
              
              <div className="preview-page">
                <h2>Chapter 1: Introduction</h2>
                <p>
                  The journey of spiritual discovery is both timeless and deeply personal. Throughout human
                  history, seekers have developed systems and practices to illuminate the path toward greater
                  understanding of ourselves and the cosmos. Whether you are beginning your spiritual journey
                  or deepening an established practice, this book offers tools and insights to support your
                  unique exploration.
                </p>
                <p>
                  In the pages that follow, we will explore ancient wisdom traditions through a contemporary
                  lens, honoring their origins while making their profound insights accessible to modern
                  seekers. The approach presented here draws from diverse spiritual systems while recognizing
                  that true wisdom ultimately
