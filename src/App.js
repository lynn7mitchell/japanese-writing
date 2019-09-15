import React from 'react';
import katakana from './katakana.json'

import './App.css';

function App() {
  return (
    <div className="App">
      {katakana.map(kana=>{

        return (<div><div>{kana.kana}</div>
                <div>{kana.roumaji}</div></div>)
      })}
      

    </div>
  );
}

export default App;
