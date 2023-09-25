// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Login = () => {
  // State to manage user input

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  class LoginStatus {
    public status: Number ;
    public data: LoginData;
    public description: string;
    public error: Object ;

    constructor(status: number, data: LoginData, description: string, error: any) {
        this.status = status;
        this.data = data;
        this.description = description;
        this.error = error; // Include this line to set the error property
      }
  }

  class LoginData {
    public loginStatus: String;
    public token: String;

    constructor(loginStatus: String, token: String) {
      this.loginStatus = loginStatus;
      this.token = token;
    }
  }



  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState<LoginStatus>();

  const [loginData, setLoginData] = useState({
    username: '', // Initialize with an empty string
    password: '', // Initialize with an empty string
  });

  const { username, password } = loginData;

  const setLoginCookie = (accessToken: String) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Cookie expiration in 7 days
  
    document.cookie = `accessToken=${accessToken}; expires=${expirationDate.toUTCString()}; path=/`;
  };

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const login = 'http://localhost:8080/login';

    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), 
      };
  
  
      // Make the API request
    fetch(login, requestOptions)
    .then((response) => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        // Handle the API response data here
        const loginStatus = new LoginStatus(
        data.status,
        new LoginData(data.data.loginStatus, data.data.token),
        data.description,
        data.error
        );
        setLoginStatus(loginStatus);
        //document.cookie = `token=${data.token}; secure; samesite=strict`;
        if (loginStatus.data.loginStatus === 'succeed') {
            setLoginCookie(loginStatus.data.token);
            setIsAuthenticated(true);
            navigate('/staffHome'); // Redirect to StaffScreen
        }
    })
    .catch((error) => {
        // Handle any errors that occurred during the fetch.
        console.error('Fetch error:', error);
    });



    // Add your login logic here
  };



  return (
    <div className="login-container">
      <h1 style={{ textAlign: 'center', flex: '1' }} onClick = {() => navigate("/")}>ME100</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            style={{ width: '150px', height: '10px' }}
            value={username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            style={{ width: '160px', height: '20px' }}
            value={password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
        </div>
        <button type="submit" style = {{margin: 10}}>Login</button>
      </form>

      {loginStatus && (
        <div className={loginStatus.data.loginStatus === 'succeed' ? 'success-message' : 'error-message'}>
          {loginStatus.data.loginStatus === 'succeed' ? 'Login succeeded' : 'Login failed'}
        </div>
      )}
    </div>
  );
};

export default Login;
