import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import StaffHome from './StaffHome';
import axios from 'axios';
import Home from './Home';
import Login from './login';

const ProtectedStaffHomeRoute = () => {
  const { isAuthenticated } = useAuth();
  const isStaff = localStorage.getItem('isStaff') === 'true';
  const API_URL = process.env.REACT_APP_API_URL;
  const [isOpen, setIsOpen] = useState(false); // null initially to indicate loading
  const [loading, setLoading] = useState(true); // Track loading state

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

  // Once loading is complete, apply your logic based on isOpen and isAuthenticated
  if (isOpen) {
    //return isStaff ? <StaffHome /> : <Navigate to="/login" />;
    if (isStaff){
      return <StaffHome />
    }
    return <Home />
  } else {
    // Redirect to a 'closed' page or show a message if the queue is closed
    return <Home />; // Assuming Home is the component that shows the queue is closed
  }
};

export default ProtectedStaffHomeRoute;
