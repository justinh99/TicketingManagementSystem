import React from 'react';

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

class AssignRequest {
  public studentID: string;
  public studentName: string;
  public ticketType: string;
  public description: string;
  public location: string;
  public currentDate: Date;
  public assignedDate: Date;
  public token: string;

  constructor() {
    this.studentID = "";
    this.studentName = "";
    this.ticketType =  "";
    this.description = "";
    this.location = "";
    this.token = "";
    this.currentDate = new Date();
    this.assignedDate = new Date();
  }
}

interface TicketListProps {
  tickets: Ticket[];
}

const accessTokenRow = document.cookie
.split('; ')
.find(row => row.startsWith('accessToken='));

let accessToken;
if (accessTokenRow) {
accessToken = accessTokenRow.split('=')[1];
}
console.log(accessToken);
// Handle form submission
const handleAssignedTicket = (ticket: Ticket) => {
  if (accessTokenRow) {
    accessToken = accessTokenRow.split('=')[1];
  console.log(accessToken);
  const assignTicket = 'http://localhost:8080/ticket/assignTicket';
  const assignRequest = new AssignRequest();
   assignRequest.studentID = ticket.studentID;
   assignRequest.studentName = ticket.studentName;
   assignRequest.ticketType = ticket.ticketType;
   assignRequest.description = ticket.description;
   assignRequest.location = ticket.location;
   assignRequest.token = accessToken;
    console.log(assignRequest);
  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignRequest), 
    };


    // Make the API request
  fetch(assignTicket, requestOptions)
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
} else {
  console.error('Access token not found.');
}



  // Add your login logic here
};


  // Handle form submission
  const handleDeleteTicket = (ticket: Ticket) => {
    const deleteTicket = 'http://localhost:8080/ticket/deleteTicket';

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



const StaffTicketList: React.FC<TicketListProps> = ({ tickets }) => {
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
                    <div className="ticket-buttons">
                        <button className="assign-button" onClick={()=>handleAssignedTicket(ticket)}>Assign Ticket</button>
                        <button className="edit-button">Edit Ticket</button>
                        <button className="delete-button" onClick={()=>handleDeleteTicket(ticket)}>Delete Ticket</button>
                    </div>
                </div>
                </li>
        ))}
    </div>
  );
};

export default StaffTicketList;
