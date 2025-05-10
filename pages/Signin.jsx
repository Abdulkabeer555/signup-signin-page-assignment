import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signin.css';

const Signin = () => {
  const [formData, setFormData] = useState({
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
    const matchedUser = existingUsers.find(
      user => user.email === formData.email && user.password === formData.password
    );

    if (!matchedUser) {
      setError('Invalid email or password');
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));

    alert(`Welcome back, ${matchedUser.name || 'User'}!`);
    setFormData({ email: '', password: '' });

  
    navigate('/profilepage');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('You are logged out');
    navigate('/signin');
  };

  return (
    <div className="container">
      <div className="signin-box">
        <h1 className="title">Sign In</h1>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input type="email" id="email" className="input-field" placeholder=" " required value={formData.email} onChange={handleChange}
            />
            <label htmlFor="email" className="floating-label">Email Address</label>
            <div className="icon-right">
              <i className="fas fa-envelope"></i>
            </div>
          </div>

          <div className="form-group">
            <input type="password" id="password" className="input-field" placeholder=" " required value={formData.password} onChange={handleChange}
            />
            <label htmlFor="password" className="floating-label">Password</label>
            <div className="icon-right">
              <i className="fas fa-lock"></i>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn">Sign In</button>

          <div className="login-link" style={{ color: "white", marginTop: "15px" }}>
            Don't have an account? <Link to="/signup" style={{ color: "white" }}>Sign Up</Link> &nbsp;|&nbsp;
            <button type="button" style={{color: "white", background: "none", border: "none", cursor: "pointer", padding: 0
              }}
              onClick={handleLogout}
            >
              <strong>Log Out</strong>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
