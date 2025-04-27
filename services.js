import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/Services.css';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_yourStripePublishableKey');

const Services = () => {
  const [activeTab, setActiveTab] = useState('tarot');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const tarotSceneRef = useRef(null);

  // Services data
  const services = {
    tarot: [
      {
        id: 't1',
        name: 'Single Card Reading',
        description: 'A focused reading on one specific question or area of your life.',
        duration: '15 min',
        price: 29.99,
      },
      {
        id: 't2',
        name: 'Three Card Spread',
        description: 'Past, present, and future insights for deeper understanding.',
        duration: '30 min',
        price: 49.99,
      },
      {
        id: 't3',
        name: 'Celtic Cross Reading',
        description: 'Comprehensive 10-card reading for detailed life guidance.',
        duration: '60 min',
        price: 89.99,
      },
    ],
    astrology: [
      {
        id: 'a1',
        name: 'Birth Chart Analysis',
        description: 'Discover your planetary influences and life path.',
        duration: '45 min',
        price: 69.99,
      },
      {
        id: 'a2',
        name: 'Compatibility Reading',
        description: 'Understand relationship dynamics through astrological analysis.',
        duration: '60 min',
        price: 99.99,
      },
      {
        id: 'a3',
        name: 'Solar Return Reading',
        description: 'Forecast for your coming year based on your solar return chart.',
        duration: '45 min',
        price: 79.99,
      },
    ],
    guidance: [
      {
        id: 'g1',
        name: 'Spiritual Coaching Session',
        description: 'One-on-one guidance for your spiritual development.',
        duration: '60 min',
        price: 119.99,
      },
      {
        id: 'g2',
        name: 'Meditation Guidance',
        description: 'Learn personalized meditation techniques for your spiritual practice.',
        duration: '45 min',
        price: 59.99,
      },
      {
        id: 'g3',
        name: 'Energy Healing Session',
        description: 'Chakra balancing and energy clearing for spiritual well-being.',
        duration: '60 min',
        price: 99.99,
      },
    ],
  };

  // 3D Tarot Card Scene
  useEffect(() => {
    if (activeTab === 'tarot' && tarotSceneRef.current) {
      const container = tarotSceneRef.current;
      
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
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Create tarot cards
      const createTarotCard = (posX) => {
        const cardGroup = new THREE.Group();
        
        // Card body
        const cardGeometry = new THREE.PlaneGeometry(1.5, 2.5);
        const cardMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
          metalness: 0.3,
          roughness: 0.7,
        });
        
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        
        // Card border
        const borderGeometry = new THREE.PlaneGeometry(1.6, 2.6);
        const borderMaterial = new THREE.MeshStandardMaterial({
          color: 0xd4af37,
          side: THREE.DoubleSide,
          metalness: 0.7,
          roughness: 0.3,
        });
        
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.position.z = -0.01;
        
        // Card back design (simple pattern)
        const backGeometry = new THREE.PlaneGeometry(1.4, 2.4);
        const backMaterial = new THREE.MeshStandardMaterial({
          color: 0x5e17eb,
          side: THREE.DoubleSide,
          metalness: 0.5,
          roughness: 0.5,
        });
        
        const back = new THREE.Mesh(backGeometry, backMaterial);
        back.position.z = 0.01;
        
        // Add star pattern to back
        const starGeometry = new THREE.CircleGeometry(0.05, 5);
        const starMaterial = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          side: THREE.DoubleSide,
        });
        
        for (let i = 0; i < 20; i++) {
          const star = new THREE.Mesh(starGeometry, starMaterial);
          star.position.x = (Math.random() - 0.5) * 1.2;
          star.position.y = (Math.random() - 0.5) * 2.2;
          star.position.z = 0.02;
          back.add(star);
        }
        
        cardGroup.add(border);
        cardGroup.add(card);
        cardGroup.add(back);
        
        cardGroup.position.x = posX;
        cardGroup.rotation.y = Math.PI;
        
        return cardGroup;
      };
      
      // Create three cards
      const card1 = createTarotCard(-2);
      const card2 = createTarotCard(0);
      const card3 = createTarotCard(2);
      
      scene.add(card1);
      scene.add(card2);
      scene.add(card3);
      
      // Animation variables
      let cardFlipState = [0, 0, 0]; // 0: not flipped, 1: flipping, 2: flipped
      let cardRotations = [0, 0, 0];
      let currentCard = -1;
      
      // Start card flip animation
      const flipNextCard = () => {
        currentCard = (currentCard + 1) % 3;
        if (cardFlipState[currentCard] === 0) {
          cardFlipState[currentCard] = 1;
        }
      };
      
      // Start first card animation after 1 second
      setTimeout(flipNextCard, 1000);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Handle card flipping animations
        const cards = [card1, card2, card3];
        
        for (let i = 0; i < 3; i++) {
          if (cardFlipState[i] === 1) {
            // Flipping animation
            cardRotations[i] += 0.05;
            cards[i].rotation.y = cardRotations[i];
            
            // Check if flip is complete
            if (cardRotations[i] >= Math.PI * 2) {
              cardFlipState[i] = 2;
              cardRotations[i] = 0;
              
              // Flip next card after delay
              if (i < 2) {
                setTimeout(flipNextCard, 1000);
              }
            }
          } else if (cardFlipState[i] === 0) {
            // Idle floating animation
            cards[i].position.y = Math.sin(Date.now() * 0.001 + i) * 0.1;
          } else if (cardFlipState[i] === 2) {
            // Revealed card animation
            cards[i].position.y = Math.sin(Date.now() * 0.0005 + i) * 0.05;
          }
        }
        
        renderer.render(scene, camera);
      };
      
      // Handle resize
      const handleResize = () => {
        if (container) {
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      // Start animation
      animate();
      
      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
        scene.clear();
        renderer.dispose();
        
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }
  }, [activeTab]);

  // Fetch available times when date changes
  useEffect(() => {
    if (selectedDate && selectedService) {
      setLoading(true);
      
      // Simulate API call to get available times
      setTimeout(() => {
        // Generate some random available times
        const times = [];
        const startHour = 9;
        const endHour = 18;
        
        for (let hour = startHour; hour < endHour; hour++) {
          if (Math.random() > 0.5) {
            times.push(`${hour}:00`);
          }
          if (Math.random() > 0.6) {
            times.push(`${hour}:30`);
          }
        }
        
        setAvailableTimes(times);
        setSelectedTime(null);
        setLoading(false);
      }, 500);
    }
  }, [selectedDate, selectedService]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setBookingStep(1);
    setSelectedTime(null);
    
    // Scroll to booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleContinueToDetails = () => {
    if (selectedTime) {
      setBookingStep(2);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContinueToPayment = () => {
    const { name, email, phone } = formData;
    if (name && email && phone) {
      setBookingStep(3);
    }
  };

  // Payment component
  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);
    const [processing, setProcessing] = useState(false);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!stripe || !elements) {
        return;
      }
      
      setProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setProcessing(false);
        setBookingSuccess(true);
        
        // Reset form and selections
        setTimeout(() => {
          setSelectedService(null);
          setSelectedDate(new Date());
          setSelectedTime(null);
          setBookingStep(1);
          setFormData({
            name: '',
            email: '',
            phone: '',
            birthDate: '',
            message: '',
          });
          setBookingSuccess(false);
        }, 5000);
      }, 2000);
    };
    
    return (
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label>Card Details</label>
          <div className="card-element-container">
            <CardElement options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }} />
          </div>
        </div>
        
        {paymentError && <div className="payment-error">{paymentError}</div>}
        
        <div className="booking-summary">
          <h4>Booking Summary</h4>
          <div className="summary-details">
            <p><strong>Service:</strong> {selectedService?.name}</p>
            <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Duration:</strong> {selectedService?.duration}</p>
            <p><strong>Price:</strong> ${selectedService?.price.toFixed(2)}</p>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={!stripe || processing} 
          className="payment-button"
        >
          {processing ? 'Processing...' : `Pay ${selectedService?.price.toFixed(2)}`}
        </button>
      </form>
    );
  };

  return (
    <div className="services-page">
      <Navigation />
      
      <div className="services-hero">
        <div className="services-hero-content">
          <h1>Spiritual Services</h1>
          <p>Discover clarity, insight, and guidance on your spiritual journey</p>
        </div>
      </div>
      
      <div className="services-tabs">
        <div 
          className={`service-tab ${activeTab === 'tarot' ? 'active' : ''}`}
          onClick={() => setActiveTab('tarot')}
        >
          <i className="fas fa-cards"></i>
          <span>Tarot Readings</span>
        </div>
        
        <div 
          className={`service-tab ${activeTab === 'astrology' ? 'active' : ''}`}
          onClick={() => setActiveTab('astrology')}
        >
          <i className="fas fa-stars"></i>
          <span>Astrological Services</span>
        </div>
        
        <div 
          className={`service-tab ${activeTab === 'guidance' ? 'active' : ''}`}
          onClick={() => setActiveTab('guidance')}
        >
          <i className="fas fa-spa"></i>
          <span>Spiritual Guidance</span>
        </div>
      </div>
      
      <div className="services-content">
        {activeTab === 'tarot' && (
          <div className="tarot-services" id="tarot">
            <div className="service-info">
              <h2>Tarot Reading Services</h2>
              <p>
                Tarot cards provide a symbolic language that helps us access our intuition and gain
                insights into life situations. Through these ancient archetypes, Tim helps you explore
                your past, present, and potential futures to make more empowered choices.
              </p>
              
              <div className="tarot-scene" ref={tarotSceneRef}></div>
              
              <div className="services-list">
                {services.tarot.map((service) => (
                  <div className="service-card" key={service.id}>
                    <div className="service-details">
                      <h3>{service.name}</h3>
                      <p>{service.description}</p>
                      <div className="service-meta">
                        <span className="duration"><i className="far fa-clock"></i> {service.duration}</span>
                        <span className="price">${service.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <button 
                      className="book-service-button"
                      onClick={() => handleServiceSelect(service)}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'astrology' && (
          <div className="astrology-services" id="astrology">
            <div className="service-info">
              <h2>Astrological Services</h2>
              <p>
                Astrology offers a cosmic map of your life's journey, revealing patterns and potentials
                through the position of celestial bodies at your birth. Tim creates detailed natal charts
                and provides expert interpretation to help you understand your unique celestial blueprint.
              </p>
              
              <div className="services-list">
                {services.astrology.map((service) => (
                  <div className="service-card" key={service.id}>
                    <div className="service-details">
                      <h3>{service.name}</h3>
                      <p>{service.description}</p>
                      <div className="service-meta">
                        <span className="duration"><i className="far fa-clock"></i> {service.duration}</span>
                        <span className="price">${service.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <button 
                      className="book-service-button"
                      onClick={() => handleServiceSelect(service)}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'guidance' && (
          <div className="guidance-services" id="guidance">
            <div className="service-info">
              <h2>Spiritual Guidance</h2>
              <p>
                Spiritual guidance sessions provide personalized support for your inner development.
                Tim draws on various spiritual traditions and practices to help you deepen your
                connection with your authentic self and navigate life's challenges with greater awareness.
              </p>
              
              <div className="services-list">
                {services.guidance.map((service) => (
                  <div className="service-card" key={service.id}>
                    <div className="service-details">
                      <h3>{service.name}</h3>
                      <p>{service.description}</p>
                      <div className="service-meta">
                        <span className="duration"><i className="far fa-clock"></i> {service.duration}</span>
                        <span className="price">${service.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <button 
                      className="book-service-button"
                      onClick={() => handleServiceSelect(service)}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {selectedService && (
        <div className="booking-section" id="booking">
          <h2>Book Your {selectedService.name}</h2>
          
          {bookingSuccess ? (
            <div className="booking-success">
              <i className="fas fa-check-circle"></i>
              <h3>Booking Confirmed!</h3>
              <p>
                Thank you for booking a session with Tim Burger. A confirmation email has been sent to your inbox
                with all the details for your {selectedService.name} on {selectedDate.toLocaleDateString()} at {selectedTime}.
              </p>
            </div>
          ) : (
            <div className="booking-steps">
              <div className="booking-progress">
                <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
                  <div className="step-number">1</div>
                  <div className="step-label">Select Date & Time</div>
                </div>
                <div className="progress-connector"></div>
                <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
                  <div className="step-number">2</div>
                  <div className="step-label">Your Details</div>
                </div>
                <div className="progress-connector"></div>
                <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''}`}>
                  <div className="step-number">3</div>
                  <div className="step-label">Payment</div>
                </div>
              </div>
              
              <div className="booking-content">
                {bookingStep === 1 && (
                  <div className="date-time-selection">
                    <div className="date-selection">
                      <h3>Select a Date</h3>
                      <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        minDate={new Date()}
                      />
                    </div>
                    
                    <div className="time-selection">
                      <h3>Available Times</h3>
                      {loading ? (
                        <div className="loading-times">
                          <div className="spinner"></div>
                          <p>Loading available times...</p>
                        </div>
                      ) : availableTimes.length > 0 ? (
                        <div className="time-slots">
                          {availableTimes.map((time) => (
                            <div
                              key={time}
                              className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                              onClick={() => handleTimeSelect(time)}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="no-times">No available times for the selected date.</p>
                      )}
                      
                      <button
                        className="continue-button"
                        disabled={!selectedTime}
                        onClick={handleContinueToDetails}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}
                
                {bookingStep === 2 && (
                  <div className="user-details">
                    <h3>Your Information</h3>
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="birthDate">Birth Date (For Astrological Services)</label>
                      <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">Message (Optional)</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Share any specific questions or areas you'd like to focus on during your session."
                      ></textarea>
                    </div>
                    
                    <div className="booking-navigation">
                      <button
                        className="back-button"
                        onClick={() => setBookingStep(1)}
                      >
                        Back
                      </button>
                      <button
                        className="continue-button"
                        onClick={handleContinueToPayment}
                        disabled={!formData.name || !formData.email || !formData.phone}
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}
                
                {bookingStep === 3 && (
                  <div className="payment-section">
                    <h3>Payment Information</h3>
                    <Elements stripe={stripePromise}>
                      <CheckoutForm />
                    </Elements>
                    
                    <button
                      className="back-button"
                      onClick={() => setBookingStep(2)}
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      <section className="testimonials">
        <h2>What Clients Say About Our Services</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "Tim's tarot readings have been transformative for me. He has an incredible gift for
                connecting with the cards and translating their messages with profound insight. Each
                reading has offered me clarity and guidance when I needed it most."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-name">Jennifer R.</div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "The birth chart analysis I received was incredibly detailed and accurate. Tim explained
                complex astrological concepts in a way that was easy to understand, and the insights have
                helped me embrace my strengths and work on areas of growth."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-name">Michael T.</div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "Tim's spiritual guidance sessions have been a cornerstone of my personal development journey.
                His compassionate approach and deep wisdom create a safe space for exploration and growth.
                I leave each session feeling centered and inspired."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-name">Sophia L.</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How do online readings work?</h3>
            <p>
              Online readings are conducted via Zoom. After booking, you'll receive a confirmation email
              with a secure link for your session. The experience is just as powerful as in-person readings,
              with the added convenience of connecting from anywhere in the world.
            </p>
          </div>
          
          <div className="faq-item">
            <h3>What information do you need for an astrology reading?</h3>
            <p>
              For a complete astrological analysis, I'll need your birth date, exact birth time, and
              birth location. This information allows me to create an accurate birth chart that reflects
              your unique cosmic blueprint.
            </p>
          </div>
          
          <div className="faq-item">
            <h3>How should I prepare for a session?</h3>
            <p>
              Come with an open mind and heart. You may want to prepare specific questions or areas of
              focus, but this isn't necessary. I recommend finding a quiet, private space where you
              can speak freely and take notes if desired.
            </p>
          </div>
          
          <div className="faq-item">
            <h3>What is your cancellation policy?</h3>
            <p>
              I understand that life can be unpredictable. You may reschedule or cancel your appointment
              up to 24 hours before your scheduled session for a full refund. Changes made with less than
              24 hours' notice may be subject to a rebooking fee.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
