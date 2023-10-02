// src/components/TicketForm.tsx
import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file for styling
import TicketList from './TicketList';
import AssignedTicketList from './AssignedTicketList';


const API_URL = process.env.REACT_APP_API_URL;

const AssignedTickets: React.FC = () => {

    // Define the Ticket interface
    class Ticket {
      public studentID: string;
      public studentName: string;
      public ticketType: string;
      public description: string;
      public location: string;
      public currentDate: Date;
      public assignedDate: Date;
    
      constructor() {
        this.studentID = "";
        this.studentName = "";
        this.ticketType =  "";
        this.description = "";
        this.location = ""
        this.currentDate = new Date();
        this.assignedDate = new Date();
      }
    }

    class AssignedTicket {
      public studentID: string;
      public studentName: string;
      public ticketType: string;
      public description: string;
      public location: string;
      public currentDate: Date;
      public assignedDate: Date;
      public TA: string;
    
      constructor() {
        this.studentID = "";
        this.studentName = "";
        this.ticketType =  "";
        this.description = "";
        this.location = "";
        this.TA = "";
        this.currentDate = new Date();
        this.assignedDate = new Date();
      }
    }

  const [tickets, setTickets] = useState<AssignedTicket[]>([]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

  
  }

  useEffect(() => {
    // Inside this useEffect, you can make the API request
    // using the fetch API.
    const getAllTickets = `${API_URL}/ticket/getAllAssignedTickets`; // Replace with your API URL


    // Define the options for the fetch request, including method, headers, and body.
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };


    // Make the API request
    fetch(getAllTickets)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the API response data here
        const ticketObjects = data.map((item: { studentID: string; studentName: string; ticketType: string; description: string; location: string; currentDate: string | number | Date; ta:string; }) => {
            const ticket = new AssignedTicket();
            ticket.studentID = item.studentID;
            ticket.studentName = item.studentName;
            ticket.ticketType = item.ticketType;
            ticket.description = item.description;
            ticket.location = item.location;
            ticket.TA = item.ta;
            ticket.currentDate = new Date(item.currentDate);
            return ticket;
          });
          setTickets(ticketObjects);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch.
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <AssignedTicketList tickets = {tickets} />
  );
};

export default AssignedTickets;
