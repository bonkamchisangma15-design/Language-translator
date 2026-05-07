import React, { useState } from 'react';
import './index.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [sourceLang, setSourceLang] = useState('grt');
  const [targetLang, setTargetLang] = useState('en');
  const [translatedText, setTranslatedText] = useState('');

  const languages = [
    { code: 'grt', name: 'Garo' },
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    try {
      const response = await fetch('/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          from: sourceLang,
          to: targetLang,
        }),
      });
      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error translating text.');
    }
  };

  return (
    <div className="app">
      <h1>Language Translator</h1>
      <div className="translator">
        <div className="input-section">
          <label>Source Language:</label>
          <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate"
          />
        </div>
        <div className="output-section">
          <label>Target Language:</label>
          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <textarea
            value={translatedText}
            readOnly
            placeholder="Translation will appear here"
          />
        </div>
      </div>
      <button onClick={handleTranslate}>Translate</button>
    </div>
  );
}

export default App;