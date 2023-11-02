import React, { useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const PrivacyNoticePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Privacy Notice";
  }, []);

  return (
    <div className="App">
      <div className="privacy-container">
        <div className="privacy-content">
          <h2 className="privacy-title">BearQueue wants to access your account</h2>
          <div className="privacy-user-info">
            <span className="privacy-text">You are logged in as </span>
            <strong className="privacy-text-bold">0000@berkeley.edu</strong>
          </div>
          <button className="privacy-button privacy-confirm" onClick={() => navigate("/loggedInHome")}>Confirm</button>
          <button className="privacy-button privacy-cancel" onClick={() => navigate("/Home")}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default PrivacyNoticePage;
