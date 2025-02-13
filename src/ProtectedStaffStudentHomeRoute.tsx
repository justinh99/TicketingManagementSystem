// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Login from './login';
import StaffHome from './StaffHome';
import StaffStudentHome from './StaffStudentHome'
import axios from 'axios';
import Home from './Home';


const ProtectedTicketHistroyRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // const accessTokenRow = document.cookie
  //   .split('; ')
  //   .find(row => row.startsWith('accessToken='));

  // let accessToken;
  // if (accessTokenRow) {
  //   accessToken = accessTokenRow.split('=')[1];
  // }
  //console.log(accessToken);

  const API_URL = process.env.REACT_APP_API_URL;
  const [isOpen, setIsOpen] = useState(false);
  const getQueueStatusUrl = `${API_URL}/getQueueStatus`;
  const [loading, setLoading] = useState(true); // Track loading state
  const fetchQueueStatus = async () => {
    try {
      const response = await axios.get(getQueueStatusUrl);
      console.log(response.data)
      setIsOpen(response.data); // Assuming the response has an isOpen property
    } catch (error) {
      console.error('Network response was not ok:', error);
      setIsOpen(false); // Set to false or show an error state as appropriate
    }
  };

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
  }, [API_URL]); // Depend on API_URL, so if it changes, the effect will re-run

  // While we're fetching the queue status, you might want to return null or a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }
  const isStaff = localStorage.getItem('isStaff') === 'true';

  if (isOpen) {
    if (isStaff) {
      return <StaffStudentHome/>;
    } else {
      // Redirect to the login page if not authenticated
      return <Login/>;
    }
  }
  return <Home/>;
};

export default ProtectedTicketHistroyRoute;