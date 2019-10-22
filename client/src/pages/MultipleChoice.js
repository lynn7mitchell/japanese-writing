import React, { Component } from "react";
import { Link } from "react-router-dom";

export class MultipleChoice extends Component {
  state = {
    language: this.props.history.location.state.language,
    languageArray: [],
    answer: {},
    choices: [],
    listedAnswers: []
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
            pathname: "language-dashboard",
            state: { language: this.state.language }
          }}
        >
          <i className="material-icons back-button">arrow_back</i>
        </Link>

        <h1>Multiple Choice</h1>
        <div className="container">
          <div className="row">
            <Link
              to={{
                pathname: "/multiple-choice-roumaji",
                state: {
                  language: this.state.language
                }
              }}
            >
              <div className="col s6">
                <h2>Roumaji</h2>
              </div>
            </Link>
            <Link
              to={{
                pathname: "/multiple-choice-kana",
                state: {
                  language: this.state.language
                }
              }}
            >
              <div className="col s6">
                <h2>Kana</h2>
              </div>
            </Link>
            {/* <Link to="">
              <div className="col s4">
                <h2>Both</h2>
              </div>
            </Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default MultipleChoice;
