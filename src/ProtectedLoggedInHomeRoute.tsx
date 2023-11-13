// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Login from './login';
import StaffHome from './StaffHome';
import PrivacyNoticePage from './PrivacyNotice';
import Home from './Home';
import LoggedInHome from './Home-LoggedIn';
import axios from 'axios';




const ProtectedLoggedInHomeRoute = () => {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  console.log(token);
  const API_URL = process.env.REACT_APP_API_URL;
  const [isOpen, setIsOpen] = useState(false);
  const getQueueStatusUrl = `${API_URL}/getQueueStatus`;
  const [loading, setLoading] = useState(true); // Track loading state
  // const fetchQueueStatus = async () => {
  //   try {
  //     const response = await axios.get(getQueueStatusUrl);
  //     console.log(response.data)
  //     setIsOpen(response.data); // Assuming the response has an isOpen property
  //   } catch (error) {
  //     console.error('Network response was not ok:', error);
  //     setIsOpen(false); // Set to false or show an error state as appropriate
  //   }
  // };


  useEffect(() => {
    const getQueueStatusUrl = `${API_URL}/getQueueStatus`;
    axios.get(getQueueStatusUrl)
      .then((response) => {
        setIsOpen(response.data); // Update state with the isOpen value
      })
      .catch((error) => {
        console.error('Network response was not ok:', error);
        setIsOpen(false); // Fallback value in case of error
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the request is complete
      });
  }, [API_URL]);


  console.log("isOpen" + isOpen)
  if (isOpen) {
    console.log(isOpen);
    if (token) {
      return <LoggedInHome/>;
    } else {
      // Redirect to the login page if not authenticated
      return <Home/>;
    }
  } else {
    return <Home/>
  }

  
};

export default ProtectedLoggedInHomeRoute;