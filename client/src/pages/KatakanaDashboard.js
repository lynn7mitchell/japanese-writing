import React, { Component } from "react";
import { Link } from "react-router-dom";


export class KatakanaDashboard extends Component {
  render() {
    const style = {
      main: {
        textAlign: "center",
        marginTop: "25vh"
      }
    };
    return (
      <div style={style.main}>
        <h1>Choose A Study Mode</h1>
        <div className="container">
          <div className="row">
            <Link to="/katakana-dashboard">
              <div className="col s4">
                <h1>ア</h1>
                <h2>Study Chart</h2>
              </div>
            </Link>
            <Link to="/hiragana-dashboard">
              <div className="col s4">
                <h1>あ</h1>
                <h2>Multiple Choice</h2>
              </div>
            </Link>
            <Link to="/kanji-dashboard">
              <div className="col s4">
                <h1>訪</h1>
                <h2>Fill in The Blank</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default KatakanaDashboard;
