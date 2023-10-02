import React from 'react';

const API_URL = process.env.REACT_APP_API_URL;
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

interface TicketListProps {
  tickets: AssignedTicket[];
}


// Handle form submission
const handleAssignedTicket = (ticket: Ticket) => {
  
  const assginedTicket = `${API_URL}/ticket/assignTicket`;

  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket), 
    };


    // Make the API request
  fetch(assginedTicket, requestOptions)
  .then((response) => {
      if (!response.ok) {
      throw new Error('Network response was not ok');
      }
      return;
  })
  .catch((error) => {
      // Handle any errors that occurred during the fetch.
      console.error('Fetch error:', error);
  });


  // Add your login logic here
};

function formatDate(date:Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime(); // Difference in milliseconds
  const Totalhours = Math.floor(timeDifference / 3600000); // Convert to seconds
  const Totalminutes = Math.floor(timeDifference % 3600000 / 60000); // Convert to seconds
  const Totalseconds = Math.floor(timeDifference %  60000/ 1000); // Convert to seconds

  return `${month}/${day}/${year}`;
}

function formatTime(date:Date) {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime(); // Difference in milliseconds
  const Totalhours = Math.floor(timeDifference / 3600000); // Convert to seconds
  const Totalminutes = Math.floor(timeDifference % 3600000 / 60000); // Convert to seconds
  const Totalseconds = Math.floor(timeDifference %  60000 / 1000); // Convert to seconds

  return `${Totalhours} Hours, ${Totalminutes} Minutes, ${Totalseconds} Seconds ago`;
}

function formatAssignedTime(assignedDate:Date) {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - assignedDate.getTime(); // Difference in milliseconds
  const Totalhours = Math.floor(timeDifference / 3600000); // Convert to seconds
  const Totalminutes = Math.floor(timeDifference % 3600000 / 60000); // Convert to seconds
  const Totalseconds = Math.floor(timeDifference %  60000 / 1000); // Convert to seconds

  return `${Totalhours} Hours, ${Totalminutes} Minutes, ${Totalseconds} Seconds ago`;
}

  // Handle form submission
  const handleDeleteTicket = (ticket: Ticket) => {
    const deleteTicket = `${API_URL}/ticket/closeTicket`;

    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket), 
      };
  
  
      // Make the API request
    fetch(deleteTicket, requestOptions)
    .then((response) => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return;
    })
    .catch((error) => {
        // Handle any errors that occurred during the fetch.
        console.error('Fetch error:', error);
    });


    // Add your login logic here
  };



const StaffTicketAssignedList: React.FC<TicketListProps> = ({ tickets }) => {
  return (
    <div className="ticket-form-container">
        {tickets.map((ticket, index) => (
                <li key={ticket.studentID}>
                <div className="ticket">
                    <strong>{index+1}. {ticket.studentName}</strong>
                    <p>Student ID: {ticket.studentID}</p>
                    <p>Location: {ticket.location}</p>
                    <p>Ticket Type: {ticket.ticketType}</p>
                    <p>Description: {ticket.description}</p>
                    <p>Created Date: {formatDate(ticket.currentDate)}</p>
                    <p>Created Time: {formatTime(ticket.currentDate)}</p>
                    <p>Assigned Time: {formatAssignedTime(ticket.assignedDate)}</p>
                    <p>TA: {ticket.TA}</p>
                    <div className="ticket-buttons">
                        <button className="assign-button" onClick={()=>handleAssignedTicket(ticket)}>Open Ticket</button>
                        <button className="edit-button" onClick={()=>handleAssignedTicket(ticket)}>Edit Ticket</button>
                        <button className="delete-button" onClick={()=>handleDeleteTicket(ticket)}>Close Ticket</button>
                    </div>
                </div>
                </li>
        ))}
    </div>
  );
};

export default StaffTicketAssignedList;
