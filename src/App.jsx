import React, { useCallback, useEffect, useState } from 'react';
import './index.css';
import translateText, { detectLanguage } from './translator.js';

function App() {
  const [inputText, setInputText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('grt');
  const [translatedText, setTranslatedText] = useState('');
  const [detectedLang, setDetectedLang] = useState('auto');

  const languages = [
    { code: 'auto', name: 'Auto Detect' },
    { code: 'grt', name: 'Garo' },
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
  ];

  const examples = [
    { label: 'How are you?', text: 'how are you' },
    { label: 'I am fine', text: 'i am fine' },
    { label: 'What is your name?', text: 'what is your name' },
    { label: 'She came by bus yesterday', text: 'she came by bus yesterday' },
    { label: 'Will you come with me?', text: 'will you come with me' },
    { label: 'Where did you sleep?', text: 'where did you sleep' },
    { label: 'क्या आप मुझसे प्यार करते हैं', text: 'क्या आप मुझसे प्यार करते हैं' },
  ];

  const languageName = (code) => {
    const lang = languages.find((item) => item.code === code);
    return lang ? lang.name : 'Unknown';
  };

  const handleTranslate = useCallback(() => {
    const text = inputText || '';
    if (!text.trim()) {
      setTranslatedText('');
      setDetectedLang('auto');
      return;
    }

    const source = sourceLang === 'auto' ? detectLanguage(text) : sourceLang;
    setDetectedLang(source);
    setTranslatedText(translateText(text, source, targetLang));
  }, [inputText, sourceLang, targetLang]);

  useEffect(() => {
    handleTranslate();
  }, [handleTranslate]);

  return (
    <div className="app">
      <h1>Garo Language Translator</h1>
      <p className="subtitle">
        Translate phrases and sentences between Garo, English, and Hindi instantly.
      </p>

      <div className="translator">
        <div className="input-section">
          <label htmlFor="source-language">Source Language:</label>
          <select
            id="source-language"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a sentence in English, Hindi, or Garo"
          />

          <div className="status">
            Detected language: <strong>{languageName(detectedLang)}</strong>
          </div>
        </div>

        <div className="output-section">
          <label htmlFor="target-language">Target Language:</label>
          <select
            id="target-language"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languages.filter((lang) => lang.code !== 'auto').map((lang) => (
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

      <div className="examples">
        <h2>Quick examples</h2>
        <div className="example-buttons">
          {examples.map((example) => (
            <button
              key={example.text}
              type="button"
              className="example-button"
              onClick={() => {
                setSourceLang('auto');
                setInputText(example.text);
              }}
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <p className="help-text">
        This local translator uses an expanding Garo dictionary and sentence engine. Add new phrases in the library to grow the app.
      </p>
    </div>
  );
}

export default App;
