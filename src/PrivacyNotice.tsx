import React, { useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const PrivacyNoticePage = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || 'your-email@example.com'; // Fallback in case email is null

  useEffect(() => {
    document.title = "Privacy Notice";
  }, []);

  return (
    <div className="App">
      <div className="privacy-notice-container">
        <div className="privacy-notice-card">
          <h2 className="privacy-notice-title">BearQueue wants to access your account!</h2>
          <p className="privacy-notice-description">
            We will not share your information with anyone outside of the ME 100 staff.
          </p>
          <div className="privacy-notice-account-info">
            <p>You are logged in as <strong>{email}</strong></p>
            <p className="privacy-notice-different-account">Not you? <span onClick={() => navigate("/login")}>Use a different account</span></p>
          </div>
          <div className="privacy-notice-auth-details">
            <strong style={{color:'#1a73e8'}}>Authorizing BearQueue allows us to: </strong>
            <ul>
              <li>View your email address ({email})</li>
              <li>View your enrollment status</li>
            </ul>
          </div>
          <div className="privacy-notice-buttons">
            <button className="privacy-button-cancel" onClick={() => navigate("/")}>Cancel</button>
            <button className="privacy-button-authorize" onClick={() => navigate("/loggedInHome")}>Authorize</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyNoticePage;
