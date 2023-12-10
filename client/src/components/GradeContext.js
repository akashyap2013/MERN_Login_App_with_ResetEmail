import React, { createContext, useContext, useState } from 'react';

const GradeContext = createContext();

export const GradeProvider = ({ children }) => {
  const [gradeData, setGradeData] = useState([]);
  console.log(gradeData)

  const addGradeData = (data) => {
    console.log('Adding data to context:', data);
    setGradeData((prevData) => [...prevData, data]);
  };

  return (
    <GradeContext.Provider value={{ gradeData, addGradeData }}>
      {children}
    </GradeContext.Provider>
  );
};

export const useGradeContext = () => {
  return useContext(GradeContext);
};
