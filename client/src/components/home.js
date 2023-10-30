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
      <div>
        <header>
          <div className="header-left">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <nav>
              <ul>
                <li>
                  <a href="/home" className="active">
                   <i className="fa fa-home  fa-lg"></i> 
                  </a>
                </li>
                <li>
                  <div className="alert-container">
                    <a href="/alert" onClick={handleAlertClick}>
                      <i className="fa fa-bell  fa-lg"></i> 
                    </a>
                  </div>
                </li>
                <li>
                  <a href="/about">
                    <i className="fa fa-info-circle  fa-lg"></i> 
                  </a>
                </li>
                <li>
                  <a href="/profile">
                    <i className="fa fa-user  fa-lg"></i> 
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
