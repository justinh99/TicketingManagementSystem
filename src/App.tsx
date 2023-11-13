import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TicketForm from './TicketForm';
import OpenTickets from './OpenTickets';
import Login from './login';
import Home from './Home';
import StaffHome from './StaffHome';
import { BrowserRouter, Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider';
import StaffStudentHome from './StaffStudentHome';
import ProtectedStaffHomeRoute from './ProtectedStaffHomeRoute';
import ProtectedStaffStudentHomeRoute from './ProtectedStaffStudentHomeRoute';
import ProtectedTicketHistroyRoute from './ProtectedTicketHistoryRoute';
import ProtectedPrivacyNoticeRoute from './ProtectedPrivacyNoticeRoute';
import ProtectedLoggedInHomeRoute from './ProtectedLoggedInHomeRoute';
import LoggedInHome from './Home-LoggedIn';


function App() {

  return (
    <div className="App">
      <>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<Home/>}/>
            <Route path = "/login" element={<Login/>} />
            <Route path = "/staffHome" element={<ProtectedStaffHomeRoute/>} />
            <Route path = "/staffStudentHome" element = {<ProtectedStaffStudentHomeRoute/>}/>
            <Route path = "/tickethistory" element = {<ProtectedTicketHistroyRoute/>}/>
            <Route path = "/privacyNotice" element = {<ProtectedPrivacyNoticeRoute/>}/>
            <Route path = "/loggedInHome" element = {<ProtectedLoggedInHomeRoute/>}/>
            <Route path = "*" element ={<Navigate to ="/"/>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>

      </>
    </div>

  );
}

export default App;
