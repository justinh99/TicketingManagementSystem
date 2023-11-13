import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TicketForm from './TicketForm';
import OpenTickets from './OpenTickets';
import Login from './login';
import { useNavigate } from 'react-router-dom';
import StaffOpenTickets from './StaffOpenTickets';
import StaffAssignedTickets from './StaffAssignedTickets';
import { googleLogout } from '@react-oauth/google';
import axios from 'axios';

const StaffHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true); 
  const API_URL = process.env.REACT_APP_API_URL;

  // Your login logic here
  const handleLogin = () => {
    // Implement your login logic here (e.g., check credentials)
    // If login is successful, set 'isLoggedIn' to true
    setIsLoggedIn(true);
  };
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Clear authentication-related data (e.g., tokens, session data)
  //   // For example, remove the accessToken cookie:
  //   document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  //   // Redirect to the login page (or any other destination)
  //   navigate('/');
  // };
  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    console.log("User has been logged out!");
    localStorage.clear();
    //window.location.reload();
    navigate('/')
  };

  const getQueueStatus = `${API_URL}/getQueueStatus`;
  const getqueuestStatusOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const setqueuestStatusOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
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
  

  // useEffect(() => {
  //   const fetchStatus = () => {
  //     fetch(getQueueStatus, questStatusOptions)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Handle the API response data here
  //       setIsOpen(data)
  //       //window.location.reload();
  //       return;
  //   })
  //     .catch((error) => {
  //         // Handle any errors that occurred during the fetch.
  //         console.error('Fetch error:', error);
  //     });
  //   }




    //   try {
    //     const response = await axios.get(getQueueStatusUrl);
    //     setIsOpen(response.data); // Assuming the response is a boolean
    //   } catch (error) {
    //     console.error('Error fetching the queue status:', error);
    //   }
    // };

  //   fetchStatus();
  // }, []);

  const toggleQueue = () => {
    // Fetch the current status
    fetch(getQueueStatus, getqueuestStatusOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((currentStatus) => {
        // Immediately set the isOpen status to the new value
        console.log("current status" + currentStatus)
        const newStatus = !currentStatus;
        setIsOpen(newStatus); // Update state to trigger re-render
        localStorage.setItem('queueStatus', String(newStatus));
        // Save the new status to the backend
        const setQueueStatusUrl = `${API_URL}/setQueueStatus?newStatus=${newStatus}`;
        return fetch(setQueueStatusUrl, setqueuestStatusOptions);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok while setting status');
        }
        // Handle response for setting the new status
        console.log('Queue status updated successfully');
        console.log(response.text());
      })
      .catch((error) => {
        // Handle any errors that occurred during the entire process
        console.error('Fetch error:', error);
      });
  };

//   const toggleQueue = async () => {
//     fetch(getQueueStatus, getqueuestStatusOptions)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Handle the API response data here
//         setIsOpen(data)
//         console.log("fetch data: " + data)
//         console.log("isOPen after fetch data: " + isOpen)
//         //window.location.reload();
//         return;
//     })
//       .catch((error) => {
//           // Handle any errors that occurred during the fetch.
//           console.error('Fetch error:', error);
//       });
//     console.log("isOpen data: " + isOpen);
//     const newStatus = !isOpen;
//     console.log(newStatus)
//     //await setQueueStatus(newStatus);
//     setIsOpen(newStatus);
//     const setQueueStatus = `${API_URL}/setQueueStatus?newStatus=${newStatus}`;
//     fetch(setQueueStatus, setqueuestStatusOptions)
//       .then((response) => {
//         console.log(response)
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         //window.location.reload();
//         return;
//     })
//       .catch((error) => {
//           // Handle any errors that occurred during the fetch.
//           console.error('Fetch error:', error);
//       });
// };






  return (
    // <div className="App">
    //   <header className="App-header">
    //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>

    //   </header>
    // </div>
    <div className="App">
      {console.log(isOpen)}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center', flex: '1' }} onClick = {() => navigate("/staffHome")}>ME100</h1>
        <button style={{ marginRight: '10px' }} onClick = {() => navigate('/tickethistory')} >Ticket History</button>
        <button style={{ marginRight: '10px' }} onClick = {() => navigate('/staffStudentHome')} >Student Home</button>
        <button style={{ marginRight: '10px' }} onClick = {() => handleLogout()} >Log Out</button>
        <button onClick={toggleQueue}> {isOpen ? 'Close the Queue' : 'Open the Queue'}
        </button>
      </header>
     <div>
      <p style={{ fontSize: '1.5rem' }}>
                Welcome to ME 100 OH Queue. Please make a ticket on the queue
      </p>
      <div className="ticket-list-container">
        <div className="ticket-list left-half">
          <h3>Open Tickets</h3>
          <StaffOpenTickets/>
        </div>
        <div className="ticket-list right-half">
          <h3>Assigned Tickets</h3>
          <StaffAssignedTickets/>
          {/* Display a list of assigned tickets here */}
        </div>
      </div>
     </div>
    </div>

  );
}

export default StaffHome;
