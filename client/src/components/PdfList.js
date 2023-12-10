import React, { useEffect, useState } from 'react';

const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

const PdfList = () => {
  const [pdfFile, setPdfFile] = useState(null);
  
  window.viewPdf = async (fileName) => {
    try {
      const response = await fetch(`${serverDomain}/api/pdf?fileName=${encodeURIComponent(fileName)}`);
      const data = await response.json();
  
      // Check if the request was successful (status code 200)
      if (response.ok) {
        const pdfFileName = data.data.pdf;
        const CourseCode = data.data.CourseCode;
        console.log(CourseCode)
        // Use setPdfFile to update the state
        setPdfFile(`${serverDomain}/files/${pdfFileName}`);
  
        // Wait for a short duration to allow state update to take effect
        localStorage.setItem('pdfFile', JSON.stringify(pdfFile));
        localStorage.setItem('CourseCode', JSON.stringify(CourseCode));

        // Open a new tab and create a root for rendering
        const newTab = window.open();
        newTab.location.href = '/pdfDisplay';
   
  
      } else {
        console.error('Error fetching PDF:', response.status);
      }
    } catch (error) {
      console.error('Error viewing PDF:', error);
    }
  };
  useEffect(() => {
    // Retrieve PDF data from localStorage
    const storedPdfData = localStorage.getItem('pdfData');
    if (storedPdfData) {
      const pdfData = JSON.parse(storedPdfData);

      // Display PDF data in a table with borders
      const pdfListContainer = document.getElementById('pdf-list-container');
      if (pdfListContainer) {
        // Create a table element with border styling
        const table = document.createElement('table');
        table.className = 'pdf-table';
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';

        // Create table header with border styling
        const headerRow = table.insertRow(0);
        const fileNameHeader = document.createElement('th');
        fileNameHeader.innerHTML = '<b>File Name</b>';
        fileNameHeader.style.border = '1px solid #000';
        fileNameHeader.style.padding = '8px';
        headerRow.appendChild(fileNameHeader);

        const actionHeader = document.createElement('th');
        actionHeader.innerHTML = '<b>Action</b>';
        actionHeader.style.border = '1px solid #000';
        actionHeader.style.padding = '8px';
        headerRow.appendChild(actionHeader);

        // Create table rows with PDF data and border styling
        pdfData.forEach((pdf, index) => {
          // Create a row
          const row = table.insertRow(index + 1);

          // Add filename column with border styling
          const fileNameCell = document.createElement('td');
          fileNameCell.textContent = pdf.pdf;
          fileNameCell.style.border = '1px solid #000';
          fileNameCell.style.padding = '8px';
          row.appendChild(fileNameCell);

          // Add action column with "View PDF" button and border styling
          const actionCell = document.createElement('td');
          const viewPdfButton = document.createElement('button');
          viewPdfButton.className = 'view-pdf-button';
          viewPdfButton.textContent = 'View PDF';
          viewPdfButton.setAttribute('data-file', pdf.pdf);
          actionCell.appendChild(viewPdfButton);
          actionCell.style.border = '1px solid #000';
          actionCell.style.padding = '8px';
          row.appendChild(actionCell);

          // Add event listener for the "View PDF" button
          viewPdfButton.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent the click event on the button from triggering the row click
            const fileName = this.getAttribute('data-file');
            window.viewPdf(fileName);
          });
        });

        // Append the table to the container
        pdfListContainer.appendChild(table);
      }
    }
  }, []);

  return (
    <div id="pdf-list-container">
      {/* PDF File Names will be rendered here */}
    </div>
  );
};

export default PdfList;
