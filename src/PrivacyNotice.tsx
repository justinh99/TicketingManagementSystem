import React, {useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TicketForm from './TicketForm';
import OpenTickets from './OpenTickets';
import Login from './login';
import { useNavigate } from 'react-router-dom';
import AssignedTickets from './AssignedTickets';
import HomeTickets from './HomeTickets';
import LoginButton from './LoginButton';

const PrivacyNoticePage = () => {

const navigate = useNavigate();

useEffect(() => {
  document.title = "Privact Notice";
}, []);

  return (
    <div className="App">
    <div className="privacy-container">
    <div className="privacy-content">
      <div className="privacy-title">Office Hours wants to access your account</div>
      <div className="privacy-user-info">
        <span className="privacy-text">You are logged in as </span>
        <span className="privacy-text-bold">0000@berkeley.edu</span>
      </div>
      <div className="privacy-button privacy-confirm" onClick={() => navigate("/loggedInHome")}>Confirm</div>
      <div className="privacy-button privacy-cancel" onClick={() => navigate("/Home")}>Cancel</div>
      </div>
      </div>
    </div>

  );
}

export default PrivacyNoticePage;
