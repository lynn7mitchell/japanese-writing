import React, { Component } from "react";
import { Link } from "react-router-dom";
import setAuthToken from "../utils/setAuthtoken";
import axios from "axios";

export class Dashboard extends Component {
  state = {
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
        {/* <i className="material-icons account-icon">account_circle</i> */}
        <Link to="/">
          <button className="logout-button" onClick={this.handleLogout}>
            Log Out
          </button>
        </Link>
        <h1>Choose A Writing System</h1>
        <div className="container">
          <div className="row">
            <Link
              to={{
                pathname: "/language-dashboard",
                state: {
                  language: "katakana"
                }
              }}
            >
              <div className="col s6">
                <h1>ア</h1>
                <h2>Katakana</h2>
              </div>
            </Link>
            <Link
              to={{
                pathname: "/language-dashboard",
                state: {
                  language: "hiragana"
                }
              }}
            >
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
