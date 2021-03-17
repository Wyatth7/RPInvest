import React from "react";
import Auth from "../Auth";

const Signup = (props) => {
  return (
    <div className="Signup">
      <Auth
        header="Customer Signup"
        secondaryHeader="Sign up to create a portfolio."
        authLinkText="Already have an account?"
        authLink="login"
      >
        <form>
          <div className="name-inputs">
            <input
              placeholder="First Name"
              type="text"
              name="firstName"
              required
            />
            <input
              placeholder="Last Name"
              type="text"
              name="lastName"
              required
            />
          </div>

          <div className="email-input">
            <input placeholder="Email" type="Email" name="email" required />
            <input
              placeholder="Password"
              type="password"
              name="password"
              required
            />
          </div>

          <div className="inputs">
            <input
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
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

export default Signup;
