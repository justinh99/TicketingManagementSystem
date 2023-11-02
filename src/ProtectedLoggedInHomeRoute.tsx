// ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Login from './login';
import StaffHome from './StaffHome';
import PrivacyNoticePage from './PrivacyNotice';
import Home from './Home';
import LoggedInHome from './Home-LoggedIn';




const ProtectedLoggedInHomeRoute = () => {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  console.log(token);
  if (token) {
    return <StaffHome/>;
  } else {
    // Redirect to the login page if not authenticated
    return <Home/>;
  }
};

export default ProtectedLoggedInHomeRoute;