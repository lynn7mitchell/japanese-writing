import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import PrivateRoute from "./utils/PrivateRoute";

// Pages
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import StudyMode from "./pages/StudyMode";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/study-mode" component={StudyMode} />
          {/* 404 page */}
          <Route exact component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
