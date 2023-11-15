import React from 'react';

// Compact Ticket class definition
class Ticket {
<<<<<<< HEAD
  constructor(
    public studentID: string = "",
    public studentName: string = "",
    public ticketType: string = "",
    public description: string = "",
    public location: string = "",
    public currentDate: Date = new Date()
  ) {}
=======
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
      this.ticketType =  "";
      this.description = "";
      this.location = ""
      this.currentDate = new Date();
    }
>>>>>>> b1e37ee0dc8a816d8bbd6cbb02896b9c739f9312
}

interface TicketListProps {
  tickets: Ticket[];
}

// Helper function to format the time difference as a string
// function formatTime(date: Date): string {
//   const currentDate = new Date();
//   const timeDifference = currentDate.getTime() - date.getTime();
//   const Totalhours = Math.floor(timeDifference / 3600000);
//   const Totalminutes = Math.floor(timeDifference % 3600000 / 60000);
//   return `${Totalhours}h ${Totalminutes}m`;
// }

// Helper function to format the time difference as a string in PST
function formatTime(date: Date): string {
  // Convert the date to PST
  const pstDate = new Date(date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const currentDate = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));

  const timeDifference = currentDate.getTime() - pstDate.getTime();
  const Totalhours = Math.floor(timeDifference / 3600000);
  const Totalminutes = Math.floor((timeDifference % 3600000) / 60000);

  return `${Totalhours}h ${Totalminutes}m`;
}


<<<<<<< HEAD
// TicketList component
=======

class EditRequest {
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

const API_URL = process.env.REACT_APP_API_URL;
const handleEditTicket = (ticket: Ticket) => {
  
  //const accessTokenRow = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
  //let accessToken;
  //if (accessTokenRow) {
  //accessToken = accessTokenRow.split('=')[1];
  //}
  //console.log(accessToken);
  //accessToken = accessTokenRow.split('=')[1];
  //console.log(accessToken);
  const localstaffName = localStorage.getItem('userName');
  const staffName = localstaffName || "";
  const editTicket = `${API_URL}/ticket/editTicket`;
  const editRequest = new EditRequest();
  editRequest.id = ticket.id;
  editRequest.studentID = ticket.studentID;
  editRequest.studentName = ticket.studentName;
  editRequest.ticketType = ticket.ticketType;
  editRequest.description = ticket.description;
  editRequest.currentDate = ticket.currentDate;
  editRequest.location = ticket.location;
  editRequest.token = "";
  editRequest.staffName = staffName;
  console.log(editRequest);
  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editRequest), 
    };


    // Make the API request
  // fetch(editTicket, requestOptions)
  // .then((response) => {
  //     if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //     }
  //     window.location.reload();
  //     return;
  // })
  // .catch((error) => {
  //     // Handle any errors that occurred during the fetch.
  //     console.error('Fetch error:', error);
  // });
}


>>>>>>> b1e37ee0dc8a816d8bbd6cbb02896b9c739f9312
const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  const studentDataString = localStorage.getItem('studentData') || '';
  let studentID = '';
  if (studentDataString != ''){
    studentID = JSON.parse(studentDataString).SID
  }
  console.log(studentID);
  const sortedTickets = [...tickets].sort((a, b) => a.currentDate.getTime() - b.currentDate.getTime());
  return (
<<<<<<< HEAD
    <ul className="ticket-list">
      {sortedTickets.map((ticket, index) => (
        <li key={ticket.studentID} className="ticket-item">
          {index + 1}. {ticket.studentName} - {ticket.ticketType} - {ticket.location} - {formatTime(ticket.currentDate)}
        </li>         
      ))}
    </ul>
=======
    <div className="ticket-form-container">
      {sortedTickets.map((ticket, index) => (
        <li
          key={ticket.studentID}
          className={`ticket-item ${ticket.studentID === studentID.toString() ? 'matched-ticket' : ''}`}
        >
          <div className="ticket-header">
            <h2 className="ticket-title">{index + 1}. {ticket.studentName}</h2>
            <div>
            {ticket.studentID === studentID.toString() && (  // Check if IDs match
            <>
              {/* <button className="assign-button" onClick={()=>handleEditTicket(ticket)}>Edit Ticket</button>
              <button className="assign-button">Delete Ticket</button> */}
            </>
          )}
            </div>
          </div>
          <div className="ticket-body">
            {console.log(typeof(studentID))}
            {console.log(typeof(ticket.studentID))}
            {console.log(`Matching student ID: ${ticket.studentID === studentID.toString()}`)} 
            <p><strong>Ticket Type:</strong> {ticket.ticketType}</p>
            <p><strong>Location:</strong> {ticket.location}</p>
            <p><strong>Created Time:</strong> {formatTime(ticket.currentDate)}</p>
          </div>
        </li>
      ))}
    </div>
>>>>>>> b1e37ee0dc8a816d8bbd6cbb02896b9c739f9312
  );
};

export default TicketList;

// CSS in JS (for inline styling) or external CSS file
const ticketItemStyle = {
  listStyleType: 'none',
  padding: '10px',
  border: '1px solid #ccc',
  marginBottom: '15px',
  backgroundColor: '#fff',
  // borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
} as React.CSSProperties;

// Add this style object to the `style` prop of the `li` element if using inline styles
// <li key={ticket.studentID} className="ticket-item" style={ticketItemStyle}>
