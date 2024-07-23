import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '../features/answerSlice';

function Question() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const answer = useSelector((state) => state.answer.answer);

  const handleChange = (event) => {
    const newQuestion = event.target.value;
    setQuestion(newQuestion);
    
    // Clear answer if the textarea is empty
    if (newQuestion.trim() === '') {
      dispatch(setAnswer(''));
    }
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      const document_id = "29e1d216-8a32-4bd7-a9f2-9c7f4c04122f";
      const response = await fetch(`http://94.252.99.129:50024/api/v1/document/get_answer/${document_id}?question=${question}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXZpZEBmdW5kcmlzcS5jb20iLCJzY29wZXMiOlsic3VwZXJhZG1pbiJdLCJleHAiOjE3MjIzNjQ5NTd9.1pT1fBYeQCs_JodnNe3FKMoIvA5mECMhREfprVrvvz8`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseJson = await response.json();
        const dataString = responseJson.data;
        const dataObject = JSON.parse(dataString);
        dispatch(setAnswer(dataObject.answer));
        
      } else {
        console.error('Failed to fetch answer, status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="querry-div w-[450px] flex flex-col items-center justify-between m-[10px]">
      <div className="ans-div bg-blue-800 text-[white] w-[450px]">
        <p>
          {loading ? 'Loading...' : (answer ? answer : 'Answer will be displayed here')}
        </p>
      </div>
      <div className="que-div bg-black text-[white]">
        <div className="flex flex-col justify-between">
          <p className="font-semibold text-left pb-[10px]">Your question :-</p>
          <textarea
            id="question"
            name="question"
            rows="2"
            cols="44"
            className="p-[5px] text-black rounded-[4px]"
            value={question}
            onChange={handleChange}
          />
          <button className="mt-[10px]" onClick={handleSearch} disabled={loading}>
            Search
          </button>
        </div>
        <div className="pt-[10px]">
          <p className="text-left">Was this helpful? <span className="font-semibold">Yes</span> / <span className="font-semibold">No</span></p>
        </div>
      </div>
    </div>
  );
}

export default Question;
