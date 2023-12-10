import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/logo 2-modified.png';
import PdfComp1 from '../PdfComp1';
import jwt_decode from 'jwt-decode';

const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

export default function TeacherHome() {
  const [showNoAlerts, setShowNoAlerts] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const [uniqueTitles, setUniqueTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);

  const handleAlertClick = (event) => {
    event.preventDefault();
    setShowNoAlerts(true);
    setTimeout(() => setShowNoAlerts(false), 2000);
  };

  // Function to get the current user's username from JWT
function getUsername() {
  const token = localStorage.getItem('token');
  if (!token) {
    return Promise.reject("Cannot find Token");
  }
  const decode = jwt_decode(token);
  return decode.username; 
}

async function getTeacherId() {
  try {
    const username = await getUsername();
    const response = await axios.get(`/api/user/${username}`);
    const userData = response.data;
    
    const teacherId = userData._id;

    return teacherId;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null; // Handle the error appropriately
  }
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const teacherId = await getTeacherId();
      const apiUrl = `/api/pdfs?teacherId=${teacherId}`;
      const response = await axios.get(apiUrl);

      const pdfData = response.data.data || [];
      setPdfs(pdfData);

      const uniqueTitles = [...new Set(pdfData.map((pdf) => pdf.title.toLowerCase()))];
      setUniqueTitles(uniqueTitles);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  fetchData();
},[]);

const handleShowPdf = async (title) => {
  try {
    // Get the teacherId dynamically
    const teacherId = await getTeacherId();

    // Fetch PDFs from the server based on the title and teacherId
    const response = await fetch(`${serverDomain}/api/title?teacherId=${encodeURIComponent(teacherId)}&title=${encodeURIComponent(title)}`);
    const data = await response.json();
    console.log("data :", data);

    // Optionally, you can set the selected title if needed
    setSelectedTitle(title);

    // Check if the 'data' property exists in the response
    if (data.data.length > 0) {
      // Save the PDF data to localStorage
      localStorage.setItem('pdfData', JSON.stringify(data.data));

      // Open a new tab and display file names with "View PDF" buttons
      const newTab = window.open();
      console.log("new tab : ", newTab);
      if (newTab) {
        newTab.location.href = '/pdflist'; // Navigate to the /pdflist route
      }
    } else {
      console.error('No PDF data found in the response');
    }
  } catch (error) {
    console.error('Error fetching PDFs:', error);
  }
};

const deletePdf = (title) => {
  // Find the PDFs with the selected title and remove them from the list
  setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf.title.toLowerCase() !== title.toLowerCase()));
  // Reset the selected title to null
  setSelectedTitle(null);
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
                  <a href="/teacher_home" className="active">
                    <i className="fa fa-home fa-lg"></i> Home
                  </a>
                </li>
                <li>
                  <div className="alert-container">
                    <a href="/alert" onClick={handleAlertClick}>
                      <i className="fa fa-bell fa-lg"></i> Alert
                    </a>
                  </div>
                </li>
                <li>
                  <a href="/profile">
                    <i className="fa fa-user fa-lg"></i> Profile
                  </a>
                </li>
                <li>
                  <a href="/grade"> {/* Add the "Grade" link */}
                    <i className="fa fa-book fa-lg"></i> Grade
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
        <div className="uploaded">
          <h4>PDF's:</h4>
          <div className="output-div">
            {uniqueTitles.length > 0 ? (
              uniqueTitles.map((title, index) => (
                <div className="inner-div" key={index}>
                  <h6>Title: {title}</h6>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleShowPdf(title)}
                    >
                      Show Pdfs
                    </button>
                    &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => deletePdf(title)}
                  >
                    Delete
                  </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No PDFs available.</p>
            )}
          </div>
        </div>
        <PdfComp1 pdfs={pdfs.filter((pdf) => pdf.title.toLowerCase() === selectedTitle?.toLowerCase())}/>
      </div>
      {showNoAlerts && (
        <div className="notification-bar">
          <p>No alerts</p>
        </div>
      )}
    </>
  );
} 