import React, { useEffect, useState } from 'react';
import './App.css';
import TicketForm from './TicketForm';
import OpenTickets from './OpenTickets';
import AssignedTickets from './AssignedTickets';
import { useNavigate } from 'react-router-dom';
import LoginButton from './LoginButton';
import jwt_decode from 'jwt-decode';

type UserType = {
  name: string;
};

const LoggedInHome = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('openTickets');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home";
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const userObject: UserType = jwt_decode<UserType>(token);
        if (userObject) {
          setUser(userObject);
        } else {
          console.error("User object not retrieved");
          localStorage.removeItem('userToken');
        }
      } catch (e) {
        console.error("Token validation failed", e);
        localStorage.removeItem('userToken');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
    <img src="/logo.png" alt="Your Logo" style={{ width: 'auto', height: '150px' }} /> {/* Adjust height as needed */}
  </div>
  <h1 style={{ fontSize: '50px' }} onClick={() => navigate("/")}>
    ME100
  </h1>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
    {user ? (
      <>
        <span className="user-greeting">Hi, {user.name}!</span>
        <button className="create-ticket-button" onClick={() => setIsModalOpen(true)}>Create Ticket</button>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </>
    ) : (
      <div className="login-button-container">
        <LoginButton onLoginSuccess={setUser} />
      </div>
    )}
  </div>
</header>
      <div>
        <p style={{ fontSize: '1.5rem' }}>
          Welcome to ME 100 OH Queue. Please make a ticket on the queue
        </p>
        <p style={{ fontSize: '1rem', color: 'darkgreen', fontWeight: 700, padding: 30 }}>
          Please note that creating a ticket acknowledges that we gather your information to help you with your problem.
          We will not share your information with anyone outside of the ME 100 staff.
        </p>
        {isModalOpen && <TicketForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} userData={user} />}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <div
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              borderBottom: activeTab === 'openTickets' ? '2px solid black' : 'none'
            }}
            onClick={() => handleTabChange('openTickets')}
          >
            Open Tickets
          </div>
          <div
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              borderBottom: activeTab === 'assignedTickets' ? '2px solid black' : 'none'
            }}
            onClick={() => handleTabChange('assignedTickets')}
          >
            Assigned Tickets
          </div>
        </div>
        <div className="tickets-container">
          {activeTab === 'openTickets' && <OpenTickets />}
          {activeTab === 'assignedTickets' && <AssignedTickets />}
        </div>
      </div>
    </div>
  );
}

export default LoggedInHome;
