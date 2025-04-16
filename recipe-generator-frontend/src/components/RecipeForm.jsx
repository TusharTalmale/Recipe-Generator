import React, { useState } from 'react';
import '../css/RecipeForm.css';


function RecipeForm({ onGenerate }) {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [idealTime, setIdealTime] = useState('');
  const [healthy, setHealthy] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [preferences, setPreferences] = useState('');
  const [servings, setServings] = useState('');
  const [eatWith, setEatWith] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddIngredient = () => {
    if (currentIngredient.trim() && editingIndex === null) {
      setIngredientsList([...ingredientsList, currentIngredient.trim()]);
      setCurrentIngredient('');
    } else if (currentIngredient.trim() && editingIndex !== null) {
      const updatedList = [...ingredientsList];
      updatedList[editingIndex] = currentIngredient.trim();
      setIngredientsList(updatedList);
      setCurrentIngredient('');
      setEditingIndex(null);
      setEditText('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredientsList = ingredientsList.filter((_, i) => i !== index);
    setIngredientsList(newIngredientsList);
  };

  const handleEditIngredient = (index, ingredient) => {
    setEditingIndex(index);
    setCurrentIngredient(ingredient);
    setEditText(ingredient);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      ingredients: ingredientsList, // Now ingredients is an array
      idealTime,
      healthy,
      instructions,
      preferences,
      servings: parseInt(servings),
      eatWith,
    };
    onGenerate(formData);
  };

  const handleInputChange = (event) => {
    setCurrentIngredient(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && currentIngredient.trim()) {
      handleAddIngredient();
    }
  };

  return (
    <aside className="sidebar">
      <h2>Generate Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currentIngredient">Ingredients:</label>
          <input
            type="text"
            id="currentIngredient"
            value={currentIngredient}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter ingredient and press Enter"
          />
          <button className="addingrediant" type="button" onClick={handleAddIngredient}>
            {editingIndex !== null ? 'Update Ingredient' : 'Add Ingredient'}
          </button>
        </div>

        {ingredientsList.length > 0 && (
          <div>
            <h3>Ingredients List:</h3>
            <ul>
              {ingredientsList.map((ingredient, index) => (
                <li key={index}>
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={currentIngredient}
                        onChange={handleInputChange}
                      />
                      <button type="button" onClick={handleAddIngredient}>
                        Update
                      </button>
                      <button type="button" onClick={() => { setEditingIndex(null); setCurrentIngredient(''); }}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {ingredient}
                      <button type="button" onClick={() => handleRemoveIngredient(index)}>
                        Remove
                      </button>
                      <button type="button" onClick={() => handleEditIngredient(index, ingredient)}>
                        Edit
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Add other input fields similarly for idealTime, healthy, instructions, preferences, servings, eatWith */}
        <div>
          <label htmlFor="idealTime">Ideal Time:</label>
          <input type="text" id="idealTime" value={idealTime} onChange={(e) => setIdealTime(e.target.value)} />
        </div>
        <div>
          <label htmlFor="healthy">Healthy:</label>
          <input type="checkbox" id="healthy" checked={healthy} onChange={(e) => setHealthy(e.target.checked)} />
        </div>
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea id="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        </div>
        <div>
          <label htmlFor="preferences">Preferences:</label>
          <input type="text" id="preferences" value={preferences} onChange={(e) => setPreferences(e.target.value)} />
        </div>
        <div>
          <label htmlFor="servings">Servings:</label>
          <input type="number" id="servings" value={servings} onChange={(e) => setServings(e.target.value)} />
        </div>
        <div>
          <label htmlFor="eatWith">Eat With:</label>
          <input type="text" id="eatWith" value={eatWith} onChange={(e) => setEatWith(e.target.value)} />
        </div>

        <button type="submit" >Generate Recipe</button>
      </form>
    </aside>
  );
}

export default RecipeForm;