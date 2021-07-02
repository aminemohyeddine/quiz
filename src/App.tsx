import React, { useState } from "react";
import "./App.css";
import { questions } from "./components/data";
import { QuestionsPage } from "./components/questionsPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomePage } from "./components/homePage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/game">
            <QuestionsPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
