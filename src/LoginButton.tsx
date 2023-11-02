import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

type UserType = {
  name: string;
  email: string;
};

const API_URL = process.env.REACT_APP_API_URL;

type LoginButtonProps = {
  onLoginSuccess: (user: UserType) => void;  // Function passed in from the parent component
};
const LoginButton: React.FC<LoginButtonProps> = ({ onLoginSuccess }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  //Handle login success
  const handleLoginSuccess = async (credentialResponse:any) => {
    // console.log(credentialResponse);
    
    const token = credentialResponse.credential;
    localStorage.setItem('userToken', token); // Storing the token in localStorage
    const userObject: UserType = jwt_decode(token);
    // console.log(userObject);
    setUser(userObject);
    onLoginSuccess(userObject); 
    localStorage.setItem('userName', userObject.name);
    navigate("/privacyNotice");
    const email = userObject.email;  // Or wherever the email is stored in your user object
    try {

      const login = `${API_URL}/checkStaff?email=${encodeURIComponent(email)}`;

      // No body is required, and the method defaults to 'GET', so it's not needed unless you're changing it.
      const response = await fetch(login, {
        method: 'GET', // This is optional since GET is the default method
        credentials: 'include', // Include credentials in the request
        headers: {
          'Content-Type': 'application/json' // If your backend expects JSON
        }
      });
      console.log("above is test");
      console.log(response);
      // First, check if the response status is in the 200 range

    } catch (error) {
      console.error('Failed to check staff status:', error);
      // Additional error handling
    }
  };
  
  const handleLoginFailure = () => {
    console.log('Login Failed');
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    setUser(null);
    console.log("User has been logged out!");
    window.location.reload();
    navigate('/')
  };
  
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const userObject: UserType = jwt_decode<UserType>(token);
        setUser(userObject);
      } catch (e) {
        console.error("Token validation failed", e);
        // Optional: Handle token validation failure (e.g., token expired), maybe clean up localStorage
      }
    }
  }, []);
  return (
    <GoogleOAuthProvider clientId="302444134208-6mfllvoh1njd5ctukbtbb7441fcn5utj.apps.googleusercontent.com">
      {user ? (
        <>
          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          
        />
      )}
    </GoogleOAuthProvider>
  );
};

export default LoginButton;
