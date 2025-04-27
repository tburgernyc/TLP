import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const navigate = useNavigate();
  
  // Mock cart data for demo
  const mockCartItems = [
    {
      id: 'p1',
      name: 'Mystic Moon Tarot Deck',
      price: 42.99,
      quantity: 1,
      image: '/assets/images/products/tarot-deck.jpg',
    },
    {
      id: 'p3',
      name: 'White Sage Smudge Bundle',
      price: 12.99,
      quantity: 2,
      image: '/assets/images/products/sage.jpg',
    }
  ];
  
  // Load cart items
  useEffect(() => {
    // Simulate API call to fetch cart items
    setTimeout(() => {
      setCartItems(mockCartItems);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Calculate cart totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax rate
  };
  
  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    
    // Free shipping for orders over $75
    if (subtotal >= 75) {
      return 0;
    }
    
    return 5.99; // Standard shipping fee
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping() - discountAmount;
  };
  
  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedItems);
  };
  
  // Remove item from cart
  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };
  
  // Apply promo code
  const applyPromoCode = () => {
    // Validate promo code (mock implementation)
    if (promoCode.toLowerCase() === 'spiritual10') {
      const discount = calculateSubtotal() * 0.1; // 10% discount
      setDiscountAmount(discount);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Please try again.');
    }
  };
  
  // Clear promo code
  const clearPromoCode = () => {
    setPromoCode('');
    setDiscountAmount(0);
    setPromoApplied(false);
  };
  
  // Proceed to checkout
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className="cart-page">
      <Navigation />
      
      <div className="cart-container">
        <h1>Your Shopping Cart</h1>
        
        {loading ? (
          <div className="cart-loading">
            <div className="spinner"></div>
            <p>Loading your spiritual items...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart"></i>
            <h2>Your cart is empty</h2>
            <p>Explore our spiritual tools and begin your journey.</p>
            <Link to="/shop" className="continue-shopping">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-header">
                <span className="header-product">Product</span>
                <span className="header-price">Price</span>
                <span className="header-quantity">Quantity</span>
                <span className="header-total">Total</span>
              </div>
              
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="item-product">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <button 
                        className="remove-item"
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="fas fa-trash-alt"></i> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-price">
                    ${item.price.toFixed(2)}
                  </div>
                  
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {calculateShipping() === 0 ? (
                    <span className="free-shipping">Free</span>
                  ) : (
                    `$${calculateShipping().toFixed(2)}`
                  )}
                </span>
              </div>
              
              <div className="summary-row">
                <span>Estimated Tax</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="promo-code">
                {promoApplied ? (
                  <div className="promo-applied">
                    <p>Promo code "SPIRITUAL10" applied!</p>
                    <button 
                      className="clear-promo"
                      onClick={clearPromoCode}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button 
                      className="apply-promo"
                      onClick={applyPromoCode}
                    >
                      Apply
                    </button>
                  </>
                )}
              </div>
              
              <div className="summary-total">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              
              <button 
                className="checkout-button"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              
              <div className="continue-shopping-container">
                <Link to="/shop" className="continue-shopping-link">
                  <i className="fas fa-arrow-left"></i> Continue Shopping
                </Link>
              </div>
              
              <div className="payment-icons">
                <span>We Accept:</span>
                <div className="payment-methods">
                  <i className="fab fa-cc-visa"></i>
                  <i className="fab fa-cc-mastercard"></i>
                  <i className="fab fa-cc-amex"></i>
                  <i className="fab fa-cc-paypal"></i>
                  <i className="fab fa-cc-apple-pay"></i>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <section className="recommended-products">
        <h2>You May Also Like</h2>
        <div className="recommendations-grid">
          <div className="product-card">
            <div className="product-image">
              <img src="/assets/images/products/amethyst.jpg" alt="Amethyst Crystal Cluster" />
            </div>
            <h3>Amethyst Crystal Cluster</h3>
            <p className="product-price">$28.50</p>
            <Link to="/shop/product/p2" className="view-product">View Product</Link>
          </div>
          
          <div className="product-card">
            <div className="product-image">
              <img src="/assets/images/products/chakra-candles.jpg" alt="Chakra Alignment Candle Set" />
            </div>
            <h3>Chakra Alignment Candle Set</h3>
            <p className="product-price">$35.99</p>
            <Link to="/shop/product/p4" className="view-product">View Product</Link>
          </div>
          
          <div className="product-card">
            <div className="product-image">
              <img src="/assets/images/products/moonstone-pendant.jpg" alt="Moonstone Pendant Necklace" />
            </div>
            <h3>Moonstone Pendant Necklace</h3>
            <p className="product-price">$49.99</p>
            <Link to="/shop/product/p5" className="view-product">View Product</Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Cart;
