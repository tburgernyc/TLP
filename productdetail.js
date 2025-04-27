import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as THREE from 'three';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [cartMessage, setCartMessage] = useState(false);
  const productImageRef = useRef(null);
  
  // Mock products data for demo
  const mockProducts = {
    'p1': {
      id: 'p1',
      name: 'Mystic Moon Tarot Deck',
      description: 'A beautifully illustrated tarot deck inspired by lunar phases and cosmic energy. Each card features intricate artwork that connects the reader to lunar wisdom and celestial guidance.',
      price: 42.99,
      category: 'tarot',
      images: [
        '/assets/images/products/tarot-deck.jpg',
        '/assets/images/products/tarot-deck-2.jpg',
        '/assets/images/products/tarot-deck-3.jpg',
      ],
      featured: true,
      inStock: true,
      rating: 4.8,
      reviews: 124,
      details: {
        dimensions: '2.75" x 4.75"',
        weight: '14 oz',
        cardCount: '78 cards',
        material: 'Premium cardstock with silver edges',
        includes: 'Deck, guidebook, and keepsake box',
        artist: 'Emma Nightingale',
        publishedYear: 2023
      },
      usage: 'The Mystic Moon Tarot deck connects the traditional tarot archetypes with lunar phases, making it especially powerful for readings done during moon rituals or when seeking guidance related to cycles and transitions. Each card is designed to enhance intuitive connection and provide clear insights.',
      reviews: [
        {
          id: 'r1',
          name: 'Sarah K.',
          rating: 5,
          date: '2023-12-15',
          comment: 'This is the most beautiful deck I\'ve ever owned. The lunar symbolism adds a new dimension to my readings, and the guidebook is incredibly helpful.'
        },
        {
          id: 'r2',
          name: 'Michael T.',
          rating: 4,
          date: '2024-01-22',
          comment: 'High quality cards with stunning artwork. The only reason for 4 stars instead of 5 is that the box is a bit difficult to open.'
        },
        {
          id: 'r3',
          name: 'Jennifer R.',
          rating: 5,
          date: '2024-02-08',
          comment: 'As a professional reader, I\'ve worked with many decks, but this one has quickly become my favorite for client sessions. The energy is perfect and the imagery speaks clearly.'
        }
      ],
      related: ['p14', 'p6', 'p5']
    },
    'p2': {
      id: 'p2',
      name: 'Amethyst Crystal Cluster',
      description: 'Natural amethyst cluster for spiritual protection, purification, and inner peace. This stunning specimen is ethically sourced and perfect for meditation spaces.',
      price: 28.50,
      category: 'crystals',
      images: [
        '/assets/images/products/amethyst.jpg',
        '/assets/images/products/amethyst-2.jpg',
        '/assets/images/products/amethyst-3.jpg',
      ],
      featured: true,
      inStock: true,
      rating: 4.9,
      reviews: 87,
      details: {
        dimensions: 'Approx. 3-4" wide',
        weight: '7-9 oz (varies by piece)',
        origin: 'Brazil',
        formation: 'Natural geode cluster',
        color: 'Deep purple with clear quartz base',
        quality: 'AAA grade',
        includes: 'Wooden display stand'
      },
      usage: 'Amethyst is a powerful stone for spiritual and psychic protection. It transmutes negative energy into love and promotes calm, balance, and peaceful sleep. Place in your bedroom to guard against nightmares, or in meditation spaces to enhance spiritual awareness. This crystal also helps with developing intuition and psychic abilities.',
      reviews: [
        {
          id: 'r1',
          name: 'David L.',
          rating: 5,
          date: '2024-01-05',
          comment: 'Absolutely gorgeous piece! The color is vibrant and it\'s larger than I expected. Great value for the price.'
        },
        {
          id: 'r2',
          name: 'Amanda W.',
          rating: 5,
          date: '2023-11-18',
          comment: 'I can feel the energy from this crystal the moment I hold it. Has helped tremendously with my anxiety and sleep issues.'
        },
        {
          id: 'r3',
          name: 'Robert J.',
          rating: 4,
          date: '2024-02-20',
          comment: 'Beautiful piece with great energy. The only reason for 4 stars is that my stand was slightly damaged during shipping.'
        }
      ],
      related: ['p7', 'p9', 'p12']
    },
    'p3': {
      id: 'p3',
      name: 'White Sage Smudge Bundle',
      description: 'Ethically harvested white sage bundle for cleansing spaces and removing negative energy. Each bundle is hand-tied and blessed before shipping.',
      price: 12.99,
      category: 'incense',
      images: [
        '/assets/images/products/sage.jpg',
        '/assets/images/products/sage-2.jpg',
        '/assets/images/products/sage-3.jpg',
      ],
      featured: true,
      inStock: true,
      rating: 4.7,
      reviews: 152,
      details: {
        dimensions: 'Approx. 8" long',
        weight: '2 oz',
        contents: 'White sage (Salvia apiana)',
        harvesting: 'Sustainably wild-harvested in California',
        includes: 'One sage bundle and instruction card',
        certification: 'Certified organic',
        packaging: 'Eco-friendly paper wrapping'
      },
      usage: 'White sage has been used for centuries in cleansing rituals. To use, light the tip of the bundle until it begins to smoke, then blow out the flame. Move the smoking bundle around your space while setting clear intentions for purification and protection. Focus on corners, doorways, and windows. After completion, extinguish in sand or a fireproof container.',
      reviews: [
        {
          id: 'r1',
          name: 'Lisa M.',
          rating: 5,
          date: '2024-01-30',
          comment: 'Perfect size bundle with strong, clean scent. I appreciate that it\'s ethically harvested.'
        },
        {
          id: 'r2',
          name: 'Jason T.',
          rating: 4,
          date: '2023-12-12',
          comment: 'Works well but burns a bit quickly. Would have liked it to last longer.'
        },
        {
          id: 'r3',
          name: 'Emily S.',
          rating: 5,
          date: '2024-02-14',
          comment: 'I use this after difficult client sessions to clear my therapy space. The energy shift is immediate and noticeable.'
        }
      ],
      related: ['p8', 'p11', 'p4']
    }
  };
  
  // 3D Product Visualization
  useEffect(() => {
    if (product && product.category === 'crystals' && productImageRef.current) {
      const container = productImageRef.current;
      
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      
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
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      const pointLight = new THREE.PointLight(0x9c27b0, 1, 10);
      pointLight.position.set(-5, 0, 5);
      scene.add(pointLight);
      
      // Create crystal cluster
      const createCrystalCluster = () => {
        const group = new THREE.Group();
        
        // Create multiple crystal formations
        for (let i = 0; i < 8; i++) {
          // Create a crystal
          const crystalGeometry = new THREE.ConeGeometry(
            0.2 + Math.random() * 0.3, // radius
            0.8 + Math.random() * 1.2, // height
            4 + Math.floor(Math.random() * 4) // segments
          );
          
          // Crystal material with purple hue
          const crystalMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(`hsl(270, ${70 + Math.random() * 30}%, ${50 + Math.random() * 30}%)`),
            metalness: 0.1,
            roughness: 0.2,
            transmission: 0.6,
            transparent: true,
            clearcoat: 1.0,
            clearcoatRoughness: 0.25
          });
          
          const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
          
          // Position randomly but clustered together
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 0.5;
          crystal.position.x = Math.cos(angle) * radius;
          crystal.position.y = Math.sin(angle) * radius;
          crystal.position.z = Math.random() * 0.3;
          
          // Rotate to create natural formation
          crystal.rotation.x = Math.random() * Math.PI / 4;
          crystal.rotation.y = Math.random() * Math.PI * 2;
          crystal.rotation.z = Math.random() * Math.PI / 4;
          
          group.add(crystal);
        }
        
        // Create base for the crystals
        const baseGeometry = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
        const baseMaterial = new THREE.MeshStandardMaterial({
          color: 0xd3d3d3,
          roughness: 0.8,
          metalness: 0.2
        });
        
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -0.5;
        base.scale.set(0.8, 0.4, 0.8);
        group.add(base);
        
        return group;
      };
      
      const crystalCluster = createCrystalCluster();
      scene.add(crystalCluster);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate crystal cluster slowly
        crystalCluster.rotation.y += 0.005;
        
        // Pulsate light
        const time = Date.now() * 0.001;
        pointLight.intensity = 1 + 0.5 * Math.sin(time);
        
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
      
      // Handle mouse interaction
      const handleMouseMove = (event) => {
        const rect = container.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        const mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
        
        // Tilt crystal based on mouse position
        crystalCluster.rotation.x = mouseY * 0.3;
        crystalCluster.rotation.z = mouseX * 0.3;
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
  }, [product]);
  
  // Fetch product data
  useEffect(() => {
    // Simulate API call to fetch product details
    setLoading(true);
    
    setTimeout(() => {
      if (mockProducts[id]) {
        setProduct(mockProducts[id]);
      } else {
        // Handle product not found
        console.error('Product not found');
      }
      
      setLoading(false);
    }, 1000);
  }, [id]);
  
  // Handle quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    // Add to cart logic would go here
    
    // Show cart message
    setCartMessage(true);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setCartMessage(false);
    }, 3000);
  };
  
  // Change active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    
    return stars;
  };
  
  if (loading) {
    return (
      <div className="product-detail-page">
        <Navigation />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="product-detail-page">
        <Navigation />
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, the product you're looking for doesn't exist.</p>
          <Link to="/shop" className="back-to-shop">
            Return to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="product-detail-page">
      <Navigation />
      
      {cartMessage && (
        <div className="cart-notification">
          <i className="fas fa-check-circle"></i>
          <span>{product.name} added to your cart!</span>
          <Link to="/cart" className="view-cart-button">
            View Cart
          </Link>
        </div>
      )}
      
      <div className="breadcrumbs">
        <Link to="/">Home</Link> / 
        <Link to="/shop">Shop</Link> / 
        <Link to={`/shop/${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link> / 
        <span>{product.name}</span>
      </div>
      
      <div className="product-detail-container">
        <div className="product-image-gallery">
          {product.category === 'crystals' ? (
            <div className="product-3d-view" ref={productImageRef}></div>
          ) : (
            <div className="product-main-image">
              <img src={product.images[0]} alt={product.name} />
            </div>
          )}
          
          <div className="product-thumbnails">
            {product.images.map((image, index) => (
              <div className="thumbnail" key={index}>
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="product-info">
          <h1>{product.name}</h1>
          
          <div className="product-meta">
            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              <span className="review-count">({product.reviews} reviews)</span>
            </div>
            
            {product.featured && (
              <div className="product-badge featured">
                <i className="fas fa-award"></i> Featured
              </div>
            )}
            
            {!product.inStock && (
              <div className="product-badge out-of-stock">
                Out of Stock
              </div>
            )}
          </div>
          
          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="product-description">
            <p>{product.description}</p>
          </div>
          
          {product.inStock ? (
            <div className="product-actions">
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
            </div>
          ) : (
            <div className="out-of-stock-message">
              <i className="fas fa-exclamation-circle"></i>
              <span>Currently Out of Stock</span>
              <button className="notify-btn">
                Notify Me When Available
              </button>
            </div>
          )}
          
          <div className="product-meta-info">
            <div className="meta-item">
              <i className="fas fa-tags"></i>
              <span>Category: </span>
              <Link to={`/shop/${product.category}`}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </div>
            
            <div className="meta-item">
              <i className="fas fa-truck"></i>
              <span>Shipping: </span>
              <span className="shipping-info">Free shipping on orders over $75</span>
            </div>
            
            <div className="meta-item">
              <i className="fas fa-shield-alt"></i>
              <span>Guarantee: </span>
              <span className="guarantee-info">30-day money-back guarantee</span>
            </div>
          </div>
          
          <div className="social-sharing">
            <span>Share: </span>
            <a href="#" className="social-icon facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon pinterest">
              <i className="fab fa-pinterest-p"></i>
            </a>
            <a href="#" className="social-icon email">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="product-tabs">
        <div className="tabs-header">
          <button
            className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => handleTabChange('description')}
          >
            Description
          </button>
          <button
            className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => handleTabChange('details')}
          >
            Details
          </button>
          <button
            className={`tab-button ${activeTab === 'usage' ? 'active' : ''}`}
            onClick={() => handleTabChange('usage')}
          >
            How to Use
          </button>
          <button
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => handleTabChange('reviews')}
          >
            Reviews ({product.reviews})
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-tab">
              <p>{product.description}</p>
            </div>
          )}
          
          {activeTab === 'details' && (
            <div className="details-tab">
              <h3>Product Specifications</h3>
              <div className="specifications-grid">
                {Object.entries(product.details).map(([key, value]) => (
                  <div className="specification" key={key}>
                    <div className="spec-name">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                    <div className="spec-value">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'usage' && (
            <div className="usage-tab">
              <h3>How to Use This Product</h3>
              <p>{product.usage}</p>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="reviews-tab">
              <h3>Customer Reviews</h3>
              
              <div className="rating-summary">
                <div className="average-rating">
                  <div className="rating-number">{product.rating.toFixed(1)}</div>
                  <div className="rating-stars">
                    {renderStars(product.rating)}
                  </div>
                  <div className="total-reviews">Based on {product.reviews} reviews</div>
                </div>
                
                <button className="write-review-button">
                  <i className="fas fa-pen"></i> Write a Review
                </button>
              </div>
              
              <div className="reviews-list">
                {product.reviews && product.reviews.map((review) => (
                  <div className="review" key={review.id}>
                    <div className="review-header">
                      <div className="reviewer-name">{review.name}</div>
                      <div className="review-date">{review.date}</div>
                    </div>
                    
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                    
                    <div className="review-content">
                      <p>{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <section className="related-products">
        <h2>You May Also Like</h2>
        <div className="products-grid">
          {/* Render related products here */}
          {/* This would typically map through related product IDs */}
          <div className="product-card">
            <div className="product-image">
              <img src="/assets/images/products/moonstone-pendant.jpg" alt="Moonstone Pendant Necklace" />
            </div>
            <h3>Moonstone Pendant Necklace</h3>
            <p className="product-price">$49.99</p>
            <button className="quick-view-button">Quick View</button>
          </div>
          
          <div className="product-card">
            <div className="product-image">
              <img src="/assets/images/products/tarot-book.jpg" alt="The Modern Witch's Guide to Tarot" />
            </div>
            <h3>The Modern Witch's Guide to Tarot</h3>
            <p className="product-price">$24.99</p>
            <button className="quick-view-button">Quick View</button>
          </div>
          
          <div className="product-card">
            <div className="product-image">
              <img src="/assets/images/products/chakra-candles.jpg" alt="Chakra Alignment Candle Set" />
            </div>
            <h3>Chakra Alignment Candle Set</h3>
            <p className="product-price">$35.99</p>
            <button className="quick-view-button">Quick View</button>
          </div>
        </div>
        
        <div className="view-all-products">
          <Link to="/shop" className="view-all-button">
            View All Products
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
