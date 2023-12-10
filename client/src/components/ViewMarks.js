import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

const ViewMarks = () => {
  const [courseCodes, setCourseCodes] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [registerNo, setRegisterNumber] = useState();

  function getUsername() {
    const token = localStorage.getItem('token');
    if (!token) {
      return Promise.reject("Cannot find Token");
    }
    const decode = jwt_decode(token);
    return decode.username;
  }

  useEffect(() => {
    const fetchCourseCodes = async () => {
      try {
        const username = await getUsername();
        const response = await axios.get(`${serverDomain}/api/user/${username}`);
        const userData = response.data;
        const userCourseCodes = userData.courseCodes || [];
        const registerNo = userData.registerNo;
        setCourseCodes(userCourseCodes);
        setRegisterNumber(registerNo)

        // Fetch publish data only if it hasn't been fetched before
        if (!dataFetched) {
          await fetchPublishData(registerNo);
          setDataFetched(true);
        }
      } catch (error) {
        console.error('Error fetching course codes:', error);
      }
    };

    const fetchPublishData = async (registerNoToCheck) => {
      try {
        const response = await axios.get(`api/getPublishData`);
        console.log("response : ", response);
        const fetchedDataArray = response.data.data;
        console.log("fetched data :", fetchedDataArray);
  
        // Find all data entries for the specific registerNo
        const userDataArray = fetchedDataArray.filter(data => data.registerNumber === registerNoToCheck);
  
        // Loop through each entry and update marksData
        userDataArray.forEach(userData => {
          const courseCode = userData.CourseCode;
          console.log("courseCode : ", courseCode);
  
          const marks = userData.finalTotal;
          console.log("marks : ", marks);
  
          // Update marksData with the marks for the corresponding courseCode
          setMarksData(prevData => ({
            ...prevData,
            [courseCode]: marks,
          }));
        });
      } catch (error) {
        console.error('Error fetching published data:', error);
      }
    };

    fetchCourseCodes();

  }, [courseCodes, dataFetched]);

  // Use useEffect to update marksData after asynchronous operations
  useEffect(() => {
    console.log("Updated marksData:", marksData);
  }, [marksData]);

  return (
    <div>
      <div className="grade-container">
        <table className="grade-table">
          <thead>
            <tr>
              <th>Student ID</th>
              {courseCodes.map((courseCode, index) => (
                <th key={index}>{courseCode}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{registerNo}</td>
              {courseCodes.map((courseCode, index) => (
                <td key={index}>
                  {marksData[courseCode] || ''}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewMarks;
