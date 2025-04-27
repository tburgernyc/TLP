import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/Checkout.css';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_yourStripePublishableKey');

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Customer info state
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    saveInfo: false
  });
  
  // Form validation errors
  const [formErrors, setFormErrors] = useState({});
  
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
  
  const navigate = useNavigate();
  
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
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };
  
  // Handle customer info changes
  const handleCustomerInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Validate customer info
  const validateCustomerInfo = () => {
    const errors = {};
    
    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    requiredFields.forEach(field => {
      if (!customerInfo[field].trim()) {
        errors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (customerInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (customerInfo.phone && !/^\d{10}$/.test(customerInfo.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // ZIP code validation
    if (customerInfo.zipCode && !/^\d{5}(-\d{4})?$/.test(customerInfo.zipCode)) {
      errors.zipCode = 'Please enter a valid ZIP code';
    }
    
    return errors;
  };
  
  // Handle continue to payment
  const handleContinueToPayment = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateCustomerInfo();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Proceed to payment step
    setCheckoutStep(2);
    
    //
