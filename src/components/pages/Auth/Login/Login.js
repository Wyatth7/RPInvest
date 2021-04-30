import React from "react";
import { useState } from "react";

// FIREBASE
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./../../../../utils/firebaseConfig";

// COMPONENTS
import Auth from "../Auth";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

// ui.start("./../../../../utils/firebaseConfig.js", uiconfig);

// firebase.default.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const onLoginHandler = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        userCredential.user
          .getIdToken()
          .then((res) => {
            console.log(res);
            localStorage.setItem("authTokenRPM", res);
            console.log(localStorage.getItem("authTokenRPM"));

            props.setAuth();
            props.history.push("/dashboard");
          })
          .catch((err) => console.log(err));

        localStorage.setItem("userEmailRPM", userCredential.user.email);
      })
      .catch((error) => {
        setError(true);
        e.target.reset();
      });
  };

  return (
    <div className="Login">
      <Auth
        isError={error}
        errMessage="There was a problem logging you in."
        path="Login"
        header="Customer Login"
        secondaryHeader="Login to check your portfolio."
        authLinkText="Don't have an account?"
        authLink="signup"
      >
        <form onSubmit={onLoginHandler}>
          <div className="inputs">
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="Email"
              name="email"
              required
            />
            <input
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              type="password"
              name="password"
              required
            />
          </div>
          <div>
            <button>Login</button>
          </div>
          <div className="reset-item">
            <p className="reset">
              Can't remember your password?
              <span className="reset-btn">
                <NavLink className="reset-btn" to="/reset">
                  reset
                </NavLink>
              </span>
            </p>
          </div>
        </form>
      </Auth>
    </div>
  );
};

export default withRouter(Login);
