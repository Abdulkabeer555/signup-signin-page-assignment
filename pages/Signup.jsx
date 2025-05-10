import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import Footer from '../src/components/Footer';
import Navbar from '../src/components/Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = existingUsers.some(user => user.email === formData.email);

    if (emailExists) {
      setError('This email was already taken');
      return;
    }

    
    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    
    alert(`Welcome, ${formData.name}! Your account has been created successfully.`);
    navigate('/profilepage');

    setFormData({ name: '', email: '', password: '' });
    setError('');
  };

  return (
    <>
      <Navbar />
      <br /><br />
      <div className="container">
        <div className="signup-box">
          <h1 className="title">Create Account</h1>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <input type="text" id="name" className="input-field" placeholder=" " required value={formData.name} onChange={handleChange}
              />
              <label htmlFor="name" className="floating-label">Full Name</label>
              <div className="icon-right">
                <i className="fas fa-user"></i>
              </div>
            </div>

            <div className="form-group">
              <input type="email" id="email" className="input-field" placeholder=" " required value={formData.email} onChange={handleChange}
              />
              <label htmlFor="email" className="floating-label">Email Address</label>
              <div className="icon-right">
                <i className="fas fa-envelope"></i>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>

            <div className="form-group">
              <input type="password" id="password" className="input-field" placeholder=" " required value={formData.password} onChange={handleChange}
              />
              <label htmlFor="password" className="floating-label">Password</label>
              <div className="icon-right">
                <i className="fas fa-lock"></i>
              </div>
            </div>

            <button type="submit" className="submit-btn">Sign Up</button>

            <div className="login-link">
              Already have an account? <Link to="/signin">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
      <br /><br />
      <Footer />
    </>
  );
};

export default Signup;
