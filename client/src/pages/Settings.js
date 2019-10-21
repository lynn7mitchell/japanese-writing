import React, { Component } from "react";
import { Link } from "react-router-dom"

export class Settings extends Component {
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

        <h1>Account Settings</h1>
        <div className="container">
          <div className="row">
            <div className="col s4 container-outline"></div>
            <div className="col s4 container-outline"></div>
            <div className="col s4 container-outline"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
