import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";

// COMPONENTS
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Login from "./components/pages/Auth/Login/Login";
import Signup from "./components/pages/Auth/Signup/Signup";
import Homepage from "./components/pages/HomePage/HomePage";
import DashBoard from "./components/pages/DashBoard/DashBoard";
import AboutMetals from "./components/pages/AboutMetals/AboutMetals";
import PageNotFound from "./components/pages/PageNotFound/PageNotFound";

// STYLES
import "./styles/css/styles.css";
import ResetPassword from "./components/pages/Auth/ResetPassword/ResetPassword";
import Prices from "./components/pages/Prices/Prices";

function App() {
  const [authenticated, setauthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authTokenRPM")) {
      setauthenticated(true);
    }
  }, [setauthenticated]);

  const onLoginHandler = () => {
    setauthenticated(!authenticated);
  };

  return (
    <div className="App">
      <div className="main-wrapper">
        <Nav auth={authenticated} />
        <div className="pages">
          <Switch>
            {/* <Route path="/profile" component={Profile} /> */}
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/login">
              <Login setAuth={onLoginHandler} />
            </Route>
            <Route path="/signup">
              <Signup setAuth={onLoginHandler} />
            </Route>
            <Route path="/reset" component={ResetPassword} />
            <Route path="/about" component={Homepage} />
            {authenticated ? (
              <Route path="/dashboard" component={DashBoard} />
            ) : (
              <Route exact path="/" component={Homepage} />
            )}
            <Route path="/gold" component={AboutMetals} />
            <Route path="/prices" component={Prices} />
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
