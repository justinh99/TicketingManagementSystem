// ProtectedRoute.js
import React, { useState } from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Login from './login';
import TicketHistroy from './TicketHistroy'
import Home from './Home';
import axios from 'axios';


const ProtectedStaffStudentHomeRoute = () => {
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
  const isStaff = localStorage.getItem('isStaff') === 'true';
  if (isOpen) {
    if (isStaff) {
      return <TicketHistroy/>;
    } else {
      // Redirect to the login page if not authenticated
      return <Login/>;
    }
  }
  return <Home/>

};

export default ProtectedStaffStudentHomeRoute;