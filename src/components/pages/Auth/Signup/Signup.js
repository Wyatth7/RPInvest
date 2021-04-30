import React from "react";
import { useState } from "react";
import { withRouter } from "react-router";

import Auth from "../Auth";

// FIREBASE
import firebase from "firebase/app";
import "firebase/auth";

import Ajax from "./../../../../utils/ajax";

const Signup = (props) => {
  const [fn, setfn] = useState("");
  const [ln, setln] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cofPass, setCofPass] = useState("");
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   const signup = async () => {

  //   };

  //   if (submitted) {
  //     signup();
  //   }
  // }, [fn, ln, email, pass, cofPass, submitted]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "firstName") {
      setfn(value);
    } else if (name === "lastName") {
      setln(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPass(value);
    } else if (name === "confirmPassword") {
      setCofPass(value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await Ajax.signup({
        firstname: fn,
        lastname: ln,
        email: email,
        pass: pass,
        cofPass: cofPass,
      });
      await firebase.auth().signInWithEmailAndPassword(email, pass);
      localStorage.setItem(
        "authTokenRPM",
        await firebase.auth().currentUser.getIdToken()
      );
      localStorage.setItem(
        "userEmailRPM",
        await firebase.auth().currentUser.email
      );

      props.setAuth();
      props.history.push("/dashboard");
    } catch (err) {
      setError(true);
      e.target.reset();
    }
  };

  return (
    <div className="Signup">
      <Auth
        isError={error}
        errMessage="There was a problem signing you up."
        path="Sign up"
        header="Customer Signup"
        secondaryHeader="Sign up to create a portfolio."
        authLinkText="Already have an account?"
        authLink="login"
      >
        <form onSubmit={submitHandler}>
          <div className="name-inputs">
            <input
              onChange={onChangeHandler}
              placeholder="First Name"
              type="text"
              name="firstName"
              required
            />
            <input
              onChange={onChangeHandler}
              placeholder="Last Name"
              type="text"
              name="lastName"
              required
            />
          </div>

          <div className="email-input">
            <input
              onChange={onChangeHandler}
              placeholder="Email"
              type="Email"
              name="email"
              required
            />
            <input
              onChange={onChangeHandler}
              placeholder="Password"
              type="password"
              name="password"
              required
            />
          </div>

          <div className="inputs">
            <input
              onChange={onChangeHandler}
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              required
            />
          </div>
          <div>
            <button>Sign up</button>
          </div>
        </form>
      </Auth>
    </div>
  );
};

export default withRouter(Signup);
