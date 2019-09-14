import React from 'react';
import katakana from './katakana.json'

import './App.css';

function App() {
  return (
    <div className="App">
      {katakana[0].kana}
    </div>
  );
}

export default App;
