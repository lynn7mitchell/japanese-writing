import React, { Component } from "react";
import { Link } from "react-router-dom";
import setAuthToken from "../utils/setAuthtoken";
import axios from "axios";

export class MultipleChoice extends Component {
  state = {
    language: this.props.history.location.state.language,
    languageArray: [],
    answer: {},
    choices: [],
    listedAnswers: [],
    user: {}
  };

  componentWillMount() {
    const token = localStorage.getItem("example-app");

    if (token) {
      setAuthToken(token);
    }

    axios
      .get("api/user")
      .then(response => {
        console.log(response.data);
        this.setState({
          user: response.data
        });
      })
      .catch(err => console.log(err.response));
  }
  handleLogout = () => {
    localStorage.removeItem("example-app");
    this.setState({
      redirect: true
    });
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
        <Link to="/">
          <button className="logout-button" onClick={this.handleLogout}>
            Log Out
          </button>
        </Link>
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
                <p>Shown english letters and you guess the kana ("symbol")</p>
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
                <p>Shown kana ("symbol") and you guess the english letters</p>
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
