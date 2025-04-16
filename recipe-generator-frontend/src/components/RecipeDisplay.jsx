import React from 'react';
import '../css/RecipyDisplay.css';

function RecipeDisplay({ recipe, onAskQuestionClick }) {
  if (!recipe) {
    return <p className="no-recipe-msg">No recipe generated yet.</p>;
  }
  if (recipe == "loading") {
    return <p className="no-recipe-msg"> Recipe Loading wait . server is taking time.</p>;
  }

  
  

  // Utility: render text with **bold** support
  const renderWithBold = (text) => {
    const regex = /\*\*(.+?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, boldText] = match;
      parts.push(text.slice(lastIndex, match.index));
      parts.push(<strong key={match.index}>{boldText}</strong>);
      lastIndex = match.index + fullMatch.length;
    }

    parts.push(text.slice(lastIndex));
    return parts;
  };

  // Parse lines
  const lines = recipe.split('\n').map(line => line.trim()).filter(Boolean);

  let title = '';
  let meta = [];
  let sections = {};
  let currentSection = 'Description';

  lines.forEach(line => {
    if (line.toLowerCase().startsWith("okay") || line.toLowerCase().includes("here's a recipe for")) {
      title = line.replace(/Okay.*recipe for/i, '').replace(/[\*\*\.]/g, '').trim();
      return;
    }

    const sectionMatch = line.match(/^\*\*(.+?)\*\*:?$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim();
      if (!sections[currentSection]) {
        sections[currentSection] = [];
      }
      return;
    }

    if (line.toLowerCase().includes('prep time') || line.toLowerCase().includes('cook time') || line.toLowerCase().includes('yields')) {
      meta.push(line);
      return;
    }

    if (!sections[currentSection]) {
      sections[currentSection] = [];
    }
    sections[currentSection].push(line);
  });

  const renderList = (items, ordered = false) => {
    if (!items.length) return null;
    return ordered ? (
      <ol>
        {items.map((item, i) => (
          <li key={i}>{renderWithBold(item.replace(/^\*+/, '').trim())}</li>
        ))}
      </ol>
    ) : (
      <ul>
        {items.map((item, i) => (
          <li key={i}>{renderWithBold(item.replace(/^\*+/, '').trim())}</li>
        ))}
      </ul>
    );
  };

  return (
    <main className="recipe-container">
      <section className="recipe-box">
        <h2 className="title">🍽️ {title}</h2>
        {meta.length > 0 && (
          <div className="meta">
            {meta.map((line, i) => <p key={i}>{renderWithBold(line)}</p>)}
          </div>
        )}

        {Object.entries(sections).map(([sectionTitle, content]) => (
          <div key={sectionTitle} className="section">
            <h3>{sectionTitle}</h3>
            {sectionTitle.toLowerCase().includes('instruction') || sectionTitle.toLowerCase().includes('upgrade')
              ? renderList(content, true)
              : renderList(content)}
          </div>
        ))}

        <div className="ask-btn-wrapper">
          <button className="ask-btn" onClick={onAskQuestionClick}>
            ❓ Ask a Question
          </button>
        </div>
      </section>
    </main>
  );
}

export default RecipeDisplay;
