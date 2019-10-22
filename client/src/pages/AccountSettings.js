import React, { Component } from "react";
import { Link } from "react-router-dom";
import setAuthToken from "../utils/setAuthtoken";
import axios from "axios";

export class AccountSettings extends Component {
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
        console.log(response.data);
        this.setState({
          user: response.data
        });
      })
      .catch(err => console.log(err.response));
  }
  render() {
    const style = {
      main: {
        textAlign: "center",
        marginTop: "25vh"
      }
    };
    return (
      <div>
        <Link
          to={{
            pathname: "dashboard"
          }}
        ></Link>
        <h1  style={style.main}>Account Settings</h1>
        <div className="container">
          <div className="row">
            <div className="container-outline">
              <h4  className="center">Your Information</h4>
              <p>Name: {this.state.user.firstName} {this.state.user.lastName}</p>
              <h4>Highest Streaks:</h4>
              <pre>
                  Katakana:
                    Multiple Choice: {this.state.user.katakana.multipleChoice.highest}
                    Fill In The Blank: {this.state.user.katakana.fillInTheBlank.highest}

              </pre>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountSettings;
