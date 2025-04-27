import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/Shop.css';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const orbSceneRef = useRef(null);

  // Product categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'tarot', name: 'Tarot Decks' },
    { id: 'crystals', name: 'Crystals & Gemstones' },
    { id: 'incense', name: 'Sage & Incense' },
    { id: 'candles', name: 'Ritual Candles' },
    { id: 'jewelry', name: 'Spiritual Jewelry' },
    { id: 'books', name: 'Books & Guides' }
  ];

  // Mock products data
  const mockProducts = [
    {
      id: 'p1',
      name: 'Mystic Moon Tarot Deck',
      description: 'A beautifully illustrated tarot deck inspired by lunar phases and cosmic energy.',
      price: 42.99,
      category: 'tarot',
      image: '/assets/images/products/tarot-deck.jpg',
      featured: true,
      inStock: true,
      rating: 4.8,
      reviews: 124
    },
    {
      id: 'p2',
      name: 'Amethyst Crystal Cluster',
      description: 'Natural amethyst cluster for spiritual protection, purification, and inner peace.',
      price: 28.50,
      category: 'crystals',
      image: '/assets/images/products/amethyst.jpg',
      featured: true,
      inStock: true,
      rating: 4.9,
      reviews: 87
    },
    {
      id: 'p3',
      name: 'White Sage Smudge Bundle',
      description: 'Ethically harvested white sage bundle for cleansing spaces and removing negative energy.',
      price: 12.99,
      category: 'incense',
      image: '/assets/images/products/sage.jpg',
      featured: true,
      inStock: true,
      rating: 4.7,
      reviews: 152
    },
    {
      id: 'p4',
      name: 'Chakra Alignment Candle Set',
      description: 'Set of seven hand-poured soy candles in chakra colors with essential oils.',
      price: 35.99,
      category: 'candles',
      image: '/assets/images/products/chakra-candles.jpg',
      featured: false,
      inStock: true,
      rating: 4.6,
      reviews: 64
    },
    {
      id: 'p5',
      name: 'Moonstone Pendant Necklace',
      description: 'Sterling silver pendant with natural moonstone for intuition and feminine energy.',
      price: 49.99,
      category: 'jewelry',
      image: '/assets/images/products/moonstone-pendant.jpg',
      featured: true,
      inStock: true,
      rating: 4.9,
      reviews: 42
    },
    {
      id: 'p6',
      name: 'The Modern Witch\'s Guide to Tarot',
      description: 'Comprehensive guide to tarot reading for the contemporary practitioner.',
      price: 24.99,
      category: 'books',
      image: '/assets/images/products/tarot-book.jpg',
      featured: false,
      inStock: true,
      rating: 4.8,
      reviews: 76
    },
    {
      id: 'p7',
      name: 'Labradorite Palm Stone',
      description: 'Polished labradorite palm stone for transformation and spiritual protection.',
      price: 18.99,
      category: 'crystals',
      image: '/assets/images/products/labradorite.jpg',
      featured: false,
      inStock: true,
      rating: 4.7,
      reviews: 38
    },
    {
      id: 'p8',
      name: 'Frankincense & Myrrh Resin Incense',
      description: 'Traditional sacred resin incense for purification and spiritual connection.',
      price: 15.99,
      category: 'incense',
      image: '/assets/images/products/frankincense.jpg',
      featured: false,
      inStock: true,
      rating: 4.8,
      reviews: 53
    },
    {
      id: 'p9',
      name: 'Black Obsidian Scrying Mirror',
      description: 'Handcrafted obsidian mirror for divination and spiritual insight.',
      price: 59.99,
      category: 'crystals',
      image: '/assets/images/products/obsidian-mirror.jpg',
      featured: true,
      inStock: false,
      rating: 4.9,
      reviews: 29
    },
    {
      id: 'p10',
      name: 'Moon Phase Altar Candle Set',
      description: 'Set of eight beeswax candles representing the phases of the moon for ritual work.',
      price: 32.99,
      category: 'candles',
      image: '/assets/images/products/moon-candles.jpg',
      featured: false,
      inStock: true,
      rating: 4.8,
      reviews: 47
    },
    {
      id: 'p11',
      name: 'Tree of Life Brass Incense Holder',
      description: 'Intricate brass incense holder with sacred geometry Tree of Life design.',
      price: 27.99,
      category: 'incense',
      image: '/assets/images/products/incense-holder.jpg',
      featured: false,
      inStock: true,
      rating: 4.6,
      reviews: 34
    },
    {
      id: 'p12',
      name: 'Chakra Gemstone Bracelet',
      description: 'Adjustable bracelet with seven chakra gemstones for energy balance.',
      price: 23.99,
      category: 'jewelry',
      image: '/assets/images/products/chakra-bracelet.jpg',
      featured: false,
      inStock: true,
      rating: 4.7,
      reviews: 68
    },
    {
      id: 'p13',
      name: 'The Astrology of Self-Discovery',
      description: 'Insightful guide to using your birth chart for personal growth and transformation.',
      price: 22.99,
      category: 'books',
      image: '/assets/images/products/astrology-book.jpg',
      featured: false,
      inStock: true,
      rating: 4.5,
      reviews: 41
    },
    {
      id: 'p14',
      name: 'Wild Soul Tarot Deck',
      description: 'Nature-inspired tarot deck celebrating the connection between humanity and the natural world.',
      price: 45.99,
      category: 'tarot',
      image: '/assets/images/products/nature-tarot.jpg',
      featured: false,
      inStock: true,
      rating: 4.9,
      reviews: 56
    }
  ];

  // 3D Crystal Orb Scene
  useEffect(() => {
    if (orbSceneRef.current) {
      const container = orbSceneRef.current;
      
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#000000');
      
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
      
      // Create crystal orb
      const crystalGeometry = new THREE.IcosahedronGeometry(1.5, 4);
      const crystalMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.2,
        transmission: 0.95,
        transparent: true,
        clearcoat: 1.0,
        clearcoatRoughness: 0.25
      });
      
      const crystalOrb = new THREE.Mesh(crystalGeometry, crystalMaterial);
      scene.add(crystalOrb);
      
      // Inner glow
      const glowGeometry = new THREE.IcosahedronGeometry(1.3, 2);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x9c27b0,
        transparent: true,
        opacity: 0.5
      });
      const innerGlow = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(innerGlow);
      
      // Create floating particles inside
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 100;
      const posArray = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount * 3; i += 3) {
        // Position particles within a sphere
        const radius = 1.2 * Math.random();
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = radius * Math.cos(phi);
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8
      });
      
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate crystal
        crystalOrb.rotation.x += 0.005;
        crystalOrb.rotation.y += 0.01;
        
        innerGlow.rotation.x -= 0.003;
        innerGlow.rotation.y -= 0.007;
        
        // Pulsate inner glow
        const pulseScale = 0.95 + 0.05 * Math.sin(Date.now() * 0.002);
        innerGlow.scale.set(pulseScale, pulseScale, pulseScale);
        
        // Animate particles
        particles.rotation.x += 0.002;
        particles.rotation.y += 0.003;
        
        // Change colors over time
        const hue = (Date.now() * 0.0001) % 1;
        const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
        innerGlow.material.color = color;
        
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

  // Load products
  useEffect(() => {
    // Simulate API call to fetch products
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter products when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === activeCategory));
    }
  }, [activeCategory, products]);

  // Filter products when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // If no search, apply only category filter
      if (activeCategory === 'all') {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(products.filter(product => product.category === activeCategory));
      }
    } else {
      // Apply search filter with category filter
      const query = searchQuery.toLowerCase().trim();
      const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(query) || 
                            product.description.toLowerCase().includes(query);
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        return matchesSearch && matchesCategory;
      });
      setFilteredProducts(filtered);
    }
  }, [searchQuery, activeCategory, products]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    
    // Show notification
    setShowCartNotification(true);
    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="shop-page">
      <Navigation />
      
      <div className="shop-hero">
        <div className="shop-hero-content">
          <h1>Spiritual Products</h1>
          <p>Carefully curated tools for your spiritual journey</p>
        </div>
        
        <div className="crystal-orb-container" ref={orbSceneRef}></div>
      </div>
      
      <div className="shop-container">
        <aside className="shop-sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
          
          <div className="categories-container">
            <h3>Categories</h3>
            <ul className="categories-list">
              {categories.map((category) => (
                <li 
                  key={category.id}
                  className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="price-filter">
            <h3>Price Range</h3>
            <div className="price-slider-container">
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="price-slider" 
              />
              <div className="price-range-labels">
                <span>$0</span>
                <span>$100</span>
              </div>
            </div>
          </div>
          
          <div className="filter-options">
            <h3>Filter By</h3>
            <label className="filter-checkbox">
              <input type="checkbox" /> In Stock Only
            </label>
            <label className="filter-checkbox">
              <input type="checkbox" /> Featured Items
            </label>
            <label className="filter-checkbox">
              <input type="checkbox" /> New Arrivals
            </label>
          </div>
        </aside>
        
        <main className="products-grid-container">
          {isLoading ? (
            <div className="loading-products">
              <div className="spinner"></div>
              <p>Loading spiritual treasures...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-image" 
                    />
                    {product.featured && (
                      <span className="featured-badge">Featured</span>
                    )}
                    {!product.inStock && (
                      <div className="out-of-stock-overlay">
                        <span>Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`${i < Math.floor(product.rating) ? 'fas' : 'far'} fa-star`}
                          ></i>
                        ))}
                        {product.rating % 1 >= 0.5 && (
                          <i className="fas fa-star-half"></i>
                        )}
                      </div>
                      <span className="review-count">({product.reviews})</span>
                    </div>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    
                    <div className="product-actions">
                      <Link 
                        to={`/shop/product/${product.id}`} 
                        className="view-details-button"
                      >
                        View Details
                      </Link>
                      <button 
                        className="add-to-cart-button"
                        disabled={!product.inStock}
                        onClick={() => product.inStock && addToCart(product)}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products-found">
              <i className="fas fa-search"></i>
              <h3>No Products Found</h3>
              <p>Try adjusting your search criteria or browse our categories.</p>
              <button 
                className="reset-search-button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Show All Products
              </button>
            </div>
          )}
        </main>
      </div>
      
      {showCartNotification && (
        <div className="cart-notification">
          <i className="fas fa-check-circle"></i>
          <span>Item added to your cart!</span>
          <Link to="/cart" className="view-cart-button">View Cart</Link>
        </div>
      )}
      
      <section className="featured-categories">
        <h2>Shop by Category</h2>
        <div className="category-cards">
          <div className="category-card tarot-card">
            <div className="category-overlay">
              <h3>Tarot Decks</h3>
              <Link to="/shop/tarot" className="browse-category-button">
                Browse
              </Link>
            </div>
          </div>
          
          <div className="category-card crystals-card">
            <div className="category-overlay">
              <h3>Crystals & Gemstones</h3>
              <Link to="/shop/crystals" className="browse-category-button">
                Browse
              </Link>
            </div>
          </div>
          
          <div className="category-card incense-card">
            <div className="category-overlay">
              <h3>Sage & Incense</h3>
              <Link to="/shop/incense" className="browse-category-button">
                Browse
              </Link>
            </div>
          </div>
          
          <div className="category-card jewelry-card">
            <div className="category-overlay">
              <h3>Spiritual Jewelry</h3>
              <Link to="/shop/jewelry" className="browse-category-button">
                Browse
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="shipping-info">
        <div className="shipping-features">
          <div className="shipping-feature">
            <i className="fas fa-truck"></i>
            <h3>Fast Shipping</h3>
            <p>Orders ship within 1-2 business days</p>
          </div>
          
          <div className="shipping-feature">
            <i className="fas fa-globe-americas"></i>
            <h3>Worldwide Delivery</h3>
            <p>We ship to over 100 countries</p>
          </div>
          
          <div className="shipping-feature">
            <i className="fas fa-exchange-alt"></i>
            <h3>Easy Returns</h3>
            <p>30-day hassle-free return policy</p>
          </div>
          
          <div className="shipping-feature">
            <i className="fas fa-shield-alt"></i>
            <h3>Secure Checkout</h3>
            <p>SSL encrypted payment processing</p>
          </div>
        </div>
      </section>
      
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Join Our Spiritual Community</h2>
          <p>Subscribe for exclusive offers, new product announcements, and spiritual insights</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
      
      <Footer />
    </div>
