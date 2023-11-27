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
          console.log(userObject)
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
      <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Your Logo" style={{ width: 'auto', height: '90px' }} />
            <div style={{ height: '50px', width: '3px', backgroundColor: '#003262', margin: '0 10px' }}></div>
            <h1 style={{ fontSize: '30px', marginLeft: '10px', color:'#003262' }} onClick={() => navigate("/")}>
              ME100
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#003262', color:'white' }}>Survey</button>
            <LoginButton onLoginSuccess={setUser} />
          </div>
      </header>
      <div>
        {user ? (
          <>
          <p style={{ fontSize: '2.7rem', // Larger font size
                    fontWeight: 'semi-bold', // Bold font
                    textAlign: 'left',
                    marginTop: '60px', // Adjust top margin to align with the bottom of the vertical line
                    paddingLeft: '130px',
                    }}>
            <span className="user-greeting">Hi, {user.name}!</span>
            </p>
            <p style={{ fontSize: '1.5rem',
                        fontWeight: 'bold', // Bold font
                        textAlign: 'left',
                        marginTop: '50px', // Adjust top margin to align with the bottom of the vertical line
                        paddingLeft: '130px',}}>
            Please create a ticket on the queue
            </p>
          </>
        ) : (
          <p style={{ fontSize: '1.5rem' }}>
          Welcome to ME 100 OH Queue. Please make a ticket on the queue
        </p>
        )}
         <div className="ticket-button">
            <button className="create-ticket-button" onClick={() => setIsModalOpen(true)}>Create Ticket</button>
          </div>
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
