// ProtectedRoute.js
import React from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Login from './login';
import TicketHistroy from './TicketHistroy'


const ProtectedStaffStudentHomeRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const accessTokenRow = document.cookie
    .split('; ')
    .find(row => row.startsWith('accessToken='));

  let accessToken;
  if (accessTokenRow) {
    accessToken = accessTokenRow.split('=')[1];
  }
  console.log(accessToken);
  if (accessToken) {
    return <TicketHistroy/>;
  } else {
    // Redirect to the login page if not authenticated
    return <Login/>;
  }
};

export default ProtectedStaffStudentHomeRoute;