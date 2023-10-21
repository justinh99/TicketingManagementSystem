import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';

type UserType = {
  name: string;
  
};

type LoginButtonProps = {
  onLoginSuccess: (user: UserType) => void;  // Function passed in from the parent component
};
const LoginButton: React.FC<LoginButtonProps> = ({ onLoginSuccess }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const handleLoginSuccess = (credentialResponse:any) => {
    console.log(credentialResponse);
    
    const token = credentialResponse.credential;
    localStorage.setItem('userToken', token); // Storing the token in localStorage
    const userObject: UserType = jwt_decode(token);
    console.log(userObject);
    setUser(userObject);
    console.log(userObject);
    onLoginSuccess(userObject); 
    localStorage.setItem('userName', userObject.name); 
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
          <h1>Hello, {user.name}!</h1>
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
