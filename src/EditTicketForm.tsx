import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file for styling

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);

interface Ticket {
   id: string;
   studentID: string;
   studentName: string;
   ticketType: string;
   description: string;
   location: string;
   currentDate: Date;
}
type UserType = {
  name: string;
  
};
interface TicketFormProps {
  // onTicketSubmit: () => void;  // Callback function to trigger a re-render
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  userData: UserType | null;
  type: string;
  ticket: Ticket | null
}

interface TicketFormUser {
  userData: UserType | null;
}

const EditTicketForm: React.FC<TicketFormProps> = ({ isModalOpen, setIsModalOpen, userData, type, ticket}) => {
  const studentDataString = localStorage.getItem('studentData') || '';

  // Parse the JSON string into a JavaScript object
  const studentData = JSON.parse(studentDataString);
  console.log(studentData)
  const [ticketData, setTicketData] = useState<Ticket>({
    id: "",
    studentID: studentData.SID,
    //studentName: localStorage.getItem('userName') || '', 
    studentName: studentData.Name,
    ticketType: '',
    description: '',
    location: '',
    currentDate : new Date()
  });



  // const [isModalOpen, setIsModalOpen] = useState(true);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newTicket: Ticket = { ...ticketData };

  useEffect(() => {
    if (ticket) {
      setTicketData(ticket);
    }
  }, [ticket]);


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
      id: "",
      studentID: studentData.SID,
      //studentName: localStorage.getItem('userName') || '', 
      studentName: studentData.Name,
      ticketType: '',
      description: '',
      location: '',
      currentDate : new Date()
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const newFucn = (param: TYPE) : RET_TYPE {

  // };

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


    const {studentID, studentName, ticketType, location, description} = ticketData;
    if (!studentID || !studentName || !ticketType || !description || !location) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    setIsSubmitClicked(true);
    const createTicket = `${API_URL}/ticket/createTicket`; // Replace with your API URL


    type TicketType = 'type1' | 'type2'; 
    const isTicketType = (type: any): type is TicketType => {
      return ['type1', 'type2'].includes(type);
    };    

      const availableLocations: Record<TicketType, string[]> = {
      type1: ["Location A", "Location B"], // Locations for 'Office Hour'
      type2: ["Location C", "Location D"], // Locations for 'Lab'
      // ... other ticket types
    };
    //const getLocationsForType = (type: TicketType) => availableLocations[type] || [];
    const getLocationsForType = (type: TicketType) => {
      return availableLocations[type] || [];
    };

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
  const isTypeCreate = type === "create";
  const title = isTypeCreate ? "Create a Ticket" : "Edit a Ticket";
  //const title = isTypeCreate ? "Create a Ticket" : (type === "edit" ? "Edit a Ticket" : "Create a Ticket");
  //const title = mode === "edit"? "Edit": "Create" + " a Ticket";

  return (
    <>
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2></h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="ticketType">Ticket Type</label>
                <select
                  id="ticketType"
                  name="ticketType"
                  value={ticketData.ticketType}
                  onChange={handleInputChange}
                  className="ticketType-button"
                  required
                >
                  <option value="">Choose the Ticket type</option>
                  <option value="Office Hour">Office Hour</option>
                  <option value="Lab">Lab</option>
                  <option value="Project">Project</option>
                  <option value="Others">Others</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              {/* <div className="form-group">
                <label htmlFor="location">Location</label>
                {ticketData.ticketType && (
              <select
                id="location"
                name="location"
                value={ticketData.location}
                onChange={handleInputChange}
                required
              >
              <option value="">Choose a location</option>
            {getLocationsForType(ticketData.ticketType).map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
              </select>
            )}
              </div> */}
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
              <button type="submit" style = {{margin: '10px'}}>Submit</button>
              <button style = {{margin: '10px'}} onClick={() => setIsModalOpen(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTicketForm;

