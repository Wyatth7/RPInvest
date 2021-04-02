import React from "react";
import { useState } from "react";

// FIREBASE
import firebase from "firebase";
import firebaseConfig from "./../../../../utils/firebaseConfig";

// COMPONENTS
import Auth from "../Auth";
import { withRouter } from "react-router";

// ui.start("./../../../../utils/firebaseConfig.js", uiconfig);

firebase.default.initializeApp(firebaseConfig);

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onLoginHandler = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        props.history.push("/dashboard");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="Login">
      <Auth
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
        </form>
      </Auth>
    </div>
  );
};

export default withRouter(Login);
