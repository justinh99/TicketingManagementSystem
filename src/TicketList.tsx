import React from 'react';

class Ticket {
    public studentID: string;
    public studentName: string;
    public ticketType: string;
    public description: string;
    public location: string;
    public currentDate: Date;

    constructor() {
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

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  const sortedTickets = [...tickets].sort((a, b) => a.currentDate.getTime() - b.currentDate.getTime());
  return (
    <div className="ticket-form-container">
        {sortedTickets.map((ticket, index) => (
            <li key={ticket.studentID} className="ticket-item">
                <div className="ticket-header">
                    <h2 className="ticket-title">{ticket.studentName}</h2>
                </div>
                <div className="ticket-body">
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
