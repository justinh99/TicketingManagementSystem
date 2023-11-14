import React from 'react';

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
      this.ticketType =  "";
      this.description = "";
      this.location = ""
      this.currentDate = new Date();
    }
}

interface TicketListProps {
  tickets: Ticket[];
}

function calculateTimeDifference(givenDate: Date): { days: number; hours: number; minutes: number; seconds: number } {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - givenDate.getTime(); // Difference in milliseconds

  const seconds = Math.floor(timeDifference / 1000); // Convert to seconds
  const minutes = Math.floor(seconds / 60); // Convert to minutes
  const hours = Math.floor(minutes / 60); // Convert to hours
  const days = Math.floor(hours / 24); // Convert to days

  return { days, hours: hours % 24, minutes: minutes % 60, seconds: seconds % 60 };
}

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

  return `${Totalhours} Hours, ${Totalminutes} Minutes`;
}


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


const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  const studentDataString = localStorage.getItem('studentData') || '';
  let studentID = '';
  if (studentDataString != ''){
    studentID = JSON.parse(studentDataString).SID
  }
  console.log(studentID);
  const sortedTickets = [...tickets].sort((a, b) => a.currentDate.getTime() - b.currentDate.getTime());
  return (
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
  );
};



export default TicketList;
