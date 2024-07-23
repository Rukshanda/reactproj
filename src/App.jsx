import React, { useState } from "react";
import { PDFHighlight } from "@pdf-highlight/react-pdf-highlight";
import Pdf from "./Components/Pdf";
import QuestionAns from "./Components/QuestionAns";

function App() {


  return (
    <div className="container p-[10px] w-full">
      <div className="sub-container flex flex-row justify-between">
     <Pdf/>

     <QuestionAns/>
      </div>
    </div>
  );
}

export default App;
