import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TicketForm from './TicketForm';
import OpenTickets from './OpenTickets';
import Login from './login';
import { useNavigate } from 'react-router-dom';
import AssignedTickets from './AssignedTickets';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center', flex: '1' }} onClick = {() => navigate("/")}>ME100</h1>
        <button style={{ marginRight: '10px' }} onClick = {() => navigate('/login')} >Staff Login</button>
      </header>
     <div>
      <p style={{ fontSize: '1.5rem' }}>
                Welcome to ME 100 OH Queue. Please make a ticket on the queue
      </p>
      <TicketForm/>
      <div className="ticket-list-container">
        <div className="ticket-list left-half">
          <h3>Open Tickets</h3>
          <OpenTickets/>
        </div>
        <div className="ticket-list right-half">
          <h3>Assigned Tickets</h3>
          <AssignedTickets/>
          {/* Display a list of assigned tickets here */}
        </div>
      </div>
     </div>
    </div>

  );
}

export default Home;
