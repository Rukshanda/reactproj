import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PDFHighlight } from "@pdf-highlight/react-pdf-highlight";

function Pdf() {
  const [pdfData, setPdfData] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const answer = useSelector((state) => state.answer.answer); // Get answer from Redux store

  // Log the answer whenever it changes
  // This code is for testing --- the answer is stored in the store 
  // if the answer is in the pdf it would highlight it
  useEffect(() => {
    console.log('Current answer:', answer);
  }, [answer]);

  const handleHighlight = (highlight) => {
    console.log("New highlight:", highlight);
    setHighlights((prevHighlights) => [...prevHighlights, highlight]);
  };

  const onLoaded = () => {
    console.log("PDF Loaded");
  };

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const document_id = "29e1d216-8a32-4bd7-a9f2-9c7f4c04122f";
        const response = await fetch(
          `http://94.252.99.129:50024/api/v1/document/get_doc/${document_id}`,
          {
            headers: {
              "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXZpZEBmdW5kcmlzcS5jb20iLCJzY29wZXMiOlsic3VwZXJhZG1pbiJdLCJleHAiOjE3MjIzNjQ5NTd9.1pT1fBYeQCs_JodnNe3FKMoIvA5mECMhREfprVrvvz8`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfData(pdfUrl);
        console.log("PDF fetched and URL created");
        
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
  }, []);

  return (
    <div className="pdf-div h-[500px] overflow-auto w-[750px]">
      {pdfData && (
        <PDFHighlight
          onStartLoad={() => console.log("Start loading PDF")}
          onLoaded={onLoaded}
          keywords={[answer]} 
          url={pdfData}
          onHighlight={handleHighlight}
          highlights={highlights}
          colorHighlight="red"
          debug={true}
        />
      )}
    </div>
  );
}

export default Pdf;
