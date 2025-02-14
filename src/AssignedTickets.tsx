import React, { useEffect, useState } from "react";
import AssignedTicketList from "./AssignedTicketList";
import useWebSocket from "./useWebSocket";

const API_URL = process.env.REACT_APP_API_URL;

// ✅ Define Assigned Ticket Model
class AssignedTicket {
  public studentID: string;
  public studentName: string;
  public ticketType: string;
  public description: string;
  public location: string;
  public currentDate: Date;
  public assignedDate: Date;
  public TA: string;

  // ✅ Constructor with default values for optional cases
  constructor(
    studentID: string = "",
    studentName: string = "",
    ticketType: string = "",
    description: string = "",
    location: string = "",
    currentDate: Date = new Date(),
    assignedDate: Date = new Date(),
    TA: string = ""
  ) {
    this.studentID = studentID;
    this.studentName = studentName;
    this.ticketType = ticketType;
    this.description = description;
    this.location = location;
    this.currentDate = currentDate;
    this.assignedDate = assignedDate;
    this.TA = TA;
  }
}


const AssignedTickets: React.FC = () => {
  const [tickets, setTickets] = useState<AssignedTicket[]>([]);
  const { ticketUpdateCount } = useWebSocket(); // ✅ Listen for WebSocket updates

  // ✅ Function to Fetch Assigned Tickets
  const fetchTickets = async () => {
    try {
      console.log("📡 Fetching assigned tickets from:", `${API_URL}/ticket/getAllAssignedTickets`);

      const response = await fetch(`${API_URL}/ticket/getAllAssignedTickets`);
      if (!response.ok) {
        throw new Error(`❌ API Response Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("🎯 API Response:", data);

      if (!Array.isArray(data)) {
        console.error("❌ API did not return an array:", data);
        return;
      }

      const ticketObjects = data.map((item: any) => new AssignedTicket(
        item.studentID,
        item.studentName,
        item.ticketType,
        item.description,
        item.location,
        new Date(item.currentDate),
        new Date(item.assignedDate),
        item.ta
      ));

      console.log("✅ Converted Tickets:", ticketObjects);
      setTickets(ticketObjects);
    } catch (error) {
      console.error("❌ Fetch error:", error);
    }
  };

  // ✅ Fetch Tickets on Mount & When WebSocket Sends an Update
  useEffect(() => {
    console.log("🔄 Checking conditions for fetching assigned tickets...");
    fetchTickets(); // Initial fetch

    if (ticketUpdateCount > 0) {
      console.log("🆕 WebSocket assigned ticket update received:", ticketUpdateCount);
      console.log("🔄 Refreshing assigned ticket list...");
      fetchTickets();
    }
  }, [ticketUpdateCount]); // Runs when ticket updates occur

  return <AssignedTicketList tickets={tickets} />;
};

export default AssignedTickets;
