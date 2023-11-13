import React, { useEffect, useState } from 'react';
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
type UserType = {
  name: string;
  
};
interface TicketFormProps {
  // onTicketSubmit: () => void;  // Callback function to trigger a re-render
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  userData: UserType | null;
}
interface TicketFormUser {
  userData: UserType | null;
}

const TicketForm: React.FC<TicketFormProps> = ({ isModalOpen, setIsModalOpen, userData }) => {
  const studentDataString = localStorage.getItem('studentData') || '';

  // Parse the JSON string into a JavaScript object
  const studentData = JSON.parse(studentDataString);
  console.log(studentData)
  const [ticketData, setTicketData] = useState<Ticket>({
    studentId: studentData.SID,
    studentName: localStorage.getItem('userName') || '', 
    ticketType: '',
    description: '',
    location: '',
  });



  // const [isModalOpen, setIsModalOpen] = useState(true);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newTicket: Ticket = { ...ticketData };

  useEffect(() => {
    if (userData) {
      setTicketData((prevData) => ({
        ...prevData,
        studentName: userData.name, // Assuming the name is stored here; adjust if needed
      }));
    }
  }, [userData]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new Ticket object when the form is submitted
    
    const newTicket: Ticket = {
      ...ticketData,
    };

    // Handle form submission, e.g., send data to a server or perform any necessary actions.

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


  const jsonData = 
    {
      id: 1,
      name: 'Test name',
    }

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const handleButtonClick = () => {
    
    if (!userData ) {
      alert("You must be logged in to submit a ticket.");
      return;
    }

    const { studentId, studentName, ticketType, description, location } = ticketData;
    if (!studentId || !studentName || !ticketType || !description || !location) {
      alert("Please fill in all fields before submitting.");
      return;
    }
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
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch.
        console.error('Fetch error:', error);
      });
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
                  readOnly
                />
              </div>
              <div className="form-group">
              <label htmlFor="studentName">Student Name</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={ticketData.studentName}
                readOnly
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
              <button type="submit" style = {{margin: '10px'}}>Submit</button>
              <button style = {{margin: '10px'}} onClick={() => setIsModalOpen(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketForm;

