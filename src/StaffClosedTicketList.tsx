import React from 'react';

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

  constructor() {
    this.id = "";
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
  public id: string;
  public studentID: string;
  public studentName: string;
  public ticketType: string;
  public description: string;
  public location: string;
  public currentDate: Date;
  public assignedDate: Date;
  public token: string;
  public staffName: string;

  constructor() {
    this.id = "";
    this.studentID = "";
    this.studentName = "";
    this.ticketType =  "";
    this.description = "";
    this.location = "";
    this.token = "";
    this.staffName = "";
    this.currentDate = new Date();
    this.assignedDate = new Date();
  }
}

interface TicketListProps {
  tickets: Ticket[];
}


// Handle form submission
const handleAssignedTicket = (ticket: Ticket) => {
  
  //const accessTokenRow = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
  //let accessToken;
  //if (accessTokenRow) {
  //accessToken = accessTokenRow.split('=')[1];
  //}
  //console.log(accessToken);
const isStaff = localStorage.getItem('isStaff');
  if (isStaff) {
  //accessToken = accessTokenRow.split('=')[1];
  //console.log(accessToken);
  const localstaffName = localStorage.getItem('userName');
  const staffName = localstaffName || "";
  const assignTicket = `${API_URL}/ticket/assignTicket`;
  const assignRequest = new AssignRequest();
  assignRequest.id = ticket.id;
   assignRequest.studentID = ticket.studentID;
   assignRequest.studentName = ticket.studentName;
   assignRequest.ticketType = ticket.ticketType;
   assignRequest.description = ticket.description;
   assignRequest.currentDate = ticket.currentDate;
   assignRequest.location = ticket.location;
   assignRequest.token = "";
   assignRequest.staffName = staffName;
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
      window.location.reload();
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
    const deleteTicket = `${API_URL}/ticket/deleteTicket`;

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
        window.location.reload();
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



const StaffClosedTicketList: React.FC<TicketListProps> = ({ tickets }) => {
  const sortedTickets = [...tickets].sort((a, b) => b.currentDate.getTime() - a.currentDate.getTime());
  return (
    <div className="ticket-form-container">
        {sortedTickets.map((ticket, index) => (
                <li key={ticket.studentID}>
                <div className="ticket">
                <strong>{index+1}. {ticket.studentName}</strong>
                    <p>Student ID: {ticket.studentID}</p>
                    <p>Location: {ticket.location}</p>
                    <p>Ticket Type: {ticket.ticketType}</p>
                    <p>Description: {ticket.description}</p>
                    <p>Created Date: {formatDate(ticket.currentDate)}</p>
                    <p>Created Time: {formatTime(ticket.currentDate)}</p>
                </div>
                </li>
        ))}
    </div>
  );
};

export default StaffClosedTicketList;
