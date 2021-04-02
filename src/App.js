import React, { useState } from "react";
import { Route, Switch } from "react-router";

// FIREBASE
import firebase from "firebase";
import firebaseConfig from "./utils/firebaseConfig";

// COMPONENTS
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Login from "./components/pages/Auth/Login/Login";
import Signup from "./components/pages/Auth/Signup/Signup";
import Homepage from "./components/pages/HomePage/HomePage";
import DashBoard from "./components/pages/DashBoard/DashBoard";

// STYLES
import "./styles/css/styles.css";
import Prices from "./components/pages/Prices/Prices";
import AboutMetals from "./components/pages/AboutMetals/AboutMetals";
import PageNotFound from "./components/pages/PageNotFound/PageNotFound";

function App() {
  return (
    <div className="App">
      <div className="main-wrapper">
        <Nav />
        <div className="pages">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/about" component={Homepage} />
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/gold" component={AboutMetals} />
            <Route exact path="/" component={Homepage} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
