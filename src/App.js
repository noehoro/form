import React from "react";
import "./App.css";

// import Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


// import Pages
import Home from "./Pages/Home";
import ResultsTable from "./Pages/ResultsTable";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/results" component={ResultsTable} />
        </Switch>
      </Router>
  );
}

export default App;
