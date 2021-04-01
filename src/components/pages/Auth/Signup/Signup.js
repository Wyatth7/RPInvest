import React from "react";
import { useState } from "react";

import Auth from "../Auth";

import Ajax from "./../../../../utils/ajax";

const Signup = (props) => {
  const [fn, setfn] = useState("");
  const [ln, setln] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cofPass, setCofPass] = useState("");

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
    // setSubmitted(true);
    // setSubmitted(false);
    try {
      await Ajax.signup({
        firstname: fn,
        lastname: ln,
        email: email,
        pass: pass,
        cofPass: cofPass,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Signup">
      <Auth
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

export default Signup;
