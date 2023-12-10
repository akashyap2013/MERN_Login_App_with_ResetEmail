import React, { useState } from 'react';
import '../styles/home.css';
import logo from '../assets/logo 2-modified.png';


import 'font-awesome/css/font-awesome.min.css';

export default function Home() {
  const [showNoAlerts, setShowNoAlerts] = useState(false); // State to manage "No alerts" visibility

  const handleAlertClick = (event) => {
    event.preventDefault(); // Prevent the default behavior of the anchor link
    // Show "No alerts" for a brief moment when the "Alert" link is clicked
    setShowNoAlerts(true);
    setTimeout(() => setShowNoAlerts(false), 2000); // Hide it after 2 seconds (adjust as needed)
  };

  return (
    <>
      <div className="home-container">
        <header>
          <div className="header-left">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <nav>
              <ul>
                <li>
                  <a href="/home" className="active">
                   <i className="fa fa-home  fa-lg"></i> Home
                  </a>
                </li>
                <li>
                  <div className="alert-container">
                    <a href="/alert" onClick={handleAlertClick}>
                      <i className="fa fa-bell  fa-lg"></i> Alerts
                    </a>
                  </div>
                </li>
                <li>
                <div className="dropdown"  style={{color:'white', textDecoration: 'underline', paddingLeft: '20px', fontWeight: 'bold', marginTop: '10px'}}>
                    <i className="fa fa-info-circle  fa-lg" style={{color:'white'}}></i> Exam Score
                  <div className="dropdown-content">
                    <a href="/viewMarks">View Marks</a>
                    <a href="/view_grade">View Grade</a>
                  </div>
                </div>
                </li>
                <li>
                  <a href="/profile">
                    <i className="fa fa-user  fa-lg"></i> Profile
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-sign-out fa-lg"></i> Logout
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <div className="hamburger">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </header>
      </div>
      <div>
        <h1>Student page</h1>
      </div>

      {/* Notification bar */}
      {showNoAlerts && (
        <div className="notification-bar">
          <p>No alerts</p>
        </div>
      )}
    </>
  );
}
