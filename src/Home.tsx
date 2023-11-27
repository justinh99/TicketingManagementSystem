import React, { useEffect, useState } from 'react';
import './App.css';
import TicketForm from './TicketForm';
import OpenTickets from './OpenTickets';
import AssignedTickets from './AssignedTickets';
import { useNavigate } from 'react-router-dom';
import LoginButton from './LoginButton';
import axios from 'axios';

type UserType = {
  name: string;
};

const Home = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('openTickets');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const getQueueStatus = `${API_URL}/getQueueStatus`;
  const [loading, setLoading] = useState(true); // Track loading state
  const getqueuestStatusOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };


  // useEffect(() => {
  //   document.title = "Home";
  //   const getQueueStatusUrl = `${API_URL}/getQueueStatus`;
  //   const fetchQueueStatus = async () => {
  //     try {
  //       const response = await axios.get(getQueueStatusUrl);
  //       console.log(response.data)
  //       setIsOpen(response.data); // Assuming the response has an isOpen property
  //     } catch (error) {
  //       console.error('Network response was not ok:', error);
  //       setIsOpen(false); // Set to false or show an error state as appropriate
  //     }
  //   };

  //   fetchQueueStatus();
  // }, []); 

  useEffect(() => {
    document.title = "Home";
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
  }, [API_URL]);

  if (loading) {
    return <div>Loading...</div>;
  }


  // useEffect(() => {
  //   document.title = "Home";
  //   const getQueueStatusUrl = '/api/getQueueStatus'; // The URL to your API endpoint

  //   const fetchQueueStatus = async () => {
  //     try {
  //       fetch(getQueueStatus, getqueuestStatusOptions)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((currentStatus) => {
  //       // Immediately set the isOpen status to the new value
  //       const newStatus = !currentStatus;
  //       setIsOpen(newStatus); // Update state to trigger re-render
  //       localStorage.setItem('queueStatus', String(newStatus));
  //       setIsOpen(currentStatus.data.isOpen); // Assuming the response has an isOpen property
  //     })
  //     } catch (error) {
  //       console.error('Network response was not ok:', error);
  //       setIsOpen(false); // Set to false or show an error state as appropriate
  //     }
  //   };

  //   fetchQueueStatus();
  // }, []); 

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
    {isOpen ? (
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
    <p style={{ 
      fontSize: '2.7rem', // Larger font size
      fontWeight: 'semi-bold', // Bold font
      textAlign: 'left',
      marginTop: '60px', // Adjust top margin to align with the bottom of the vertical line
      paddingLeft: '130px', // Left padding to create space from the vertical line
    }}>
      Welcome to ME 100 OH Queue.<br />
      To get started, make a ticket.
    </p>
    <div style={{ 
      height: '1px', 
      width: '100vw', 
      backgroundColor: '#003262', 
      position: 'absolute', 
      left: 0, 
      top: '300px', // Adjust this value based on where you want the line to appear
      zIndex: 1 // Optional, in case it's getting hidden behind other elements
      }}>
    </div>
      {/* <p style={{ fontSize: '1rem', color: 'darkgreen', fontWeight: 700, padding: 30 }}>
        Please note that creating a ticket acknowledges that we gather your information to help you with your problem.
        We will not share your information with anyone outside of the ME 100 staff.
      </p> */}
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
    ) : (
      <div>
      <header className="header" style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', width: '150px' }}>
        <img src="/logo.png" alt="Your Logo" style={{ width: '100%', height: 'auto' }} />
      </div>
      <h1 style={{ flex: 1, textAlign: 'center', fontSize: '50px', marginRight: '150px' }} onClick={() => navigate("/")}>
        ME100
      </h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '150px' }}>
      </div>
    </header>
      <div style = {{fontSize: '50px'}}>Sorry, the queue is currently closed.</div>
      </div>
    )}
  
      
    </div>
  );
}

export default Home;
