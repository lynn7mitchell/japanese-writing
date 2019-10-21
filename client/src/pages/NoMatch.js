import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NoMatch extends Component {
  render() {
    return (
      <div>
        <Link
          to={{
            pathname: "home",
          }}
        >
          <i className="material-icons back-button">arrow_back</i>
        </Link>

        <h1>404 Page Not Found</h1>
      </div>
    );
  }
}

export default NoMatch;
