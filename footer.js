import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/assets/images/tarot-light-path-logo-white.svg" alt="Tarot Light Path" />
          <p>Illuminating your spiritual journey</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Navigate</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/books">Books</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Services</h3>
            <ul>
              <li><Link to="/services#tarot">Tarot Readings</Link></li>
              <li><Link to="/services#astrology">Astrological Charts</Link></li>
              <li><Link to="/services#guidance">Spiritual Guidance</Link></li>
              <li><Link to="/services#booking">Book a Session</Link></li>
              <li><Link to="/gift-cards">Gift Cards</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Shop</h3>
            <ul>
              <li><Link to="/shop/tarot">Tarot Decks</Link></li>
              <li><Link to="/shop/crystals">Crystals & Gemstones</Link></li>
              <li><Link to="/shop/incense">Sage & Incense</Link></li>
              <li><Link to="/shop/candles">Ritual Candles</Link></li>
              <li><Link to="/shop/jewelry">Spiritual Jewelry</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Connect</h3>
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
            <div className="newsletter-signup">
              <h4>Join Our Newsletter</h4>
              <div className="footer-form">
                <input type="email" placeholder="Your email address" />
                <button type="submit">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-info">
          <p>&copy; {currentYear} Tarot Light Path by Tim Burger. All rights reserved.</p>
          <div className="footer-policies">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/shipping-policy">Shipping Policy</Link>
          </div>
        </div>
        <div className="payment-methods">
          <span>Secure Payments:</span>
          <div className="payment-icons">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-amex"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-apple-pay"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
