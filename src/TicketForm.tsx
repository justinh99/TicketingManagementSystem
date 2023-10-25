import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);

interface Ticket {
  studentId: string;
  studentName: string;
  ticketType: string;
  description: string;
  location: string;
}

const TicketForm: React.FC = () => {
  const [ticketData, setTicketData] = useState<Ticket>({
    studentId: '',
    studentName: '',
    ticketType: '',
    description: '',
    location: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = { ...ticketData };
    console.log('Form submitted with data:', newTicket);

    const createTicket = `${API_URL}/ticket/createTicket`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    };
    fetch(createTicket, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });

    // Clear the form fields after submission
    setTicketData({
      studentId: '',
      studentName: '',
      ticketType: '',
      description: '',
      location: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Create a Ticket</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="studentId">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={ticketData.studentId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="studentName">Student Name</label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={ticketData.studentName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="ticketType">Ticket Type</label>
                <input
                  type="text"
                  id="ticketType"
                  name="ticketType"
                  value={ticketData.ticketType}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={ticketData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={ticketData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">Submit → </button>
            </form>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketForm;

