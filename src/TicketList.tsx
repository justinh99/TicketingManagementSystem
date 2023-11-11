import React from 'react';

// Compact Ticket class definition
class Ticket {
  constructor(
    public studentID: string = "",
    public studentName: string = "",
    public ticketType: string = "",
    public description: string = "",
    public location: string = "",
    public currentDate: Date = new Date()
  ) {}
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


// TicketList component
const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  const sortedTickets = [...tickets].sort((a, b) => a.currentDate.getTime() - b.currentDate.getTime());
  return (
    <ul className="ticket-list">
      {sortedTickets.map((ticket, index) => (
        <li key={ticket.studentID} className="ticket-item">
          {index + 1}. {ticket.studentName} - {ticket.ticketType} - {ticket.location} - {formatTime(ticket.currentDate)}
        </li>         
      ))}
    </ul>
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
