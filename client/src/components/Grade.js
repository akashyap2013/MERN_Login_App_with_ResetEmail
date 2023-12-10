import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Grade = () => {
  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/getData');
        const fetchedDataObject = response.data.data;
        
        // Convert the object into an array
        const fetchedDataArray = Object.keys(fetchedDataObject).map(key => fetchedDataObject[key]);

        console.log("fetch data:  ", fetchedDataArray);
        setGradeData(fetchedDataArray);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    fetchData();
  }, []); 

  const handleDelete = async (index) => {
    try {
      // Get the data for the row to be deleted
      const dataToDelete = gradeData[index];
  
      // Make a DELETE request to the server to delete the data
      await axios.delete(`api/deleteData`, { data: dataToDelete });
  
      // Update local state to remove the row with the given index
      setGradeData((prevData) => prevData.filter((_, i) => i !== index));
  
      // Log a message indicating the row is deleted
      console.log('Deleting row with index:', index);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handlePublish = async () => {
    try {

      console.log('Before sending data:', gradeData);
      // Make a POST request to the server to publish the data
      await axios.post(`/api/publishData`, { data: gradeData });
  
      // Log a message indicating the data is published
      console.log('Data published successfully!');
    } catch (error) {
      console.error('Error publishing data:', error);
    }
    console.log('After sending data:', gradeData);
  };
  
  
  return (
    <div className="grade-container">
      <table className="grade-table">
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Register No</th>
            <th>Course Code</th>
            <th>Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(gradeData) &&
            gradeData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.registerNumber}</td>
                <td>{row.CourseCode}</td>
                <td>{row.finalTotal}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Clear</button>
                </td>
              </tr>
            ))}
        </tbody>
        <button  className="publish-button" onClick={handlePublish}>Publish</button>
      </table>
    </div>
  );
};

export default Grade;
