import React, { useEffect, useState } from 'react';
import PdfComp from '../PdfComp';
import ReactDOM from 'react-dom';
import axios from 'axios';

const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;


const PdfDisplay = () => {
  const [inputValues, setInputValues] = useState({});
  const [totals, setTotals] = useState({ a: 0, b: 0, c: 0 });
  const [registerNumber, setRegisterNumber] = useState('');
  const [CourseCode, setCourseCode] = useState('');
  const finalTotal = totals.a + totals.b + totals.c;
 

  const handleInputChange = (questionNumber, inputName, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`${inputName}${questionNumber}`]: Number(value) || 0,
    }));
  };

  const handleRegisterNumberChange = (e) => {
    setRegisterNumber(e.target.value);
  };

  const sendToDatabase = async () => {
    console.log('Before sending data:', { registerNumber, finalTotal, CourseCode });

    try {
      // Send data to the API endpoint
      const response = await axios.post(`${serverDomain}/api/saveData`, {
        registerNumber,
        finalTotal,
        CourseCode,
      });

      console.log('API Response:', response.data);

    } catch (error) {
      console.error('Error sending data to the API:', error);
    }
    console.log('After sending data:', { registerNumber, finalTotal, CourseCode });
  };
  

  useEffect(() => {
    // Update the totals based on all input values when inputValues changes
    setTotals((prevTotals) => ({
      a: Object.keys(inputValues)
        .filter((key) => key.startsWith('a'))
        .reduce((sum, key) => sum + inputValues[key], 0),
      b: Object.keys(inputValues)
        .filter((key) => key.startsWith('b'))
        .reduce((sum, key) => sum + inputValues[key], 0),
      c: Object.keys(inputValues)
        .filter((key) => key.startsWith('c'))
        .reduce((sum, key) => sum + inputValues[key], 0),
    }));
  }, [inputValues]);

  const createMarkingTable = () => (
    <div className="table-container">
      <table className="editable-cell">
        <thead>
          <tr>
            <th>Question</th>
            <th style={{ textAlign : 'center'}}>A</th>
            <th style={{ textAlign : 'center'}}>B</th>
            <th style={{ textAlign : 'center'}}>C</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((questionNumber) => (
            <tr key={questionNumber}>
              <td>Question {questionNumber}</td>
              <td>
                <input
                  type="text"
                  name={`a${questionNumber}`}
                  style={{ width: '80px', height: '25px', marginRight: '5px', textAlign : 'center'}}
                  onChange={(e) => handleInputChange(questionNumber, e.target.name, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name={`b${questionNumber}`}
                  style={{ width: '80px', height: '25px', marginRight: '5px', textAlign : 'center' }}
                  onChange={(e) => handleInputChange(questionNumber, e.target.name, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name={`c${questionNumber}`}
                  style={{ width: '80px', height: '25px', marginRight: '5px', textAlign : 'center' }}
                  onChange={(e) => handleInputChange(questionNumber, e.target.name, e.target.value)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td style={{ textAlign : 'center'}}>{totals.a}</td>
            <td style={{ textAlign : 'center'}}>{totals.b}</td>
            <td style={{ textAlign : 'center'}}>{totals.c}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  useEffect(() => {
    try {
      const storedPdfFile = localStorage.getItem('pdfFile');
      const storedCourseCode = localStorage.getItem('CourseCode');
      console.log(storedCourseCode)
  
      if (storedPdfFile) {
        const pdfFile = JSON.parse(storedPdfFile);
        const cleanedCourseCode = storedCourseCode.replace(/["']/g, '');
        console.log(cleanedCourseCode)
        setCourseCode(cleanedCourseCode);
        renderPdf(pdfFile);
      }
    } catch (error) {
      console.error('Error reading or parsing PDF file:', error);
    }
  }, []);


  const renderPdf = (pdfFile) => {
    const pdfCompElement = <PdfComp pdfFile={pdfFile} />;
    const pdfDisplayContainer = document.getElementById('pdf-display-container');

    if (pdfDisplayContainer) {
      ReactDOM.render(
        <div>
          {pdfCompElement}
        </div>,
        pdfDisplayContainer
      );
    }
  };

  return (
    <>
      <div>
        <label htmlFor="registerNumber">Register Number:</label>
        <input
          type="text"
          id="registerNumber"
          value={registerNumber}
          onChange={handleRegisterNumberChange}
        />
      </div>
      <div id="pdf-display-container">
        {/* PDF content will be rendered here */}
      </div>
      {createMarkingTable()}
      <table>
        <tbody>
          <tr>
            <td className="finalTotalLabelStyle">Final Total:</td>
            <td className="finalTotalValueStyle">{finalTotal}</td>
          </tr>
        </tbody>
      </table>
      <button  className="send-marks-btn" onClick={sendToDatabase}>Send</button>
    </>
  );  
};

export default PdfDisplay;
