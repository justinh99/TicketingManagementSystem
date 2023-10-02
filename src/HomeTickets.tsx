import React, { useEffect, useState } from 'react';
import OpenTickets from './OpenTickets';
import AssignedTickets from './AssignedTickets';

const HomeTickets: React.FC = () => {
    const [view, setView] = useState('all');  // This state will determine which ticket list to show

    return (
        <div>
            {/* Buttons to toggle between Open and Assigned tickets */}
            <button className={view == "all" ? 'buttonViewedStyle' : 'buttonStyle'}  onClick={() => setView('all')}>All Tickets</button>
            <button className={view == "open" ? 'buttonViewedStyle' : 'buttonStyle'}  onClick={() => setView('open')}>Open Tickets</button>
            <button className={view == "assigned" ? 'buttonViewedStyle' : 'buttonStyle'} onClick={() => setView('assigned')}>Assigned Tickets</button>

            {/* Conditionally render the OpenTickets or AssignedTickets based on the view state */}

            {view === 'all' && 
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
            }
            {view === 'open' && <OpenTickets />}
            {view === 'assigned' && <AssignedTickets />}
        </div>
    );
};

export default HomeTickets;
