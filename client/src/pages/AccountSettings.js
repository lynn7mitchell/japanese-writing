import React, { Component } from "react";
import { Link } from "react-router-dom";

export class AccountSettings extends Component {
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
            pathname: "dashboard"
          }}
        ></Link>
        <h1>Account Settings</h1>
      </div>
    );
  }
}

export default AccountSettings;
