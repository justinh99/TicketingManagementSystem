import React, {useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TicketForm from './TicketForm';
import OpenTickets from './OpenTickets';
import Login from './login';
import { useNavigate } from 'react-router-dom';
import AssignedTickets from './AssignedTickets';
import HomeTickets from './HomeTickets';
import LoginButton from './LoginButton';
import jwt_decode from 'jwt-decode';
type UserType = {
  name: string;
  
};
const LoggedInHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null); // New state for user

  const handleUserLogin = (user: UserType) => {
    setUser(user); // Set the user data on login
  };
  // Your login logic here
  const handleLogin = () => {
    // Implement your login logic here (e.g., check credentials)
    // If login is successful, set 'isLoggedIn' to true
    setIsLoggedIn(true);
  };

  class Ticket {
    public studentID: string | undefined;
    public studentName: string | undefined;
    public ticketType: string | undefined;
    public description: string | undefined;
    public location: string | undefined;
    public currentDate: Date | undefined;
  }

  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]); 

  const handleTicketSubmit = (ticket:Ticket) => {
    setTickets((prevTickets:Ticket[]) => [...prevTickets, ticket]);
};

useEffect(() => {
  document.title = "Home";
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
  console.log(user)
}, []);

  return (
    <div className="App">
      <header className="header">
        <h1 onClick={() => navigate("/")}>ME100</h1>
        {/* Pass the function to LoginButton */}
        <LoginButton onLoginSuccess={handleUserLogin} />
      </header>
      {user ? <p style={{ fontSize: '1.5rem' }}>Hi, {user.name}!</p> : <p></p>}
     <div>
      <p style={{ fontSize: '1.5rem' }}>
                Welcome to ME 100 OH Queue. Please make a ticket on the queue
      </p>
      <p style={{ fontSize: '1 rem', color:'darkgreen', fontWeight: 700, padding: 30}}>
                Please note that creating a ticket acknowledges that we gather your information to help you with your problem. 
                We will not share your information with anyone outside of the ME 100 staff.
      </p>

      <TicketForm userData={user} />
      <HomeTickets/>
      <div className="ticket-list-container">
      </div>
     </div>
    </div>

  );
}

export default LoggedInHome;
