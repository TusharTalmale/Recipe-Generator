import React, { useState, useEffect } from 'react';

function AskQuestion({ recipe }) {
  const [questionVisible, setQuestionVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Show question input box immediately when component mounts
  useEffect(() => {
    setQuestionVisible(true);
  }, []);


    const handleQuestionSubmit = async () => {
      // Make API call to your backend's /api/recipes/ask endpoint
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/ask`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recipe, question }),
        });
        const data = await response.text(); // Assuming the answer is plain text
        setAnswer(data);
      } catch (error) {
        console.error('Error asking question:', error);
        setAnswer('Error fetching answer.');
      }
    };
  
    return (
      <div className="ask-question-container">
      
        {questionVisible && (
          <div className="question-area">
            <label htmlFor="questionInput">Your Question:</label>
            <textarea
              id="questionInput"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleQuestionSubmit}>Ask</button>
            {answer && <div className="answer-display"><h3>Answer:</h3><p>{answer}</p></div>}
          </div>
        )}
      </div>
    );
  }
  
  export default AskQuestion;