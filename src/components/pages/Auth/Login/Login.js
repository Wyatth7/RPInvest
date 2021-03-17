import React from "react";
import Auth from "../Auth";

const Login = (props) => {
  return (
    <div className="Login">
      <Auth
        header="Customer Login"
        secondaryHeader="Login to check your portfolio."
        authLinkText="Don't have an account?"
        authLink="signup"
      >
        <form>
          <div className="inputs">
            <input placeholder="Email" type="Email" name="email" required />
            <input
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

export default Login;
