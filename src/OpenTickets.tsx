import React, { useEffect, useState } from 'react';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import jwt_decode from 'jwt-decode';
import useWebSocket from './useWebSocket'; // ✅ Import WebSocket Hook

const API_URL = process.env.REACT_APP_API_URL;

// ✅ Move Ticket Class Outside the Component
class Ticket {
    public id: string;
    public studentID: string;
    public studentName: string;
    public ticketType: string;
    public description: string;
    public location: string;
    public currentDate: Date;

    constructor() {
        this.id = "";
        this.studentID = "";
        this.studentName = "";
        this.ticketType = "";
        this.description = "";
        this.location = "";
        this.currentDate = new Date();
    }
}

const OpenTickets: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [lastUpdate, setLastUpdate] = useState<number>(Date.now()); // ✅ Prevent duplicate API calls

    // ✅ Listen for WebSocket messages
    const { ticketUpdateCount } = useWebSocket(); // Extract `ticketStatus`

    // ✅ Function to Fetch Open Tickets
    const fetchTickets = async () => {
      try {
          const response = await fetch(`${API_URL}/ticket/getAllOpenTickets`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          
          console.log("🎯 API Response:", data); // ✅ Log API Response
  
          if (!Array.isArray(data)) {
              console.error("❌ API did not return an array:", data);
              return;
          }
  
          const ticketObjects = data.map((item: any) => {
              const ticket = new Ticket();
              ticket.id = item.id;
              ticket.studentID = item.studentID;
              ticket.studentName = item.studentName;
              ticket.ticketType = item.ticketType;
              ticket.description = item.description;
              ticket.location = item.location;
              ticket.currentDate = new Date(item.currentDate);
              return ticket;
          });
  
          console.log("✅ Converted Tickets:", ticketObjects); // ✅ Log converted tickets
  
          setTickets(ticketObjects);
      } catch (error) {
          console.error('❌ Fetch error:', error);
      }
  };
  

    // ✅ Fetch Tickets on Mount
    useEffect(() => {
    console.log("🔄 Checking conditions for fetching tickets...");

    document.title = "Home";

    // ✅ Get User Info from JWT Token (Only on mount)
    const token = localStorage.getItem('userToken');
    if (token) {
        try {
            const userObject = jwt_decode<{ name: string }>(token);
            setUser(userObject);
        } catch (e) {
            console.error("Token validation failed", e);
            localStorage.removeItem('userToken');
        }
    }

    // ✅ Initial fetch on mount OR WebSocket update triggers refresh
    if (!ticketUpdateCount || (ticketUpdateCount && Date.now() - lastUpdate > 2000)) {
        console.log("🆕 WebSocket ticket update received:", ticketUpdateCount);
        console.log("🔄 Fetching ticket list...");
        setLastUpdate(Date.now()); 
        fetchTickets();
    }
}, [ticketUpdateCount]);


    return (
        <div>
            <TicketList tickets={tickets} openModalForTicket={setSelectedTicket} />
            {isModalOpen && selectedTicket && (
                <EditTicketForm 
                    isModalOpen={isModalOpen} 
                    setIsModalOpen={setIsModalOpen} 
                    userData={user} 
                    type="create" 
                    ticket={selectedTicket}
                />
            )}
        </div>
    );
};

export default OpenTickets;
