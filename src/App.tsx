import React, { useState } from "react";
import "./App.css";
import { questions } from "./components/data";
import { QuestionsPage } from "./components/questionsPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomePage } from "./components/homePage";
import { SignUp } from "./components/authPages/Register";
import { LoginPage } from "./components/authPages/loginPage";
import { Posts } from "./components/posts";

function App() {
  return (
    <>
      <Router>
        {/* //SignUp */}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          {/* LoginPage */}
          <Route exact path="/register">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/game">
            <QuestionsPage />
          </Route>
          <Route exact path="/posts">
            <Posts />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
