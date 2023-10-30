import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/logo 2-modified.png';
import PdfComp from '../PdfComp';

const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

export default function TeacherHome() {
  const [showNoAlerts, setShowNoAlerts] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);

  const handleAlertClick = (event) => {
    event.preventDefault();
    setShowNoAlerts(true);
    setTimeout(() => setShowNoAlerts(false), 2000);
  };

  useEffect(() => {
    const apiUrl = '/api/pdfs'; // Update with your API URL

    axios
      .get(apiUrl)
      .then((response) => {
        console.log('API Response:', response.data);
        setPdfs(response.data.pdfs || []); // Make sure 'pdfs' is an array
      })
      .catch((error) => {
        console.error('Error fetching PDFs:', error);
      });
  }, []);

  const showPdf = (pdf) => {
    setPdfFile(`${serverDomain}/files/${pdf}`);
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
                  <a href="/about">
                    <i className="fa fa-info-circle fa-lg"></i> About
                  </a>
                </li>
                <li>
                  <a href="/profile">
                    <i className="fa fa-user fa-lg"></i> Profile
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
        <h1>Teacher page</h1>
        <div className="uploaded">
          <h4>PDF's:</h4>
          <div className="output-div">
            {pdfs.length > 0 ? (
              pdfs.map((data, index) => (
                <div className="inner-div" key={index}>
                  <h6>Title: {data.title}</h6>
                  <button
                    className="btn btn-primary"
                    onClick={() => showPdf(data.pdf)}
                  >
                    Show Pdf
                  </button>
                </div>
              ))
            ) : (
              <p>No PDFs available.</p>
            )}
          </div>
        </div>
        <PdfComp pdfFile={pdfFile} />
      </div>
      {showNoAlerts && (
        <div className="notification-bar">
          <p>No alerts</p>
        </div>
      )}
    </>
  );
}
