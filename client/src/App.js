import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

import Home from "./pages/Home";
import LanguageDashboard from "./pages/LanguageDashboard"
import MultipleChoice from "./pages/MultipleChoice";
import MultipleChoiceKana from "./pages/MultipleChoiceKana";
import MultipleChoiceRoumaji from "./pages/MultipleChoiceRoumaji";
import FillInTheBlankKana from "./pages/FillInTheBlankKana";
import AccountSettings from "./pages/AccountSettings";

export class App extends Component {
  render() {
    return (
      <div>
        
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/language-dashboard" component={LanguageDashboard} />
            <PrivateRoute exact path="/multiple-choice" component={MultipleChoice} />
            <PrivateRoute exact path="/multiple-choice-kana" component={MultipleChoiceKana} />
            <PrivateRoute exact path="/multiple-choice-roumaji" component={MultipleChoiceRoumaji} />
            <PrivateRoute exact path="/fill-in-the-blank-kana" component={FillInTheBlankKana} />
            <PrivateRoute exact path="/account-settings" component={AccountSettings} />
            <Route exact component={NoMatch} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
