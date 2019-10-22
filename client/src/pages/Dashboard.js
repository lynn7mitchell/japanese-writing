import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Dashboard extends Component {
  render() {
    const style = {
      main: {
        textAlign: "center",
        marginTop: "25vh"
      }
    };
    return (
      <div style={style.main}>
      <i className="material-icons account-icon">account_circle</i>
        <h1>Choose A Writing System</h1>
        <div className="container">
          <div className="row">
          <Link to={{
                  pathname: '/language-dashboard',
                  state: {
                    language: "katakana"
                  }
                }}>
              <div className="col s6">
                <h1>ア</h1>
                <h2>Katakana</h2>
              </div>
            </Link>
            <Link to={{
                  pathname: '/language-dashboard',
                  state: {
                    language: "hiragana"
                  }
                }}>
              <div className="col s6">
                <h1>あ</h1>
                <h2>Hiragana</h2>
              </div>
            </Link>
            {/* <Link to="/kanji-dashboard">
              <div className="col s4">
                <h1>訪</h1>
                <h2>Kanji</h2>
              </div>
            </Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
