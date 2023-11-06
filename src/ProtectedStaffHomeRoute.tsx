// ProtectedRoute.js
import React from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Login from './login';
import StaffHome from './StaffHome';


const ProtectedStaffHomeRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isStaff = localStorage.getItem('isStaff') === 'true';

  console.log(isStaff);
  if (isStaff) {
    return <StaffHome/>;
  } else {
    // Redirect to the login page if not authenticated
    return <Login/>;
  }
};

export default ProtectedStaffHomeRoute;