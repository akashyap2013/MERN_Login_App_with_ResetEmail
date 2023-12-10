import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfComp1(props) {
  const [numPages, setNumPages] = useState();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div >
      <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                key={page} 
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            );
          })}
      </Document>
   
    </div>
  );
}

export default PdfComp1;