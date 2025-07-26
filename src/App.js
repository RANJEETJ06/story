import React, { useState } from "react";
import './App.css';

function App() {
  const [character, setCharacter] = useState("");
  const [setting, setSetting] = useState("");
  const [theme, setTheme] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateStory = async () => {
    if (!character || !setting || !theme) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError("");
    const url = `https://storygen-zdry.onrender.com/api/story/generate-story?character=${encodeURIComponent(character)}&setting=${encodeURIComponent(setting)}&theme=${encodeURIComponent(theme)}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setStory(data.story);
    } catch (err) {
      setStory("");
      setError("Failed to fetch story. Please try again later.");
    }
    setLoading(false);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>AI Story Generator</h1>
          <div className="input-group">
            <input
              type="text"
              placeholder="Main Character (e.g., Alex)"
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
            />
            <input
              type="text"
              placeholder="Setting (e.g., a magical forest)"
              value={setting}
              onChange={(e) => setSetting(e.target.value)}
            />
            <input
              type="text"
              placeholder="Theme (e.g., adventure)"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={generateStory} disabled={loading}>
            {loading ? "Generating..." : "Generate Story"}
          </button>
          <div className="result">
            {story && <p>{story}</p>}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
