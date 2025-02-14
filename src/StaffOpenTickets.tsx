import React, { useEffect, useState } from "react";
import "./App.css"; // Import the CSS file for styling
import StaffTicketList from "./StaffOpenTicketList";
import useWebSocket from "./useWebSocket"; // ✅ Import WebSocket Hook

const API_URL = process.env.REACT_APP_API_URL;

class Ticket {
  public id: string;
  public studentID: string;
  public studentName: string;
  public ticketType: string;
  public description: string;
  public location: string;
  public currentDate: Date;
  public assignedDate: Date;

  constructor(
    id: string = "",
    studentID: string = "",
    studentName: string = "",
    ticketType: string = "",
    description: string = "",
    location: string = "",
    currentDate: Date = new Date(),
    assignedDate: Date = new Date()
  ) {
    this.id = id;
    this.studentID = studentID;
    this.studentName = studentName;
    this.ticketType = ticketType;
    this.description = description;
    this.location = location;
    this.currentDate = currentDate;
    this.assignedDate = assignedDate;
  }
}


const StaffOpenTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { ticketUpdateCount } = useWebSocket(); // ✅ Listen for WebSocket updates

  // ✅ Function to Fetch Open Tickets
  const fetchTickets = async () => {
    try {
      console.log("📡 Fetching open tickets from:", `${API_URL}/ticket/getAllOpenTickets`);

      const response = await fetch(`${API_URL}/ticket/getAllOpenTickets`);
      if (!response.ok) {
        throw new Error(`❌ API Response Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("🎯 API Response:", data);

      if (!Array.isArray(data)) {
        console.error("❌ API did not return an array:", data);
        return;
      }

      const ticketObjects = data.map(
        (item: any) =>
          new Ticket(
            item.id,
            item.studentID,
            item.studentName,
            item.ticketType,
            item.description,
            item.location,
            new Date(item.currentDate),
            new Date(item.assignedDate)
          )
      );

      console.log("✅ Converted Tickets:", ticketObjects);
      setTickets(ticketObjects);
    } catch (error) {
      console.error("❌ Fetch error:", error);
    }
  };

  // ✅ Fetch Tickets on Mount & When WebSocket Sends an Update
  useEffect(() => {
    console.log("🔄 Checking conditions for fetching open tickets...");
    fetchTickets(); // Initial fetch

    if (ticketUpdateCount > 0) {
      console.log("🆕 WebSocket open ticket update received:", ticketUpdateCount);
      console.log("🔄 Refreshing open ticket list...");
      fetchTickets();
    }
  }, [ticketUpdateCount]); // Runs when ticket updates occur

  return <StaffTicketList tickets={tickets} />;
};

export default StaffOpenTickets;
