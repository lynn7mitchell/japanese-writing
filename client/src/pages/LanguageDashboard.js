import React, { Component } from "react";
import { Link } from "react-router-dom";

export class LanguageDashboard extends Component {
  state = {
    language: this.props.history.location.state.language
  };
  render() {
    const style = {
      main: {
        textAlign: "center",
        marginTop: "25vh"
      }
    };
    return (
      <div style={style.main}>
        <Link
          to={{
            pathname: "dashboard",
          }}
        >
          <i className="material-icons back-button">arrow_back</i>
        </Link>

        <h1>Choose A Study Mode</h1>
        <div className="container">
          <div className="row">
            <Link to="">
              <div className="col s4">
                <h2>Study Chart</h2>
              </div>
            </Link>
            <Link
              to={{
                pathname: "/multiple-choice",
                state: {
                  language: this.state.language
                }
              }}
            >
              <div className="col s4">
                <h2>Multiple Choice</h2>
              </div>
            </Link>
            <Link
              to={{
                pathname: "/fill-in-the-blank-kana",
                state: {
                  language: this.state.language
                }
              }}
            >
              <div className="col s4">
                <h2>Fill in The Blank</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LanguageDashboard;
