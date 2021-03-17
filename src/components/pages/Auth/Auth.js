import React from "react";
import { NavLink } from "react-router-dom";

const Auth = (props) => {
  return (
    <div className="Auth">
      <div className="auth-header">
        <h1>{props.header}</h1>
        <h3>{props.secondaryHeader}</h3>
      </div>
      <div className="auth-content">{props.children}</div>
      <div className="auth-link">
        <p>{props.authLinkText}</p>
        <NavLink className="link-text" to={`/${props.authLink}`}>
          {props.authLink}
        </NavLink>
      </div>
    </div>
  );
};

export default Auth;
