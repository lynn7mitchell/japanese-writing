import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home"

export class App extends Component {
  render() {
    return (
      <div>
        
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/home" component={Home}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact component={NoMatch} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
