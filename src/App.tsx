import React, { useEffect, useState } from "react";
import "./App.css";
import { questions } from "./components/gamePages/data";
import { QuestionsPage } from "./components/gamePages/questionsPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomePage } from "./components/gamePages/homePage";
import { SignUp } from "./components/authPages/Register";
import { ResetPasswordPage } from "./components/authPages/resetPasswordPage";
import { LoginPage } from "./components/authPages/loginPage";
import { Posts } from "./components/gamePages/posts";
import { NavBar } from "./components/navBar/navBar";
import { GreyPage } from "./components/navBar/greyPage";
import { LeftBar } from "./components/navBar/leftBar";
import { Footer } from "./components/navBar/footer";
import { ProfilePage } from "./components/gamePages/profilePage";

function App() {
  const [isEditedClass, setIsEditedClass] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    updateDimensions();
  });

  const updateDimensions = () => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsEditedClass(false);
    }
  };
  window.addEventListener("resize", updateDimensions);
  return (
    <>
      <Router>
        <NavBar
          isMobile={isMobile}
          setIsMobile={setIsMobile}
          isEditedClass={isEditedClass}
          setIsEditedClass={setIsEditedClass}
        />
        <GreyPage
          isEditedClass={isEditedClass}
          setIsEditedClass={setIsEditedClass}
        />
        <LeftBar
          isEditedClass={isEditedClass}
          setIsEditedClass={setIsEditedClass}
        />
        {/* //SignUp */}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          {/* Login and register Pages */}
          <Route exact path="/register">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          {/* game and profile Pages */}
          <Route exact path="/game/:questionsfield">
            <QuestionsPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/posts">
            <Posts />
          </Route>
          <Route exact path="/reset">
            <ResetPasswordPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
