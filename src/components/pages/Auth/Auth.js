import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

const Auth = (props) => {
  return (
    <div className="Auth">
      <Helmet>
        <title> {`${props.path} | Royal Port Metals`}</title>
      </Helmet>
      <div className="auth-header">
        <h1>{props.header}</h1>
        <h3>{props.secondaryHeader}</h3>
      </div>
      {props.isError ? (
        <div className="auth-error">
          <p>{props.errMessage}</p>
        </div>
      ) : null}
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
