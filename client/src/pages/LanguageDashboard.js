import React, { Component } from "react";
import { Link } from "react-router-dom";
import setAuthToken from "../utils/setAuthtoken";
import axios from "axios";

export class LanguageDashboard extends Component {
  state = {
    language: this.props.history.location.state.language,
    user:{}
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
