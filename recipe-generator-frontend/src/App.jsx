import React, { useState } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';
import AskQuestion from './components/AskQuestion';
import './App.css'; // Import your global styles
// import.meta.env.VITE_BACKEND_URL


function App() {
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [showQuestionArea, setShowQuestionArea] = useState(false);

  const handleGenerateRecipe = async (formData) => {
    try {
      setGeneratedRecipe("loading");
      console.log(formData);
      // const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/generate`, {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipes/generate`, { 

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.text();
      
      setGeneratedRecipe(data);
     
      setShowQuestionArea(false); // Reset question area on new recipe
    } catch (error) {
      console.error('Error generating recipe:', error);
      setGeneratedRecipe('Error generating recipe.');
    }
  };

  const handleAskQuestionClick = () => {
    setShowQuestionArea(true);
  };

  return (
    <div className="app-container">
      <div className='sideleft'><RecipeForm onGenerate={handleGenerateRecipe} /></div>
      <div>
      
      <RecipeDisplay recipe={generatedRecipe} onAskQuestionClick={handleAskQuestionClick} />
  
      {generatedRecipe && showQuestionArea && <AskQuestion recipe={generatedRecipe} />}
      </div>
    </div>
  );
}

export default App;