// src/components/TicketForm.tsx
import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file for styling
const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);
// Define the Ticket interface
interface Ticket {
  studentId: string;
  studentName: string;
  ticketType: string;
  description: string;
  location: string;
}

interface TicketFormProps {
  onTicketSubmit: () => void;  // Callback function to trigger a re-render
}

const TicketForm: React.FC = () => {
  const [ticketData, setTicketData] = useState<Ticket>({
    studentId: '',
    studentName: '',
    ticketType: '',
    description: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new Ticket object when the form is submitted
    const newTicket: Ticket = {
      ...ticketData,
    };

    // Handle form submission, e.g., send data to a server or perform any necessary actions.
    console.log('Form submitted with data:', newTicket);

    // Clear the form fields
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

    // Update the corresponding field in the ticketData state
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const jsonData = 
    {
      id: 1,
      name: 'Test name',
    }

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const handleButtonClick = () => {
    setIsSubmitClicked(true);
    const createTicket = `${API_URL}/ticket/createTicket`; // Replace with your API URL


    // Define the options for the fetch request, including method, headers, and body.
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    };

    console.log(ticketData)

    // Make the API request
    fetch(createTicket, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the API response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch.
        console.error('Fetch error:', error);
      });
  };

  return (
    <div className="ticket-form-container">
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
        <button onClick={handleButtonClick}>Submit</button>
      </form>
    </div>
  );
};

export default TicketForm;
